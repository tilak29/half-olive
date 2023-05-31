import { takeLatest, call } from "redux-saga/effects";

import {
  GET_REWARDLIST,
  ADD_REWARD,
  UPDATE_REWARD,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getRewardList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_REWARDLIST,
    requestBody: action.payload.params,
  });
}

function* addReward(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_REWARD,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* updateReward(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_REWARD,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

/**
 * This saga is used to call Reward Master APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_REWARDLIST, getRewardList);
  yield takeLatest(ADD_REWARD, addReward);
  yield takeLatest(UPDATE_REWARD, updateReward);
}

export default dataSaga;
