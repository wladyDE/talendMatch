import { api } from './api'

export type Level = {
    levelId : string;
    levelName: string;  
  }

export const levelsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getLevels: builder.query<Level[], void>({
            query: () => ({
                url: '/levels',
                method: 'GET'
            })
        })
    })
})

export const {
    useGetLevelsQuery,
} = levelsApi

export const {
    endpoints: {
        getLevels,
    }
} = levelsApi