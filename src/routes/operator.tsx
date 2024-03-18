import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>Operator route</div>
      <Outlet />
    </Suspense>
  );
};

export const operatorRoutes = [
  {
    path: '/operator/*',
    element: <App />,
    children: [
      {
        path: 'settings',
        element: <h1>Settings</h1>,
      },
      {
        path: '/',
        element: <h1>Dashboard</h1>,
      },
    ],
  },
];
