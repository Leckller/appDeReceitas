import { AnyAction } from 'redux';
import { Recipes } from '../../types';
import { actions } from '../actions';

const { GET_RESPONSE } = actions;

const INITIAL_STATE: Recipes = [];

const recipes = (state = INITIAL_STATE, action: AnyAction): Recipes => {
  switch (action.type) {
    case GET_RESPONSE:
      return action.payload;
    default:
      return state;
  }
};

export default recipes;

