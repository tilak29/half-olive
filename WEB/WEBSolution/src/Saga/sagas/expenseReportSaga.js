import { takeLatest, call } from "redux-saga/effects";

import {
  GET_EXPENSE_REPORT_LIST,
  GET_EXPENSE_REPORT_COMPARISON_DATA,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getExpenseReportList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EXPENSE_REPORT_LIST,
    requestBody: action.payload.params,
  });
}

function* getExpenseReportComparisonData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EXPENSE_REPORT_COMPARISON_DATA,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to get TP vs Auto DCR vs DCR Report APIs
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_EXPENSE_REPORT_LIST, getExpenseReportList);
  yield takeLatest(
    GET_EXPENSE_REPORT_COMPARISON_DATA,
    getExpenseReportComparisonData
  );
}

export default dataSaga;
