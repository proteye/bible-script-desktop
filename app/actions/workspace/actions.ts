import { Dispatch } from '../../reducers/workspace/types';

export const types = {
  WORKSPACE_ADD: Symbol('WORKSPACE_ADD'),
  WORKSPACE_REMOVE: Symbol('WORKSPACE_REMOVE'),
  TAB_ADD: Symbol('TAB_ADD'),
  TAB_REMOVE: Symbol('TAB_REMOVE')
};

export type TabRemoveParams = { id: string; tabId: string };

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
