import { fecthApi } from '../../services/fetchApi';
import { Dispatch, Drinks, Form, Meals, Path } from '../../types';

export const actions = {
  GET_RESPONSE: 'GET_RESPONSE',
} as const;

const { GET_RESPONSE } = actions;

const getResponse = (response: Drinks | Meals) => ({
  type: GET_RESPONSE,
  payload: response,
});

export const addList = (
  form: Form,
  pathFilter: Path,
) => async (dispatch: Dispatch) => {
  try {
    const response = await fecthApi(form, pathFilter);
    dispatch(getResponse(response));
  } catch (error: any) {
    window.alert(error.message);
  }
};
