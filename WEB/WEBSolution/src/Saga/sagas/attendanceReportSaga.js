import { takeLatest, call } from "redux-saga/effects";

import { GET_ATTENDANCE } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getAttendanceReportData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ATTENDANCE,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Attendance Report APIs.
 * @author Harsh Patel
 */
function* dataSaga() {
  yield takeLatest(GET_ATTENDANCE, getAttendanceReportData);
}

export default dataSaga;
