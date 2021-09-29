import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation'
import Login from './views/login/Login';
import Register from './views/register/Register';
import Chat from './views/chat/Chat';

const Stack = createNativeStackNavigator();

export default function Navigation(props) {
   console.log('initialRoute', props.initialRoute)

   return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName={props.initialRoute}>
            <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={Chat} options={{ headerShown: true }} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}