import { createContext, ReactNode } from 'react';
import { toast, ToastBar, Toaster } from 'react-hot-toast';

import { Notification } from '@/components/Elements/Notification';
import NotificationType from '@/types/notification';

interface NotificationsProviderProps {
  children: ReactNode;
}

interface NotificationsContextProps {
  addNotification: (notification: NotificationType) => void;
}

export const NotificationsContext = createContext<NotificationsContextProps>({
  addNotification: () => {},
});

const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
  const addNotification = (notification: NotificationType) => {
    if (notification.type === 'error') {
      toast.error(notification.message);
      return;
    }
    toast.success(notification.message);
  };

  return (
    <NotificationsContext.Provider value={{ addNotification }}>
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            padding: '0',
            minWidth: '20rem',
            width: '30rem',
            maxWidth: '90vw',
            margin: 'auto',
          },
        }}>
        {(t) => (
          <ToastBar toast={t}>
            {({ message }) => (
              <Notification
                type={t.type as NotificationType['type']}
                message={message}
                onDelete={() => toast.dismiss(t.id)}
              />
            )}
          </ToastBar>
        )}
      </Toaster>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
