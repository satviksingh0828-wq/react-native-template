import { extendTheme } from 'native-base';

const ICOLORHUES = {
  primary: {
    '50': '#F2F2F2',
    '100': '#E6E6E6',
    '200': '#CCCCCC',
    '300': '#B3B3B3',
    '400': '#808080',
    '500': '#000000', // Black
    '600': '#000000',
    '700': '#000000',
    '800': '#000000',
    '900': '#000000',
  },
  secondary: {
    '50': '#FFFFFF', // White
    '100': '#F5F5F5',
    '200': '#E5E5E5',
    '300': '#D4D4D4',
    '400': '#A3A3A3',
    '500': '#737373',
    '600': '#525252',
    '700': '#404040',
    '800': '#262626',
    '900': '#171717',
  },
  tertiary: {
    50: '#FFFFF0', // Ivory
    100: '#FFFFF0',
    200: '#FFFFF0',
    300: '#FFFFF0',
    400: '#FFFFF0',
    500: '#FFFFF0',
    600: '#FFFFF0',
    700: '#FFFFF0',
    800: '#FFFFF0',
    900: '#FFFFF0',
  },
  background: {
    50: '#FFFFFF',
    100: '#FFFFFF',
    200: '#FFFFFF',
    300: '#FFFFFF',
    400: '#FFFFFF',
    500: '#FFFFFF',
    600: '#FFFFFF',
    700: '#FFFFFF',
    800: '#FFFFFF',
    900: '#FFFFFF',
  },
  danger: {
    '50': '#FEECEC',
    '100': '#FFD6D6',
    '200': '#FFADAD',
    '300': '#FF8484',
    '400': '#FF5C5C',
    '500': '#FF0000', // Red for MUTO
    '600': '#E2332B',
    '700': '#BF2A23',
    '800': '#991F1A',
    '900': '#731512',
  },
  warning: {
    '50': '#FFF8E6',
    '100': '#FFF0CC',
    '200': '#FFE199',
    '300': '#FFD166',
    '400': '#FFC233',
    '500': '#FFA500',
    '600': '#E59400',
    '700': '#CC8400',
    '800': '#B37300',
    '900': '#805100',
  },
  success: {
    '50': '#EAFBE9',
    '100': '#D2F6D1',
    '200': '#A7E9C4',
    '300': '#7CE268',
    '400': '#51D733',
    '500': '#4BB543',
    '600': '#38922F',
    '700': '#2B6E21',
    '800': '#1B4A14',
    '900': '#0C2607',
  },
  info: {
    '50': '#E0FCFF',
    '100': '#BEF8FD',
    '200': '#87EAF2',
    '300': '#54D1DB',
    '400': '#38BEC9',
    '500': '#2CB1BC',
    '600': '#14919B',
    '700': '#0E7C86',
    '800': '#0A6C74',
    '900': '#044E54',
  },
};

const appTheme = extendTheme({
  colors: {
    ...ICOLORHUES,
  },
  lineHeights: {
    '2xs': 16,
    xs: 18,
    sm: 20,
    md: 22,
    lg: 24,
    xl: 28,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
    '5xl': 64,
  },
  components: {
    Button: {
      baseStyle: {
        _text: {
          color: 'white',
        },
        _pressed: {
          opacity: 0.7,
        },
      },
      variants: {
        solid: {
          bg: 'primary.500',
        },
        subtle: {
          bg: 'secondary.200',
          _text: {
            color: 'black',
          },
          _pressed: {
            bg: 'secondary.300',
          },
        },
        danger: {
          bg: 'danger.500',
          _disabled: {
            bg: 'danger.200',
          },
          _pressed: {
            bg: 'danger.700',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        _focus: {
          borderColor: 'primary.500',
          backgroundColor: 'secondary.50',
        },
      },
      variants: {
        otp: {
          width: 10,
          height: 10,
          textAlign: 'center',
          borderBottomWidth: 2,
          borderRadius: 0,
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'black',
      },
      sizes: {
        lg: {
          fontWeight: '600',
          lineHeight: 32,
        },
        xs: {
          fontWeight: '500',
          color: 'black',
          lineHeight: 20,
        },
        '2xl': {
          color: 'black',
          lineHeight: 40,
        },
        '3xl': {
          lineHeight: 48,
        },
      },
    },
    Icon: {
      defaultProps: {
        color: 'primary.500',
      },
    },
    Toast: {
      baseStyle: {
        _title: {
          textAlign: 'center',
        },
      },
    },
  },
});

export default appTheme;
