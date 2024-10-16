import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice'
import activeFiltersReducer from '../features/activeFilters/activeFiltersSlice';
import levelsReducer from '../features/levels/levelsSlice';
import {api} from './services/api'

export const store = configureStore({
  reducer: {
    themeReducer,
    activeFiltersReducer,
    levelsReducer,
    [api.reducerPath] : api.reducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
