import { AnyAction } from 'redux';
import { GlobalState } from '../../types';
import { actions } from '../actions';

const { GET_FILTERS, SET_LOADING, SET_SEARCH_BAR } = actions;

const INITIAL_STATE: GlobalState = {
  filters: [],
  loading: true,
  searchBar: false,
};

const recipes = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case GET_FILTERS:
      return { ...state, filters: action.payload };
    // case SET_RECIPES:
    //   return { ...state, recipes: action.payload };
    case SET_SEARCH_BAR: { return { ...state, searchBar: !state.searchBar }; }
    default:
      return state;
  }
};

export default recipes;
