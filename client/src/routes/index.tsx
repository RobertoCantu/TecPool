import { Navigate, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import Login from '../pages/Login';
import RidesList from '../pages/RidesList';
import CreateRide from '../pages/CreateRide';
import Register from '../pages/Register';
import Logout from '../components/authentication/Logout';
import MapInput from '../components/inputs/MapInput';

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
          {
            path: 'map',
            element: <MapInput/>
          }
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
      // { path: '/', element: <Navigate to="/auth/login" replace /> }
    ])
  }
  
  // Authentication
  // const HomePage = Loadable(lazy(() => import('../pages/HomePage')));