import { useEffect, useState } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

export const useMsalAuthentication = () => {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
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

          const tokenRequestGraph = {
            scopes: ["https://graph.microsoft.com/.default"],
          };

          const tokenResponseGraph = await instance.acquireTokenSilent(tokenRequestGraph);
          const decodedGraphToken = tokenResponseGraph.idTokenClaims as any;
          const id = decodedGraphToken.oid || null;
          setUserId(id);
        } else {
          console.error("No accounts found after login");
        }
      }
    };

    if (isAuthenticated) {
      initializeMsal();
    }
  }, [instance, isAuthenticated]);

  return { userId, inProgress, isAuthenticated };
};
