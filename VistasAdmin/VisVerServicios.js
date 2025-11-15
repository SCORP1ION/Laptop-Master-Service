import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import conexion from '../Acceso/Firebase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const VisServicios = () => {
  const [servicios, setServicios] = useState([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

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
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DetalleServicio", { serId: item.id })}>
      <Text style={styles.title}>Problema: {item.serProblema}</Text>
      <Text>Horario: {item.serHorario}</Text>
      <Text>Teléfono: {item.serNumber}</Text>
      <Text>Comentario: {item.serComment}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.header}>Lista de servicios</Text>
      {
        servicios.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20, fontSize: '16', fontWeight: '900' }}>!Yuuuju no hay servicios pendientes!</Text>
        ) : (
          <FlatList
            data={servicios}
            keyExtractor={(item) => item.id}
            renderItem={renderServicio}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )
      }
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
