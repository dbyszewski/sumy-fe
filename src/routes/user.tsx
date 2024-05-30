import { UserPanelEvents } from '@/features/user/userPanel/pages/UserPanelEvents.tsx';

export const userRoutes = [
  {
    path: '/app/*',
    element: <UserPanelEvents />,
  },
];
