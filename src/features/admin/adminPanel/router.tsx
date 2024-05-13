import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout.tsx';
import { AdminPanel } from './pages/AdminPanel.tsx';

export const AdminRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
        children={
          <>
            <Route path="/" element={<AdminPanel />} />
            <Route path="*" element={<h1>404-xd</h1>} />
          </>
        }
      />
    </Routes>
  );
};
