import { mainTheme } from './mainTheme.ts';

export const darkTheme = Object.assign({}, mainTheme, {
  colors: {
    buttons: {
      primary: 'cyan',
      secondary: 'yellow',
    },
  },
});
