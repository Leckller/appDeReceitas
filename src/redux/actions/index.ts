import { fecthApi } from '../../services/fetchApi';
import { Dispatch, Drinks, Form, Meals, Path } from '../../types';

export const actions = {
} as const;

export const GETAPI = 'GETAPI';
export const getApi = (response: Meals[] | Drinks[]) => ({
  type: GETAPI,
  payload: response,
});

export const LOADING = 'LOADING';
export const loading = () => ({
  type: LOADING,
});

export const ADDLIST = 'ADDLIST';
export const addList = (form: Form, pathFilter: Path) => {
  return async (dispatch:Dispatch) => {
    dispatch(loading());
    try {
      const response = await fecthApi(form, pathFilter);
      dispatch(getApi(response));
    } catch (error: any) {
      window.alert(error.message);
    }
  };
};
