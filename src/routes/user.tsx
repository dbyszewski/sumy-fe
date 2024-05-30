import { UserEventsPanel } from '@/features/user/userPanel/pages/UserEventsPanel.tsx';

export const userRoutes = [
  {
    path: '/app/*',
    element: <UserEventsPanel />,
  },
];
