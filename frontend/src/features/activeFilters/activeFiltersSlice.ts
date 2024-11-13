import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IOption } from '../../components/custom-select/CustomSelect';

export interface SkillFilter {
  levelId: string;
  skillId: string;
}

export interface ActiveFilters {
  skillFilters: SkillFilter[],
  nameFilter: string,
  costcenterFilter: IOption
}

export const defaultFilterState = {
  skillFilters: [],
  nameFilter: '',
  costcenterFilter: { id: '0', displayName: '-' }
}

const storedFilters = JSON.parse(
  localStorage.getItem('filters') || JSON.stringify(defaultFilterState)) as ActiveFilters;

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
    },
    changeCostcenterFilter: (state, action: PayloadAction<IOption>) => {
      state.costcenterFilter = action.payload

      localStorage.setItem('filters', JSON.stringify(state));
    }
  },
});

export const {
  addSkillFilter,
  removeSkillFilter,
  changeNameFilter,
  changeCostcenterFilter
} = activeFiltersSlice.actions;

export default activeFiltersSlice.reducer;

export const selectActiveFilters = (state: RootState) => state.activeFiltersReducer