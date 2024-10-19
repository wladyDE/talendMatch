import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";

export type Level = {
  levelId : string;
  levelName: string;  
}

interface LevelsState {
  levels: Level[];
}

const initialState: LevelsState = {
  levels: [], 
};

const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    setLevels: (state, action) => {
      state.levels = action.payload;
    },
  },
});

export const { setLevels } = levelsSlice.actions;

export default levelsSlice.reducer;

export const selectLevels = (state: RootState) => state.levelsReducer.levels
