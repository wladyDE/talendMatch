import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { Skill } from '../skills/skillsSlice';
import { Level } from '../levels/levelsSlice';

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
  email: string;
  mobilePhone: string;
  photo: string | null;
  employeeSkills: EmployeeSkill[];
  roles: string[];
  groups: string[];
}

const initialState: IUser = {
  employeeId: '',
  skillsVisibility: false,
  displayName: '',
  givenName: '',
  surname: '',
  jobTitle: '',
  email: '',
  mobilePhone: '',
  photo: null,
  employeeSkills: [],
  roles: [],
  groups: []
};

const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      return action.payload
    },
    addSkill: (state, action: PayloadAction<EmployeeSkill>) => {
      const { skill, level } = action.payload

      const existingSkill = state.employeeSkills.findIndex(
        employeeSkill => employeeSkill.skill.skillId === skill.skillId)

      if (existingSkill === -1) {
        state.employeeSkills.push(action.payload)
      } else if (state.employeeSkills[existingSkill].level.levelId !== level.levelId) {
        state.employeeSkills[existingSkill].level = level
      }

    }
  },
});

export const { setCurrentUser, addSkill } = userSlice.actions;

export default userSlice.reducer;


export const selectCurrentUser = (state: RootState) => state.currentUserreducer
