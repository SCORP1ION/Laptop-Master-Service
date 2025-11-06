import { StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import { useRoute, useNavigation } from '@react-navigation/native'
import conexion, { auth } from '../Acceso/Firebase'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const VisConfPerfil = () => {

  const route = useRoute();
  const navigation = useNavigation();
  const [perfil, setPerfil] = useState(null);
  const user = auth.currentUser; // <= variable user que revisa si el usuario existe
  useEffect(() => {
    obtenerPerfilPorId();
  }, []);

  const actualizar = (campo, valor) => {
    setPerfil({ ...perfil, [campo]: valor });
  };

  const obtenerPerfilPorId = async () => {

    try {
      const perDescripcion = await conexion.collection('tblPerfil').doc(user.uid).get();
      if (perDescripcion.exists) { // en caso de que exista
        setPerfil(perDescripcion.data());
      }
    } catch (error) {
      console.error("Usuario no encontrado", error);
    }
  };

  const modificarPerfil = async () => {
    if (perfil.perNombre === '' || perfil.perEmpresa === '' || perfil.perDireccion === '' || perfil.perTel === '') {
      Alert.alert("Error", "Todos los campos son requeridos");
      return;
    }

    try {
      await conexion.collection('tblPerfil').doc(user.uid).update({
        perNombre: perfil.perNombre,
        perEmpresa: perfil.perEmpresa,
        perDireccion: perfil.perDireccion,
        perTel: perfil.perTel
      });

      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      navigation.goBack(); // o navigation.navigate('VisPerfil')

    } catch (err) {
      Alert.alert("Error al modificar", err.message);
    }
  };

  const cambiarFoto = () => {
    Alert.alert('Foto', 'Cambiar foto de perfil');
  };

  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', paddingTop: insets.top }}>
      <TouchableOpacity style={styles.contenedorFecha} onPress={() => navigation.goBack()}>
        <Image style={styles.flechaIzquierda} source={require('../assets/icons/flecha-izquierda.png')}></Image>
        <Text style={{ marginLeft: 8, fontWeight: 700 }}>regresar</Text>
      </TouchableOpacity>
      <View style={styles.contenedor}>
        <Text style={styles.textPerfil}>Cambiar perfil</Text>
        <TouchableOpacity onPress={cambiarFoto}>
          <Avatar
            style={styles.foto}
            size='xlarge'
            rounded
            source={{ uri: 'https://i.pravatar.cc/300' }}
          />
        </TouchableOpacity>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={styles.textBox}
            placeholder='Nombre'
            value={perfil?.perNombre}
            onChangeText={(valor) => actualizar('perNombre', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={styles.textBox}
            placeholder='Empresa'
            value={perfil?.perEmpresa}
            onChangeText={(valor) => actualizar('perEmpresa', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={styles.textBox}
            placeholder='Dirección'
            value={perfil?.perDireccion}
            onChangeText={(valor) => actualizar('perDireccion', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={styles.textBox}
            placeholder='Teléfono'
            keyboardType='numeric'
            value={perfil?.perTel}
            onChangeText={(valor) => actualizar('perTel', valor)}
          />
        </View>

        <TouchableOpacity style={styles.guardar} onPress={modificarPerfil}>
          <Text style={{ textAlign: 'center', fontWeight: 700, fontSize: 18 }}>Guardar cambios</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
};


export default VisConfPerfil

const styles = StyleSheet.create({

  textPerfil: {
    fontSize: 18,
    fontWeight: 700,
    padding: 15,
  },

  contenedor: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#F3F3F3',
    width: 330,
    height: 420,
    borderRadius: 30,
    flex: 1
  },

  guardar: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    margin: 20,
    padding: 15
  },

  foto: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: 15
  },
  contenedorFecha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    marginTop: 9
  },

  flechaIzquierda: {
    height: 16,
    width: 15,
    marginLeft: 5,
  },
})