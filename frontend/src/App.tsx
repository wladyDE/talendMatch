import { RouterProvider } from 'react-router-dom';
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./config/msalConfig";
import { router } from './router/router';
import AppInitializer from './AppInitializer';

export const App = () => {

  return (
    <MsalProvider instance={msalInstance}>
      <AppInitializer />
      <RouterProvider router={router} />
    </MsalProvider>
  );
};