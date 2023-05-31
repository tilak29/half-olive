import { connect } from "react-redux";

import BroadcastMobileNewsList from "./BroadcastMobileNewsList";
import {
  getDivisions,
  getDesignations,
  getStates,
  getStaticLookup,
  getBroadcastMobileNewsList,
  addBroadcastMobileNewsList,
  updateBroadcastMobileNewsList
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
    stateList: state.mainReducer.stateList,
    serverDate: state.mainReducer.otherInfo.serverDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStaticLookup: ({ params, onSuccess, onFailure }) =>
      dispatch(getStaticLookup({ params, onSuccess, onFailure })),
    getStates: () => dispatch(getStates()),

    getDivisions: ({ onSuccess, onFailure }) =>
      dispatch(
        getDivisions({
          onSuccess,
          onFailure
        })
      ),

    getDesignations: ({ onSuccess, onFailure }) =>
      dispatch(
        getDesignations({
          onSuccess,
          onFailure
        })
      ),
    getBroadcastMobileNewsList: ({ onSuccess, onFailure }) =>
      dispatch(
        getBroadcastMobileNewsList({
          onSuccess,
          onFailure
        })
      ),
    addBroadcastMobileNewsList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addBroadcastMobileNewsList({
          params,
          onSuccess,
          onFailure
        })
      ),
    updateBroadcastMobileNewsList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateBroadcastMobileNewsList({
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
)(BroadcastMobileNewsList);
