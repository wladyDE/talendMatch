import { createBrowserRouter } from 'react-router-dom';

import { Paths } from '../constants';
import ProfilPage from '../pages/Profil';
import SuchePage from '../pages/Suche';
import { ProtectedRoute } from '../components/protected-route/ProtectedRoute';


export const router = createBrowserRouter([
  {
    path: Paths.home,
    element: (
      <ProtectedRoute>
        <ProfilPage />
      </ProtectedRoute>
    ),
  },
  {
    path: Paths.search,
    element: (
      <ProtectedRoute>
        <SuchePage />
      </ProtectedRoute>
    ),
  },
]);