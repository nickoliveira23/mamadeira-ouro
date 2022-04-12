import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Index from './pages/Index';
import Login from './pages/Login';
import Email from './pages/Email';
import Password from './pages/Password';
import Register from './pages/Register';
import EditDonor from './pages/EditDonor';
import Search from './pages/Search';
import UserProfile from './pages/UserProfile';
import Schedule from './pages/Schedule';

import { TabParamList } from './types';
import { StackParamList } from './types';


const Tab = createBottomTabNavigator<TabParamList>();

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
        } else if (route.name === 'Schedule') {
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
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Schedule" component={Schedule} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator<StackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index" screenOptions={{ headerShown: false }
      }>
        <Stack.Screen name='Index' component={Index} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Email' component={Email} />
        <Stack.Screen name='Password' component={Password} />
        <Stack.Screen name='EditDonor' component={EditDonor} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Home' component={Home}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
