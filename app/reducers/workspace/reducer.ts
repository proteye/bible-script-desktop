import { remote } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import { TabInfo, WorkspaceInfo, WorkspaceState } from './types';
import { types } from '../../actions/workspace/actions';
import createReducer from '../../utils/reducer';

const MAX_WS_COUNT = 4;
const MAX_TAB_COUNT = 10;

const INIT_TAB = { id: uuidv4(), isFocused: true };
const INIT_WS = {
  id: uuidv4(),
  tabs: [{ ...INIT_TAB }],
  resizeHandles: [],
  width: Infinity,
  height: Infinity,
  maxTabCount: MAX_TAB_COUNT,
  isTabAddDisabled: false,
  isFocused: true
};

const initState: WorkspaceState = {
  workspaces: [{ ...INIT_WS }],
  maxCount: MAX_WS_COUNT,
  isAddDisabled: false
};

function createTab() {
  const tab: TabInfo = { ...INIT_TAB };
  tab.id = uuidv4();
  tab.isFocused = true;
  return tab;
}

function createWorkspace() {
  const ws: WorkspaceInfo = { ...INIT_WS };
  ws.id = uuidv4();
  ws.tabs = [createTab()];
  return ws;
}

export default createReducer<WorkspaceState>(initState, {
  [types.WORKSPACE_ADD]: state => {
    if (state.workspaces.length === state.maxCount) {
      return state;
    }

    const workspaces = [...state.workspaces];
    const workspace = createWorkspace();

    const win = remote.getCurrentWindow();
    const size = win.getContentSize();
    const halfWidth = size[0] / 2;
    const halfHeight = (size[1] - 48) / 2;

    switch (workspaces.length) {
      case 1:
        workspaces[0].width = halfWidth;
        workspaces[0].resizeHandles = ['e'];
        workspace.width = halfWidth;
        break;
      case 2:
        workspaces[0].height = halfHeight;
        workspaces[0].resizeHandles = ['s', 'e', 'se'];
        workspaces[1].height = halfHeight;
        workspaces[1].resizeHandles = ['s'];
        workspace.height = halfHeight;
        break;
      case 3:
        workspaces[2].width = halfWidth;
        workspaces[2].resizeHandles = ['e'];
        workspace.width = halfWidth;
        workspace.height = halfHeight;
        break;
      default:
        break;
    }
    workspaces.push(workspace);

    return {
      ...state,
      workspaces,
      isAddDisabled: workspaces.length === state.maxCount
    };
  },

  [types.WORKSPACE_REMOVE]: (state, action) => {
    return {
      ...state,
      workspaces: state.workspaces.filter(
        (v: WorkspaceInfo) => v.id !== action.payload.id
      ),
      isAddDisabled: state.workspaces.length - 1 === state.maxCount
    };
  },

  [types.TAB_ADD]: (state, action) => {
    const workspace = state.workspaces.find(v => v.id === action.payload.id);
    if (!workspace || workspace.tabs.length === workspace.maxTabCount) {
      return state;
    }

    const tab = createTab();

    return {
      ...state,
      workspaces: state.workspaces.map((v: WorkspaceInfo) => {
        if (v.id === action.payload.id) {
          return {
            ...v,
            tabs: [...v.tabs, tab],
            isTabAddDisabled: v.tabs.length === v.maxTabCount
          };
        }
        return v;
      })
    };
  },

  [types.TAB_REMOVE]: (state, action) => {
    return {
      ...state,
      workspaces: state.workspaces.map((v: WorkspaceInfo) => {
        if (v.id === action.payload.id) {
          return {
            ...v,
            tabs: v.tabs.filter(
              (tab: TabInfo) => tab.id !== action.payload.tabId
            ),
            isTabAddDisabled: v.tabs.length === v.maxTabCount
          };
        }
        return v;
      })
    };
  }
});
