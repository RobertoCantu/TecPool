import { Navigate, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import Login from '../pages/Login';
import RidesList from '../pages/RidesList';
import Register from '../pages/Register';

export default function Router() {
    return useRoutes([
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            element: (
              //<GuestGuard>
                <Login />
              //</GuestGuard>
            )
          },
           {
             path: 'register',
             element: (
          //     <GuestGuard>
                 <Register />
          //     </GuestGuard>
             )
           },
          {
            path: 'logout',
            // element: <Logout/>
          },
        ]
      },
  
      // Dashboard Routes
      {
        path: 'dashboard',
        element: (
          //<AuthGuard>
            <DashboardLayout />
          //</AuthGuard>
        ),
        children: [
          { path: '/dashboard', element: <RidesList /> },
        ] 
      },
      // { path: '/', element: <Navigate to="/auth/login" replace /> }
    ])
  }
  
  // Authentication
  // const HomePage = Loadable(lazy(() => import('../pages/HomePage')));