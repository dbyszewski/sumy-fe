import { useRoutes } from 'react-router-dom';

import { adminRoutes } from './admin';
import { anonRoutes } from './anon';
import { userRoutes } from './user';

import { ReportRouter } from '@/features/report';
import { useAuth } from '@/hooks/useAuth.ts';
import LandingPage from '@/pages/anon/LandingPage.tsx';
import Nullable from '@/types/nullable.ts';

type AuthType = Nullable<{
  user: Nullable<{
    admin: boolean;
  }>;
  token: Nullable<string>;
}>;

export const AppRoutes = () => {
  const { token } = useAuth();

  const commonRoutes = [
    { path: '/', element: <LandingPage /> },
    { path: '/report/*', element: <ReportRouter /> },
    { path: '/*', element: <h1>404</h1> },
  ];
  const fullRoutes = [...adminRoutes, ...userRoutes];

  const determineRoutes = (auth: AuthType) => {
    if (!auth?.token) return anonRoutes;

    return auth.user?.admin ? fullRoutes : userRoutes;
  };

  // TODO: Brać usera z auth contextu jak będzie
  const routes = determineRoutes({ user: { admin: true }, token });

  return useRoutes([...routes, ...commonRoutes]);
};
