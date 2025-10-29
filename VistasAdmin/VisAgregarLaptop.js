import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, TextInput, Platform, Image } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';


const VisAgregarLaptop = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', padding: insets.top, marginBottom: insets.bottom }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ayuda a que no tape el formulario con la propiedad platform.os y hace una comparativa si es un disposivo android o ios
    >
      <TouchableOpacity style={styles.contenedor} onPress={() => navigation.goBack()}>
        <Image style={styles.flechaIzquierda} source={require('../assets/icons/flecha-izquierda.png')}></Image>
        <Text style={{ marginLeft: 8, fontWeight: 700 }}>regresar</Text>
      </TouchableOpacity>

      <ScrollView style={styles.inputContainer}> {/* usamos ScrollView contenedor desplazante para que el usuario pueda ver el contenido*/}
        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={styles.textBox}
            backgroundColor='#ffffffff'
            placeholder='Modelo'
            placeholderTextColor={'#0a0a0aff'}
            // value={perfil?.perNombre}
            fontWeight='900'
            onChangeText={(valor) => InsertarValor('perNombre', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={[styles.textBox, styles.separado]}
            backgroundColor='#ffffffff'
            placeholder='RAM'
            placeholderTextColor='#0a0a0aff'
            // value={perfil?.perEmpresa}
            fontWeight='900'
            onChangeText={(valor) => InsertarValor('perEmpresa', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={[styles.textBox, styles.separado]}
            backgroundColor='#ffffffff'
            placeholder='Sistema operativo'
            placeholderTextColor='#0a0a0aff'
            // value={perfil?.perDireccion}
            fontWeight='900'
            onChangeText={(valor) => InsertarValor('perDireccion', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={[styles.textBox, styles.separado]}
            backgroundColor='#ffffffff'
            placeholder='Procesador'
            placeholderTextColor='#0a0a0aff'
            // value={perfil?.perTel}
            fontWeight='900'
            onChangeText={(valor) => InsertarValor('perTel', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={styles.textBox}
            backgroundColor='#ffffffff'
            placeholder='¿Incluye graficos?'
            placeholderTextColor='#0a0a0aff'
            // value={perfil?.perEmail}
            fontWeight='900'
            onChangeText={(valor) => InsertarValor('perEmail', valor)}
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput
            style={styles.textBox}
            backgroundColor='#ffffffff'
            placeholder='Disco duro'
            placeholderTextColor='#0a0a0aff'
            fontWeight='900'
            // value={perfil?.contraseña}
            onChangeText={(valor) => InsertarValor("contraseña", valor)}
            secureTextEntry
          />
        </View>

        <View style={{ paddingTop: 15 }}>
          <TextInput style={styles.textBox}
            backgroundColor='#ffffffff'
            placeholder='Precio'
            keyboardType='numeric'
            placeholderTextColor='#0a0a0aff'
            fontWeight='900'
            // value={perfil?.confirContraseña}
            onChangeText={(valor) => InsertarValor("confirContraseña", valor)}
            secureTextEntry
          />
        </View>

      </ScrollView>
      <TouchableOpacity style={styles.buttomRegister}>
        <Text style={styles.textRegister}>Publicar laptop</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView >

  )
}

export default VisAgregarLaptop

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#F3F3F3',
    borderRadius: 30,
    width: 350,
    padding: 15,
    flexGrow: 1
  },

  flechaIzquierda: {
    height: 16,
    width: 15,
    marginLeft: 5,
  },


  foto: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 90,
    borderColor: '#5312ebf6',
    backgroundColor: '#D9D9D9',
    alignSelf: 'center',
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

  buttomRegister: {
    backgroundColor: '#5B40F2',
    width: 320,
    height: 50,
    borderRadius: 16,
    marginTop: 16,
  },

  textRegister: {
    alignSelf: 'center',
    padding: 15,
    fontWeight: '900',
    color: '#ffffffff',
    fontSize: 16
  },

  contenedor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    marginTop: 9
  }
})