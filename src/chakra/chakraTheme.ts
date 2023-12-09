import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    'violet-1': '#C1CAFF',
    'violet-2': '#8E99F3',
    'violet-3': '#5C6BC0',
    'violet-4': '#294699',
    'violet-5': '#002380',
    'gray-1': '#EEE',
    'gray-2': '#EEE',
    'gray-3': '#C5C5C6',
    'gray-4': '#676767',
    'gray-5': '#000',
    'green-1': '#C8E6C9',
    'green-2': '#80E27E',
    'green-3': '#4CAF50',
    'green-4': '#087F23',
    'green-5': '#1B5E20',
    'red-1': '#FFC2AD',
    'red-2': '#FF7961',
    'red-3': '#F44336',
    'red-4': '#BA000D',
    'red-5': '#820000',
    'yellow-1': '#FFFFAD',
    'yellow-2': '#FFFF72',
    'yellow-3': '#FFEB3B',
    'yellow-4': '#B8AA00',
    'yellow-5': '#807600',
    'blue-1': '#ADDFFF',
    'blue-2': '#6EC6FF',
    'blue-3': '#2196F3',
    'blue-4': '#0069C0',
    'blue-5': '#004680',
    'hover-light': 'rgb(238 242 255 / 0.7)',
  },
  shadows: {
    'outer-1': '0px 1px 3px 0px rgba(5, 5, 5, 0.10)',
    'outer-2': '0px 4px 6px 0px rgba(5, 5, 5, 0.10)',
    'outer-3': '0px 5px 15px 0px rgba(5, 5, 5, 0.10)',
    'outer-4': '0px 10px 24px 0px rgba(5, 5, 5, 0.10)',
    'outer-5': '0px 15px 35px 0px rgba(5, 5, 5, 0.10)',
    'inner-1':
      ' 0px 1px 2px 0px rgba(3, 3, 3, 0.10), 0px 1px 3px 0px rgba(3, 3, 3, 0.10);',
    'inner-2':
      '0px 2px 4px 0px rgba(3, 3, 3, 0.10), 0px 3px 4px 0px rgba(3, 3, 3, 0.10)',
    'inner-3':
      ' 0px 3px 6px 0px rgba(3, 3, 3, 0.10), 0px 10px 20px 0px rgba(3, 3, 3, 0.10)',
    'inner-4':
      '0px 5px 10px 0px rgba(3, 3, 3, 0.10), 0px 15px 25px 0px rgba(3, 3, 3, 0.10)',
    'inner-5': '0px 20px 40px 0px rgba(5, 5, 5, 0.10)',
  },
  fontSizes: {
    xs: '0.2rem',
    sm: '0.4rem',
    md: '0.8rem',
    lg: '1.2rem',
    xl: '1.6rem',
    '2xl': '2.4rem',
    '3xl': '3.2rem',
    '4xl': '4rem',
    '5xl': '4.8rem',
    '6xl': '6.4rem',
    '7xl': '8rem',
    '8xl': '9.6rem',
    '9xl': '16rem',
  },
  fonts: {
    openSans: `'Open Sans', sans-serif`,
    fredoka: `'Fredoka', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: 'openSans',
        fontSize: '10px',
      },
    },
  },
});

export default theme;
