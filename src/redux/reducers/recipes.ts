import { AnyAction } from 'redux';
import { GETAPI, LOADING } from '../actions';

const initialState = {
  recipes: [],
  loading: false,
};

const recipesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOADING: { return { ...state, loading: true }; }

    case GETAPI: {
      return { ...state, loading: false, recipes: action.payload };
    }
    default: { return { ...state }; }
  }
};

export default recipesReducer;

// import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import { Dispatch, Drinks, Form, GlobalState, Meals, Path } from '../../types';
// import { fecthApi } from '../../services/fetchApi';

// const initialState: GlobalState = {
//   recipes: [],
// };

// export const recipes = createSlice({
//   name: 'recipes',
//   initialState,
//   reducers: {
//     getApi: (state, action: PayloadAction<Drinks | Meals>) => {
//       state.recipes = action.payload;
//     },
//   },
// });

// export const { getApi } = recipes.actions;

// export const addList = (
//   form: Form,
//   pathFilter: Path,
// ) => async (dispatch: Dispatch) => {
//   try {
//     const response = await fecthApi(form, pathFilter);
//     dispatch(getApi(response));
//   } catch (error: any) {
//     window.alert(error.message);
//   }
// };

// export default recipes.reducer;
