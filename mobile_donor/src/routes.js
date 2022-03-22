import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Index from './pages/Index';
import Login from './pages/Login';
import Email from './pages/Email';
import Maps from './pages/Maps';
import UserProfile from './pages/UserProfile';

const Tab = createBottomTabNavigator();

function Home() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="UserProfile" component={UserProfile} />
        <Tab.Screen name="Maps" component={Maps} />
      </Tab.Navigator>
    );
  }

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Index" screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Index' component={Index} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Email' component={Email} />
                <Stack.Screen name='Home' component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
