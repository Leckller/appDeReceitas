import { AnyAction } from 'redux';
import { GlobalState } from '../../types';
import { actions } from '../actions';

const { GET_FILTERS, SET_LOADING } = actions;

const INITIAL_STATE: GlobalState = {
  recipes: [],
  filters: [],
  loading: false,
};

const recipes = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case GET_FILTERS:
      return { ...state, filters: action.payload };
    // case SET_RECIPES:
    //   return { ...state, recipes: action.payload };
    default:
      return state;
  }
};

export default recipes;
