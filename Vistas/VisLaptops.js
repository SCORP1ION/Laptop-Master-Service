
import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import conexion from '../Acceso/Firebase';

const VisLaptops = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    vistaLap();
  }, []);

  const [laptop, setlaptop] = useState([])

  const vistaLap = async () => {
    try {
      const alta = await conexion.collection('tblLaptops').get()
      const Datos = []
      alta.forEach((doc) => {
        const {
          lapModelo,
          lapCpu,
          lapOs,
          imgLap
        } = doc.data()
        Datos.push({
          id: doc.id,
          lapModelo,
          lapCpu,
          lapOs,
          imgLap
        });
      });
      setlaptop(Datos);
    } catch (err) {
      console.error("Error de consulta", err)
    }
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: insets.top }}>
      <ScrollView style={styles.conatainer}>
        <Text style={styles.textVenta}>Laptops de venta</Text>

        {laptop.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: '20' }}>No hay laptops registradas</Text>
        ) : (
          laptop.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.laptops}
              onPress={() => navigation.navigate('VisVerLap', { lapId: item.id })}
            >
              <Image
                source={{ uri: item.imgLap }}
                style={styles.picture}
              />
              <View style={{ paddingTop: 13 }}>
                <Text style={styles.textCharacteristics}>Modelo: {item.lapModelo}</Text>
                <Text style={styles.textCharacteristics}>CPU: {item.lapCpu}</Text>
                <Text style={styles.textCharacteristics}>Sistema: {item.lapOs}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default VisLaptops

const styles = StyleSheet.create({
  conatainer: {
    padding: 15
  },

  laptops: {
    borderWidth: 1,
    width: 350,
    height: 120,
    alignSelf: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#8da1ffff',
    padding: 2,
    margin: 20
  },

  pictureLaptop: {
    borderWidth: 1,
    width: 20,
    height: 20,
  },

  picture: {
    width: 100,
    height: 100,
    borderRadius: 10,
    paddingTop: 12
  },

  textCharacteristics: {
    fontWeight: 700,
    color: '#ffffffff',
    paddingLeft: 0,
    paddingTop: 8,
    width: 200
  },

  textVenta: {
    alignSelf: 'center',
    margin: 12,
    fontSize: 16,
    fontWeight: 900,
  }

})