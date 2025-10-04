import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from 'react-native-elements'

import VisVerLap from './VisVerLap'

const VisLaptops = (props) => {
  return (
    <ScrollView>
      <View>

        <View style={styles.Fotos}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ViVerLap')}
          >
            <Avatar
              rounded title='Laptop'
              size='large'
              source={{ uri: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
              />
              <ListItem.Title>Acer</ListItem.Title>
          </TouchableOpacity>
        </View>

        <View style={styles.Fotos}>
          <TouchableOpacity>
            <Avatar
              rounded title='Laptop'
              size='large'
              source={{ uri: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            />
            <ListItem.Content>
              <ListItem.Title>Hp</ListItem.Title>
            </ListItem.Content>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  )
}

export default VisLaptops

const styles = StyleSheet.create({
  Fotos: {
    marginLeft: 20,
    marginTop: 15
  }
})