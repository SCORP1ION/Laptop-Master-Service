import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import conexion from '../Acceso/Firebase';

const VisServicios = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    verServicios();
  }, []);

  const verServicios = async () => {
    try {
      const Datos = [];
      const querySnapshot = await conexion.collection('tblServicio').get(); // creacion de variable con una promesa que trae las tablas y los lee
      querySnapshot.forEach((doc) => {
        const {
          serProblema,
          serNumber,
          serHorario,
          serComment,
          userId
        } = doc.data();
        Datos.push({
          id: doc.id,
          serProblema,
          serNumber,
          serHorario,
          serComment,
          userId,
        });
      });

      setServicios(Datos);
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Error", "No se pudieron cargar los servicios");
    }
  };

  const renderServicio = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Problema: {item.serProblema}</Text>
      <Text>Horario: {item.serHorario}</Text>
      <Text>Teléfono: {item.serNumber}</Text>
      <Text>Comentario: {item.serComment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de servicios</Text>
      <FlatList
        data={servicios}
        keyExtractor={(item) => item.id}
        renderItem={renderServicio}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default VisServicios;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    color: '#222feeff',
  },
  card: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
});
