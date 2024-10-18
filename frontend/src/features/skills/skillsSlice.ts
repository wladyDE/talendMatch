import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SkillCategory {
    skillCategoryId: number;
    skillCategoryName: string;
}

export interface SkillSubcategory {
    skillSubcategoryId: number;
    skillSubcategoryName: string;
    skillCategory: SkillCategory;
}

export interface Skill {
    skillId: number;
    skillName: string;
    skillSubcategory: SkillSubcategory;
}

export interface SkillState {
    skills : Skill[]
}

const initialState: SkillState = {
    skills: []
}

const skillSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        setSkills: (state, action) => {
            state.skills = action.payload
        },
    },
});

export const { setSkills } = skillSlice.actions;

export default skillSlice.reducer;

export const selectSkills = (state: RootState) => state.skillReducer.skills

