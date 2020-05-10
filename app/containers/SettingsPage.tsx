import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Settings from '../components/Settings';
import { bible as bibleActions } from '../actions';
import { RootState } from '../reducers/stateTypes';

function mapStateToProps(state: RootState) {
  return {
    bible: state.bible
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ ...bibleActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
