import { connect } from "react-redux";

import StateCitySelect from "./StateCitySelect";
import { getStates, getCities } from "../../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return {
    stateList: state.mainReducer.stateList,
    cityList: state.mainReducer.cityList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStates: () => dispatch(getStates()),
    getCities: () => dispatch(getCities())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StateCitySelect);
