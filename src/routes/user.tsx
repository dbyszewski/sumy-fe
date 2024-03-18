import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>User Route</div>
      <Outlet />
    </Suspense>
  );
};

export const userRoutes = [
  {
    path: '/app/*',
    element: <App />,
    children: [
      {
        path: 'settings',
        element: <h1>Settings</h1>,
      },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
