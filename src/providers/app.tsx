import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { queryClient } from '@/lib/react-query.ts';
import AuthProvider from '@/providers/AuthProvider.tsx';
import NotificationsProvider from '@/providers/NotificationsProvider.tsx';
import { SettingsProvider } from '@/providers/SettingsProvider.tsx';
import { GlobalStyles, lightTheme } from '@/themes';

type AppProviderProps = {
  children: ReactNode;
};

const theme = lightTheme;
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <div>
          Loading...
          {/* TODO: Change to spinner */}
        </div>
      }>
      <SettingsProvider>
        <ThemeProvider theme={theme}>
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
