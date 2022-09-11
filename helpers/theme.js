import { extendTheme } from 'native-base';

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
});

export const navigationTheme = {
  dark: true,
  colors: {
    background: '#121212',
    card: '#242424',
    text: 'red',
    border: 'blue',
    notification: 'brown',
  }
}