import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetCurrentUserQuery } from "../app/services/currentUser";
import { setCurrentUser } from "../features/currentUser/currentUserSlice";
import { useGetSkillsQuery } from "../app/services/skills";
import { setSkills } from "../features/skills/skillsSlice";
import { useGetEmloyeesQuery } from "../app/services/users";
import { setEmployees } from "../features/employees/employeesSlice";

export const useLoadData = (userId: string | null) => {
    const dispatch = useDispatch();
    const { data: skills } = useGetSkillsQuery(); 
    const { data: employees } = useGetEmloyeesQuery(); 
    const { data: currentUser } = useGetCurrentUserQuery(userId ?? "", {
        skip: !userId,
    });

    useEffect(() => {
        if (skills && employees) {
            dispatch(setSkills(skills))
            dispatch(setEmployees(employees))
        }
    }, [skills, employees, dispatch]);

    useEffect(() => {
        if (currentUser) {
            dispatch(setCurrentUser(currentUser));
        }
    }, [currentUser, employees, dispatch]);

    return { employees, currentUser };
};
