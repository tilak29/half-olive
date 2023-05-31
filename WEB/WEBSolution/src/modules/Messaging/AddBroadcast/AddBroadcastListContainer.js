import { connect } from "react-redux";

import BroadcastList from "./AddBroadcastList";
import {
  getDivisions,
  getDesignations,
  getStates,
  getStaticLookup,
  addNotifications,
  getNotifications,
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
    stateList: state.mainReducer.stateList,
    serverDate: state.mainReducer.otherInfo.serverDate,
    userData: state.mainReducer.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStaticLookup: ({ params, onSuccess, onFailure }) =>
      dispatch(getStaticLookup({ params, onSuccess, onFailure })),
    getStates: () => dispatch(getStates()),

    getDivisions: ({ onSuccess, onFailure }) =>
      dispatch(
        getDivisions({
          onSuccess,
          onFailure,
        })
      ),

    getDesignations: ({ onSuccess, onFailure }) =>
      dispatch(
        getDesignations({
          onSuccess,
          onFailure,
        })
      ),
    getNotifications: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getNotifications({
          params,
          onSuccess,
          onFailure,
        })
      ),
    addNotifications: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addNotifications({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BroadcastList);
