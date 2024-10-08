import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type Level = "Einsteiger" | "Grundlegend" | "Fortgeschritten" | "Kompetent" | "Sehr erfahren" | "Meisterhaft";

interface ActiveFilter {
  level: Level;
  skill: string
}

const storedFilters = JSON.parse(
  localStorage.getItem('filters') || '[]') as ActiveFilter[];

const initialState: ActiveFilter[] = storedFilters

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

      localStorage.setItem('filters', JSON.stringify(state));
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      const skill = action.payload;

      state.splice(
        state.findIndex(filter => filter.skill === skill),
        1
      );

      localStorage.setItem('filters', JSON.stringify(state));
    },
  },
});

export const { addFilter, removeFilter } = activeFiltersSlice.actions;

export default activeFiltersSlice.reducer;

export const selectActiveFilters = (state: RootState) => state.activeFiltersReducer