
import { View, Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import conexion, { auth } from '../Acceso/Firebase';
// import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const VisRegister = (props) => {
  // Actualiza el estado del perfil cuando las props cambian 
  // sin esto nos saldra un alerta de que llena el formulario y no se actualiza
  useEffect(() => {
    setPerfil(),
      setImage()
  }, [props])

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Configuración de Cloudinary
  const cloudName = 'dfo7xkwo9'; // Reemplaza con tu cloud name
  const uploadPreset = 'imgPerfilLM'; // Reemplaza con tu upload preset

  // Seleccionar imagen de la galería
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
      console.log("no se selecciono")
    }
  };

  // Subir imagen a Cloudinary
  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Error', 'Selecciona una imagen primero');
      return;
    }

    setUploading(true);

    try {
      // Crear FormData
      const formData = new FormData();
      formData.append('file', {
        uri: image,
        type: 'image/jpeg', // o el tipo correcto de tu imagen
        name: 'uploaded_image.jpg'
      });
      formData.append('upload_preset', uploadPreset);

      // Subir a Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const result = await response.json();

      if (result.secure_url) {
        Alert.alert('Éxito', 'Imagen subida correctamente');
        console.log('URL de la imagen:', result.secure_url);
      } else {
        Alert.alert('Error', 'No se pudo subir la imagen');
        console.error("Error en la respuesta:", result);
      }
    } catch (error) {
      Alert.alert('Error', 'Error al subir la imagen');
      console.error("Error en la carga:", error);
    } finally {
      setUploading(false);
    }
  };

  // Estado para los datos del perfil  
  const [perfil, setPerfil] = useState({
    perDireccion: '',
    perEmail: '',
    perEmpresa: '',
    perNombre: '',
    perTel: '',
    contraseña: "",
    confirContraseña: ""
  });

  const InsertarValor = (campo, valor) => {
    setPerfil({ ...perfil, [campo]: valor })
  }


  const navigation = useNavigation();

  const handleRegister = async () => {
    if (perfil.perEmail === ' ' || perfil.perNombre === ' ' || perfil.perDireccion === ' ' || perfil.perEmpresa === '') {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (perfil.contraseña !== perfil.confirContraseña) {
      Alert.alert('Error', 'Verificar su contraseña')
    }

    try {
      // 1. Crear usuario en Auth
      await auth.createUserWithEmailAndPassword(perfil?.perEmail, perfil?.contraseña).then((userCredential) => {
        const user = userCredential.user;
        conexion.collection('tblPerfil').doc(user.uid).set({
          perEmail: perfil.perEmail,
          perNombre: perfil.perNombre,
          perDireccion: perfil.perDireccion,
          perEmpresa: perfil.perEmpresa,
          perTel: perfil.perTel,
          role: "user" // Si se registra un usuario nuevo, le asigna el rol de User
        }).then(() => {
          // 2. Insertar datos en Firestore
          Alert.alert('¡Registro exitoso!', 'Tu cuenta ha sido creada.');
          navigation.replace('VLogin');
        });
      });
    } catch (error) {
      Alert.alert('Error de auth', error.message);
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', padding: insets.top, marginBottom: insets.bottom }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ayuda a que no tape el formulario con la propiedad platform.os y hace una comparativa si es un disposivo android o ios
    >

      <ScrollView style={styles.inputContainer}> {/* usamos ScrollView contenedor desplazante para que el usuario pueda ver el contenido*/}

        <TouchableOpacity>
          <Avatar
            style={styles.foto}
            size='xlarge'
            onPress={pickImage}
          />
        </TouchableOpacity>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={styles.textBox}
            backgroundColor='#ffffffff'
            placeholder='Nombre'
            placeholderTextColor={'#0a0a0aff'}
            value={perfil?.perNombre}
            fontWeight='900'
            onChangeText={(valor) => InsertarValor('perNombre', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={[styles.textBox, styles.separado]}
            backgroundColor='#ffffffff'
            placeholder='Nombre empresa'
            placeholderTextColor='#0a0a0aff'
            value={perfil?.perEmpresa}
            fontWeight='900'
            onChangeText={(valor) => InsertarValor('perEmpresa', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={[styles.textBox, styles.separado]}
            backgroundColor='#ffffffff'
            placeholder='Direccion'
            placeholderTextColor='#0a0a0aff'
            value={perfil?.perDireccion}
            fontWeight='900'
            onChangeText={(valor) => InsertarValor('perDireccion', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={[styles.textBox, styles.separado]}
            backgroundColor='#ffffffff'
            placeholder='Numero telefonico'
            placeholderTextColor='#0a0a0aff'
            keyboardType='numeric'
            value={perfil?.perTel}
            fontWeight='900'
            onChangeText={(valor) => InsertarValor('perTel', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={styles.textBox}
            backgroundColor='#ffffffff'
            placeholder='Correo'
            placeholderTextColor='#0a0a0aff'
            value={perfil?.perEmail}
            fontWeight='900'
            onChangeText={(valor) => InsertarValor('perEmail', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={styles.textBox}
            backgroundColor='#ffffffff'
            placeholder='Contraseña'
            placeholderTextColor='#0a0a0aff'
            fontWeight='900'
            value={perfil?.contraseña}
            onChangeText={(valor) => InsertarValor("contraseña", valor)}
            secureTextEntry
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput style={styles.textBox}
            backgroundColor='#ffffffff'
            placeholder='Confirmar contraseña'
            placeholderTextColor='#0a0a0aff'
            fontWeight='900'
            value={perfil?.confirContraseña}
            onChangeText={(valor) => InsertarValor("confirContraseña", valor)}
            secureTextEntry
          />
        </View>

      </ScrollView>
      <TouchableOpacity style={styles.buttomRegister} onPress={handleRegister}>
        <Text style={styles.textRegister}>Crear cuenta</Text>
      </TouchableOpacity>
      {/* 
      <TouchableOpacity style={styles.buttomRegister} onPress={uploadImage}>
        <Text style={styles.textRegister}>Subir imagen</Text>
      </TouchableOpacity> */}

    </KeyboardAvoidingView >

  )
}

export default VisRegister

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#F3F3F3',
    borderRadius: 30,
    width: 350,
    padding: 15,
    flexGrow: 1
  },

  foto: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 90,
    borderColor: '#5312ebf6',
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
  },

  textBox: {
    height: 60,
    alignSelf: 'center',
    borderWidth: 2,
    width: 320,
    textAlign: 'center',
    marginTop: 15,
    borderRadius: 15,
  },

  buttomRegister: {
    backgroundColor: '#5B40F2',
    width: 320,
    height: 50,
    borderRadius: 16,
    marginTop: 16,
  },

  textRegister: {
    alignSelf: 'center',
    padding: 15,
    fontWeight: '900',
    color: '#ffffffff',
    fontSize: 16
  },
})