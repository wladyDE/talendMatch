import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

interface ThemeState {
    theme : 'light' | 'dark'
}

const initialState : ThemeState = {
    theme : 'light'
}

const slice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      changeTheme: (state) => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
      },
    },
  });
  

export const { changeTheme } = slice.actions;

export default slice.reducer

export const selectTheme = (state: RootState) => state.themeReducer.theme