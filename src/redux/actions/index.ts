import { Dispatch, Recipes } from '../../types';

export const actions = {
  GET_RESPONSE: 'GET_RESPONSE',
} as const;

const { GET_RESPONSE } = actions;

const getResponse = (response: Recipes) => ({
  type: GET_RESPONSE,
  payload: response,
});

export const addList = (recipes: Recipes) => async (dispatch: Dispatch) => {
  dispatch(getResponse(recipes));
};
