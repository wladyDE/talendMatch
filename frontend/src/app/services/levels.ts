import { Level } from '../../features/levels/levelsSlice'
import { api } from './api'

export const levelsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllLevels : builder.query<Level[], void>({
            query: () => ({
                url: '/levels',
                method: 'GET'
            })
        })
    })
})

export const {
    useGetAllLevelsQuery,
} = levelsApi

export const {
    endpoints : {
        getAllLevels,
    }
} = levelsApi