import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconFE from 'react-native-vector-icons/Feather'
import IconFA from 'react-native-vector-icons/FontAwesome'

import Construction from './views/construction/Construction';
/*import State from './views/state/State';
import City from './views/city/City';*/
import Inbox from './views/chat/Inbox';
import Option from './views/option/Option';

const Tab = createBottomTabNavigator();

export default function Navigation() {
   return (
      <Tab.Navigator
         screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
               if (route.name === 'Home') {
                  return <IconFA name='home' size={20} color={color} style={{ marginTop: 3 }} />;
               } else if (route.name === 'Inbox') {
                  return <IconFE name='message-circle' size={20} color={color} style={{ marginTop: 3 }} />;
               } else if (route.name === 'Option') {
                  return <IconFE name='bar-chart' size={20} color={color} style={{ marginTop: 3 }} />;
               }
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
         })}
         
      >
         <Tab.Screen name="Home" component={Construction} options={{ headerShown: false, title: 'Home' }} />
         <Tab.Screen name="Inbox" component={Inbox} options={{ headerShown: false, title: 'Inbox' }} />
         <Tab.Screen name="Option" component={Option} options={{ headerShown: false, title: 'Option' }} />
      </Tab.Navigator>
   );
}