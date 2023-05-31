import { takeLatest, call } from "redux-saga/effects";

import {
  GET_ROUTELIST,
  ASSIGN_ROUTE,
  UPDATE_ASSIGNED_ROUTE,
  EXPORT_ROUTE_LIST,
  IMPORT_ROUTE_LIST,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getRouteList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ROUTELIST,
    requestBody: action.payload.params,
  });
}

function* assignRoute(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ASSIGN_ROUTE,
    requestBody: action.payload.params,
  });
}

function* updateAssignedRoute(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_ASSIGNED_ROUTE,
    requestBody: action.payload.params,
  });
}

function* exportRouteList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.EXPORT_ROUTE_LIST,
    requestBody: action.payload.params,
  });
}

function* importRouteList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.IMPORT_ROUTE_LIST,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

/**
 * This saga is used to call Assign Route APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_ROUTELIST, getRouteList);
  yield takeLatest(ASSIGN_ROUTE, assignRoute);
  yield takeLatest(UPDATE_ASSIGNED_ROUTE, updateAssignedRoute);
  yield takeLatest(EXPORT_ROUTE_LIST, exportRouteList);
  yield takeLatest(IMPORT_ROUTE_LIST, importRouteList);
}

export default dataSaga;
