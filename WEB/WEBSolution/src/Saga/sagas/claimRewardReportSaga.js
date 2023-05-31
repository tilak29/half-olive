import { takeLatest, call } from "redux-saga/effects";

import { GET_CLAIMREWARD } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getClaimRewardReportData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_CLAIMREWARD,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Claim Reward Report APIs.
 * @author Harsh Patel
 */
function* dataSaga() {
  yield takeLatest(GET_CLAIMREWARD, getClaimRewardReportData);
}

export default dataSaga;
