import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { counter } from '../actions';
import { RootState } from '../reducers/stateTypes';

function mapStateToProps(state: RootState) {
  return {
    counter: state.counter.counter
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({ ...counter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
