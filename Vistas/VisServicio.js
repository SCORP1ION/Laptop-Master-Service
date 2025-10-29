import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import conexion, { auth } from '../Acceso/Firebase';

const VisServicio = () => {
  const [service, setService] = useState({
    serProblema: '',
    serHorario: '',
    serNumber: '',
    serComment: ''
  });

  const insets = useSafeAreaInsets();

  const ingresarServicio = async () => {
    if (!service.serProblema || !service.serHorario || !service.serNumber || !service.serComment) {
      Alert.alert("Error", "Favor de completar el formulario");
      return;
    }
    try {
      const user = auth.currentUser;
      if(!user){
        Alert.alert("Error", "Usuario no encontrado")
        return
      }
      await conexion.collection('tblServicio').add({
        serProblema: service.serProblema,
        serHorario: service.serHorario,
        serNumber: service.serNumber,
        serComment: service.serComment,
        userId: user.uid,
        fecha: new Date()
      });
      Alert.alert("Exitoso", "Servicio enviado");
      setService({
        serProblema: '',
        serHorario: '',
        serNumber: '',
        serComment: ''
      });
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Error", "No se pudo enviar el servicio");
    }
  };

  const confirmarServicio = () => {
    Alert.alert(
      'Nota',
      'La visita del servicio tendrá un costo de $350 + revisión, instalación o solución de un problema',
      [
        { text: 'Confirmar', onPress: () => ingresarServicio() },
        { text: 'Cancelar', onPress: () => Alert.alert('Cancelado', 'Servicio cancelado') }
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', paddingTop: insets.top }}
      behavior='padding'
    >
      <Text style={{ fontSize: 18, fontWeight: '700', padding: 15, alignSelf: 'center' }}>
        Formulario para servicio
      </Text>

      <View style={styles.container}>
        <View style={{ padding: 15 }}>
          <TextInput
            style={styles.textBox}
            placeholder='¿Cuál es el problema?'
            fontWeight = {900} 
            placeholderTextColor='#0a0a0aff'
            value={service.serProblema}
            onChangeText={(text) => setService({ ...service, serProblema: text })}
          />
        </View>

        <View style={{ padding: 15 }}>
          <TextInput
            style={styles.textBox}
            placeholder='¿En qué horario podemos encontrarlo?'
            placeholderTextColor='#0a0a0aff'
            fontWeight = {900} 
            value={service.serHorario}
            onChangeText={(text) => setService({ ...service, serHorario: text })}
          />
        </View>

        <View style={{ padding: 15 }}>
          <TextInput
            style={styles.textBox}
            placeholder='¿Desea agregar otro número de teléfono?'
            keyboardType='numeric'
            fontWeight = {900}
            placeholderTextColor='#0a0a0aff'
            value={service.serNumber}
            onChangeText={(text) => setService({ ...service, serNumber: text })}
          />
        </View>

        <View style={{ padding: 15 }}>
          <TextInput
            style={styles.textBox}
            placeholder="Comentario opcional"
            fontWeight = {900} 
            placeholderTextColor='#0a0a0aff'
            value={service.serComment}
            onChangeText={(text) => setService({ ...service, serComment: text })}
          />
        </View>
      </View>

      <View style={{ width: '90%', paddingTop: 15 }}>
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
    height: 480,
    padding: 15,
    borderRadius: 30
  },

  textBox: {
    height: 60,
    alignSelf: 'center',
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
  }

})