import { RouterState } from 'connected-react-router';
import { BibleState } from './bible/types';
import { WorkspaceState } from './workspace/types';

export { BibleState } from './bible/types';
export { WorkspaceState } from './workspace/types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StoreEnhancerState {}

export interface RootState extends StoreEnhancerState {
  router: RouterState;
  workspace: WorkspaceState;
  bible: BibleState;
}
