import { AuthRouter } from '@/features/auth';

export const anonRoutes = [
  {
    path: '/auth/*',
    element: <AuthRouter />,
  },
];
