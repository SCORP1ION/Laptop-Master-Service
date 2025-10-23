import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const VisVerLap = () => {

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', paddingTop: insets.top}}>
      <TouchableOpacity style={styles.contenedor} onPress={() => navigation.goBack() }>
        <Image style={styles.flechaIzquierda} source={require('../assets/icons/flecha-izquierda.png')}></Image>
        <Text style={{marginLeft: 8, fontWeight: 700}}>regresar</Text>
      </TouchableOpacity>
      <View style={{padding: 40}}>
        <View style={styles.containersecondary}>
          <Image source={require('../images/imaLaptops/LaptopAcer.png')} style={styles.picture}></Image>
          <View style={{paddingTop: 16}}>
            <Text style={styles.texto}>Acer Aspire 1, 14 Pulgadas, HD</Text>
            <Text style={styles.texto}>16GB RAM</Text>
            <Text style={styles.texto}>Windows 10 Pro</Text>
            <Text style={styles.texto}>Core i5 8Va 2.30GHz</Text>
            <Text style={styles.texto}>Intel(R) Graphics 630</Text>
            <Text style={styles.texto}>Disco duro solido 512GB NMVE</Text>
            <Text style={styles.texto}>$5,000</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default VisVerLap

const styles = StyleSheet.create({
  
  containersecondary:{
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

  flechaIzquierda:{
    height: 16,
    width: 15,
    marginLeft: 5,
  },

  contenedor:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    marginTop: 9
  }
})