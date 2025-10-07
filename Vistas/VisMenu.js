import { Alert, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/Entypo'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import VisInicio from './VisInicio'


// export const logout = async (navigation) => {
//     try{
//         await auth().signOut();
//         navigation.navigate('VisLogin')
//     }catch (error){
//         Alert.alert("Error", "Error al cerrar sesion")
//         console.error(error)
//     }
// }



const DrawerApp=()=>{ 
    const Drawer = createDrawerNavigator();
    return( // Drawer que desplaza y color azul
        <Drawer.Navigator screenOptions={{
            statusBarColor: '#0163d2',
            headerStyle:{
                backgroundColor: '#0163d2'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitle: 'Laptops Master servicios',
            headerShown: true,
            
        }}>

        <Drawer.Screen name='ViInicio' component={VisInicio} options={{
            title:'Inicio',
            drawerIcon: config => <Icon
            name='star'
            size={23}
            />
        }}/>

        
 
    </Drawer.Navigator>
    )
}

function VisMenu() {
  return (
    <DrawerApp/>
  )
}

export default VisMenu;
