import { useEffect, useState } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useDispatch } from "react-redux";
import { useGetAllLevelsQuery } from "./app/services/levels";
import { setLevels } from "./features/level/levelSlice";
import { useGetCurrentUserQuery } from "./app/services/currentUser";
import { setCurrentUser } from "./features/currentUser/currentUserSlice";
import { ReactNode } from "react";
import Spinner from "./components/spinner/Spinner";

interface ProtectedAppInitializerProps {
  children: ReactNode;
}

export const AppInitializer = ({ children }: ProtectedAppInitializerProps) => {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useDispatch();
  const { data: levels } = useGetAllLevelsQuery();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated && inProgress === "none") {
      instance.loginRedirect();
    }
  }, [isAuthenticated, inProgress, instance]);

  useEffect(() => {
    const initializeMsal = async () => {
      if (instance && isAuthenticated) {
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
          instance.setActiveAccount(accounts[0]);
          console.log("Active account was set");
        } else {
          console.error("No accounts found after login");
        }

        const tokenRequestGraph = {
          scopes: ["https://graph.microsoft.com/.default"],
        };

        const tokenResponseGraph = await instance.acquireTokenSilent(tokenRequestGraph);
        const decodedGraphToken = tokenResponseGraph.idTokenClaims as any;
        const id = decodedGraphToken.oid || null;
        setUserId(id);

        if (levels) {
          dispatch(setLevels(levels));
        }
      }
    };

    if (isAuthenticated) {
      initializeMsal();
    }
  }, [instance, isAuthenticated, levels, dispatch]);

  const { data: currentUser } = useGetCurrentUserQuery(userId ?? "", {
    skip: !userId,
  });

  useEffect(() => {
    if (currentUser) {
      dispatch(setCurrentUser(currentUser));
      console.log("Current User:", currentUser);
    }
  }, [currentUser, dispatch]);

  if (((inProgress === "login" || inProgress === "none") && !isAuthenticated) 
    || (!levels || !currentUser)
  ) {
    return <Spinner />
  }

  return <>{children}</>;
};
