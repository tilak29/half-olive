import { takeLatest, call } from "redux-saga/effects";

import { GET_EMPROUTELIST, DOWNLOAD_EMPROUTELIST } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getEmpRouteData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EMPROUTELIST,
    requestBody: action.payload.params,
  });
}

function* downloadEmpRouteData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.DOWNLOAD_EMPROUTELIST,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to get chemist visits Report APIs
 * @author Harsh Patel
 */
function* dataSaga() {
  yield takeLatest(GET_EMPROUTELIST, getEmpRouteData);
  yield takeLatest(DOWNLOAD_EMPROUTELIST, downloadEmpRouteData);
}

export default dataSaga;
