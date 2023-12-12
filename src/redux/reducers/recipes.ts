import { AnyAction } from 'redux';
import { GlobalState } from '../../types';
import { actions } from '../actions';

const { GET_FILTERS, SET_LOADING, SET_SEARCH_BAR, SET_VISIBLE_RECIPES } = actions;

const INITIAL_STATE: GlobalState = {
  filters: [],
  loading: true,
  searchBar: false,
  visibleRecipes: 12,
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
    case SET_VISIBLE_RECIPES: {
      if (state.filters.length <= state.visibleRecipes) {
        return { ...state };
      }
      if (action.payload) {
        return { ...state, visibleRecipes: 12 };
      }
      return { ...state, visibleRecipes: state.visibleRecipes + 6 }; }
    default:
      return state;
  }
};

export default recipes;
