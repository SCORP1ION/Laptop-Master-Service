import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, ListItem } from 'react-native-elements'
import conexion, { auth } from '../Acceso/Firebase'
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const VisPerfil = (props) => {

  useFocusEffect(
    useCallback(() => {
      consultaPerfil();
    }, [])
  );

  const [perfil, setPerfil] = useState([])

  const consultaPerfil = async () => {
    try {
      const Datos = [];
      await conexion.collection('tblPerfil').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const {
            perNombre,
            perEmpresa,
            perDireccion,
            perTel
          } = doc.data();
          Datos.push({
            id: doc.id,
            perNombre,
            perEmpresa,
            perDireccion,
            perTel
          });
        })
        setPerfil(Datos);
      })
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    consultaPerfil();
  }, [])

  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.contenedor}>
      <Text style={{alignItems: 'center',
    alignSelf: 'center',
    fontWeight: '700',
    margin: 15,
    paddingRight: 15, padding: insets.top}}>Perfil</Text>
      {
        perfil.map((perfil) => {
          return(
          <View key={perfil.id}
          style={styles.titulo}
            bottomDivider
            onPress={() => props.navigation.navigate('VisConfPerfil', {
              parId: perfil.id,
              parNomre: perfil.perNombre,
              parEmpresa: perfil.perEmpresa,
              parDireccion: perfil.perDireccion,
              parTel: perfil.perTel
            }
            )}
          >
            <ListItem.Chevron />
            <Avatar // Foto de perfil
              style={styles.foto}
              rounded title='Perfil'
              size='xlarge'
              source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            />

            <ListItem.Content style={styles.texto}>
              <ListItem.Title >{perfil.perNombre}</ListItem.Title>
              <ListItem.Subtitle>{perfil.perEmpresa}</ListItem.Subtitle>
              <ListItem.Subtitle>{perfil.perDireccion}</ListItem.Subtitle>
              <ListItem.Subtitle>{perfil.perTel}</ListItem.Subtitle>
            </ListItem.Content>

            <TouchableOpacity style={{ backgroundColor: '#87d0f0', borderRadius: 20, height: 40, justifyContent: 'center', padding: 10 }}
              onPress={() => props.navigation.navigate('ViConf')}
            >
              <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>Cambiar perfil</Text>
            </TouchableOpacity>

          </View>
          )
        })

      }
    </ScrollView>
  )
}

export default VisPerfil

const styles = StyleSheet.create({
  contenedor: {
    alignSelf: 'center',
    paddingRight: 'auto'
  },

  // titulo: {
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   fontWeight: '700',
  //   margin: 15,
  //   paddingRight: 15
  // },
  
  texto: {
    fontSize: 15,
    fontWeight: '900',
    alignItems: 'center'
  },

  foto: {
    width: 150,
    height: 150,
    alignSelf: 'center'
  }

})