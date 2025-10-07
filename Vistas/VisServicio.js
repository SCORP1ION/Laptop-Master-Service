import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'

const VisServicio = () => {

  const confirmarServicio = () => {
    Alert.alert('Nota', 'Nota: La visita del servicio tendra un costo de $350 + revicion, instalcion o solucion de un problema', 
      [
      { text: 'Confirmar', onPress: () => Alert.alert('Confirmado','Servicio confirmado') },
      { text: 'Cancelar', onPress: () => Alert.alert('Cancelado','Servicio cancelado') }
      ]
    )
  }


  return (
    <KeyboardAvoidingView style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF',}} behavior='padding'>
      <Text style={{fontSize: 18, fontWeight:700, padding: 15, alignSelf: 'center'}}>Formulario para servicio</Text>
      <View style={styles.conteiner}>

        <View style={{padding: 15}}>
          <TextInput style={styles.textBox} 
          placeholder='¿Cual es el problema?' 
          placeholderTextColor={'#0a0a0aff'}
          fontWeight='900'
          backgroundColor='#ffffffff'
          />
        </View>

        <View style={{padding: 15}}>
          <TextInput style={styles.textBox} 
          placeholder='¿En que horario podemos encontrarlo?' 
          placeholderTextColor={'#0a0a0aff'}
          fontWeight='900'
          backgroundColor='#ffffffff'
          />
        </View>

        <View style={{padding: 15}}>
          <TextInput style={styles.textBox} 
          placeholder='¿Desea agregar otro numero de telefono?' 
          placeholderTextColor={'#0a0a0aff'}
          fontWeight='900'
          backgroundColor='#ffffffff'
          />
        </View>
        
        <View style={{padding: 15}}>
          <TextInput style={styles.textBox} 
          placeholder="Comentario opcional"
          placeholderTextColor={'#0a0a0aff'}
          fontWeight='900'
          backgroundColor='#ffffffff'
          />
        </View>

      </View> 
      <View style={{ width: '90%', paddingTop: 15}}>
        <TouchableOpacity 
          onPress = {() => confirmarServicio()}
          style={styles.bottomSave}
          >
          <Text style={styles.textService}>confirmar servicio</Text>
        </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
  )
}

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

  textBox:{
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