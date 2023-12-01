import { fecthApi } from '../../services/fetchApi';
import { TypeRecipes, Dispatch, Path, Form } from '../../types';

export const actions = {
  GET_FILTERS: 'GET_FILTERS',
  SET_LOADING: 'SET_LOADING',
  // SET_RECIPES: 'SET_RECIPES',
} as const;

const { GET_FILTERS, SET_LOADING } = actions;

export const setLoading = (boolean: boolean) => ({
  type: SET_LOADING,
  payload: boolean,
});

// seta no estado global todos os Filtros
export const getAllFilters = (filter: TypeRecipes[]) => ({
  type: GET_FILTERS,
  payload: filter,
});

// faz o fecth e o filtro na API de forma dinâmica e Dispara getAllFilters.
export const setAnyFilterInGlobal = (
  form: Form,
  path: Path,
  filter: string = '',
) => async (dispatch: Dispatch) => {
  const { search = '', key } = form;
  const data = await fecthApi({ key, search }, path, filter);
  dispatch(getAllFilters(data));
  dispatch(setLoading(false));

  return data;
};

// // seta no estado global todos os Filtros
// export const setRecipes = (recipes: TypeRecipes[]) => ({
//   type: SET_RECIPES,
//   payload: recipes,
// });

// // faz o fecth e o filtro na API de forma dinâmica e Dispara getAllFilters.
// export const getRecipes = (
//   form: Form,
//   path: Path,
//   filter: string = '',
// ) => async (dispatch: Dispatch) => {
//   const { search = '', key } = form;
//   const data = await fecthApi({ key, search }, path, filter);
//   dispatch(setRecipes(data));
//   dispatch(setLoading(false));

//   return data;
// };
