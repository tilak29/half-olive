import { connect } from "react-redux";

import StatesSelect from "./StatesSelect";
import { getStates } from "../../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return {
    stateList: state.mainReducer.stateList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStates: () => dispatch(getStates())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatesSelect);
