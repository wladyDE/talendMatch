import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { IUser } from '../currentUser/currentUserSlice';
import { employeesApi } from '../../app/services/users';

const initialState: IUser[] = [];

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(employeesApi.endpoints.getEmloyees.matchFulfilled, (state, action) => {
        return action.payload
      })
  }
});

export default employeesSlice.reducer;


export const selectEmployees = (state: RootState) => state.employeesReducer