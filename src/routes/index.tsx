import { Navigate, useRoutes } from 'react-router-dom';

import { adminRoutes } from './admin';
import { anonRoutes } from './anon';
import { userRoutes } from './user';

import { ReportRouter } from '@/features/report';
import { VerifyEmail } from '@/features/verify/components/VerifyMail.tsx';
import { useAuth } from '@/hooks/useAuth.ts';
import LandingPage from '@/pages/anon/LandingPage.tsx';

export const AppRoutes = () => {
  const { token, isAdmin } = useAuth();

  const commonRoutes = [
    { path: '/', element: <LandingPage /> },
    { path: '/report/*', element: <ReportRouter /> },
    { path: '/verify_email*', element: <VerifyEmail /> },
    { path: '/*', element: <Navigate to="/" /> },
  ];
  const fullRoutes = [...adminRoutes, ...userRoutes];

  const determineRoutes = () => {
    if (!token) return anonRoutes;

    return isAdmin ? fullRoutes : userRoutes;
  };

  const routes = determineRoutes();

  return useRoutes([...routes, ...commonRoutes]);
};
