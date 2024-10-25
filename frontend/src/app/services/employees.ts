import { IEmployee } from '../../features/currentUser/currentUserSlice'
import { api } from './api'

export const employeesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getEmloyees: builder.query<IEmployee[], void>({
            query: () => ({
                url: '/employees',
                method: 'GET'
            })
        })
    })
})

export const {
    useGetEmloyeesQuery,
} = employeesApi

export const {
    endpoints: {
        getEmloyees: getLevels,
    }
} = employeesApi