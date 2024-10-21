import { ReactNode } from "react";
import { useMsalAuthentication } from "./hooks/useMsalAuthentication";
import { useLoadData } from "./hooks/useLoadData";
import Spinner from "./components/spinner/Spinner";

interface ProtectedAppInitializerProps {
  children: ReactNode;
}

export const AppInitializer = ({ children }: ProtectedAppInitializerProps) => {
  const { userId, inProgress, isAuthenticated } = useMsalAuthentication();
  const { employees, currentUser } = useLoadData(userId);

  if (((inProgress === "login" || inProgress === "none") && !isAuthenticated) 
    || ( !currentUser || !employees)
  ) {
    return <Spinner />;
  }

  return <>{children}</>;
};
