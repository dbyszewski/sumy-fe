import { mainTheme } from './mainTheme.ts';

export const lightTheme = Object.assign({}, mainTheme, {
  colors: {
    buttons: {
      primary: '#0C82ED',
      secondary: '#F52C23',
    },
    background: '#F5F5F5',
    container: {
      background: '#FFFFFF',
      border: '#E2E8F0',
    },
    error: '#F52C23',
    input: '#F5F5F5',
    buttonsText: '#ffffff',
    buttonsFontWeight: 'bold',
  },
});
