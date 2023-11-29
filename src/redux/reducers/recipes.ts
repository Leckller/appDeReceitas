import { AnyAction } from 'redux';
import { GlobalState } from '../../types';
import { actions } from '../actions';

const { GET_RECIPES, GET_FILTERS } = actions;

const INITIAL_STATE: GlobalState = {
  recipes: [],
  filters: [],
};

const recipes = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, recipes: action.payload };
    case GET_FILTERS:
      return { ...state, filters: action.payload };
    default:
      return state;
  }
};

export default recipes;
