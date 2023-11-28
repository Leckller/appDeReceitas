import { ThunkAction, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import reduxRecipes from './reducers/recipes';

export const store = configureStore({
  reducer: {
    recipes: reduxRecipes,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppDispatch = typeof store.dispatch;
