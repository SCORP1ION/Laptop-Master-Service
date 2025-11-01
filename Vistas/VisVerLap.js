import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import conexion from '../Acceso/Firebase';

const VisVerLap = () => {

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { lapId } = route.params
  const [laptop, setLaptop] = useState(null)

  const DescripcionLap = async () => {
    try {
      const DescripLap = await conexion.collection('tblLaptops').doc(lapId).get()
      if (DescripLap.exists) {
        setLaptop(DescripLap.data());
      } else {
        Alert.alert("Error", "Error al consultar los equipos")
      }
    } catch (error) {
      console.error("Error al consultar", error)
    }
  }

  useEffect(()=> {
    DescripcionLap();
  }, [])

  if(!laptop){
    return(
      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <Text>Cargando datos ... </Text>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', paddingTop: insets.top }}>
      <TouchableOpacity style={styles.contenedor} onPress={() => navigation.goBack()}>
        <Image style={styles.flechaIzquierda} source={require('../assets/icons/flecha-izquierda.png')}></Image>
        <Text style={{ marginLeft: 8, fontWeight: 700 }}>regresar</Text>
      </TouchableOpacity>
      <View style={{ padding: 40 }}>
        <View style={styles.containersecondary}>
          <Image source={require('../images/imaLaptops/LaptopAcer.png')} style={styles.picture}></Image>
          <View style={{ paddingTop: 16 }}>
            <Text style={styles.texto}>{laptop.lapModelo}</Text>
            <Text style={styles.texto}>{laptop.lapRam}</Text>
            <Text style={styles.texto}>{laptop.lapOs}</Text>
            <Text style={styles.texto}>{laptop.lapCpu}</Text>
            <Text style={styles.texto}>{laptop.lapGrafica}</Text>
            <Text style={styles.texto}>{laptop.lapDisco}</Text>
            <Text style={styles.texto}>${laptop.lapPrecio}</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default VisVerLap

const styles = StyleSheet.create({

  containersecondary: {
    backgroundColor: '#F3F3F3',
    borderRadius: 30,
    width: 350,
    height: 580
  },

  picture: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },

  texto: {
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 18,
    fontWeight: 700
  },

  flechaIzquierda: {
    height: 16,
    width: 15,
    marginLeft: 5,
  },

  contenedor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    marginTop: 9
  }
})