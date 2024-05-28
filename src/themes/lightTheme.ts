import { mainTheme } from './mainTheme.ts';

export const lightTheme = Object.assign({}, mainTheme, {
  colors: {
    buttons: {
      primary: '#0ea5e9',
      secondary: '#ef4444',
    },
    background: '#f5f5f4',
    error: '#F52C23',
    input: '#F5F5F5',
    buttonsText: '#ffffff',
    buttonsFontWeight: 'bold',
    elements: {
      light: '#d4d4d4',
      dark: '#78716c',
      brightLight: '#e5e5e5',
    },
    navigation: {
      light: '#d4d4d4',
      dark: '#78716c',
      darkRed: '#b91c1c',
      brightLight: '#e5e5e5',
      button: {
        hover: '#f5f5f4',
        active: '#e7e5e4',
      },
    },
    text: {
      dark: '#0c0a09',
      light: '#fafaf9',
      themeDark: '#7f1d1d',
      themeLight: '#fecaca',
    },
  },
});
