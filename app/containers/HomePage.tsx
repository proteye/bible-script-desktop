import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { workspace as workspaceActions } from '../actions';
import { RootState, WorkspaceState } from '../reducers/stateTypes';
import MainLayout from '../components/MainLayout';
import Navbar from '../components/Navbar';
// import TabSpace from '../components/TabSpace';
// import BiblePage from './BiblePage';
import {
  TabRemoveParams,
  WorkspaceChangeParams
} from '../actions/workspace/actions';
import WorkSpace from '../components/WorkSpace';

type Props = {
  workspaceState: WorkspaceState;
  workspaceAdd: () => void;
  workspaceRemove: (id: string) => void;
  workspaceChange: (params: WorkspaceChangeParams) => void;
  tabAdd: (id: string) => void;
  tabRemove: (params: TabRemoveParams) => void;
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
    workspaceChange
    // tabAdd,
    // tabRemove
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
        {workspace.tabs.map(tab => (
          <div key={tab.id}>
            {workspace.id}
            <br />
            {tab.id}
          </div>
        ))}
      </WorkSpace>
    );
  });

  const navbar = (
    <Navbar workspaceState={workspaceState} workspaceAdd={workspaceAdd} />
  );

  return <MainLayout navbar={navbar}>{workspaces}</MainLayout>;
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
