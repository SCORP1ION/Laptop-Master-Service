import { View, Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, Platform, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import conexion, { auth } from '../Acceso/Firebase';
import * as ImagePicker from 'expo-image-picker';

const VisRegister = (props) => {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const cloudName = 'dfo7xkwo9';
  const uploadPreset = 'imgParaLM';

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
    }
  };

  const [perfil, setPerfil] = useState({
    perNombre: '',
    perEmpresa: '',
    perDireccion: '',
    perTel: '',
    perEmail: '',
    contraseña: "",
    confirContraseña: "",
  });

  const InsertarValor = (campo, valor) => {
    setPerfil({ ...perfil, [campo]: valor })
  }

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleRegister = async () => {
    if (!image) {
      Alert.alert("Imagen requerida", "Selecciona una foto de perfil.");
      return;
    }
    if (!perfil.perNombre || !perfil.perEmpresa || !perfil.perDireccion || !perfil.perTel || !perfil.perEmail || !perfil.contraseña || !perfil.confirContraseña) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }
    if (perfil.contraseña !== perfil.confirContraseña) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    if (perfil.contraseña.length < 6) { // Valida que sea mas de 6 caracteres la contraseña
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    try {
      setUploading(true);
      
      // 1. Crear el usuario en Firebase Auth
      const userCredential = await auth.createUserWithEmailAndPassword(perfil.perEmail, perfil.contraseña);
      const user = userCredential.user;
      
      // 2. Subir imagen a Cloudinary
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        type: "image/jpeg",
        name: `${user.uid}.jpg`,
      });
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "perfil");

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      const result = await response.json();

      // 3. Guardar datos del perfil + URL de la imagen en Firestore
      await conexion.collection("tblPerfil").doc(user.uid).set({
        perNombre: perfil.perNombre,
        perEmpresa: perfil.perEmpresa,
        perDireccion: perfil.perDireccion,
        perTel: perfil.perTel,
        perEmail: perfil.perEmail,
        role: "user",
        imgPerfil: result.secure_url,
        fechaRegistro: new Date()
      });

      Alert.alert("Registro Exitoso", "Tu cuenta ha sido creada");
      // navigation.replace("VLogin");

    } catch (error) {
      console.log("Error completo:", error);
      Alert.alert("Error", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { padding: insets.top, marginBottom: insets.bottom }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity style={styles.contenedor} onPress={() => navigation.goBack()}>
        <Image style={styles.flechaIzquierda} source={require('../assets/icons/flecha-izquierda.png')} />
        <Text style={styles.textBack}>regresar</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.inputContainer} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={pickImage}>
          <Avatar
            style={styles.foto}
            size='xlarge'
            rounded
            source={image ? { uri: image } : require('../assets/icons/user-temporal.png')}
          />
        </TouchableOpacity>

        <View style={styles.espaciados}>
          <TextInput 
            style={styles.textBox}
            placeholder='Nombre'
            placeholderTextColor={'#0a0a0aff'}
            value={perfil.perNombre}
            onChangeText={(valor) => InsertarValor('perNombre', valor)}
          />
        </View>

        <View style={styles.espaciados}>
          <TextInput 
            style={styles.textBox}
            placeholder='Nombre empresa'
            placeholderTextColor={'#0a0a0aff'}
            value={perfil.perEmpresa}
            onChangeText={(valor) => InsertarValor('perEmpresa', valor)}
          />
        </View>

        <View style={styles.espaciados}>
          <TextInput 
            style={styles.textBox}
            placeholder='Direccion'
            placeholderTextColor={'#0a0a0aff'}
            value={perfil.perDireccion}
            onChangeText={(valor) => InsertarValor('perDireccion', valor)}
          />
        </View>

        <View style={styles.espaciados}>
          <TextInput 
            style={styles.textBox}
            placeholder='Numero telefonico'
            placeholderTextColor={'#0a0a0aff'}
            keyboardType='numeric'
            value={perfil.perTel}
            onChangeText={(valor) => InsertarValor('perTel', valor)}
          />
        </View>

        <View style={styles.espaciados}>
          <TextInput 
            style={styles.textBox}
            placeholder='Correo'
            placeholderTextColor={'#0a0a0aff'}
            value={perfil.perEmail}
            onChangeText={(valor) => InsertarValor('perEmail', valor)}
            autoCapitalize='none'
            keyboardType='email-address'
          />
        </View>

        <View style={styles.espaciados}>
          <TextInput 
            style={styles.textBox}
            placeholder='Contraseña'
            placeholderTextColor={'#0a0a0aff'}
            value={perfil.contraseña}
            onChangeText={(valor) => InsertarValor("contraseña", valor)}
            secureTextEntry
          />
        </View>

        <View style={styles.espaciados}>
          <TextInput 
            style={styles.textBox}
            placeholder='Confirmar contraseña'
            placeholderTextColor={'#0a0a0aff'}
            value={perfil.confirContraseña}
            onChangeText={(valor) => InsertarValor("confirContraseña", valor)}
            secureTextEntry
          />
        </View>

      </ScrollView>
      
      <TouchableOpacity 
        style={[styles.buttomRegister, uploading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={uploading}
      >
        {uploading ? (
          <ActivityIndicator size='small' color='#fff' />
        ) : (
          <Text style={styles.textRegister}>Crear cuenta</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default VisRegister

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  inputContainer: {
    backgroundColor: '#F3F3F3',
    borderRadius: 30,
    width: 330,
    padding: 15,
    flexGrow: 1
  },
  scrollContent: {
    flexGrow: 1
  },
  espaciados: {
    padding: 8
  },
  foto: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 90,
    borderColor: '#5312ebf6',
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
    marginBottom: 15
  },
  textBox: {
    backgroundColor: '#ffffff',
    height: 60,
    fontWeight: '900',
    alignSelf: 'center',
    borderWidth: 2,
    width: 300,
    textAlign: 'center',
    borderRadius: 15,
  },
  buttomRegister: {
    backgroundColor: '#5B40F2',
    width: 320,
    height: 50,
    borderRadius: 16,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonDisabled: {
    opacity: 0.6
  },
  textRegister: {
    fontWeight: '900',
    color: '#ffffff',
    fontSize: 16
  },
  contenedor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    marginTop: 9,
    alignItems: 'center'
  },
  flechaIzquierda: {
    height: 16,
    width: 15,
    marginLeft: 5,
  },
  textBack: {
    marginLeft: 8,
    fontWeight: '700'
  }
})