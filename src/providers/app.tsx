import { ReactNode, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

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
        <Router>{children}</Router>
      </ThemeProvider>
    </Suspense>
  );
};
