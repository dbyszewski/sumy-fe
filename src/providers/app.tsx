import { ReactNode, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AuthProvider from '@/providers/AuthProvider.tsx';
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
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <AuthProvider>{children}</AuthProvider>
        </Router>
      </ThemeProvider>
    </Suspense>
  );
};
