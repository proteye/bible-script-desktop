import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import * as reducers from './reducers';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    ...reducers
  });
}
