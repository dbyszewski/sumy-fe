import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useNotifications } from '@/hooks/useNotifications.ts';
import { apiClient } from '@/lib/api-client.ts';

export const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const notifications = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      const verifyEmail = async () => {
        try {
          await apiClient.patch('/users/verify_email', { token });
          navigate('/auth/login');
          notifications.addNotification({
            message: 'Email został potwierdzony',
            type: 'success',
          });
        } catch (error) {
          console.error('Error verifying email:', error);
        }
      };

      verifyEmail();
    }
  }, [location, notifications, navigate]);

  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
};
