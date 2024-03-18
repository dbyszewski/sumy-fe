import { useRoutes } from 'react-router-dom';

import { anonRoutes } from './anon';
import { operatorRoutes } from './operator';
import { userRoutes } from './user';

export const AppRoutes = () => {
  //TODO: replace with auth context
  const auth = { user: { id: 123, operator: false } };

  const commonRoutes = [{ path: '/', element: <h1>Landing Page</h1> }];

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
