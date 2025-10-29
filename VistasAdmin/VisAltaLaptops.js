import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const VisAltaLaptops = () => {

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#FFFFFFFF', paddingTop: insets.top }}>
      <ScrollView style={styles.conatainer}>
        <Text style={styles.textVenta}>Laptops de venta</Text>
        <TouchableOpacity style={styles.laptops} onPress={() => navigation.navigate('ViVerlaptop')}>
          <Image source={require('../images/imaLaptops/LaptopAcer.png')} style={styles.picture} />
          <View style={{ paddingTop: 13 }}>
            <Text style={styles.textCharacteristics}>Acer Aspire 1.14 pulgadas</Text>
            <Text style={styles.textCharacteristics}>Intel Celeron N4020</Text>
            <Text style={styles.textCharacteristics}>Windows 10 pro</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

    <TouchableOpacity style={styles.agregar} onPress={() => navigation.navigate('AgregarLaptop')}>
      <Text style={styles.textAdd}>Agregar nuevo equipo</Text>
    </TouchableOpacity>

    </KeyboardAvoidingView>
  )
}

export default VisAltaLaptops

const styles = StyleSheet.create({
  conatainer: {
    padding: 15
  },

  laptops:{
    borderWidth: 1,
    width: 350,
    height: 120,
    alignSelf: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#8da1ffff',
    padding: 2
  },

  pictureLaptop: {
    borderWidth: 1,
    width: 20,
    height: 20,
  },
  
  picture:{
    width: 100, 
    height: 100,
  },
  
  textCharacteristics:{
    fontWeight: 700,
    color: '#ffffffff',
    paddingLeft: 0,
    paddingTop: 8,
    width: 200
  },

  textVenta:{
    alignSelf: 'center',
    margin: 12,
    fontSize: 16,
    fontWeight: 900,
  },

  agregar:{
    backgroundColor: '#5B40F2', 
    borderRadius: 20, 
    height: 40, 
    width: 250,
    alignSelf: 'center',
    padding: 10
  },

  textAdd:{
    fontSize: 15, 
    textAlign: 'center', 
    fontWeight: 900, 
    color:'white'
  }
})