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
        addSkillToEmployee: builder.mutation<void, { employeeId: string; skillId: number; level: number }>({
            query: ({ employeeId, skillId, level }) => ({
                url: `/employees/${employeeId}/skill`,
                method: 'POST',
                body: { employeeId, skillId, level },
            }),
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
    useAddSkillToEmployeeMutation,
} = currentUserApi

export const {
    endpoints: {
        getCurrentUser,
        addSkillToEmployee
    }
} = currentUserApi