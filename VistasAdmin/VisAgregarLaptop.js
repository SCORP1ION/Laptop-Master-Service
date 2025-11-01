import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, TextInput, Platform, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import conexion from '../Acceso/Firebase';

const VisAgregarLaptop = () => {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

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

  const publicarLaptop = async () => {

    if (laptop.lapModelo === '' || laptop.lapRam === '' || laptop.lapOs === '' || laptop.lapCpu === '' || laptop.lapGrafica === '' || laptop.lapDisco === '' || laptop.lapPrecio === '') {
      Alert.alert("Campo incompletos", "Favor de llenar todos los campos")
      return;
    }

    try {
       const docRef = await conexion.collection('tblLaptops').add({
        lapModelo: laptop.lapModelo,
        lapRam: laptop.lapRam,
        lapOs: laptop.lapOs,
        lapCpu: laptop.lapCpu,
        lapGrafica: laptop.lapGrafica,
        lapDisco: laptop.lapDisco,
        lapPrecio: laptop.lapPrecio
      });

      await conexion.collection('tblLaptops').doc(docRef.id).update({
        lapId: docRef.id
      })
      Alert.alert("Exitoso", "Laptop registrada exitosamente")
      navigation.navigate("Menu");
    } catch (err) {
      console.log("Error", err)
      console.error("Error al mostrar equipos", err)
    }
  }


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', padding: insets.top, marginBottom: insets.bottom }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ayuda a que no tape el formulario con la propiedad platform.os y hace una comparativa si es un disposivo android o ios
    >
      <TouchableOpacity style={styles.contenedor} onPress={() => navigation.goBack()}>
        <Image style={styles.flechaIzquierda} source={require('../assets/icons/flecha-izquierda.png')}></Image>
        <Text style={{ marginLeft: 8, fontWeight: '700' }}>regresar</Text>
      </TouchableOpacity>

      <ScrollView style={styles.inputContainer}> {/* usamos ScrollView contenedor desplazante para que el usuario pueda ver el contenido*/}
        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={[styles.textBox, { backgroundColor: '#ffffffff', fontWeight: '900' }]}
            placeholder='Modelo'
            placeholderTextColor={'#0a0a0aff'}
            value={laptop?.lapModelo}
            onChangeText={(valor) => caracteristicas('lapModelo', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={[styles.textBox, { backgroundColor: '#ffffffff', fontWeight: '900' }]}
            placeholder='RAM'
            placeholderTextColor='#0a0a0aff'
            value={laptop?.lapRam}
            onChangeText={(valor) => caracteristicas('lapRam', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={[styles.textBox, { backgroundColor: '#ffffffff', fontWeight: '900' }]}
            placeholder='Sistema operativo'
            placeholderTextColor='#0a0a0aff'
            value={laptop?.lapOs}
            onChangeText={(valor) => caracteristicas('lapOs', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={[styles.textBox, { backgroundColor: '#ffffffff', fontWeight: '900' }]}
            placeholder='Procesador'
            placeholderTextColor='#0a0a0aff'
            value={laptop?.lapCpu}
            onChangeText={(valor) => caracteristicas('lapCpu', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={[styles.textBox, { backgroundColor: '#ffffffff', fontWeight: '900' }]}
            placeholder='¿Incluye graficos?'
            placeholderTextColor='#0a0a0aff'
            value={laptop?.lapGrafica}
            onChangeText={(valor) => caracteristicas('lapGrafica', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={[styles.textBox, { backgroundColor: '#ffffffff', fontWeight: '900' }]}
            placeholder='Disco duro'
            placeholderTextColor='#0a0a0aff'
            value={laptop?.lapDisco}
            onChangeText={(valor) => caracteristicas("lapDisco", valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput style={[styles.textBox, { backgroundColor: '#ffffffff', fontWeight: '900' }]}
            placeholder='Precio'
            keyboardType='numeric'
            placeholderTextColor='#0a0a0aff'
            value={laptop?.lapPrecio}
            onChangeText={(valor) => caracteristicas("lapPrecio", valor)}
          />
        </View>

      </ScrollView>
      <TouchableOpacity style={styles.buttomRegister} onPress={() => publicarLaptop()}>
        <Text style={styles.textRegister}>Publicar laptop</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView >

  )
}

export default VisAgregarLaptop

const styles = StyleSheet.create({
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
  }
})