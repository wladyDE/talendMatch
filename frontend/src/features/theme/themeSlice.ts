import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type ThemeMode = 'light' | 'dark';

interface Theme {
  theme: ThemeMode;
}

const initialState: Theme = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;

export const selectTheme = (state: RootState) => state.themeReducer.theme;

