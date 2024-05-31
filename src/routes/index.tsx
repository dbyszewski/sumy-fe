import { useRoutes } from 'react-router-dom';

import { adminRoutes } from './admin';
import { anonRoutes } from './anon';
import { userRoutes } from './user';

import { ReportRouter } from '@/features/report';
import { useAuth } from '@/hooks/useAuth.ts';
import LandingPage from '@/pages/anon/LandingPage.tsx';

export const AppRoutes = () => {
  const { token, isAdmin } = useAuth();

  const commonRoutes = [
    { path: '/', element: <LandingPage /> },
    { path: '/report/*', element: <ReportRouter /> },
    { path: '/*', element: <h1>404</h1> },
  ];
  const fullRoutes = [...adminRoutes, ...userRoutes];

  const determineRoutes = () => {
    if (!token) return anonRoutes;

    return isAdmin ? fullRoutes : userRoutes;
  };

  const routes = determineRoutes();

  return useRoutes([...routes, ...commonRoutes]);
};
