import { Navigate, Route, Routes } from 'react-router-dom';

import { EventDetailsCard } from './components/EventsTab/EventDetailsCard';
import { UserDetailsCard } from './components/UsersTab/UserDetailsCard';
import { AdminEventsPanel } from './pages/AdminEventsPanel.tsx';

import { AppLayout } from '@/components/Layout/AppLayout';
import { AdminUsersPanel } from '@/features/admin/adminPanel/pages/AdminUsersPanel.tsx';
import { EventsMapPanel } from '@/features/user/userPanel/pages/EventsMapPanel.tsx';

export const AdminRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<AppLayout />}
        children={
          <>
            <Route index element={<Navigate to="/admin/events" />} />
            <Route path="/events" element={<AdminEventsPanel />} />
            <Route path="/events/:eventId" element={<EventDetailsCard />} />
            <Route path="/users" element={<AdminUsersPanel />} />
            <Route path="/users/:userId" element={<UserDetailsCard />} />
            <Route path="/map" element={<EventsMapPanel />} />
            <Route path="*" element={<h1>404</h1>} />
          </>
        }
      />
    </Routes>
  );
};
