import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import VisLogin from './Vistas/VisLogin'; // Formulario para login
import VisRegister from './Vistas/VisRegister'; // Register form
import VisInicio from './Vistas/VisInicio';

const Stack = createStackNavigator();

function MyStack(){
  return(
    // retorna una pila para que valla al la vista VisLogin
    // ggestureEnabled: false. Bloquea el desplazamiento horizontal de las vistas
    <Stack.Navigator screenOptions={{gestureEnabled: false}}>
        <Stack.Screen name='VLogin' component={VisLogin} options={{title: 'Iniciar Sesion', headerShown: false}} />
        <Stack.Screen name='Vinicio' component={VisInicio} options={{headerShown: false}}/>
        <Stack.Screen name='ViRegis' component={VisRegister} options={{title: 'Registrarse', headerShown: false}}/>
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
