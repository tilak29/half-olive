import { takeLatest, call } from "redux-saga/effects";

import { GET_REDEMPTION_LIST, UPDATE_REDEMPTION, GET_REDEMPTION_APPROVALMESSAGE } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getRedemptionList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_REDEMPTION_LIST,
    requestBody: action.payload.params,
  });
}

function* updateRedemption(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_REDEMPTION,
    requestBody: action.payload.params,
  });
}

function* getRedemptionApprovalMessage(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_REDEMPTION_APPROVALMESSAGE,
    requestBody: action.payload.params,
  });
}


/**
 * This saga is used to call Redemption Approval API's
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_REDEMPTION_LIST, getRedemptionList);
  yield takeLatest(UPDATE_REDEMPTION, updateRedemption);
  yield takeLatest(GET_REDEMPTION_APPROVALMESSAGE, getRedemptionApprovalMessage);
}

export default dataSaga;
