import { takeLatest, call } from "redux-saga/effects";

import { GET_CHEMIST_VISITS_DATA } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* chemistVisitsReportData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_CHEMIST_VISITS_DATA,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to get chemist visits Report APIs
 * @author Harsh Patel
 */
function* dataSaga() {
  yield takeLatest(GET_CHEMIST_VISITS_DATA, chemistVisitsReportData);
}

export default dataSaga;
