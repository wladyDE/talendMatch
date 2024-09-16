import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type Level = "Einsteiger" | "Grundlegend" | "Fortgeschritten" | "Kompetent" | "Sehr erfahren" | "Meisterhaft";

interface ActiveFilter {
  level: Level;
  skill: string
}

const initialState: ActiveFilter[] = []

const activeFiltersSlice = createSlice({
  name: 'activeFilters',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<ActiveFilter>) => {
      const { skill, level } = action.payload;
      const existingFilterIndex = state.findIndex(filter => filter.skill === skill);

      if (existingFilterIndex !== -1) {
        state[existingFilterIndex].level = level;
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { addFilter } = activeFiltersSlice.actions;

export default activeFiltersSlice.reducer;

export const selectActiveFilters = (state: RootState) => state.activeFiltersReducer