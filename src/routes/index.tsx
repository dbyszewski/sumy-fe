import { useRoutes } from 'react-router-dom';

import { adminRoutes } from './admin';
import { anonRoutes } from './anon';
import { operatorRoutes } from './operator';
import { userRoutes } from './user';

import { AdminRouter } from '@/features/admin/adminPanel';
import { ReportRouter } from '@/features/report';
import LandingPage from '@/pages/anon/LandingPage.tsx';
import Nullable from '@/types/nullable.ts';

type AuthType = Nullable<{
  user: {
    id: number;
    operator: boolean;
  };
  admin: {
    id: number;
    operator: boolean;
  };
}>;

export const AppRoutes = () => {
  //TODO: replace with auth context
  const auth = null;

  const commonRoutes = [
    { path: '/', element: <LandingPage /> },
    { path: '/report/*', element: <ReportRouter /> },
    { path: '/admin/*', element: <AdminRouter /> },
    { path: '/*', element: <h1>404</h1> },
  ];

  const routes = determineRoutes(auth);

  return useRoutes([...routes, ...commonRoutes]);
};

const determineRoutes = (auth: AuthType) => {
  if (auth?.user) {
    return auth.user.operator ? operatorRoutes : userRoutes;
  }
  if (auth?.admin) {
    return auth.admin.operator ? operatorRoutes : adminRoutes;
  } else {
    return anonRoutes;
  }
};
