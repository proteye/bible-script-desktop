import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { workspace as workspaceActions } from '../actions';
import { RootState, WorkspaceState } from '../reducers/stateTypes';
import MainLayout from '../components/MainLayout';
import Navbar from '../components/Navbar';
// import TabPanel from '../components/TabPanel';
// import BiblePage from './BiblePage';
import {
  TabAddParams,
  TabRemoveParams,
  TabSelectParams,
  WorkspaceChangeParams
} from '../actions/workspace/actions';
import WorkSpace from '../components/WorkSpace';
import TabSpace from '../components/TabSpace';

type Props = {
  workspaceState: WorkspaceState;
  workspaceAdd: () => void;
  workspaceRemove: (id: string) => void;
  workspaceChange: (params: WorkspaceChangeParams) => void;
  tabAdd: (params: TabAddParams) => void;
  tabRemove: (params: TabRemoveParams) => void;
  tabSelect: (params: TabSelectParams) => void;
};

function mapStateToProps(state: RootState) {
  return {
    workspaceState: state.workspace
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ ...workspaceActions }, dispatch);
}

function HomePage(props: Props) {
  const {
    workspaceState,
    workspaceAdd,
    workspaceRemove,
    workspaceChange,
    tabAdd,
    tabRemove,
    tabSelect
  } = props;

  useEffect(() => {}, []);

  // <BiblePage key={tab.id} />
  const workspaces = workspaceState.workspaces.map(workspace => {
    return (
      <WorkSpace
        key={workspace.id}
        workspace={workspace}
        workspaceRemove={workspaceRemove}
        workspaceChange={workspaceChange}
      >
        <TabSpace
          tabs={workspace.tabs}
          workspaceId={workspace.id}
          selectedTabId={workspace.selectedTabId}
          selectedTabIndex={workspace.selectedTabIndex}
          tabAdd={tabAdd}
          tabRemove={tabRemove}
          tabSelect={tabSelect}
        />
      </WorkSpace>
    );
  });

  const navbar = (
    <Navbar workspaceState={workspaceState} workspaceAdd={workspaceAdd} />
  );

  return <MainLayout navbar={navbar}>{workspaces}</MainLayout>;
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
