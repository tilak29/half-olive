import { takeLatest, call } from "redux-saga/effects";

import {
  GET_EMPLOYEEREFMAPPING
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getEmployeeRefMappingReportData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EMPLOYEEREFMAPPING,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Primary Vs Secondary APIs.
 * @author Ankita Gadhia
 */
function* dataSaga() {
  yield takeLatest(GET_EMPLOYEEREFMAPPING, getEmployeeRefMappingReportData);
}

export default dataSaga;
