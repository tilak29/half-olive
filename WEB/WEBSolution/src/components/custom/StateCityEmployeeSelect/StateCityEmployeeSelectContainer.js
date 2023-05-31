import { connect } from "react-redux";

import StateCityEmployeeSelect from "./StateCityEmployeeSelect";
import {
  getStates,
  getCities,
  getEmployees,
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return {
    stateList: state.mainReducer.stateList,
    cityList: state.mainReducer.cityList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStates: () => dispatch(getStates()),
    getCities: () => dispatch(getCities()),
    getEmployees: ({ params, onSuccess, onFailure }) =>
      dispatch(getEmployees({ params, onSuccess, onFailure })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateCityEmployeeSelect);
