import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React from 'react'

const VisUbicacion = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{padding: insets.top}}>
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