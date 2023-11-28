import { Recipes } from '../../types';

export const actions = {
  GET_RESPONSE: 'GET_RESPONSE',
} as const;

const { GET_RESPONSE } = actions;

export const getResponse = (response: Recipes) => ({
  type: GET_RESPONSE,
  payload: response,
});
