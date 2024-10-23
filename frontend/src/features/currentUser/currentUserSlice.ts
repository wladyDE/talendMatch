import { createSlice} from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { type Level } from '../../app/services/levels';
import { type Skill } from '../skills/skillsSlice';
import { type Group } from '../../app/services/groups';
import { currentUserApi } from '../../app/services/currentUser';

export interface EmployeeSkill {
  skill: Skill,
  level: Level
}

export interface IUser {
  employeeId: string;
  skillsVisibility: boolean;
  displayName: string;
  givenName: string;
  surname: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  photo: string | null;
  employeeSkills: EmployeeSkill[];
  groups: Group[];
}

const initialState: IUser = {
  employeeId: '',
  skillsVisibility: false,
  displayName: '',
  givenName: '',
  surname: '',
  jobTitle: '',
  mail: '',
  mobilePhone: '',
  photo: null,
  employeeSkills: [],
  groups: []
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
