import { connect } from "react-redux";

import RewardList from "./RewardList";
import {
  getSchemes,
  getRewardList,
  addReward,
  updateReward,
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSchemes: ({ onSuccess, onFailure }) =>
      dispatch(
        getSchemes({
          onSuccess,
          onFailure,
        })
      ),

    getRewardList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getRewardList({
          params,
          onSuccess,
          onFailure,
        })
      ),

    addReward: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addReward({
          params,
          onSuccess,
          onFailure,
        })
      ),

    updateReward: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateReward({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RewardList);
