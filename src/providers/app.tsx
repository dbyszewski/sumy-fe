import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { useSettings } from '@/hooks/useSettings.ts';
import { LoadingSpinner } from '@/components/Elements/LoadingSpinner';
import { queryClient } from '@/lib/react-query.ts';
import AuthProvider from '@/providers/AuthProvider.tsx';
import NotificationsProvider from '@/providers/NotificationsProvider.tsx';
import { SettingsProvider } from '@/providers/SettingsProvider.tsx';
import { GlobalStyles, darkTheme, lightTheme } from '@/themes';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const theme = useSettings().theme;

  return (
    <Suspense
      fallback={
        <LoadingSpinner />
      }>
      <SettingsProvider>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <GlobalStyles />
          <Router>
            <NotificationsProvider>
              <QueryClientProvider client={queryClient}>
                <AuthProvider>{children}</AuthProvider>
              </QueryClientProvider>
            </NotificationsProvider>
          </Router>
        </ThemeProvider>
      </SettingsProvider>
    </Suspense>
  );
};
