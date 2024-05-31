import { useContext } from 'react';

import { NotificationsContext } from '@/providers/NotificationsProvider';

export const useNotifications = () => {
  return useContext(NotificationsContext);
};
