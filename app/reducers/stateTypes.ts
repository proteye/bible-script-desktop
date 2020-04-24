import { RouterState } from 'connected-react-router';
import { BibleState } from './bible/types';
import { CounterState } from './counter/types';

export { BibleState } from './bible/types';
export { CounterState } from './counter/types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StoreEnhancerState {}

export interface RootState extends StoreEnhancerState {
  router: RouterState;
  bible: BibleState;
  counter: CounterState;
}
