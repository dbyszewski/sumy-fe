import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout.tsx';

import { EventsMapPanel } from '@/features/user/userPanel/pages/EventsMapPanel.tsx';
import { UserEventsPanel } from '@/features/user/userPanel/pages/UserEventsPanel.tsx';
import { UserSettingsPanel } from '@/features/user/userPanel/pages/UserSettingPanel.tsx';
import { SettingsProvider } from '@/providers/SettingsProvider.tsx';

export const UserRouter = () => {
  return (
    <SettingsProvider>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
          children={
            <>
              <Route index element={<Navigate to="/events" />} />
              <Route path="/events" element={<UserEventsPanel />} />
              <Route path="/map" element={<EventsMapPanel />} />
              <Route path="/settings" element={<UserSettingsPanel />} />
              <Route path="*" element={<h1>404</h1>} />
            </>
          }
        />
      </Routes>
    </SettingsProvider>
  );
};
