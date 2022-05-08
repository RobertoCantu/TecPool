import { useRoutes, Navigate } from 'react-router-dom';

// Pages and layouts

import DashboardLayout from '../layouts/dashboard';
import Login from '../pages/Login';
import RidesList from '../pages/RidesList';
import CreateRide from '../pages/CreateRide';
import Register from '../pages/Register';

// Components

import Logout from '../components/authentication/Logout';
import { AddRoute } from '../pages/AddRoute';
import UserDetails from '../pages/UserDetails';
import RideDetails from '../pages/RideDetails';

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
          { path: 'profile', element: <UserDetails /> },
          { path: 'rides/:rideId', element: <RideDetails /> },
          { path: 'rides/edit/:rideId', element: <AddRoute mainText='Modifica tu ruta' secondaryText='Modifica los siguientes datos para actualizar tu ruta' /> },
          { path: 'rides/addRoute', element: <AddRoute mainText='Agrega una nueva ruta' secondaryText='Ingresa los siguientes datos para crear tu nueva ruta' /> },
        ] 
      },
      { path: '/', element: <Navigate to="/auth/login" replace /> }
    ])
  }
