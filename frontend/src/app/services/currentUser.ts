import { type IUser } from '../../features/currentUser/currentUserSlice'
import { api } from './api'

export const currentUserApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<IUser, string>({  // Теперь query принимает ID как аргумент
            query: (id) => ({
                url: `/employees/${id}`,
                method: 'GET',
            })
        })
    })
})

export const {
    useGetCurrentUserQuery,
} = currentUserApi

export const {
    endpoints: {
        getCurrentUser: getAllLevels,
    }
} = currentUserApi