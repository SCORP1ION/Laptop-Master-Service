import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import conexion from '../Acceso/Firebase';

const VisVerLaptop = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { lapId } = route.params; // 👈 Recibimos el ID desde la navegación

  // funcion para eliminar
  const elimiarEquipo = async () => {
    try {
      await conexion.collection('tblLaptops').doc(lapId).delete().then(()=> {
        Alert.alert("Exitoso", "Eliminacion exitosa")
        navigation.navigate("Menu");
      });
    } catch (error) {
      console.error("Error al borrar", error)
    }
  }

  // funcion pricipara para confirmar eliminar
  const confirEliminar = () => {
    Alert.alert("Eliminar equipo",
      "¿Esta seguro que desar elimiar el equipo?",
      [
        { text: 'Si', onPress: () => elimiarEquipo(route.lapId) },
        { text: 'No', onPress: () => Alert.alert("Cacelado", "Eliminacion cancelada") }
      ]
    )
  }

  const [laptop, setLaptop] = useState(null);

  const consultaLaptop = async () => {
    try {
      const doc = await conexion.collection('tblLaptops').doc(lapId).get();
      if (doc.exists) {
        setLaptop(doc.data());
      } else {
        Alert.alert("Error", "No se encontró la laptop con ese ID");
      }
    } catch (err) {
      console.error("Error al consultar laptop:", err);
      Alert.alert("Error", "No se pudo consultar la laptop");
    }
  };

  useEffect(() => {
    consultaLaptop();
  }, []);

  if (!laptop) {
    return (
      <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando datos ...</Text>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', paddingTop: insets.top }}>
      <TouchableOpacity style={styles.contenedor} onPress={() => navigation.goBack()}>
        <Image style={styles.flechaIzquierda} source={require('../assets/icons/flecha-izquierda.png')} />
        <Text style={{ marginLeft: 8, fontWeight: '700' }}>Regresar</Text>
      </TouchableOpacity>

      <View style={{ padding: 40 }}>
        <View style={styles.containersecondary}>
          <Image source={require('../images/imaLaptops/LaptopAcer.png')} style={styles.picture} />
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

      <TouchableOpacity style={styles.btnDelete} onPress={confirEliminar}>
        <Text style={styles.textDelete}>Eliminar laptop</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default VisVerLaptop

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
  },

  btnDelete: {
    backgroundColor: '#fd0000ff',
    width: 320,
    height: 50,
    borderRadius: 16,
    position: 'absolute',
    bottom: 35
  },
  textDelete: {
    alignSelf: 'center',
    padding: 15,
    fontWeight: 900,
    color: '#ffffffff',
    fontSize: 16
  }
})