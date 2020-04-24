import { Action, Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import { RootState } from './stateTypes';

export type GetState = () => RootState;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<RootState, Action>;
