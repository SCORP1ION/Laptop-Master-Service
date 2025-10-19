// import { Alert, StyleSheet, Text, View } from 'react-native'
// import * as React from 'react'
// import { createDrawerNavigator } from '@react-navigation/drawer'
// import Icon from 'react-native-vector-icons/Entypo'
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import { auth } from '../Acceso/Firebase';

// import VisInicio from './VisInicio';
// import VisVerLap from './VisVerLap';

// const logout = async (navigation) => {
//   try {
//     await auth.signOut(); // signOut, funcion que ayuda a cerrar la sesion 
//     Alert.alert('Cerrar sesion', 'Sesion cerrada exitosamente')
//     navigation.replace("VLogin");
//   } catch (error) {
//     console.error("Error al cerrar sesión: ", error);
//   }
// };

// //  Creamos un componente que usa el hook y llama logout()
// const SalirScreen = () => {
//   const navigation = useNavigation();

//   React.useEffect(() => {
//     // Llama al logout al cargar la pantalla
//     logout(navigation);
//   }, []);
// };


// const DrawerApp=()=>{ 
//     const Drawer = createDrawerNavigator();
//     return( // Drawer que desplaza y color azul
//         <Drawer.Navigator screenOptions={{
//             statusBarColor: '#0163d2',
//             headerStyle:{
//                 backgroundColor: '#0163d2',
//             },
//             headerTintColor: '#fff',
//             headerTitleAlign: 'center',
//             headerTitle: 'Laptops Master servicios',
//             headerShown: false,
//         }}>

//         <Drawer.Screen name='ViInicio' component={VisInicio} options={{
//             title:'Inicio',
//             drawerIcon: config => <Icon 
//             name='star' 
//             size={23} />
//         }}/>
//         <Drawer.Screen name='Salir' component={SalirScreen} options={{
//             title: 'Salir',
//             drawerIcon: config => <MaterialIcons 
//             name="exit-to-app" 
//             size={26} 
//             color="black" />
//         }}/>

//         <Drawer.Screen name='VisVerLaptops' component={VisVerLap} options={{
//           drawerItemStyle: { display: 'none'} }}/>
        
//     </Drawer.Navigator>
//     )
// }



// export default VisMenu;
