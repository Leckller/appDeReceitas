import { fecthApi } from '../../services/fetchApi';
import { TypeRecipes, Dispatch, Path, Form } from '../../types';

export const actions = {
  GET_FILTERS: 'GET_FILTERS',
} as const;

const { GET_FILTERS } = actions;

// seta no estado global todos os Filtros
export const getAllFilters = (filter: TypeRecipes) => ({
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
  return data;
};
