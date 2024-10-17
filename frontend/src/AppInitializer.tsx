import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { useDispatch } from 'react-redux';
import { useGetAllLevelsQuery } from './app/services/levels';
import { setLevels } from './features/level/levelSlice';
import { useGetCurrentUserQuery } from './app/services/currentUser';
import { setCurrentUser } from './features/currentUser/currentUserSlice';

const AppInitializer = () => {
  const { instance } = useMsal();
  const dispatch = useDispatch();
  const { data: levels } = useGetAllLevelsQuery();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const initializeMsal = async () => {
      if (instance) {
        instance.addEventCallback((event) => {
          if (event.eventType === "msal:loginSuccess") {
            const accounts = instance.getAllAccounts();
            if (accounts.length > 0) {
              instance.setActiveAccount(accounts[0]);
              console.log('Active account was set');
            } else {
              console.error("No accounts found after login");
            }
          }
        });

        await instance.initialize();

        const tokenRequestGraph = {
          scopes: ['https://graph.microsoft.com/.default'],
        };

        const tokenResponseGraph = await instance.acquireTokenSilent(tokenRequestGraph);
        const decodedGraphToken = tokenResponseGraph.idTokenClaims as any;
        const id = decodedGraphToken.oid || null;
        setUserId(id);

        if (levels) {
          dispatch(setLevels(levels));
        }
        console.log("Levels:", levels);
      }
    };

    initializeMsal();
  }, [instance, levels, dispatch]);

  const { data: currentUser } = useGetCurrentUserQuery(userId ?? "", {
    skip: !userId,
  });

  useEffect(() => {
    if (currentUser) {
      dispatch(setCurrentUser(currentUser));
      console.log("Current User:", currentUser);
    }
  }, [currentUser, dispatch]);

  return null;
};

export default AppInitializer;
