import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout.tsx';

import { EventsMapPage } from '@/features/user/userPanel/pages/EventsMapPage.tsx';
import { UserEventsPanel } from '@/features/user/userPanel/pages/UserEventsPanel.tsx';

export const UserRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
        children={
          <>
            <Route index element={<Navigate to="/events" />} />
            <Route path="/events" element={<UserEventsPanel />} />
            <Route path="/map" element={<EventsMapPage />} />
            <Route path="*" element={<h1>404</h1>} />
          </>
        }
      />
    </Routes>
  );
};
