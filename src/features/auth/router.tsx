import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout.tsx';
import { Login } from './pages/Login.tsx';
import { Register } from './pages/Register.tsx';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
        children={
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        }
      />
    </Routes>
  );
};
