import { connect } from "react-redux";

import StateEmployeeSelect from "./StateEmployeeSelect";
import { getStates, getEmployees,getDivisions } from "../../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return {
    stateList: state.mainReducer.stateList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStates: () => dispatch(getStates()),
    getEmployees: ({ params, onSuccess, onFailure }) =>
      dispatch(getEmployees({ params, onSuccess, onFailure })),

      getDivisions: ({ onSuccess, onFailure }) =>
      dispatch(
        getDivisions({
          onSuccess,
          onFailure,
        })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateEmployeeSelect);
