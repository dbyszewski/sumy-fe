import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { axios } from '@/lib/axios.ts';
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
      const response = await axios.post('/token/login', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.data.access_token) {
        setToken(response.data.access_token);
        localStorage.setItem('site', response.data.access_token);
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
