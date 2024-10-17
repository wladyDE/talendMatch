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

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    setLevels: (state, action) => {
      state.levels = action.payload;
    },
  },
});

export const { setLevels } = levelSlice.actions;

export default levelSlice.reducer;

export const selectLevels = (state: RootState) => state.levelsReducer.levels
