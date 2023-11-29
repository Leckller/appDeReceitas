import { fecthApi } from '../../services/fetchApi';
import { TypeRecipes, Dispatch, Path } from '../../types';

export const actions = {
  GET_RECIPES: 'GET_RECIPES',
  GET_FILTERS: 'GET_FILTERS',
} as const;

const { GET_RECIPES, GET_FILTERS } = actions;

// seta no estado global as Receitas
export const getRecipes = (response: TypeRecipes) => ({
  type: GET_RECIPES,
  payload: response,
});

// seta no estado global os Filtros das Categorias
export const getFilters = (filter: TypeRecipes) => ({
  type: GET_FILTERS,
  payload: filter,
});

// faz o fecth e o filtro na API de forma dinâmica e Dispara para qualquer State Global.
export const setAnyFilterInGlobal = (
  key: string = '',
  path: Path,
  filter: string = '',
) => async (dispatch: Dispatch) => {
  const data = await fecthApi({ key }, path, filter);
  dispatch(getFilters(data));
};
