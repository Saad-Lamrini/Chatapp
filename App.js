import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Auth from './Screens/Auth';
import Home from './Screens/Home';
import List from './Screens/List';
import Acceuil from './Screens/Acceuil';
import chat from './Screens/chat';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Acceuil" component={Acceuil} />

        <Stack.Screen
          name="chat"
          component={chat}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
