import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const VisUbicacion = () => {
  return (
    <View>
      <Text style={styles.texto}>Nos puedes encontrar en:</Text>
    </View>
  )
}

export default VisUbicacion

const styles = StyleSheet.create({
  texto:{
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
    paddingTop: 30,
  }
})