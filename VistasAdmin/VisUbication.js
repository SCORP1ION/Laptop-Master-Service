import React, { useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import conexion from '../Acceso/Firebase'; // tu conexión a Firestore

const VisUbication = () => {
  const [location, setLocation] = useState({
    latitude: 20.65379,
    longitude: -105.21959,
  });

  // 🧭 Cuando el admin toca el mapa
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

  // 💾 Guardar coordenadas en Firestore
  const guardarUbicacion = async () => {
    try {
      await conexion.collection('tblUbicacion').doc('empresa').set({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      Alert.alert('Éxito', 'Ubicación actualizada correctamente');
    } catch (error) {
      console.error('Error al guardar ubicación:', error);
      Alert.alert('Error', 'No se pudo guardar la ubicación.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress} // <= permite mover el marcador tocando
      >
        <Marker
          coordinate={location}
          draggable // <= permite arrastrar el marcador
          onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)} // al soltarlo, actualiza coordenadas
          title="Laptop master abasolo #253"
          description="Arrastra o toca el mapa para cambiar"
        />
      </MapView>

      <TouchableOpacity style={styles.btnSave} onPress={guardarUbicacion}>
        <Text style={styles.textSave}>Guardar ubicación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  btnSave: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#3572b8',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  textSave: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VisUbication;
