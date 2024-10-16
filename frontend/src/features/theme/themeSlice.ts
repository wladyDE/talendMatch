import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type ThemeMode = 'light' | 'dark';

export type Theme = {
  theme: ThemeMode;
}

const storedTheme = localStorage.getItem('theme') as ThemeMode || 'light';

const initialState: Theme = {
  theme: storedTheme,
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

