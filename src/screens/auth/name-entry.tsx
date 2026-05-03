import React, { useState } from 'react';
import { Box, VStack, Input, Button, Heading, Text, FormControl, WarningOutlineIcon, Center, KeyboardAvoidingView } from 'native-base';
import { Platform } from 'react-native';
import { useAuthContext } from '../../contexts';
import { useLocalStorage } from '../../utils';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { setIsUserAuthenticated } = useAuthContext() as any;
  const { setToStorage } = useLocalStorage();

  const handleLogin = async () => {
    // Hard-coded credentials
    if (username === 'cosmokingbeauty' && password === 'SparrowCBM') {
      setError(false);
      await setToStorage('user_name', username);
      setIsUserAuthenticated(true);
    } else {
      setError(true);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      flex={1}
    >
      <Center flex={1} bg="white" p={6}>
        <VStack space={8} w="100%" maxW="400">
          <VStack space={2} alignItems="center">
            <Heading size="2xl">Welcome to</Heading>
            <Box flexDirection="row">
              <Heading size="2xl" color="black">Sparrow</Heading>
              <Heading size="2xl" color="red.500">MUTO</Heading>
            </Box>
          </VStack>
          
          <VStack space={4}>
            <FormControl isInvalid={error}>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                placeholder="Enter username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setError(false);
                }}
                size="lg"
                autoCapitalize="none"
              />
              <FormControl.Label mt={4}>Password</FormControl.Label>
              <Input
                placeholder="Enter password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError(false);
                }}
                size="lg"
                type="password"
                autoCapitalize="none"
              />
              {error && (
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  Invalid username or password.
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            <Button 
              onPress={handleLogin} 
              isDisabled={!username || !password}
              size="lg"
              mt={4}
              _pressed={{ bg: 'primary.700' }}
            >
              Login
            </Button>
          </VStack>

          <Center>
            <Text fontSize="sm" color="gray.500">
              Cosmoking Beauty Edition
            </Text>
          </Center>
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default Login;
