import { type IEmployee } from '../../features/currentUser/currentUserSlice'
import { Skill } from '../../features/skills/skillsSlice';
import { api } from './api'
import { Level } from './levels';

export const currentUserApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<IEmployee, void>({
            query: () => ({
                url: `employees/me`,
                method: 'GET',
            }),
        }),
        addSkill: builder.mutation<void, { skill: Skill; level: Level }>({
            query: ({ skill, level }) => ({
                url: `/employees/me/skill`,
                method: 'POST',
                body: { skillId: skill.skillId, level: level.levelId },
            }),
        }),
        toggleSkillsVisibility: builder.mutation<void, { skillsVisibility: boolean }>({
            query: ({ skillsVisibility }) => ({
                url: `employees/me/skills-visibility`,
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