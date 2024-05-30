import { AdminRouter } from '@/features/admin/adminPanel';

export const adminRoutes = [
  {
    path: '/admin/*',
    element: <AdminRouter />,
  },
];
