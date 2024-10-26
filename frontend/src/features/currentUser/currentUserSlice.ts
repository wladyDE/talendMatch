import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { type Level } from '../../app/services/levels';
import { type Skill } from '../skills/skillsSlice';
import { currentUserApi } from '../../app/services/currentUser';

export interface EmployeeSkill {
  skill: Skill,
  level: Level
}

export interface IEmployee {
  employeeId: string;
  skillsVisibility: boolean;
  displayName: string;
  mail: string;
  jobTitle: string;
  department: string;
  officeLocation: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  mobilePhone: string;
  photo: string | null;
  employeeSkills: EmployeeSkill[];
}

const initialState: IEmployee = {
  employeeId: '',
  skillsVisibility: false,
  displayName: '',
  mail: '',
  jobTitle: '',
  department: '',
  officeLocation: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  mobilePhone: '',
  photo: null,
  employeeSkills: [],
};

const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(currentUserApi.endpoints.getCurrentUser.matchFulfilled, (state, action) => {
        return action.payload
      })
      .addMatcher(currentUserApi.endpoints.addSkill.matchFulfilled, (state, action) => {
        const { skill, level } = action.meta.arg.originalArgs;

        const existingSkill = state.employeeSkills.findIndex(
          employeeSkill => employeeSkill.skill.skillId === skill.skillId
        );

        if (existingSkill === -1) {
          state.employeeSkills.push({ skill, level });
        } else if (state.employeeSkills[existingSkill].level.levelId !== level.levelId) {
          state.employeeSkills[existingSkill].level = level;
        }
      })
      .addMatcher(currentUserApi.endpoints.toggleSkillsVisibility.matchFulfilled, (state, action) => {
        const { skillsVisibility } = action.meta.arg.originalArgs;
        state.skillsVisibility = skillsVisibility
      })
  }
});

export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.currentUserreducer
