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
    removeFilter: (state, action: PayloadAction<string>) => {
      const skill = action.payload;

      state.splice(
        state.findIndex(filter => filter.skill === skill),
        1
      );
    },
  },
});

export const { addFilter, removeFilter } = activeFiltersSlice.actions;

export default activeFiltersSlice.reducer;

export const selectActiveFilters = (state: RootState) => state.activeFiltersReducer