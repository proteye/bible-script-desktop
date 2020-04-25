import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Bible from '../components/Bible';
import { bible } from '../actions';
import { RootState } from '../reducers/stateTypes';

function mapStateToProps(state: RootState) {
  return {
    bible: state.bible
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ ...bible }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bible);
