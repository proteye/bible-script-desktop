import { remote } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import { TabInfo, WorkspaceInfo, WorkspaceState } from './types';
import { types } from '../../actions/workspace/actions';
import createReducer from '../../utils/reducer';
import { NAVBAR_HEIGHT } from '../../components/Navbar';

const MAX_WS_COUNT = 4;
const MAX_TAB_COUNT = 10;

const INIT_TAB: TabInfo = { id: uuidv4(), isFocused: true };
const INIT_WS: WorkspaceInfo = {
  id: uuidv4(),
  tabs: [{ ...INIT_TAB }],
  resizeHandles: [],
  width: Infinity,
  height: Infinity,
  minConstraints: [250, 250],
  maxConstraints: [Infinity, Infinity],
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

function updateResizeHandlesAfterRemove(
  workspacesInput: WorkspaceInfo[]
): WorkspaceInfo[] {
  const workspaces = [...workspacesInput];
  const win = remote.getCurrentWindow();
  const winSize = win.getContentSize();
  const width = winSize[0];
  const height = winSize[1] - NAVBAR_HEIGHT;

  switch (workspaces.length) {
    case 1:
      workspaces[0].width = width;
      workspaces[0].height = height;
      workspaces[0].resizeHandles = [];
      workspaces[0].maxConstraints = [Infinity, Infinity];
      break;
    case 2:
      workspaces[1].width = width - workspaces[0].width;
      workspaces[1].height = height;
      workspaces[0].height = height;
      workspaces[0].resizeHandles = ['e'];
      workspaces[0].maxConstraints = [
        width - workspaces[1].minConstraints[0],
        Infinity
      ];
      break;
    case 3:
      workspaces[2].width = width;
      workspaces[2].height = height - workspaces[0].height;
      workspaces[1].width = width - workspaces[0].width;
      workspaces[1].height = workspaces[0].height;
      workspaces[1].resizeHandles = ['s'];
      workspaces[1].maxConstraints = [
        workspaces[1].maxConstraints[0],
        height - workspaces[2].minConstraints[1]
      ];
      workspaces[0].resizeHandles = ['s', 'e', 'se'];
      workspaces[0].maxConstraints = [
        width - workspaces[1].minConstraints[0],
        height - workspaces[2].minConstraints[1]
      ];
      break;
    default:
      break;
  }

  return workspaces;
}

export default createReducer<WorkspaceState>(initState, {
  [types.WORKSPACE_ADD]: state => {
    if (state.workspaces.length === state.maxCount) {
      return state;
    }

    const workspaces = [...state.workspaces];
    const workspace = createWorkspace();

    const win = remote.getCurrentWindow();
    const winSize = win.getContentSize();
    const width = winSize[0];
    const height = winSize[1] - NAVBAR_HEIGHT;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    switch (workspaces.length) {
      case 1:
        workspaces[0].width = halfWidth;
        workspaces[0].resizeHandles = ['e'];
        workspaces[0].maxConstraints = [
          width - workspace.minConstraints[0],
          Infinity
        ];
        workspace.width = halfWidth;
        break;
      case 2:
        workspaces[0].height = halfHeight;
        workspaces[0].resizeHandles = ['s', 'e', 'se'];
        workspaces[0].maxConstraints = [
          width - workspaces[1].minConstraints[0],
          height - workspace.minConstraints[1]
        ];
        workspaces[1].height = halfHeight;
        workspaces[1].resizeHandles = ['s'];
        workspaces[1].maxConstraints = [
          workspaces[1].maxConstraints[0],
          height - workspace.minConstraints[1]
        ];
        workspace.height = halfHeight;
        break;
      case 3:
        workspaces[2].width = workspaces[0].width;
        workspaces[2].resizeHandles = ['e'];
        workspaces[2].maxConstraints = [
          width - workspace.minConstraints[0],
          height - workspaces[1].minConstraints[1]
        ];
        workspace.width = workspaces[1].width;
        workspace.height = workspaces[2].height;
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
    const workspaces = state.workspaces.filter(
      (v: WorkspaceInfo) => v.id !== action.payload.id
    );
    return {
      ...state,
      workspaces: updateResizeHandlesAfterRemove(workspaces),
      isAddDisabled: state.workspaces.length - 1 === state.maxCount
    };
  },

  [types.WORKSPACE_CHANGE]: (state, action) => {
    const workspaceIndex: number = state.workspaces.findIndex(
      v => v.id === action.payload.id
    );
    if (workspaceIndex === -1) {
      return state;
    }

    const currWorkspace = {
      ...state.workspaces[workspaceIndex],
      width: action.payload.width,
      height: action.payload.height
    };

    const win = remote.getCurrentWindow();
    const winSize = win.getContentSize();
    const width = winSize[0];
    const height = winSize[1] - NAVBAR_HEIGHT;

    return {
      ...state,
      workspaces: state.workspaces.map((v: WorkspaceInfo, i: number) => {
        const ws = { ...v };
        if (ws.id === currWorkspace.id) {
          return currWorkspace;
        }
        switch (i) {
          case 0:
            if (workspaceIndex === 1) {
              ws.height = currWorkspace.height;
              break;
            }
            ws.width = currWorkspace.width;
            break;
          case 1:
            if (workspaceIndex === 0) {
              ws.height = currWorkspace.height;
            }
            ws.width = width - currWorkspace.width;
            break;
          case 2:
            if (state.workspaces.length > 3 && workspaceIndex !== 1) {
              ws.width = currWorkspace.width;
            }
            ws.height = height - currWorkspace.height;
            break;
          case 3:
            if (workspaceIndex !== 1) {
              ws.width = width - currWorkspace.width;
            }
            if (workspaceIndex < 2) {
              ws.height = height - currWorkspace.height;
            }
            break;
          default:
            break;
        }
        return ws;
      }),
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
