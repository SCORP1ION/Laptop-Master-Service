import { StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity, Alert, alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'

const VisConfPerfil = (props) => {

  const [perfil, setPerfil] = useState({
    perNombre: '',
    perEmpresa: '',
    perDireccion: '',
    perTel: ''
  })

  useEffect( ()=> {
    obtenerPerfilPorId(props.route.params.parId)
    setPerfil(props.route.params.parNombre)
  }, [props])

  const actualizar = (campo, valor) => {
    setPerfil({ ...perfil, [campo]: valor })
  }

  const obtenerPerfilPorId = async (Id) => {
    try {
      await conexion.collection('tblPerfil').doc(Id).get().then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setAlumno({
            perNombre: documentSnapshot.data().perNombre,
            perEmpresa: documentSnapshot.data().perEmpresa,
            perDireccion: documentSnapshot.data().perDireccion,
            perTel: documentSnapshot.data().perTel,
          })
        }
      })
    } catch (error) {
      alert(error.message)
    } 
  }

  const modificarPerfil = async (Id) => {
    if (perfil.perNombre === '' || perfil.perEmpresa === '' || perfil.perDireccion === '' || perfil.perTel === '') {
      Alert.alert('Favor de llenar todos los campos')
    } else {
      try {
        await conexion.collection('tblPerfil').doc(Id).update({
          perNombre: perfil.perNombre,
          perEmpresa: perfil.perDireccion,
          perDireccion: perfil.perDireccion,
          perTel: perfil.perTel
        }).then(() => {
          Alert.alert('Exito', 'Campos cambiados correctamente')
          props.navigation.navigate('ViPerfil')
        })
      } catch (err) {
        alert(err.message)
      }
    }
  }

  const cambiarFoto = () => {
    Alert.alert('Foto', 'Cambiar foto de perfil');
  }

  return (
    <ScrollView>
      <View style={styles.contenedor}>
        <TouchableOpacity
          onPress={() => cambiarFoto()}
        >
          <Avatar
            style={styles.foto}
            size='xlarge'
            rounded
            source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          />
        </TouchableOpacity>

        <View style={styles.cuadros}>
          <Text style={styles.textos}>Nombre completo</Text>
          <TextInput placeholder='Ingresa tu nombre' style={styles.input}
            value={perfil.perNombre}
            onChange={(valor) => actualizar('perNombre', valor)}
          />
        </View>

        <View style={styles.cuadros}>
          <Text style={styles.textos}>Nombre de la empresa</Text>
          <TextInput placeholder='¿Cual es el nombre de su empresa?' style={styles.input}
            value={perfil.perEmpresa}
            onChange={(valor) => actualizar('perEmpresa', valor)}
          />
        </View>

        <View style={styles.cuadros}>
          <Text style={styles.textos}>Direccion del lugar</Text>
          <TextInput placeholder='Ingrese direccion de la empresa' style={styles.input}
            value={perfil.perDireccion}
            onChange={(valor) => actualizar('perDireccion', valor)}
          />
        </View>

        <View style={styles.cuadros}>
          <Text style={styles.textos}>Numero telefonico</Text>
          <TextInput placeholder='Ingrese el numero telefonico' style={styles.input}
            value={perfil.perTel}
            onChange={(valor) => actualizar('perTel', valor)}
          />
        </View>

        <View style={styles.guardar}>
          <TouchableOpacity
            onPress={() => modificarPerfil(props.route.params.parId)}
          >
            <Text style={{ textAlign: 'center', fontWeight: 700, fontSize: 18 }}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  )
}

export default VisConfPerfil

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#d7dbdd',
    textAlign: 'center',
    borderRadius: 15,
    fontSize: 18,
    width: 350,
    padding: 5
  },

  cuadros: {
    padding: 15,
    marginTop: 'auto',
  },

  contenedor: {
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },

  textos: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#3498db',
    borderRadius: 18,
    padding: 5
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
  }
})