import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { store } from './app/store';
import { Paths } from './paths';
import ProfilPage from './pages/Profil';
import SuchePage from './pages/Suche';
import LoginPage from './pages/Login';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <ProfilPage />
  },
  {
    path: Paths.search,
    element: <SuchePage />
  },
  {
    path: Paths.login,
    element: <LoginPage />
  }
])


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
