import { connect } from "react-redux";

import UnlockDCRRequestList from "./UnlockDCRRequestList";
import {
  getUnlockDCRData,
  updateUnlockDCRData
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getUnlockDCRData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getUnlockDCRData({
          params,
          onSuccess,
          onFailure
        })
      ),

    updateUnlockDCRData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateUnlockDCRData({
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
)(UnlockDCRRequestList);
