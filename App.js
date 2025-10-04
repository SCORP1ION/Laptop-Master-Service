import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import VisLogin from './Vistas/VisLogin'; // Formulario para login
import VisMenu from './Vistas/VisMenu';
import VisRegister from './Vistas/VisRegister'; // Register form 

const Stack = createStackNavigator();

function MyStack(){
  return(
    // returna una pila para que valla al la vista VisLogin
    <Stack.Navigator>
      <Stack.Screen name='VLogin' component={VisLogin} options={{title: 'Iniciar Sesion'}} />
      <Stack.Screen name='VMenu' component={VisMenu} options={{headerShown: false}}/>
      <Stack.Screen name='ViRegis' component={VisRegister} options={{title: 'Registrarse'}}/>
    </Stack.Navigator>
  );
}


function App(){
  return(
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

export default App;
