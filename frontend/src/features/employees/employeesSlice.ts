import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { IUser } from '../currentUser/currentUserSlice';

const initialState: IUser[] = [];

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<IUser[]>) => {
      return action.payload;     
    },
  },
});

export const { setEmployees } = employeesSlice.actions;

export default employeesSlice.reducer;


export const selectEmployees = (state: RootState) => state.employeesReducer