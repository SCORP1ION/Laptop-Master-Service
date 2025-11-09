import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, TextInput, Platform, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import conexion from '../Acceso/Firebase';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

const VisAgregarLaptop = () => {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const cloudName = 'dfo7xkwo9';
  const uploadPreset = 'imgParaLM';

  const [laptop, setlaptop] = useState({
    lapModelo: '',
    lapRam: '',
    lapOs: '',
    lapCpu: '',
    lapGrafica: '',
    lapDisco: '',
    lapPrecio: ''
  })

  const caracteristicas = (campo, valor) => {
    setlaptop({ ...laptop, [campo]: valor })
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8
      })

      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert("No se pudo seleccionar imagen", error.message)
    }
  }

  const publicarLaptop = async () => {
    if (!image) {
      Alert.alert("Imagen requerida", "Favor de seleccionar una foto para laptop")
      return; // ← CORREGIDO: agregar return
    }

    if (laptop.lapModelo === '' || laptop.lapRam === '' || laptop.lapOs === '' || laptop.lapCpu === '' || laptop.lapGrafica === '' || laptop.lapDisco === '' || laptop.lapPrecio === '') {
      Alert.alert("Campo incompletos", "Favor de llenar todos los campos")
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        type: "image/jpeg",
        name: `laptop_${Date.now()}.jpg`,
      });
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "laptops");

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      setUploading(false);

      const docRef = await conexion.collection('tblLaptops').add({
        lapModelo: laptop.lapModelo,
        lapRam: laptop.lapRam,
        lapOs: laptop.lapOs,
        lapCpu: laptop.lapCpu,
        lapGrafica: laptop.lapGrafica,
        lapDisco: laptop.lapDisco,
        lapPrecio: laptop.lapPrecio,
        imgLap: result.secure_url,
        fechaDeRegistro: new Date()
      });

      await conexion.collection('tblLaptops').doc(docRef.id).update({
        lapId: docRef.id
      })

      Alert.alert("Exitoso", "Laptop registrada exitosamente")
      navigation.navigate("Menu");
    } catch (err) {
      console.error("Error al mostrar equipos", err)
      Alert.alert("Error", "No se pudo registrar la laptop")
      setUploading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.all, { padding: insets.top, marginBottom: insets.bottom }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity style={styles.contenedor} onPress={() => navigation.goBack()}>
        <Image 
          style={styles.flechaIzquierda} 
          source={require('../assets/icons/flecha-izquierda.png')} 
        />
        <Text style={styles.textBack}>regresar</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Avatar
            style={styles.foto}
            rounded
            size={'xlarge'}
            source={image ? { uri: image } : require('../assets/icons/user-temporal.png')}
          />
        </TouchableOpacity>
        
        <View style={styles.espaciados}>
          <TextInput
            style={styles.textBox}
            placeholder='Modelo'
            placeholderTextColor={'#0a0a0aff'}
            value={laptop.lapModelo}
            onChangeText={(valor) => caracteristicas('lapModelo', valor)}
          />
        </View>

        <View style={styles.espaciados}>
          <TextInput
            style={styles.textBox}
            placeholder='RAM'
            placeholderTextColor={'#0a0a0aff'}
            value={laptop.lapRam}
            onChangeText={(valor) => caracteristicas('lapRam', valor)}
          />
        </View>

        <View style={styles.espaciados}>
          <TextInput
            style={styles.textBox}
            placeholder='Sistema operativo'
            placeholderTextColor={'#0a0a0aff'}
            value={laptop.lapOs}
            onChangeText={(valor) => caracteristicas('lapOs', valor)}
          />
        </View>

        <View style={styles.espaciados}>
          <TextInput
            style={styles.textBox}
            placeholder='Procesador'
            placeholderTextColor={'#0a0a0aff'}
            value={laptop.lapCpu}
            onChangeText={(valor) => caracteristicas('lapCpu', valor)}
          />
        </View>

        <View style={styles.espaciados}>
          <TextInput
            style={styles.textBox}
            placeholder='¿Incluye graficos?'
            placeholderTextColor={'#0a0a0aff'}
            value={laptop.lapGrafica}
            onChangeText={(valor) => caracteristicas('lapGrafica', valor)}
          />
        </View>

        <View style={styles.espaciados}>
          <TextInput
            style={styles.textBox}
            placeholder='Disco duro'
            placeholderTextColor={'#0a0a0aff'}
            value={laptop.lapDisco}
            onChangeText={(valor) => caracteristicas("lapDisco", valor)}
          />
        </View>

        <View style={styles.espaciados}>
          <TextInput 
            style={styles.textBox}
            placeholder='Precio'
            keyboardType={'numeric'}
            placeholderTextColor={'#0a0a0aff'}
            value={laptop.lapPrecio}
            onChangeText={(valor) => caracteristicas("lapPrecio", valor)}
          />
        </View>

      </ScrollView>
      
      <TouchableOpacity 
        style={[
          styles.buttomRegister, 
          uploading && styles.buttomDisabled
        ]} 
        onPress={publicarLaptop}
        disabled={uploading}
      >
        <Text style={styles.textRegister}>
          {uploading ? 'Subiendo...' : 'Publicar laptop'}
        </Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  )
}

export default VisAgregarLaptop

const styles = StyleSheet.create({
  all: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  textBack: {
    marginLeft: 8,
    fontWeight: '700'
  },
  espaciados: {
    paddingTop: 15
  },
  inputContainer: {
    backgroundColor: '#F3F3F3',
    borderRadius: 30,
    width: 350,
    padding: 15,
    flexGrow: 1
  },
  flechaIzquierda: {
    height: 16,
    width: 15,
    marginLeft: 5,
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
    backgroundColor: '#ffffffff',
    fontWeight: '900'
  },
  buttomRegister: {
    backgroundColor: '#5B40F2',
    width: 320,
    height: 50,
    borderRadius: 16,
    marginTop: 16,
  },
  buttomDisabled: {
    backgroundColor: '#cccccc'
  },
  textRegister: {
    alignSelf: 'center',
    padding: 15,
    fontWeight: '900',
    color: '#ffffffff',
    fontSize: 16
  },
  contenedor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    marginTop: 9
  }
})