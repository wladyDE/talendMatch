import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetLevelsQuery } from "../app/services/levels";
import { setLevels } from "../features/levels/levelsSlice";
import { useGetCurrentUserQuery } from "../app/services/currentUser";
import { setCurrentUser } from "../features/currentUser/currentUserSlice";
import { useGetSkillsQuery } from "../app/services/skills";
import { setSkills } from "../features/skills/skillsSlice";

export const useLoadData = (userId: string | null) => {
    const dispatch = useDispatch();
    const { data: levels } = useGetLevelsQuery();
    const { data: skills } = useGetSkillsQuery(); 
    const { data: currentUser } = useGetCurrentUserQuery(userId ?? "", {
        skip: !userId,
    });

    useEffect(() => {
        if (levels && skills) {
            dispatch(setLevels(levels));
            dispatch(setSkills(skills))
            console.log("Levels:", levels);
            console.log("Skills", skills)
        }
    }, [levels, skills, dispatch]);

    useEffect(() => {
        if (currentUser) {
            dispatch(setCurrentUser(currentUser));
            console.log("Current User:", currentUser);
        }
    }, [currentUser, dispatch]);

    return { levels, currentUser };
};
