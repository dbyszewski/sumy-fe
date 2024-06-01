import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/components/Layout/AppLayout';
import { EventsMapPanel } from '@/features/user/userPanel/pages/EventsMapPanel.tsx';
import { UserEventsPanel } from '@/features/user/userPanel/pages/UserEventsPanel.tsx';
import { UserSettingsPanel } from '@/features/user/userPanel/pages/UserSettingsPanel.tsx';

export const UserRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<AppLayout />}
        children={
          <>
            <Route index element={<Navigate to="/user/events" />} />
            <Route path="/events" element={<UserEventsPanel />} />
            <Route path="/map" element={<EventsMapPanel />} />
            <Route path="/settings" element={<UserSettingsPanel />} />
            <Route path="*" element={<h1>404</h1>} />
          </>
        }
      />
    </Routes>
  );
};
