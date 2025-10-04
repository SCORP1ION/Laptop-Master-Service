import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'

const VisVerLap = () => {
  return (
    <ScrollView>
      <View style={{ alignItems: 'center', flex: 1, flexDirection: 'column' }}>
        <View style={{paddingTop: 15, alignSelf: 'center'}}>
          <Avatar rounded title='Laptop'
            size='large'
            source={{ uri: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          />
          <Text style={styles.texto}>Laptop Acer</Text>
          <Text style={styles.texto}>Memoria: 16GB</Text>
          <Text style={styles.texto}>Procesador: Core i5 8Va generacion</Text>
          <Text style={styles.texto}>Memoria: 16GB</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default VisVerLap

const styles = StyleSheet.create({
  texto: {
    textAlign: 'justify'
  }
})