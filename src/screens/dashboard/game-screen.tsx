import React, { useState, useEffect, useCallback } from 'react';
import { Box, VStack, HStack, Text, Button, Heading, Pressable, useToast } from 'native-base';
import { useAuthContext } from '../../contexts';
import { useLocalStorage } from '../../utils';

const GameScreen = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerNext, setIsPlayerNext] = useState(true);
  const [userName, setUserName] = useState('Player');
  const { logout } = useAuthContext();
  const { getFromStorage } = useLocalStorage();
  const toast = useToast();

  useEffect(() => {
    const loadName = async () => {
      const name = await getFromStorage('user_name');
      if (name) setUserName(name);
    };
    loadName();
  }, [getFromStorage]);

  const calculateWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6],             // Diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : 'Draw';
  };

  const computerMove = useCallback((currentBoard: any[]) => {
    const emptyIndices = currentBoard.map((v, i) => v === null ? i : null).filter(v => v !== null);
    if (emptyIndices.length > 0) {
      const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      const newBoard = [...currentBoard];
      newBoard[randomIndex as number] = 'O';
      setBoard(newBoard);
      setIsPlayerNext(true);
    }
  }, []);

  useEffect(() => {
    if (!isPlayerNext && !calculateWinner(board)) {
      const timer = setTimeout(() => computerMove(board), 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerNext, board, computerMove]);

  const handlePress = (index: number) => {
    if (board[index] || calculateWinner(board) || !isPlayerNext) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerNext(false);
  };

  const winner = calculateWinner(board);
  const status = winner 
    ? winner === 'Draw' ? "It's a Draw!" : winner === 'X' ? `${userName} Wins!` : "Computer Wins!"
    : `${isPlayerNext ? userName : 'Computer'}'s Turn`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerNext(true);
  };

  return (
    <Box flex={1} bg="white" p={4} safeArea>
      <VStack flex={1} space={8} alignItems="center" justifyContent="center">
        <VStack alignItems="center" space={2}>
          <HStack space={1}>
            <Heading size="xl" color="black">Sparrow</Heading>
            <Heading size="xl" color="red.500">MUTO</Heading>
          </HStack>
          <Text fontSize="lg" fontWeight="bold" color={winner ? "red.500" : "black"}>
            {status}
          </Text>
        </VStack>

        <Box bg="black" p={1} borderRadius="md">
          <VStack space={1}>
            {[0, 1, 2].map(row => (
              <HStack key={row} space={1}>
                {[0, 1, 2].map(col => {
                  const index = row * 3 + col;
                  return (
                    <Pressable 
                      key={index} 
                      onPress={() => handlePress(index)}
                      w={24} h={24} 
                      bg="white"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="4xl" fontWeight="bold" color={board[index] === 'X' ? 'black' : 'red.500'}>
                        {board[index]}
                      </Text>
                    </Pressable>
                  );
                })}
              </HStack>
            ))}
          </VStack>
        </Box>

        <VStack space={4} w="full">
          <Button onPress={resetGame} variant="solid" size="lg">
            Restart Game
          </Button>
          <Button onPress={logout} variant="subtle" size="lg">
            Logout
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default GameScreen;
