import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Index from './pages/Index';
import Login from './pages/Login';
import Email from './pages/Email';
import Maps from './pages/Maps';
import UserProfile from './pages/UserProfile';
import Schedules from './pages/UserProfile';


const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Profile') {
          iconName = focused
            ? 'ios-home'
            : 'ios-home-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'ios-search' : 'ios-search-outline';
        } else if (route.name === 'Schedules') {
          iconName = focused ? 'ios-journal' : 'ios-journal-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name="Profile" component={UserProfile} />
      <Tab.Screen name="Search" component={Maps} />
      <Tab.Screen name="Schedules" component={Schedules} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index" screenOptions={{ headerShown: false }
      }>
        <Stack.Screen name='Index' component={Index} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Email' component={Email} />
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
