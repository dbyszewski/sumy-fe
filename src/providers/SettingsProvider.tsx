import { createContext, ReactNode, useState, useEffect } from 'react';

export const SettingsContext = createContext<SettingsContextProps>({
  theme: 'light',
  changeTheme: () => {},
});

interface SettingsProviderProps {
  children: ReactNode;
}

interface SettingsContextProps {
  theme: 'light' | 'dark';
  changeTheme: (theme: 'light' | 'dark') => void;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  const changeTheme = (theme: 'light' | 'dark') => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <SettingsContext.Provider value={{ theme, changeTheme }}>{children}</SettingsContext.Provider>
  );
};
