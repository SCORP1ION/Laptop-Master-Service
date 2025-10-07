import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image } from 'react-native';
import React from 'react';

import VisServicio from './VisServicio';
import VisLaptops from './VisLaptops';
import VisUbicacion from './VisUbicacion';
import VisPerfil from './VisPerfil';

import { Icon } from 'react-native-elements';



const Tab = createBottomTabNavigator();

const icons = {
  Servicio: {
    active: require("../assets/icons/calendario-morado.png"),
    inactive: require("../assets/icons/calendario-gris.png")
  },
  Venta: {
    active: require("../assets/icons/venta-morado.png"),
    inactive: require("../assets/icons/venta-gris.png")
  },
  Ubicacion: {
    active: require("../assets/icons/mapa-morado.png"),
    inactive: require("../assets/icons/mapa-gris.png")
  },
  Perfil: {
    active: require("../assets/icons/usuario-morado.png"),
    inactive: require("../assets/icons/usuario-gris.png")
  }
}

const VisInicio = () => {
  
  return (
    <View style={styles.contenedor}>
      <Tab.Navigator
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
          tabBarIcon: ({ focused}) =>(
            <Image
              source={
                focused ? icons[route.name].active : icons[route.name].inactive
              }
              style={{width: 24, height: 24}}
            />
            ),
        })}
      >
        <Tab.Screen name="Servicio" component={VisServicio} />
        <Tab.Screen name="Venta" component={VisLaptops} />
        <Tab.Screen name="Ubicacion" component={VisUbicacion} />
        <Tab.Screen name="Perfil" component={VisPerfil} />
      </Tab.Navigator>
    </View>
  );
}

export default VisInicio

const styles = StyleSheet.create({

  contenedor:{
    width: '100%',
    height: '100%',
    flex: 1

  },

  imagen:{
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
    height: 200,
    margin: 15,
  },

  Texto: {
    padding: 20,
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold'
  },

  logo: {
    width: 90,
    height: 30
  },

  WelcomeUser: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },

  footerMajor:{
    flex: 1
  },

  footerViews:{
    width: 375,
    height: 100,
    backgroundColor: '#5B40F2',
    borderRadius: 20,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 0,
    left: 0,
    right: 0,
  },

  botones:{
    width: 60,
  }

})