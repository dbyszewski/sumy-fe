import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout.tsx';
import { AdminPanelEvents } from './pages/AdminPanelEvents.tsx';

export const AdminRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
        children={
          <>
            <Route path="/events" element={<AdminPanelEvents />} />
            <Route path="/users" element={<AdminPanelEvents />} />
            <Route path="*" element={<h1>404-xd</h1>} />
          </>
        }
      />
    </Routes>
  );
};
