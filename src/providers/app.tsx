import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { LoadingSpinner } from '@/components/Elements/LoadingSpinner';
import { queryClient } from '@/lib/react-query.ts';
import AuthProvider from '@/providers/AuthProvider.tsx';
import { CustomThemeProvider } from '@/providers/CustomThemeProvider.tsx';
import NotificationsProvider from '@/providers/NotificationsProvider.tsx';
import { SettingsProvider } from '@/providers/SettingsProvider.tsx';
import { GlobalStyles } from '@/themes';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SettingsProvider>
        <CustomThemeProvider>
          <GlobalStyles />
          <Router>
            <NotificationsProvider>
              <QueryClientProvider client={queryClient}>
                <AuthProvider>{children}</AuthProvider>
              </QueryClientProvider>
            </NotificationsProvider>
          </Router>
        </CustomThemeProvider>
      </SettingsProvider>
    </Suspense>
  );
};
