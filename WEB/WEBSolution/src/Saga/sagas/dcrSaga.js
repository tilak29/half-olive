import { call, takeLatest } from "redux-saga/effects";
import { API } from "../../Constants";
import {
  CHECK_PENDING_LEAVE_APPROVALS,
  GET_ADD_DCR_ROUTES,
  GET_DCR_CALENDAR_DATA,
  GET_DCR_PREVIEW_DATA,
  GET_EXPENSE_BYROUTE,
  GET_POB_DATA,
  SAVE_EXPENSE,
  SAVE_POB_DATA,
  UNLOCK_DCR_REQUEST,
  DCR_PREVIEW_ASYNC,
  DCR_CALENDER_ASYNC,
  GET_SMS_CODE,
  GET_SMS_MESSAGE
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";

function* saveExpense(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_EXPENSE,
    requestBody: action.payload.params,
  });
}

function* getExpenseByRoute(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EXPENSE_BYROUTE,
    requestBody: action.payload.params,
  });
}

function* getAddDCRRoutes(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ADD_DCR_ROUTES,
    requestBody: action.payload.params,
  });
}

function* savePOBData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_POB_DATA,
    requestBody: action.payload.params,
  });
}

function* getPOBData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_POB_DATA,
    requestBody: action.payload.params,
  });
}

function* requestForUnlockDCR(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UNLOCK_DCR_REQUEST,
    requestBody: action.payload.params,
  });
}

function* getDCRCalendarData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DCR_CALENDAR_DATA,
    requestBody: action.payload.params,
  });
}

function* getDCRPreviewData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DCR_PREVIEW_DATA,
    requestBody: action.payload.params,
  });
}

function* checkPendingLeaveApprovals(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.CHECK_PENDING_LEAVE_APPROVALS,
    requestBody: action.payload.params,
  });
}

function* getDCRPreviewAsyncData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.DCR_PREVIEW_ASYNC,
    requestBody: action.payload.params,
  });
}

function* getDCRCalendarAsyncData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.DCR_CALENDER_ASYNC,
    requestBody: action.payload.params,
  });
}

function* getSmsCode(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SMS_CODE,
    requestBody: action.payload.params,
  });
}

function* getSmsMessage(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SMS_MESSAGE,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call DCR APIs.
 * @author Nirali Maradiya,Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(UNLOCK_DCR_REQUEST, requestForUnlockDCR);
  yield takeLatest(GET_DCR_CALENDAR_DATA, getDCRCalendarData);
  yield takeLatest(GET_DCR_PREVIEW_DATA, getDCRPreviewData);
  yield takeLatest(GET_POB_DATA, getPOBData);
  yield takeLatest(SAVE_POB_DATA, savePOBData);
  yield takeLatest(GET_EXPENSE_BYROUTE, getExpenseByRoute);
  yield takeLatest(SAVE_EXPENSE, saveExpense);
  yield takeLatest(CHECK_PENDING_LEAVE_APPROVALS, checkPendingLeaveApprovals);
  yield takeLatest(GET_ADD_DCR_ROUTES, getAddDCRRoutes);
  yield takeLatest(DCR_PREVIEW_ASYNC, getDCRPreviewAsyncData);
  yield takeLatest(DCR_CALENDER_ASYNC, getDCRCalendarAsyncData);
  yield takeLatest(GET_SMS_CODE, getSmsCode);
  yield takeLatest(GET_SMS_MESSAGE, getSmsMessage);
}

export default dataSaga;
