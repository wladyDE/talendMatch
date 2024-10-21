import { api } from './api'

export interface Group {
    id : string; 
    displayName : string; 
}

export const groupsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getGroups: builder.query<Group[], void>({
            query: () => ({
                url: '/groups',
                method: 'GET'
            })
        })
    })
})

export const {
    useGetGroupsQuery,
} = groupsApi

export const {
    endpoints: {
        getGroups,
    }
} = groupsApi