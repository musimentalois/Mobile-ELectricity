// routers/AppRouter.js

import React from 'react';
import {Stack} from "expo-router"
import { StyleSheet } from 'react-native';
import GenerateToken from '../components/generateToken';
import ValidateToken from '../components/validateToken';
import ViewTokens from '../components/ViewToken';

const AppRouter = () => {
  return (
    <Stack>
      <Stack.Screen name="generateToken" component={GenerateToken} />
        <Stack.Screen name="validateToken" component={ValidateToken} />
        <Stack.Screen name="ViewToken" component={ViewTokens} />
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
