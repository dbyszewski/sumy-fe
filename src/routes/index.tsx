import { useRoutes } from 'react-router-dom';

import { anonRoutes } from './anon';
import { operatorRoutes } from './operator';
import { userRoutes } from './user';

import LandingPage from '@/pages/anon/LandingPage.tsx';
import Nullable from '@/types/nullable.ts';

type AuthType = Nullable<{
  user: {
    id: number;
    operator: boolean;
  };
}>;

export const AppRoutes = () => {
  //TODO: replace with auth context
  const auth = null;

  const commonRoutes = [
    { path: '/', element: <LandingPage /> },
    { path: '/*', element: <h1>404</h1> },
  ];

  const routes = determineRoutes(auth);

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};

const determineRoutes = (auth: AuthType) => {
  if (auth?.user) {
    return auth.user.operator ? operatorRoutes : userRoutes;
  } else {
    return anonRoutes;
  }
};
