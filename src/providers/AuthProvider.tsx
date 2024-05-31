import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotifications } from '@/hooks/useNotifications.ts';
import { apiClient } from '@/lib/api-client.ts';
export const AuthContext = createContext<AuthContextProps>({
  token: '',
  isAdmin: false,
  loginAction: () => {},
  logOut: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  token: string;
  isAdmin: boolean;
  loginAction: (data: { username: string; password: string }) => void;
  logOut: () => void;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState(localStorage.getItem('site') || '');
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('admin') === 'true');
  const navigate = useNavigate();
  const notifications = useNotifications();

  const loginAction = async (data: { username: string; password: string }) => {
    try {
      const response = await apiClient.post<
        never,
        { access_token: string; token_type: string; user: { isAdmin: boolean } }
      >('/token/login', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.access_token) {
        setToken(response.access_token);
        setIsAdmin(response.user.isAdmin);
        localStorage.setItem('site', response.access_token);
        localStorage.setItem('admin', response.user.isAdmin.toString());
        notifications.addNotification({
          type: 'success',
          message: 'Zalogowano pomyślnie',
        });
        navigate('/');
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    setToken('');
    localStorage.removeItem('site');
    localStorage.removeItem('admin');
    notifications.addNotification({
      type: 'success',
      message: 'Wylogowano pomyślnie',
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
