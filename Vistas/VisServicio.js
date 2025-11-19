import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import conexion, { auth } from '../Acceso/Firebase';
import { color } from 'react-native-elements/dist/helpers';

const VisServicio = () => {
  const [service, setService] = useState({
    serEquipo: '',
    serProblema: '',
    serHorario: '',
    serOpcion: '',
    serSolucion: ''
  });

  const insets = useSafeAreaInsets();

  const ingresarServicio = async () => {
    if (!service.serProblema || !service.serHorario || !service.serOpcion || !service.serSolucion || !service.serEquipo) {
      Alert.alert("Error", "Favor de completar el formulario");
      return;
    }
    try {
      const user = auth.currentUser;
      if(!user){
        Alert.alert("Error", "Usuario no encontrado")
        return
      }
      const serRefence = await conexion.collection('tblServicio').add({
        serEquipo: service.serEquipo,
        serProblema: service.serProblema,
        serHorario: service.serHorario,
        serOpcion: service.serOpcion,
        serSolucion: service.serSolucion,
        userId: user.uid,
        fecha: new Date()
      });
      await conexion.collection('tblServicio').doc(serRefence.id).update({
        serId: serRefence.id
      })
     // console.log("Nuevo servivio",serRefence)
      Alert.alert("Exitoso", "Servicio enviado");
      setService({
        serEquipo: '',
        serProblema: '',
        serHorario: '',
        serOpcion: '',
        serSolucion: ''
      });
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Error", "No se pudo enviar el servicio");
    }
  };

  const confirmarServicio = () => {
    Alert.alert(
      'Nota',
      'La visita del servicio tendrá un costo de $650 + revisión, instalación o solución de un problema',
      [
        { text: 'Confirmar', onPress: () => ingresarServicio() },
        { text: 'Cancelar', onPress: () => Alert.alert('Cancelado', 'Servicio cancelado') }
      ]
    );
  };
let textcolor
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', paddingTop: insets.top }}
      behavior='padding'
    >
      <Text style={{ fontSize: 18, fontWeight: '700', padding: 15, alignSelf: 'center' }}>
        Detalles del servicio
      </Text>

      <View style={styles.conteiner}>
        <View style={{ padding: 15 }}>
          <Text style={styles.textPregunta}>¿Qué tipo de quipos presenta al falla?</Text>
          <TextInput
            style={styles.textBox}
            placeholder='Ej: computadora, impresora, router, etc.'
            fontWeight = {700} 
            placeholderTextColor={'#0a0a0aff'}
            value={service.serEquipo}
            onChangeText={(text) => setService({ ...service, serEquipo: text })}
          />
        </View>

        <View style={{ padding: 15 }}>
          <Text style={styles.textPregunta}>Descripción breve del problema</Text>
          <TextInput
            style={styles.textBox}
            placeholder='Describe brevemente qué sucede con el equipo'
            placeholderTextColor='#0a0a0aff'
            fontWeight = {700} 
            value={service.serProblema}
            onChangeText={(text) => setService({ ...service, serProblema: text })}
          />
        </View>

        <View style={{ padding: 15 }}>
          <Text style={styles.textPregunta}>¿El problema es constante o intermitente?</Text>
          <TextInput
            style={styles.textBox}
            placeholder='constante o intermitente'
            fontWeight = {700}
            placeholderTextColor='#0a0a0aff'
            value={service.serOpcion}
            onChangeText={(text) => setService({ ...service, serOpcion: text })}
          />
        </View>

        <View style={{ padding: 15 }}>
          <Text style={styles.textPregunta}>¿Intentaste algo antes del problema?</Text>
          <TextInput
            style={styles.textBox}
            placeholder="Si intentaste algo, ¿Que hiciste?"
            fontWeight = {700}
            placeholderTextColor='#0a0a0aff'
            value={service.serSolucion}
            onChangeText={(text) => setService({ ...service, serSolucion: text })}
          />
        </View>
      </View>

      <View style={{ width: '90%', paddingTop: 15, paddingBottom: insets.bottom}}>
        <TouchableOpacity
          onPress={confirmarServicio}
          style={styles.bottomSave}
        >
          <Text style={styles.textService}>Confirmar servicio</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VisServicio

const styles = StyleSheet.create({
  conteiner: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#F3F3F3',
    width: 350,
    height: 540,
    padding: 15,
    borderRadius: 30
  },

  textBox: {
    backgroundColor: '#ffffffff',
    height: 60,
    borderWidth: 2,
    width: 320,
    textAlign: 'center',
    marginTop: 15,
    borderRadius: 15,
  },

  bottomSave: {
    backgroundColor: '#5B40F2',
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    padding: 10,
    width: 330,
    alignSelf: 'center',
  },

  textService: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 18,
    color: 'white'
  },
  textPregunta:{
    fontSize: 15
  }

})