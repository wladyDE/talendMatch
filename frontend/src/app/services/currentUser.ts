import { type IEmployee } from '../../features/currentUser/currentUserSlice'
import { Skill } from '../../features/skills/skillsSlice';
import { api } from './api'
import { Level } from './levels';

export const currentUserApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<IEmployee, void>({
            query: () => ({
                url: `/me`,
                method: 'GET',
            }),
        }),
        addSkill: builder.mutation<void, { skill: Skill; level: Level }>({
            query: ({ skill, level }) => ({
                url: `/me/skill`,
                method: 'POST',
                body: { skillId: skill.skillId, levelId: level.levelId },
            }),
        }),
        toggleSkillsVisibility: builder.mutation<void, { skillsVisibility: boolean }>({
            query: ({ skillsVisibility }) => ({
                url: `/me/skills-visibility`,
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