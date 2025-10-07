import { StyleSheet, Text, View,  TouchableOpacity, Image, } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import VisVerLap from './VisVerLap'


const VisLaptops = (props) => {

  const Stack = createStackNavigator();

  return (
    <View style={styles.conatainer}>

      <TouchableOpacity style={styles.laptops} onPress={() => route("VisVerLap")}>
        <Image source={require('../images/imaLaptops/LaptopAcer.png')} style={styles.picture}></Image>
         <View style={{paddingTop: 13}}>
          <Text style={styles.textCharacteristics}>Acer Aspire 1.14 pulgadas</Text>
          <Text style={styles.textCharacteristics}>Intel Celeron N4020</Text>
          <Text style={styles.textCharacteristics}>Windows 10 pro</Text>
         </View>
      </TouchableOpacity>

    </View>
  )
}

export default VisLaptops

const styles = StyleSheet.create({
  conatainer: {
    padding: 15
  },

  laptops:{
    borderWidth: 1,
    width: 350,
    height: 120,
    alignSelf: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#8da1ffff',
    padding: 2
  },

  pictureLaptop: {
    borderWidth: 1,
    width: 20,
    height: 20,
  },
  
  picture:{
    width: 100, 
    height: 100,
  },
  
  textCharacteristics: {
    fontWeight: 700,
    color: '#ffffffff',
    paddingLeft: 0,
    paddingTop: 8,
    width: 200
  }

})