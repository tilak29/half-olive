import { takeLatest, call } from "redux-saga/effects";
import {
  GET_ROOMRATETIME,
  GET_ROOMFILTER,
  GET_LISTALLCATEGORYNAME,
  GET_LISTDAYS,
  GET_OCCUPANCY,
  SAVE_ROOMRATE,
  UPDATE_ROOMRATE,
  DELETE_ROOMRATE,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getTime(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ROOMRATETIME,
    requestBody: action.payload.params,
  });
}

function* datefilter(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ROOMFILTER,
    requestBody: action.payload.params,
  });
}

function* listallcategoryname(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_LISTALLCATEGORYNAME,
    requestBody: action.payload.params,
  });
}

function* listdays(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_LISTDAYS,
    requestBody: action.payload.params,
  });
}

function* getOccupancy(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_OCCUPANCY,
    requestBody: action.payload.params,
  });
}
function* saveroomRate(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_ROOMRATE,
    requestBody: action.payload.params,
  });
}
function* updateroomRate(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_ROOMRATE,
    requestBody: action.payload.params,
  });
}

function* deleteroomrate(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.DELETE_ROOMRATE,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is for Room Master
/**
 * @author "Vishal Thakkar"
 */


function* dataSaga() {
  yield takeLatest(GET_ROOMRATETIME, getTime);
  yield takeLatest(GET_ROOMFILTER, datefilter);
  yield takeLatest(GET_LISTALLCATEGORYNAME, listallcategoryname);
  yield takeLatest(GET_LISTDAYS, listdays);
  yield takeLatest(GET_OCCUPANCY, getOccupancy);
  yield takeLatest(SAVE_ROOMRATE, saveroomRate);
  yield takeLatest(UPDATE_ROOMRATE, updateroomRate);
  yield takeLatest(DELETE_ROOMRATE, deleteroomrate);
}
export default dataSaga;
