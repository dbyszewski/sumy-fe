import { ReactNode, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { GlobalStyles } from '@/themes';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          Loading...
          {/* TODO: Change to spinner */}
        </div>
      }>
      <GlobalStyles />
      <Router>{children}</Router>
    </Suspense>
  );
};
