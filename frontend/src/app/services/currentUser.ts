import { type IUser } from '../../features/currentUser/currentUserSlice'
import { api } from './api'

export const currentUserApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<IUser, string>({
            query: (id) => ({
                url: `/employees/${id}`,
                method: 'GET',
            }),
        }),
        addSkill: builder.mutation<void, { employeeId: string; skillId: number; level: number }>({
            query: ({ employeeId, skillId, level }) => ({
                url: `/employees/${employeeId}/skill`,
                method: 'POST',
                body: { employeeId, skillId, level },
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