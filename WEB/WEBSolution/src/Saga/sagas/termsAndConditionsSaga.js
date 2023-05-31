import { takeLatest, call } from "redux-saga/effects";

import { GET_TANDC, SAVE_TANDC } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getTandC(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_TANDC,
    requestBody: action.payload.params,
  });
}

function* saveTandC(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_TANDC,
    requestBody: action.payload.params,
  });
}


/**
 * This saga is used to call terms and conditions APIs.
 * @author Harsh Patel
 */
function* dataSaga() {
  yield takeLatest(GET_TANDC, getTandC);
  yield takeLatest(SAVE_TANDC, saveTandC);
}

export default dataSaga;
