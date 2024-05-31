import { UserRouter } from '@/features/user/userPanel';

export const userRoutes = [
  {
    path: '/user/*',
    element: <UserRouter />,
  },
];
