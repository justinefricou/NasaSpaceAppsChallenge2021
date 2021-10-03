import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GraphsScreen from './src/GraphsScreen';
import GeolocationScreen from './src/GeolocationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          mode="modal"
          name="GeolocationScreen"
          component={GeolocationScreen}
        />
        <Stack.Screen
          mode="modal"
          name="GraphsScreen"
          component={GraphsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
