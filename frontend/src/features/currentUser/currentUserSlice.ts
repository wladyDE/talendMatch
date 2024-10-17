import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";

export interface IUser {
  userId: string;
  skillsVisibility: boolean;
  displayName: string;
  givenName: string;
  surname: string;
  jobTitle: string;
  email: string;
  mobilePhone: string;
  photo: string | null;
  employeeSkills: string[];
  roles: string[];
  groups: string[];
}

const initialState: IUser = {
  userId: '',
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
    }
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;


export const selectCurrentUser = (state: RootState) => state.currentUserreducer
