import { type IUser } from '../../features/currentUser/currentUserSlice'
import { Skill } from '../../features/skills/skillsSlice';
import { api } from './api'
import { Level } from './levels';

export const currentUserApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<IUser, string>({
            query: (id) => ({
                url: `/employees/${id}`,
                method: 'GET',
            }),
        }),
        addSkill: builder.mutation<void, { employeeId: string; skill: Skill; level: Level }>({
            query: ({ employeeId, skill, level }) => ({
                url: `/employees/${employeeId}/skill`,
                method: 'POST',
                body: { employeeId, skillId : skill.skillId, level : level.levelId },
            }),
        }),
        toggleSkillsVisibility : builder.mutation<void, {employeeId : string, skillsVisibility: boolean}>({
            query: ({ employeeId, skillsVisibility }) => ({
                url: `/employees/${employeeId}/skills-visibility`,
                method: 'PATCH',
                params: { skillsVisibility },  
            }),
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
    useAddSkillMutation,
    useToggleSkillsVisibilityMutation
} = currentUserApi

export const {
    endpoints: {
        getCurrentUser,
        addSkill,
        toggleSkillsVisibility
    }
} = currentUserApi