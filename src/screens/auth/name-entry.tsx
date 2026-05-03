import React, { useState } from 'react';
import { Box, VStack, Input, Button, Heading, Text } from 'native-base';
import { useAuthContext } from '../../contexts';
import { useLocalStorage } from '../../utils';

const NameEntry = () => {
  const [name, setName] = useState('');
  const { setIsUserAuthenticated } = useAuthContext() as any; // Cast to any to allow setting auth state
  const { setToStorage } = useLocalStorage();

  const handleContinue = async () => {
    if (name.trim()) {
      await setToStorage('user_name', name);
      // In this simplified version, we just set authenticated to true
      setIsUserAuthenticated(true);
    }
  };

  return (
    <Box flex={1} bg="white" p={6} justifyContent="center">
      <VStack space={6}>
        <VStack space={2}>
          <Heading size="2xl">Welcome to</Heading>
          <Box flexDirection="row">
            <Heading size="2xl" color="black">Sparrow</Heading>
            <Heading size="2xl" color="red.500">MUTO</Heading>
          </Box>
        </VStack>
        
        <Text fontSize="md" color="gray.600">
          Please enter your name to start the game.
        </Text>

        <Input
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
          size="lg"
          variant="underlined"
          autoFocus
        />

        <Button 
          onPress={handleContinue} 
          isDisabled={!name.trim()}
          size="lg"
        >
          Continue
        </Button>
      </VStack>
    </Box>
  );
};

export default NameEntry;
