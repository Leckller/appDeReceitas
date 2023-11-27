import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type GlobalState = {
  user: User,
};

export type User = {
  email: string,
  password: string,
};

export type Dispatch = ThunkDispatch<GlobalState, void, Action>;
