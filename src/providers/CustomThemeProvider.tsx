import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { useSettings } from '@/hooks/useSettings.ts';
import { darkTheme, lightTheme } from '@/themes';

interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  const { theme } = useSettings();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>{children}</ThemeProvider>
  );
};
