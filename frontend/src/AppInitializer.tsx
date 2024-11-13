import { ReactNode } from "react";

import { useMsalAuthentication } from "./hooks/useMsalAuthentication";
import Spinner from "./components/spinner/Spinner";
import { useGetSkillsQuery } from "./app/services/skills";
import { useGetEmloyeesQuery } from "./app/services/employees";
import { useGetCurrentUserQuery } from "./app/services/currentUser";
import CustomMessage from "./components/custom-message/CustomMessage";

interface ProtectedAppInitializerProps {
  children: ReactNode;
}

export const AppInitializer = ({ children }: ProtectedAppInitializerProps) => {
  const { inProgress, isAuthenticated } = useMsalAuthentication();
  const { data: skills, isLoading: skillsLoading, isError: skillsError } = useGetSkillsQuery();
  const { data: employees, isLoading: employeesLoading, isError: employeesError } = useGetEmloyeesQuery();
  const { data: currentUser, isLoading: userLoading, isError: userError } = useGetCurrentUserQuery();

  const isLoading = skillsLoading || employeesLoading || userLoading;
  const hasError = skillsError || employeesError || userError

  if (isLoading || ((inProgress === "login" || inProgress === "none") && !isAuthenticated)) {
    return <Spinner />;
  }

  if (hasError) {
    return <CustomMessage message="Fehler beim Laden. Bitte versuchen Sie, die Seite neu zu laden." />;
}

  return <>{children}</>;
};

