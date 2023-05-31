import { connect } from "react-redux";

import BroadcastMobileNewsNotification from "./BroadcastMobileNewsNotification";
import { getBroadcastMobileNewsList } from "../../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return {
    serverDate: state.mainReducer.otherInfo.serverDate,
    filterDesignation: state.mainReducer.filterDesignation,
    userData: state.mainReducer.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBroadcastMobileNewsList: ({ onSuccess, onFailure }) =>
      dispatch(
        getBroadcastMobileNewsList({
          onSuccess,
          onFailure
        })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BroadcastMobileNewsNotification);
