import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native';
import conexion from '../Acceso/Firebase';
import { Avatar } from 'react-native-elements';

const VisDetallesServi = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { serId } = route.params;
  const [servicio, setServicio] = useState({})
  const [usuario, setUsuario] = useState({})
  const navigation = useNavigation();

  useEffect(() => {
    consultarServicios();
  }, []);

  const servicioHecho = async () => {
    try {
      await conexion.collection('tblServicio').doc(serId).delete().then(() => {
        Alert.alert("Servicio exitoso", "Esta hecho el trabajo")
        navigation.navigate("Menu")
      })
    } catch (error) {
      console.error("Error al eliminar", error)
    }
  }

  const confirServicioHecho = () => {
    Alert.alert("Se eliminara",
      "Si el servicio ya esta echo o atendido se eliminara",
      [
        { text: "Si", onPress: () => servicioHecho(route.serId) },
        { text: "No", onPress: () => Alert.alert("Cancelado", "Sigue en revision") }
      ]
    )
  }

  // Consulta la base datos de los servicios
  const consultarServicios = async () => {
    try {
      const verSer = await conexion.collection('tblServicio').doc(serId).get();
      if (!verSer.exists) {
        Alert.alert("Error", "No se encontro el servicio")
        return;
      }
      const datosServicio = verSer.data();
      setServicio(datosServicio);
      // consultamos el usuario
      const userRef = await conexion.collection('tblPerfil').doc(datosServicio.userId).get()
      if (userRef.exists) {
        setUsuario(userRef.data())
      } else {
        console.log("El usuario no se encontro") // <= depuramos en caso de que de un error
      }
    } catch (error) {
      console.error("Error al consultar", error)
    }
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', paddingTop: insets.top }}>
      <TouchableOpacity style={styles.contenedor} onPress={() => navigation.goBack()}>
        <Image style={styles.flechaIzquierda} source={require('../assets/icons/flecha-izquierda.png')} />
        <Text style={{ marginLeft: 8, fontWeight: '700' }}>Regresar</Text>
      </TouchableOpacity>
      <View style={{ backgroundColor: '#F3F3F3', borderRadius: 30, width: 350, padding: 15, flexGrow: 1, marginBottom: insets.bottom }}>
        {servicio && (
          <>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center', marginBottom: 12 }}>Detalles del servicio</Text>
            <Text style={styles.textos}>{servicio.serProblema}</Text>
            <Text style={styles.textos}>{servicio.serHorario}</Text>
            <Text style={styles.textos}>{servicio.serComment}</Text>
          </>
        )}
        {
          usuario && (
            <>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'center', marginBottom: 12 }}>Datos del usuario</Text>
              <Text style={styles.textos}>{usuario.perDireccion}</Text>
              <Text style={styles.textos}>{usuario.perEmpresa}</Text>
              <Text style={styles.textos}>{usuario.perTel}</Text>
              <Avatar
                style={styles.foto}
                rounded
                size='xlarge'
                source={
                  usuario?.imgPerfil
                    ? { uri: usuario.imgPerfil }
                    : require('../assets/icons/user-temporal.png')
                }
              />


            </>
          )}
      </View>
      <TouchableOpacity style={[styles.btnService, { marginBottom: insets.bottom }]} onPress={confirServicioHecho}>
        <Text style={styles.textService}>Servicio hecho</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView >
  )
}

export default VisDetallesServi

const styles = StyleSheet.create({
  titulo: {
    fontWeight: '900',
    fontSize: 18,
    justifyContent: 'center',
    flex: 1
  },
  datosText: {
    fontSize: 16,
    fontWeight: '700',
    paddingBottom: 13,
    alignSelf: 'center'
  },
  boxData: {
    borderWidth: 1,
    flex: 1,
    padding: 13,
    height: 50
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
  textos: {
    fontSize: 15,
    alignSelf: 'center',
    paddingBottom: 13,
    fontWeight: '500'
  },
  textService: {
    alignSelf: 'center',
    padding: 15,
    fontWeight: '900',
    color: '#ffffffff',
    fontSize: 16
  },
  btnService: {
    backgroundColor: '#5B40F2',
    width: 320,
    height: 50,
    borderRadius: 16,
    marginTop: 16,
  },
  foto: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 90,
    borderColor: '#5312ebf6',
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
  }
})