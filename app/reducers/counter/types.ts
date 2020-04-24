import { Dispatch as ReduxDispatch, Action } from 'redux';

export interface CounterState {
  counter: number;
}

export type Dispatch = ReduxDispatch<Action<string>>;
