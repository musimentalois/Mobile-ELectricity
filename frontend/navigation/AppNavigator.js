import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GenerateToken from '../components/generateToken';
import ValidateToken from '../components/validateToken';
import ViewToken from '../components/ViewToken';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GenerateToken">
        <Stack.Screen name="Generate Token" component={GenerateToken} />
        <Stack.Screen name="Validate Token" component={ValidateToken} />
        <Stack.Screen name="View Tokens" component={ViewToken} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
