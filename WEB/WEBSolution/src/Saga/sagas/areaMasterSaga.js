import { takeLatest, call } from "redux-saga/effects";

import { GET_AREALIST, ADD_AREA, UPDATE_AREA } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getAreaList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_AREALIST,
    requestBody: action.payload.params,
  });
}

function* addArea(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_AREA,
    requestBody: action.payload.params,
  });
}

function* updateArea(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_AREA,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Area Master APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_AREALIST, getAreaList);
  yield takeLatest(ADD_AREA, addArea);
  yield takeLatest(UPDATE_AREA, updateArea);
}

export default dataSaga;
