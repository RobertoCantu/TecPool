import { useRoutes } from 'react-router-dom';

// Pages and layouts

import DashboardLayout from '../layouts/dashboard';
import Login from '../pages/Login';
import RidesList from '../pages/RidesList';
import CreateRide from '../pages/CreateRide';
import Register from '../pages/Register';

// Components

import Logout from '../components/authentication/Logout';

// Guards

import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
          {
            path: 'register',
            element: (
            <GuestGuard>
                <Register />
            </GuestGuard>
            )
          },
        {
          path: 'logout',
          element: <Logout/>
        },
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '/dashboard', element: <RidesList /> },
        { path: 'create', element: <CreateRide /> },
      ] 
    },
  ])
}