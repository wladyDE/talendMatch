import { ReactNode, useEffect } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

interface ProtectedRouteProps {
  children: ReactNode;  
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useIsAuthenticated();
  const { instance, inProgress } = useMsal();

  useEffect(() => {
    if (!isAuthenticated && inProgress === "none") {
      instance.loginRedirect();
    }
  }, [isAuthenticated, inProgress, instance]);

  if (inProgress === "login") {
    return <div>Logging in...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
};

