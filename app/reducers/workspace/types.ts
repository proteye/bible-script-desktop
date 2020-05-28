import { Dispatch as ReduxDispatch, AnyAction } from 'redux';
import { ResizeHandle } from 'react-resizable';

export enum BookType {
  bible,
  commentary,
  dictionary
}

export type BookInfo = {
  id: string;
  type: BookType;
  name: string;
};

export type TabInfo = {
  id: string;
  book: BookInfo | null;
  title: string;
  isFocused: boolean;
};

export type WorkspaceInfo = {
  id: string;
  tabs: TabInfo[];
  resizeHandles: ResizeHandle[];
  width: number;
  height: number;
  minConstraints: [number, number];
  maxConstraints: [number, number];
  maxTabCount: number;
  isTabAddDisabled: boolean;
  selectedTabId: string | null;
  selectedTabIndex: number | null;
  isFocused: boolean;
};

export interface WorkspaceState {
  workspaces: WorkspaceInfo[];
  maxCount: number;
  isAddDisabled: boolean;
}

export type Dispatch = ReduxDispatch<AnyAction>;
