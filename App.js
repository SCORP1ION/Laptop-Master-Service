import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import conexion, { auth } from './Acceso/Firebase';

import VisLogin from './VistasLogin/VisLogin'; // Formulario para login
import VisRegister from './VistasLogin/VisRegister'; // Register form
import VisInicio from './Vistas/VisInicio';
import VisAdmin from "./VistasAdmin/VisInicioAdmin"

const Stack = createStackNavigator();

function UsuarioStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Vinicio' component={VisInicio} />
    </Stack.Navigator>
  )
}

function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ViAdmin' component={VisAdmin} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='VLogin' component={VisLogin} />
      <Stack.Screen name='ViRegis' component={VisRegister} />
    </Stack.Navigator>
  )
}

function App() {
  const [userType, setUserType] = React.useState(null);
  // null = cargando, "user", "admin", "none"

  React.useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUserType("none");
        return;
      }

      try {
        // Buscar primero rol admin
        const adminRef = await conexion.collection("tblAdministrador").doc(user.uid).get();
        if (adminRef.exists && adminRef.data().role === "admin") {
          setUserType("admin");
          return;
        }

        // Si no es admin, buscar en usuario normal
        const userRef = await conexion.collection("tblPerfil").doc(user.uid).get();
        if (userRef.exists && userRef.data().role === "user") {
          setUserType("user");
          return;
        }

        // Si no aparece en ninguna → sin rol
        setUserType("none");

      } catch (err) {
        console.log("Error consultando rol:", err);
        setUserType("none");
      }
    });

  }, []);

  if (userType === null) return null; // puedes poner pantalla loading

  return (
    <NavigationContainer>
      {userType === "none" && <AuthStack />}
      {userType === "user" && <UsuarioStack />}
      {userType === "admin" && <AdminStack />}
    </NavigationContainer>
  );
}

export default App;
