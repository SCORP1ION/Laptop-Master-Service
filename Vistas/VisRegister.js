import { View, Text, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'

const VisRegister = () => {

  return (
    <KeyboardAvoidingView 
      style={styles.foundTotal}
      behavior='padding'
    >

    <View style={styles.inputContainer}>

    <TouchableOpacity>
        <Avatar 
        style={styles.foto}
        size='xlarge'
        />
    </TouchableOpacity>

      <View style={{paddingTop: 15}}>
        <TextInput style={styles.textBox}
          backgroundColor='#ffffffff' 
          placeholder='Nombre'
          placeholderTextColor='#0a0a0aff'
          fontWeight= '900'
        />
      </View>

      <View style={{paddingTop: 15}}>
      <TextInput style={[styles.textBox, styles.separado]}
        backgroundColor='#ffffffff' 
        placeholder='Nombre empresa'
        placeholderTextColor='#0a0a0aff'
        fontWeight= '900'
      />
      </View>

    <View style={{paddingTop: 15}}>
      <TextInput style={styles.textBox}
        backgroundColor='#ffffffff' 
        placeholder='Correo'
        placeholderTextColor='#0a0a0aff'
        fontWeight= '900'
      />
    </View>

    <View style={{paddingTop: 15}}>
      <TextInput style={styles.textBox}
        backgroundColor='#ffffffff' 
        placeholder='Contraseña'
        placeholderTextColor='#0a0a0aff'
        fontWeight= '900'
      />
    </View>

    <View style={{paddingTop: 15}}>
      <TextInput style={styles.textBox}
        backgroundColor='#ffffffff' 
        placeholder='Confirmar contraseña'
        placeholderTextColor='#0a0a0aff'
        fontWeight= '900'
      />
    </View>

      </View>
        <TouchableOpacity style={styles.buttomRegister}>
        <Text style={styles.textRegister}>Crear cuenta</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
    
  )
}

export default VisRegister

const styles = StyleSheet.create({

  foundTotal:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  inputContainer:{
    backgroundColor: '#F3F3F3',
    borderRadius: 30,
    width: 350,
    height: 600,
    padding: 15
  },

  foto:{
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 90,
    borderColor: '#5312ebf6',
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
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

  buttomRegister:{
    backgroundColor: '#5B40F2',
    width: 320,
    height: 50,
    borderRadius: 16,
    marginTop: 16
  },

  textRegister:{
    alignSelf: 'center',
    padding: 15,
    fontWeight: '900',
    color: '#ffffffff',
    fontSize: 16
  },


})

