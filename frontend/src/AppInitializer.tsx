import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { useDispatch } from 'react-redux';
import { useGetAllLevelsQuery } from './app/services/levels';
import { setLevels } from './features/levels/levelsSlice';

const AppInitializer = () => {
  const { instance } = useMsal();
  const dispatch = useDispatch();
  const { data: levels } = useGetAllLevelsQuery();

  useEffect(() => {
    const initializeMsal = async () => {
      if (!instance) {
        console.error("MSAL instance is not initialized");
      } else {
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
  
        if (levels) {
          dispatch(setLevels(levels));
        }
      }
    };
  
    initializeMsal();
  }, [instance, levels, dispatch]);

  return null
}  

export default AppInitializer; 