import { AnyAction } from 'redux';
import { GlobalState } from '../../types';
import { actions } from '../actions';

const { GET_RESPONSE } = actions;

const INITIAL_STATE: GlobalState = {
  recipes: [],
};

const recipes = (state = INITIAL_STATE, action: AnyAction): GlobalState => {
  switch (action.type) {
    case GET_RESPONSE:
      return { ...state, recipes: action.payload };
    default:
      return state;
  }
};

export default recipes;
