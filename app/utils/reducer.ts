import { Action, AnyAction } from 'redux';

interface Handler<S, A> {
  [key: string]: (state: S, action: A) => S;
}

export default function createReducer<S, A extends Action = AnyAction>(
  initState: S,
  handlers: Handler<S, A>
) {
  return (state = initState, action: A) => {
    if (handlers[action.type]) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}
