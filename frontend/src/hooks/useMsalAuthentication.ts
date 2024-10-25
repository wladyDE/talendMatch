import { useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

export const useMsalAuthentication = () => {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

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
      }
    };

    if (isAuthenticated) {
      initializeMsal();
    }
  }, [instance, isAuthenticated]);

  return { inProgress, isAuthenticated };
};
