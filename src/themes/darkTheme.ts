import { mainTheme } from './mainTheme.ts';

export const darkTheme = Object.assign({}, mainTheme, {
  colors: {
    buttons: {
      primary: '#0ea5e9',
      secondary: '#ef4444',
      warning: '#f59e0b',
      success: '#10b981',
      danger: '#ef4444',
      disabled: '#d4d4d4',
      default: 'inherit',
    },
    background: '#57534e',
    error: '#F52C23',
    input: '#F5F5F5',
    buttonsText: '#ffffff',
    buttonsFontWeight: 'bold',
    elements: {
      light: '#1c1917',
      dark: '#0c0a09',
      darkRed: '#b91c1c',
      brightLight: '#292524',
    },
    navigation: {
      light: '#1c1917',
      dark: '#0c0a09',
      darkRed: '#b91c1c',
      brightLight: '#292524',
      button: {
        hover: '#57534e',
        active: '#44403c',
      },
    },
    text: {
      dark: '#f5f5f4',
      light: '#fafaf9',
      themeDark: '#dc2626',
      themeLight: '#fecaca',
    },
  },
});
