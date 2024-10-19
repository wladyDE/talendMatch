import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetLevelsQuery } from "../app/services/levels";
import { setLevels } from "../features/levels/levelsSlice";
import { useGetCurrentUserQuery } from "../app/services/currentUser";
import { setCurrentUser } from "../features/currentUser/currentUserSlice";
import { useGetSkillsQuery } from "../app/services/skills";
import { setSkills } from "../features/skills/skillsSlice";
import { useGetEmloyeesQuery } from "../app/services/users";
import { setEmployees } from "../features/employees/employeesSlice";

export const useLoadData = (userId: string | null) => {
    const dispatch = useDispatch();
    const { data: levels } = useGetLevelsQuery();
    const { data: skills } = useGetSkillsQuery(); 
    const { data: employees } = useGetEmloyeesQuery(); 
    const { data: currentUser } = useGetCurrentUserQuery(userId ?? "", {
        skip: !userId,
    });

    useEffect(() => {
        if (levels && skills && employees) {
            dispatch(setLevels(levels));
            dispatch(setSkills(skills))
            dispatch(setEmployees(employees))
            console.log("Levels:", levels);
        }
    }, [levels, skills, employees, dispatch]);

    useEffect(() => {
        if (currentUser) {
            dispatch(setCurrentUser(currentUser));
        }
    }, [currentUser, employees, dispatch]);

    return { levels, employees, currentUser };
};
