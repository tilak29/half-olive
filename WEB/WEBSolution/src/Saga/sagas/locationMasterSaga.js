import { takeLatest, call } from "redux-saga/effects";

import {
  GET_LOCATIONLIST,
  ADD_LOCATION,
  UPDATE_LOCATION,
  DELETE_LOCATION,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getLocationList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_LOCATIONLIST,
    requestBody: action.payload.params,
  });
}

function* addLocation(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_LOCATION,
    requestBody: action.payload.params,
  });
}

function* updateLocation(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_LOCATION,
    requestBody: action.payload.params,
  });
}

function* deleteLocation(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.DELETE_LOCATION,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Location Master APIs.
 */
function* dataSaga() {
  yield takeLatest(GET_LOCATIONLIST, getLocationList);
  yield takeLatest(ADD_LOCATION, addLocation);
  yield takeLatest(UPDATE_LOCATION, updateLocation);
  yield takeLatest(DELETE_LOCATION, deleteLocation);
}

export default dataSaga;
