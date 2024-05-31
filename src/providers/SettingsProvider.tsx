import { createContext, ReactNode, useState, useEffect } from 'react';

export const SettingsContext = createContext<SettingsContextProps>({
  theme: 'light',
  visibility: true,
  changeTheme: () => {},
  changeVisibility: () => {},
});

interface SettingsProviderProps {
  children: ReactNode;
}

interface SettingsContextProps {
  theme: 'light' | 'dark';
  visibility: boolean;
  changeTheme: (theme: 'light' | 'dark') => void;
  changeVisibility: (visibility: boolean) => void;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );
  const [visibility, setVisibility] = useState<boolean>(
    JSON.parse((localStorage.getItem('visibility') as 'true' | 'false') || true)
  );

  const changeTheme = (theme: 'light' | 'dark') => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };

  const changeVisibility = (visibility: boolean) => {
    setVisibility(visibility);
    localStorage.setItem('visibility', JSON.stringify(visibility));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const savedVisibility = localStorage.getItem('visibility') === 'true';

    if (savedTheme) {
      setTheme(savedTheme);
    }

    setVisibility(savedVisibility);
  }, []);

  return (
    <SettingsContext.Provider value={{ theme, visibility, changeTheme, changeVisibility }}>
      {children}
    </SettingsContext.Provider>
  );
};
