import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetAllLevelsQuery } from "../app/services/levels";
import { setLevels } from "../features/level/levelSlice";
import { useGetCurrentUserQuery } from "../app/services/currentUser";
import { setCurrentUser } from "../features/currentUser/currentUserSlice";

export const useLoadData = (userId: string | null) => {
  const dispatch = useDispatch();
  const { data: levels } = useGetAllLevelsQuery();
  const { data: currentUser } = useGetCurrentUserQuery(userId ?? "", {
    skip: !userId,
  });

  useEffect(() => {
    if (levels) {
      dispatch(setLevels(levels));
      console.log("Levels:", levels);
    }
  }, [levels, dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(setCurrentUser(currentUser));
      console.log("Current User:", currentUser);
    }
  }, [currentUser, dispatch]);

  return { levels, currentUser };
};
