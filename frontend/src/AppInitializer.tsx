import { ReactNode } from "react";
import { useMsalAuthentication } from "./hooks/useMsalAuthentication";
import Spinner from "./components/spinner/Spinner";
import { useGetSkillsQuery } from "./app/services/skills";
import { useGetEmloyeesQuery } from "./app/services/users";
import { useGetCurrentUserQuery } from "./app/services/currentUser";

interface ProtectedAppInitializerProps {
  children: ReactNode;
}

export const AppInitializer = ({ children }: ProtectedAppInitializerProps) => {
  const { userId, inProgress, isAuthenticated } = useMsalAuthentication();
  const { data: skills, isLoading: skillsLoading, isError: skillsError } = useGetSkillsQuery();
  const { data: employees, isLoading: employeesLoading, isError: employeesError } = useGetEmloyeesQuery();
  const { data: currentUser, isLoading: userLoading, isError: userError } = useGetCurrentUserQuery(userId ?? "", {
      skip: !userId,
  });

  const isLoading = skillsLoading || employeesLoading || userLoading;
  const isError = skillsError || employeesError || userError;
  
  if (isLoading || ((inProgress === "login" || inProgress === "none") && !isAuthenticated)) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Error while loading data...</p>;
  }

  return <>{children}</>;
};

