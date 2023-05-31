import { connect } from "react-redux";

import MultiSelectStateCity from "./MultiSelectStateCity";
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

export default connect(mapStateToProps, mapDispatchToProps)(MultiSelectStateCity);
