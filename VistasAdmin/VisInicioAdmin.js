import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import VisVerServicios from './VisVerServicios';
import VisAltaLaptops from './VisAltaLaptops';
import VisAgregarLaptop from './VisAgregarLaptop';
import VisPerAdmin from './VisPerAdmin';
import VisVerLaptop from './VisVerLaptop';

const Tabs = createBottomTabNavigator();
const Stacks = createStackNavigator();

const iconos = {
  Nuevoservicio: {
    activo: require("../assets/icons/calendario-morado.png"),
    inactive: require("../assets/icons/calendario-gris.png")
  },
 Laptops: {
    activo: require("../assets/icons/venta-morado.png"),
    inactive: require("../assets/icons/venta-gris.png")
  },
  // Ubicacion: {
  //   activo: require("../assets/icons/mapa-morado.png"),
  //   inactive: require("../assets/icons/mapa-gris.png")
  // },
  Perfil: {
    activo: require("../assets/icons/usuario-morado.png"),
    inactive: require("../assets/icons/usuario-gris.png")
  }
};

function Menu() {
  return(
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ focused }) => (
          <Text 
            style={{
              fontSize: 16,
              fontWeight: 600,
              fontFamily: 'Georgia',
              color: focused ? '#222feeff' : '#727272ff'
            }}
          >
            {route.name}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Image
            source={focused ? iconos[route.name].activo : iconos[route.name].inactive}
            style={{width: 24, height: 24}}
          />
        )
      }
    )}
    >
      <Tabs.Screen name='Nuevoservicio' component={VisVerServicios}/>
      <Tabs.Screen name='Laptops' component={VisAltaLaptops}/>
      <Tabs.Screen name='Perfil' component={VisPerAdmin}/>
    </Tabs.Navigator>
  )

}


const VisInicioAdmin = () => {
  return (
    <Stacks.Navigator screenOptions={{headerShown: false}}>
      <Stacks.Screen name='Menu' component={Menu}/>
      <Stacks.Screen name='AgregarLaptop' component={VisAgregarLaptop}/>
      <Stacks.Screen name='ViVerlaptop' component={VisVerLaptop}/>
    </Stacks.Navigator>
  )
}

export default VisInicioAdmin

const styles = StyleSheet.create({})