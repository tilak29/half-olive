import { takeLatest, call } from "redux-saga/effects";

import { GET_MONTHLY_EXPENSE_SUMMARY_REPORT_Data } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

/**
 * @author Kishan Sirodariya
 */

function* getMonthlyExpenseSummaryReportData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MONTHLY_EXPENSE_SUMMARY_REPORT_Data,
    requestBody: action.payload.params,
  });
}

function* dataSaga() {
  yield takeLatest(GET_MONTHLY_EXPENSE_SUMMARY_REPORT_Data, getMonthlyExpenseSummaryReportData);
}

export default dataSaga;
