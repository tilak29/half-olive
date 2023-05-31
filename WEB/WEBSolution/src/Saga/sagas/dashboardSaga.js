import { takeLatest, call } from "redux-saga/effects";

import {
  GET_TP_APPROVAL_LIST,
  UPDATE_TP_STATUS,
  GET_UNLOCK_DCR_DATA,
  UPDATE_UNLOCK_DCR,
  GET_DASHBOARD_SUMMARY_DATA,
  GET_DASHBOARD_CHEMIST_BIRTHDAY_LIST,
  GET_DASHBOARD_COUNT_DATA,
  GET_DASHBOARD_STATEWISE_COUNT_DATA,
  GET_MONTHLYSTATUS_ORDERCOUNT,
  GET_DASHBOARD_STATEWISE_DATA
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getTPApprovalList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_TP_APPROVAL_LIST,
  });
}

function* updateTPStatus(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_TP_STATUS,
    requestBody: action.payload.params,
  });
}

function* getUnlockDCRData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_UNLOCK_DCR_DATA,
    requestBody: action.payload.params,
  });
}

function* updateUnlockDCRData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_UNLOCK_DCR,
    requestBody: action.payload.params,
  });
}

function* getDashboardSummaryData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DASHBOARD_SUMMARY_DATA,
  });
}

function* getDashboardChemistBirthdayList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DASHBOARD_CHEMIST_BIRTHDAY_LIST,
  });
}

function* getDashboardCountData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DASHBOARD_COUNT_DATA,
    requestBody: action.payload.params,
  });
}

function* getDashboardStateWiseCountData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DASHBOARD_STATEWISE_COUNT_DATA,
    requestBody: action.payload.params,
  });
}

function* getDashboardStateWiseData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DASHBOARD_STATEWISE_DATA,
    requestBody: action.payload.params,
  });
}

function* getOrderMonthlyCountData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MONTHLYSTATUS_ORDERCOUNT,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Dashboard APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_TP_APPROVAL_LIST, getTPApprovalList);
  yield takeLatest(UPDATE_TP_STATUS, updateTPStatus);
  yield takeLatest(GET_UNLOCK_DCR_DATA, getUnlockDCRData);
  yield takeLatest(UPDATE_UNLOCK_DCR, updateUnlockDCRData);
  yield takeLatest(GET_DASHBOARD_SUMMARY_DATA, getDashboardSummaryData);
  yield takeLatest(
    GET_DASHBOARD_CHEMIST_BIRTHDAY_LIST,
    getDashboardChemistBirthdayList
  );
  yield takeLatest(GET_DASHBOARD_COUNT_DATA, getDashboardCountData);
  yield takeLatest(GET_DASHBOARD_STATEWISE_COUNT_DATA, getDashboardStateWiseCountData);
  yield takeLatest(GET_MONTHLYSTATUS_ORDERCOUNT, getOrderMonthlyCountData);
  yield takeLatest(GET_DASHBOARD_STATEWISE_DATA, getDashboardStateWiseData);
}

export default dataSaga;
