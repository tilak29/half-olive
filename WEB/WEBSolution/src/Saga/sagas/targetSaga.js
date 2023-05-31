import { takeLatest, call } from "redux-saga/effects";

import { GET_TARGET, INSERT_TARGET } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getTargetList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_TARGET,
    requestBody: action.payload.params,
  });
}

function* uploadTarget(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.INSERT_TARGET,
    requestBody: action.payload.params,
    isUpload: true
  });
}

/**
 * This saga is used to call Target APIs.
 * @author Harsh Patel
 */
function* dataSaga() {
  yield takeLatest(GET_TARGET, getTargetList);
  yield takeLatest(INSERT_TARGET, uploadTarget);
}

export default dataSaga;
