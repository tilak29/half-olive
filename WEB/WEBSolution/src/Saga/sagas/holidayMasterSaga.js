import { takeLatest, call } from "redux-saga/effects";

import {
  GET_HOLIDAYLIST,
  ADD_HOLIDAY,
  UPDATE_HOLIDAY,
  DELETE_HOLIDAY,
  GET_HOLIDAY_YEARLIST,
  EXPORT_HOLIDAY_LIST,
  IMPORT_HOLIDAY_LIST,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getHolidayYearList(action) {
  yield call(MasterSaga, { action, apiURL: API.GET_HOLIDAY_YEARLIST });
}

function* getHolidayList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_HOLIDAYLIST,
    requestBody: action.payload.params,
  });
}

function* addHoliday(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_HOLIDAY,
    requestBody: action.payload.params,
  });
}

function* updateHoliday(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_HOLIDAY,
    requestBody: action.payload.params,
  });
}

function* deleteHoliday(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.DELETE_HOLIDAY,
    requestBody: action.payload.params,
  });
}

function* exportHolidayList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.EXPORT_HOLIDAY_LIST,
  });
}

function* importHolidayList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.IMPORT_HOLIDAY_LIST,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

/**
 * This saga is used to call Holiday Master APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_HOLIDAY_YEARLIST, getHolidayYearList);
  yield takeLatest(GET_HOLIDAYLIST, getHolidayList);
  yield takeLatest(ADD_HOLIDAY, addHoliday);
  yield takeLatest(UPDATE_HOLIDAY, updateHoliday);
  yield takeLatest(DELETE_HOLIDAY, deleteHoliday);
  yield takeLatest(EXPORT_HOLIDAY_LIST, exportHolidayList);
  yield takeLatest(IMPORT_HOLIDAY_LIST, importHolidayList);
}

export default dataSaga;
