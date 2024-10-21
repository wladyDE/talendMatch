import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SkillFilter {
  levelId: string;
  skillId: string;
}

export interface ActiveFilters {
  skillFilters: SkillFilter[],
  nameFilter: string,
  costcenterFilter: string
}

const state = {
  skillFilters: [],
  nameFilter: '',
  costcenterFilter: ''
}

const storedFilters = JSON.parse(
  localStorage.getItem('filters') || JSON.stringify(state)) as ActiveFilters;

const initialState: ActiveFilters = storedFilters

const activeFiltersSlice = createSlice({
  name: 'activeFilters',
  initialState,
  reducers: {
    addSkillFilter: (state, action: PayloadAction<SkillFilter>) => {
      const { skillId, levelId } = action.payload;
      const existingFilterIndex = state.skillFilters.findIndex(filter => filter.skillId === skillId);

      if (existingFilterIndex !== -1) {
        state.skillFilters[existingFilterIndex].levelId = levelId;
      } else {
        state.skillFilters.push(action.payload);
      }

      localStorage.setItem('filters', JSON.stringify(state));
    },
    removeSkillFilter: (state, action: PayloadAction<string>) => {
      const skillId = action.payload;

      state.skillFilters.splice(
        state.skillFilters.findIndex(filter => filter.skillId === skillId),
        1
      );

      localStorage.setItem('filters', JSON.stringify(state));
    },
    changeNameFilter: (state, action: PayloadAction<string>) => {
      state.nameFilter = action.payload

      localStorage.setItem('filters', JSON.stringify(state));
    }
  },
});

export const {
  addSkillFilter,
  removeSkillFilter,
  changeNameFilter
} = activeFiltersSlice.actions;

export default activeFiltersSlice.reducer;

export const selectActiveFilters = (state: RootState) => state.activeFiltersReducer