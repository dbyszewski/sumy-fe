import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiClient } from '@/lib/api-client.ts';
export const AuthContext = createContext<AuthContextProps>({
  token: '',
  loginAction: () => {},
  logOut: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  token: string;
  loginAction: (data: { username: string; password: string }) => void;
  logOut: () => void;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState(localStorage.getItem('site') || '');
  const navigate = useNavigate();

  const loginAction = async (data: { username: string; password: string }) => {
    try {
      const response = await apiClient.post<never, { access_token: string; token_type: string }>(
        '/token/login',
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      if (response.access_token) {
        setToken(response.access_token);
        localStorage.setItem('site', response.access_token);
        navigate('/');
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setToken('');
    localStorage.removeItem('site');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ token, loginAction, logOut }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
