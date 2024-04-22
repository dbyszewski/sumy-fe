import { mainTheme } from './mainTheme.ts';

export const lightTheme = Object.assign({}, mainTheme, {
  colors: {
    buttons: {
      primary: '#0C82ED',
      secondary: '#F52C23',
    },
    buttonsText: '#ffffff',
    buttonsFontWeight: 'bold',
  },
});
