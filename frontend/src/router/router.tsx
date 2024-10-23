import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Paths } from '../constants/paths';
import ProfilPage from '../pages/Profil';
import SuchePage from '../pages/Suche';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={Paths.profile} replace />,
  },
  {
    path: Paths.profile,
    element: <ProfilPage />
  },
  {
    path: Paths.search,
    element: <SuchePage />
  },
  {
    path: `${Paths.profile}/:id`,
    element: <ProfilPage />
  }
]);