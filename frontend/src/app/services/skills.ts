
import { Skill } from '../../features/skills/skillsSlice'
import { api } from './api'

export const skillsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query<Skill[], void>({
            query: () => ({
                url: '/skills',
                method: 'GET'
            })
        })
    })
})

export const {
    useGetSkillsQuery,
} = skillsApi

export const {
    endpoints: {
        getSkills,
    }
} = skillsApi