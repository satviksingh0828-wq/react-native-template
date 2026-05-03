import { useTheme, Box, HStack } from 'native-base';
import React, { useRef, useEffect, useMemo } from 'react';
import { Animated, Dimensions, Text, StyleSheet, Image } from 'react-native';
import { SpinnerSize, SpinnerTypes } from 'react-native-template/src/types/spinner';

import Spinner from '../spinner/spinner';

type Props = {
  height?: number | string;
  width?: number | string;
};

const Brand: React.FC<Props> = ({ height = '100%', width = '100%' }) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');

  const LOGO_SIZE = 150;
  const ANIM_DURATION_IN_MS = 500;
  const FADE_DURATION_IN_MS = 300;
  const PAUSE_DURATION_IN_MS = 1000;

  const translateY = useRef(new Animated.Value(-LOGO_SIZE)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT / 2 - LOGO_SIZE / 2,
        duration: ANIM_DURATION_IN_MS,
        useNativeDriver: true,
      }),
      Animated.delay(PAUSE_DURATION_IN_MS),
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: FADE_DURATION_IN_MS,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: FADE_DURATION_IN_MS,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [translateY, logoOpacity, textOpacity, SCREEN_HEIGHT]);

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        logoAnim: {
          transform: [{ translateY }],
          opacity: logoOpacity,
        },
      }),
    [translateY, logoOpacity],
  );

  return (
    <Box
      testID="brand-img-wrapper"
      backgroundColor="#FFFFF0" // Ivory
      height={height}
      width={width}
      position="relative"
    >
      <Animated.View style={[styles.logoContainer, dynamicStyles.logoAnim]}>
        <Image 
          source={require('react-native-template/assets/img/sparrow_logo.png')} 
          style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View style={[styles.centerContainer, { opacity: textOpacity }]}>
        <HStack space={1} alignItems="center">
          <Text style={[styles.centerText, { color: 'black' }]}>Sparrow</Text>
          <Text style={[styles.centerText, { color: 'red', fontWeight: 'bold' }]}>MUTO</Text>
        </HStack>
      </Animated.View>

      <Animated.View style={styles.spinnerWrapper}>
        <Spinner size={SpinnerSize.LARGE} type={SpinnerTypes.SECONDARY} />
      </Animated.View>
    </Box>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  centerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 48,
    textAlign: 'center',
  },
  spinnerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 16,
  },
});

export default Brand;
