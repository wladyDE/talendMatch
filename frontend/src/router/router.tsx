import { createBrowserRouter } from 'react-router-dom';

import { Paths } from '../constants/paths';
import ProfilPage from '../pages/Profil';
import SuchePage from '../pages/Suche';


export const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <ProfilPage />
  },
  {
    path: Paths.search,
    element: <SuchePage />
  },
]);