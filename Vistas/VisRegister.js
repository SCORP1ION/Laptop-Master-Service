
import { View, Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, Platform, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import conexion, { auth } from '../Acceso/Firebase';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

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
    confirContraseña: ""
  });

  const InsertarValor = (campo, valor) => {
    setPerfil({ ...perfil, [campo]: valor })
  }

  const navigation = useNavigation();

  const handleRegister = async () => {

    if (!image) {
      Alert.alert("Imagen requerida", "Selecciona una foto de perfil.");
      return;
    }

    if (!perfil.perNombre || !perfil.perEmpresa || !perfil.perDireccion || !perfil.perTel || !perfil.perEmail) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    if (perfil.contraseña !== perfil.confirContraseña) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      // 1. Crear el usuario
      const userCredential = await auth.createUserWithEmailAndPassword(perfil.perEmail, perfil.contraseña);
      const user = userCredential.user;

      // 2. Subir imagen usando UID como nombre y carpeta "perfil"
      setUploading(true);
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

      const result = await response.json();
      // console.log("Resultado", result)
      setUploading(false);

      // 3. Guardar datos del perfil + URL de la imagen
      await conexion.collection("tblPerfil").doc(user.uid).set({
        perNombre: perfil.perNombre,
        perEmpresa: perfil.perEmpresa,
        perDireccion: perfil.perDireccion,
        perTel: perfil.perTel,
        perEmail: perfil.perEmail,
        role: "user",
        imgPerfil: result.secure_url // IMPORTANTE
      });

      Alert.alert("Registro Exitoso", "Tu cuenta ha sido creada");
      navigation.replace("VLogin");

    } catch (error) {
      setUploading(false);
      Alert.alert("Error", error.message);
      console.log(error);
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', padding: insets.top, marginBottom: insets.bottom }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ayuda a que no tape el formulario con la propiedad platform.os y hace una comparativa si es un disposivo android o ios
    >
      <TouchableOpacity style={styles.contenedor} onPress={() => navigation.goBack()}>
        <Image style={styles.flechaIzquierda} source={require('../assets/icons/flecha-izquierda.png')}></Image>
        <Text style={{ marginLeft: '8', fontWeight: '700' }}>regresar</Text>
      </TouchableOpacity>
      <ScrollView style={styles.inputContainer}> {/* usamos ScrollView contenedor desplazante para que el usuario pueda ver el contenido*/}
        <TouchableOpacity onPress={pickImage}>
          <Avatar
            style={styles.foto}
            size='xlarge'
            rounded
            source={image ? { uri: image } : require('../assets/icons/user-temporal.png')}
          />
        </TouchableOpacity>

        <View style={{ paddingTop: '15' }}>
          <TextInput style={[styles.textBox, { fontWeight: '900' }]}
            backgroundColor='#ffffffff'
            placeholder='Nombre'
            placeholderTextColor={'#0a0a0aff'}
            value={perfil?.perNombre}
            onChangeText={(valor) => InsertarValor('perNombre', valor)}
          />
        </View>

        <View style={{ paddingTop: '15' }}>
          <TextInput style={[styles.textBox, { fontWeight: '900' }]}
            backgroundColor='#ffffffff'
            placeholder='Nombre empresa'
            placeholderTextColor='#0a0a0aff'
            value={perfil?.perEmpresa}
            onChangeText={(valor) => InsertarValor('perEmpresa', valor)}
          />
        </View>

        <View style={{ paddingTop: '15' }}>
          <TextInput style={[styles.textBox, { fontWeight: '900' }]}
            backgroundColor='#ffffffff'
            placeholder='Direccion'
            placeholderTextColor='#0a0a0aff'
            value={perfil?.perDireccion}
            onChangeText={(valor) => InsertarValor('perDireccion', valor)}
          />
        </View>

        <View style={{ paddingTop: '15' }}>
          <TextInput style={[styles.textBox, { fontWeight: '900' }]}
            backgroundColor='#ffffffff'
            placeholder='Numero telefonico'
            placeholderTextColor='#0a0a0aff'
            keyboardType='numeric'
            value={perfil?.perTel}
            onChangeText={(valor) => InsertarValor('perTel', valor)}
          />
        </View>

        <View style={{ paddingTop: '15' }}>
          <TextInput style={[styles.textBox, { fontWeight: '900' }]}
            backgroundColor='#ffffffff'
            placeholder='Correo'
            placeholderTextColor='#0a0a0aff'
            value={perfil?.perEmail}
            onChangeText={(valor) => InsertarValor('perEmail', valor)}
          />
        </View>

        <View style={{ paddingTop: '15' }}>
          <TextInput style={[styles.textBox, { fontWeight: '900' }]}
            backgroundColor='#ffffffff'
            placeholder='Contraseña'
            placeholderTextColor='#0a0a0aff'
            value={perfil?.contraseña}
            onChangeText={(valor) => InsertarValor("contraseña", valor)}
            secureTextEntry
          />
        </View>

        <View style={{ paddingTop: '15' }}>
          <TextInput style={[styles.textBox, { fontWeight: '900' }]}
            backgroundColor='#ffffffff'
            placeholder='Confirmar contraseña'
            placeholderTextColor='#0a0a0aff'
            value={perfil?.confirContraseña}
            onChangeText={(valor) => InsertarValor("confirContraseña", valor)}
            secureTextEntry
          />
        </View>

      </ScrollView>
      <TouchableOpacity style={[styles.buttomRegister, uploading && { opacity: 0.6 }]}
        onPress={handleRegister}
        disabled={uploading}
      >
        {uploading ?
          (<ActivityIndicator size='small' color='#fff' />) : (
            <Text style={styles.textRegister}>Crear cuenta</Text>
          )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default VisRegister

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#F3F3F3',
    borderRadius: 30,
    width: 330,
    height: 480,
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
    fontWeight: 900,
    color: '#ffffffff',
    fontSize: 16
  },

  contenedor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    marginTop: 9
  },
  flechaIzquierda: {
    height: 16,
    width: 15,
    marginLeft: 5,
  },
})