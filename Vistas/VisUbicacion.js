import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import conexion from '../Acceso/Firebase'

const VisUbicacion = () => {
  const [ubicacion, setUbicacion] = useState(null)

  useEffect(() => {
    const obtenerUbicacion = async () => {
      try {
        const doc = await conexion.collection('tblUbicacion').doc('empresa').get();
        if (doc.exists) {
          setUbicacion(doc.data());
        }
      } catch (error) {
        console.error("Error al obtener la ubicacion", error)
      }
    };
    obtenerUbicacion();
  }, []);

  if (!ubicacion) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' color='#7b40f2' />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: ubicacion.latitude,
          longitude: ubicacion.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: ubicacion.latitude,
            longitude: ubicacion.longitude,
          }}
          title='Laptop master #253'
          description='Aqui puedes encontrarnos'
        />
      </MapView>
    </View>
  );
}

export default VisUbicacion

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  map: {
    flex: 1
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

})