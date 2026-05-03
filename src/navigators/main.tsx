import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { MainParamsList } from '../../@types/navigation';
import { useAuthContext } from '../contexts';
import NameEntry from '../screens/auth/name-entry';

import AuthenticatedStack from './authenticated';

const Stack = createStackNavigator<MainParamsList>();

const MainNavigator = () => {
  const { isUserAuthenticated } = useAuthContext();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isUserAuthenticated ? (
        <Stack.Screen name="Authenticated" component={AuthenticatedStack} />
      ) : (
        <Stack.Screen name="NameEntry" component={NameEntry as any} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
