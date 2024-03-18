import { mainTheme } from './mainTheme.ts';

export const lightTheme = Object.assign({}, mainTheme, {
  colors: {
    buttons: {
      primary: 'blue',
      secondary: 'green',
    },
  },
});
