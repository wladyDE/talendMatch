import { createSlice } from '@reduxjs/toolkit';

import { RootState } from "../../app/store";
import { IEmployee } from '../currentUser/currentUserSlice';
import { employeesApi } from '../../app/services/employees';

const initialState: IEmployee[] = [];

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(employeesApi.endpoints.getEmloyees.matchFulfilled, (state, action) => {
        return action.payload;
      })
  }
});

export default employeesSlice.reducer;



export const selectEmployees = (state: RootState) => state.employeesReducer