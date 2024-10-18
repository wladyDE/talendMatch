import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";

export type Level = {
  levelId : string;
  levelName: string;  
}

interface LevelState {
  levels: Level[];
}

const initialState: LevelState = {
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
