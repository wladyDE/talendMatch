import { ReactNode } from "react";

import { useMsalAuthentication } from "./hooks/useMsalAuthentication";
import Spinner from "./components/spinner/Spinner";
import { useGetSkillsQuery } from "./app/services/skills";
import { useGetEmloyeesQuery } from "./app/services/employees";
import { useGetCurrentUserQuery } from "./app/services/currentUser";

interface ProtectedAppInitializerProps {
  children: ReactNode;
}

export const AppInitializer = ({ children }: ProtectedAppInitializerProps) => {
  const { inProgress, isAuthenticated } = useMsalAuthentication();
  const { data: skills, isLoading: skillsLoading } = useGetSkillsQuery();
  const { data: employees, isLoading: employeesLoading } = useGetEmloyeesQuery();
  const { data: currentUser, isLoading: userLoading } = useGetCurrentUserQuery()

  const isLoading = skillsLoading || employeesLoading || userLoading;

  if (isLoading || ((inProgress === "login" || inProgress === "none") && !isAuthenticated)) {
    return <Spinner />;
  }

  return <>{children}</>;
};

