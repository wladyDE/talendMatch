import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice'
import activeFiltersReducer from '../features/activeFilters/activeFiltersSlice';

export const store = configureStore({
  reducer: {
    themeReducer,
    activeFiltersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
