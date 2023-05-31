import { connect } from "react-redux";

import DeviceConfiguration from "./DeviceConfigurationList";
import {
  getCountries,
  getDivisions,
  getDeviceConfigurationList,
  updateDeviceConfigurationList
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCountries: ({ onSuccess, onFailure }) =>
      dispatch(
        getCountries({
          onSuccess,
          onFailure
        })
      ),
    getDivisions: ({ onSuccess, onFailure }) =>
      dispatch(
        getDivisions({
          onSuccess,
          onFailure
        })
      ),
    getDeviceConfigurationList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDeviceConfigurationList({
          params,
          onSuccess,
          onFailure
        })
      ),
    updateDeviceConfigurationList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateDeviceConfigurationList({
          params,
          onSuccess,
          onFailure
        })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceConfiguration);
