import { BookInfo, Dispatch } from '../../reducers/workspace/types';

export const types = {
  WORKSPACE_ADD: Symbol('WORKSPACE_ADD'),
  WORKSPACE_REMOVE: Symbol('WORKSPACE_REMOVE'),
  WORKSPACE_CHANGE: Symbol('WORKSPACE_CHANGE'),
  TAB_ADD: Symbol('TAB_ADD'),
  TAB_REMOVE: Symbol('TAB_REMOVE'),
  TAB_SELECT: Symbol('TAB_SELECT')
};

export type TabAddParams = {
  id: string;
  book?: BookInfo;
  title?: string;
};
export type TabRemoveParams = { id: string; tabId: string };
export type TabSelectParams = { id: string; tabIndex: number };
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

  tabAdd: (params: TabAddParams) => {
    return (dispatch: Dispatch) => {
      dispatch({ type: types.TAB_ADD, payload: params });
    };
  },

  tabRemove: (params: TabRemoveParams) => {
    return (dispatch: Dispatch) => {
      dispatch({ type: types.TAB_REMOVE, payload: params });
    };
  },

  tabSelect: (params: TabSelectParams) => {
    return (dispatch: Dispatch) => {
      dispatch({ type: types.TAB_SELECT, payload: params });
    };
  }
};

export default actions;
