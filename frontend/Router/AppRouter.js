// routers/AppRouter.js

import React from 'react';
import {Stack} from "expo-router"
import { View, Text, Button, StyleSheet } from 'react-native';
import GenerateToken from '../generateToken';
import ValidateToken from '../validateToken';
import ViewTokens from '../ViewToken';

const AppRouter = () => {
  return (
    <Stack>
      <Stack.Screen name="Generate Token" component={GenerateToken} />
        <Stack.Screen name="Validate Token" component={ValidateToken} />
        <Stack.Screen name="View Tokens" component={ViewTokens} />
    </Stack>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
});

export default AppRouter;
