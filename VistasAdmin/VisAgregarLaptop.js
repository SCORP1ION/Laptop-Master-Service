import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';


const VisAgregarLaptop = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View style={{margin: insets.top}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Regresar</Text>
      </TouchableOpacity>
      <Text>VisAgregarLaptop</Text>
    </View>
  )
}

export default VisAgregarLaptop

const styles = StyleSheet.create({})