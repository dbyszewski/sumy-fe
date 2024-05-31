import { createContext, ReactNode, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme } from '@/themes'; // zaimportuj motywy

export const SettingsContext = createContext<SettingsContextProps>({
  theme: 'light',
  visibility: true,
  setTheme: () => {},
  setVisibility: () => {},
});

interface SettingsProviderProps {
  children: ReactNode;
}

interface SettingsContextProps {
  theme: 'light' | 'dark';
  visibility: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  setVisibility: (visibility: boolean) => void;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [visibility, setVisibility] = useState<boolean>(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const savedVisibility = localStorage.getItem('visibility') === 'true';

    if (savedTheme) {
      setTheme(savedTheme);
    }

    setVisibility(savedVisibility);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('visibility', visibility.toString());
  }, [visibility]);

  return (
    <SettingsContext.Provider value={{ theme, visibility, setTheme, setVisibility }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>{children}</ThemeProvider>
    </SettingsContext.Provider>
  );
};
