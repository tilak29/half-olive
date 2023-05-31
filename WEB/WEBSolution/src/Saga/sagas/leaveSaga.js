import { takeLatest, call } from "redux-saga/effects";

import {
  GET_LEAVELIST,
  ADD_LEAVE,
  DELETE_LEAVE,
  UPDATE_LEAVE,
  GET_LEAVE_REPORT,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getLeaveList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_LEAVELIST,
    requestBody: action.payload.params,
  });
}

function* addLeave(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_LEAVE,
    requestBody: action.payload.params,
  });
}

function* updateLeave(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_LEAVE,
    requestBody: action.payload.params,
  });
}

function* deleteLeave(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.DELETE_LEAVE,
    requestBody: action.payload.params,
  });
}

function* getLeaveReport(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_LEAVE_REPORT,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Employee leaves APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(GET_LEAVELIST, getLeaveList);
  yield takeLatest(ADD_LEAVE, addLeave);
  yield takeLatest(DELETE_LEAVE, deleteLeave);
  yield takeLatest(UPDATE_LEAVE, updateLeave);
  yield takeLatest(GET_LEAVE_REPORT, getLeaveReport);
}

export default dataSaga;
