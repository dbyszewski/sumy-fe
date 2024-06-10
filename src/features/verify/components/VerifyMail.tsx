import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useNotifications } from '@/hooks/useNotifications.ts';
import { apiClient } from '@/lib/api-client.ts';

export const VerifyEmail = () => {
  const location = useLocation();
  const notifications = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      const verifyEmail = async () => {
        try {
          const url = `/users/verify_email?verify_token=${token}`;
          await apiClient.patch(url);
          navigate('/');
          notifications.addNotification({
            message: 'Email został zweryfikowany',
            type: 'success',
          });
        } catch (error) {
          navigate('/');
          notifications.addNotification({
            message: 'Wystąpił błąd, spróbuj wysłać nowy email weryfikacyjny',
            type: 'error',
          });
          console.error('Błąd podczas weryfikacji maila', error);
        }
      };

      verifyEmail();
    }
  }, [location.search, navigate, notifications]);

  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
};
