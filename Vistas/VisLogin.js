import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../Acceso/Firebase'
import { Fontisto } from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native'

const VisLogin = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate("VMenu")
      }
    }) 

    return unsubscribe
  }, [])

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleGoogleSigingIn = () => {
    const config = {
      webClientId: '777378638584-betf6kva5smtn1tur9cubf7dmi5iun85.apps.googleusercontent.com',
    };
    Google
      .logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        console.log(error)
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          setTimeout(() => props.navigate('VMenu', { email, name, photoUrl }), 1000)
          handleMessage('Google signing success', 'success')
          navigation.replace("VMenu")
        } else {
          handleMessage('Google siging canceled', 'prueba')
        }
        setGoogleSubmitting(false);

      })
      .catch(error => {
        console.log(error)
        handleMessage('A ocurrudo un error, verificar su red e intentar nuevamente ', 'prueba')
        setGoogleSubmitting(false);

      })

    const handleMessage = (message, type = 'failed') => {
      setMessage(message);
      setMessageType(type);
    };

  }

  return (
    <KeyboardAvoidingView
      style={styles.contenedor}
      behavior="padding"
    >
      <View style={{height: 230}}>
        <ImageBackground source={(require ('../images/logo.png'))} style={styles.imagen}></ImageBackground>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          placeholderTextColor='#949191ff'
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Contraseña'
          placeholderTextColor='#949191ff'
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonTexto}>Login</Text>
        </TouchableOpacity> 

        <Text style={{fontWeight: 900, fontSize: 20, paddingTop: 7}}>Ó</Text>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("ViRegis")}
          style={[styles.buttonOutline, styles.button]}
        >
          <Text style={styles.buttonOutlineText}>Registrarse</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  )
}

export default VisLogin

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  inputContainer: {
    width: '80%',
  },

  imagen: {
    height: 200,
    width: 200
  },

  input: {
    backgroundColor: '#ffffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: '#f5eded63',
    borderWidth: 2,
  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#5B40F2',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#5B40F2',
    borderWidth: 2,
  },

  buttonTexto: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  buttonOutlineText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})

