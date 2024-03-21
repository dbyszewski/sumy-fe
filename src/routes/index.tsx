import { useRoutes } from 'react-router-dom';

import { anonRoutes } from './anon';
import { operatorRoutes } from './operator';
import { userRoutes } from './user';

import LandingPage from '@/pages/anon/LandingPage.tsx';

export const AppRoutes = () => {
  //TODO: replace with auth context
  const auth = { user: { id: 123, operator: false } };

  const commonRoutes = [{ path: '/', element: <LandingPage /> }];

  const routes = determineRoutes(auth);

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};

const determineRoutes = (auth: { user: { id: number; operator: boolean } }) => {
  if (auth.user) {
    return auth.user.operator ? operatorRoutes : userRoutes;
  } else {
    return anonRoutes;
  }
};
