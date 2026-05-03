import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import GameScreen from '../screens/dashboard/game-screen';

const Stack = createStackNavigator();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Game" component={GameScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
