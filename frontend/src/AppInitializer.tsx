import { ReactNode } from "react";
import { useMsalAuthentication } from "./hooks/useMsalAuthentication";
import { useLoadData } from "./hooks/useLoadData";
import Spinner from "./components/spinner/Spinner";

interface ProtectedAppInitializerProps {
  children: ReactNode;
}

export const AppInitializer = ({ children }: ProtectedAppInitializerProps) => {
  const { userId, inProgress, isAuthenticated } = useMsalAuthentication();
  const { employees, currentUser, skills } = useLoadData(userId);

  if (((inProgress === "login" || inProgress === "none") && !isAuthenticated) 
    || ( !currentUser || !employees || !skills)
  ) {
    return <Spinner />;
  }

  return <>{children}</>;
};
