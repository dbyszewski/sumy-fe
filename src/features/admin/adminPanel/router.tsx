import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout.tsx';
import { AdminPanelEvents } from './pages/AdminPanelEvents.tsx';

import { AdminPanelUsers } from '@/features/admin/adminPanel/pages/AdminPanelUsers.tsx';
import { EventsMapPage } from '@/features/admin/adminPanel/pages/EventsMapPage.tsx';

export const AdminRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
        children={
          <>
            <Route index element={<Navigate to="/admin/events" />} />
            <Route path="/events" element={<AdminPanelEvents />} />
            <Route path="/users" element={<AdminPanelUsers />} />
            <Route path="/map" element={<EventsMapPage />} />
            <Route path="*" element={<h1>404</h1>} />
          </>
        }
      />
    </Routes>
  );
};
