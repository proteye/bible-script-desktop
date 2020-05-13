import { Dispatch } from '../../reducers/workspace/types';

export const types = {
  WORKSPACE_ADD: Symbol('WORKSPACE_ADD'),
  WORKSPACE_REMOVE: Symbol('WORKSPACE_REMOVE'),
  WORKSPACE_CHANGE: Symbol('WORKSPACE_CHANGE'),
  TAB_ADD: Symbol('TAB_ADD'),
  TAB_REMOVE: Symbol('TAB_REMOVE')
};

export type TabRemoveParams = { id: string; tabId: string };
export type WorkspaceChangeParams = {
  id: string;
  width: number;
  height: number;
};

const actions = {
  workspaceAdd: () => {
    return (dispatch: Dispatch) => {
      dispatch({ type: types.WORKSPACE_ADD });
    };
  },

  workspaceRemove: (id: string) => {
    return (dispatch: Dispatch) => {
      dispatch({ type: types.WORKSPACE_REMOVE, payload: { id } });
    };
  },

  workspaceChange: (params: WorkspaceChangeParams) => {
    return (dispatch: Dispatch) => {
      dispatch({ type: types.WORKSPACE_CHANGE, payload: params });
    };
  },

  tabAdd: (id: string) => {
    return (dispatch: Dispatch) => {
      dispatch({ type: types.TAB_ADD, payload: { id } });
    };
  },

  tabRemove: (params: TabRemoveParams) => {
    return (dispatch: Dispatch) => {
      dispatch({ type: types.TAB_REMOVE, payload: params });
    };
  }
};

export default actions;
