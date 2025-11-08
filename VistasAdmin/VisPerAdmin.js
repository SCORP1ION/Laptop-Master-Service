import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, ListItem } from 'react-native-elements'
import conexion, { auth } from '../Acceso/Firebase'
import { useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const VisPerAdmin = () => {

  useFocusEffect(
    useCallback(() => {
      consultaPerfil();
    }, [])
  );

  const [perfil, setPerfil] = useState([])
  const navigation = useNavigation();

  const consultaPerfil = async () => {
    try {
      const user = auth.currentUser;
      if(!user){
        Alert.alert("Error", "Usuario no encontrado")
        return
      }
      const doc = await conexion.collection('tblAdministrador').doc(user?.uid).get();
      if(doc.exists){
        const data = doc.data();
        setPerfil([{
          uid: user.uid,
          id: doc.id,
          perNombre: data.perNombre,
          perEmpresa: data.perEmpresa,
          perDireccion: data.perDireccion,
          perEmail: data.perEmail,
          perTel: data.perTel,
          imgPerfil: data.imgPerfil || null
        }])
      }else{
        Alert.alert("Error", "No se encontro perfil de este usuario")
      }

    } catch (err) {
      console.error("Error al consultar",err)
    }
  }

  // Creacion de constante asincrona que espera el llamado de la salida
  const logout = async () => {
    try {
      await auth.signOut() // signOut funcion que cierre sesion con el auth de firebase.
      navigation.replace('VLogin'); // Con el replace, lo mandamos el login.
    } catch (err) {
      console.error("Error al cerrar sesion", err)
    }
  };

  useEffect(() => {
    consultaPerfil();
  }, [])

  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', paddingTop: insets.top }}>
      <Text style={{ fontSize: 18, fontWeight: 700, padding: 15, alignSelf: 'center' }}>Perfil</Text>
      <View style={styles.container}>
        {
          perfil.map((perfil) => {
            return (
              <View key={perfil.id}
                style={styles.titulo}
                bottomDivider
                onPress={() => navigation.navigate('ConfiPerfil', {
                  parId: perfil.id,
                  parNomre: perfil.perNombre,
                  parEmpresa: perfil.perEmpresa,
                  parDireccion: perfil.perDireccion,
                  perEmail: perfil.perEmail,
                  parTel: perfil.perTel
                }
                )}
              >
                <ListItem.Chevron />
                <Avatar // Foto de perfil
                  style={styles.foto}
                  size='xlarge'
                  rounded
                  source={
                    perfil?.imgPerfil
                      ? { uri: perfil.imgPerfil }
                      : require('../assets/icons/user-temporal.png')
                  } />
                <View style={{ paddingTop: 10 }}>
                  <Text style={styles.textPer}>{perfil.perNombre}</Text>
                  <Text style={styles.textPer}>{perfil.perEmpresa}</Text>
                  <Text style={styles.textPer}>{perfil.perDireccion}</Text>
                  <Text style={styles.textPer}>{perfil.perEmail}</Text>
                  <Text style={styles.textPer}>{perfil.perTel}</Text>
                </View>
                <TouchableOpacity style={styles.buttonChange}
                  onPress={() => navigation.navigate('ConfiPerfil')}
                >
                  <Text style={styles.textChange}>Cambiar perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeSesion} onPress={() => logout()}>
                  <Text style={styles.textChange}>Cerrar sesion</Text>
                </TouchableOpacity>

              </View>
            )
          })
        }
      </View>
    </KeyboardAvoidingView>
  )
}

export default VisPerAdmin

const styles = StyleSheet.create({

  foto: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 90,
    borderColor: '#5312ebf6',
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
  },

  container: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#F3F3F3',
    width: 350,
    height: 480,
    padding: 15,
    borderRadius: 30
  },

  textPer: {
    padding: 10,
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: 'bold'
  },

  buttonChange: {
    backgroundColor: '#5B40F2',
    borderRadius: 20,
    height: 40,
    padding: 10
  },

  textChange: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 900,
    color: 'white'
  },

  closeSesion: {
    backgroundColor: '#ff0000ff',
    borderRadius: 20,
    height: 40,
    padding: 10,
    marginTop: 10,
  }
})