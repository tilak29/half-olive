import { takeLatest, call } from "redux-saga/effects";

import {
  GET_DIVISIONLIST,
  ADD_DIVISION,
  UPDATE_DIVISION,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getDivisionList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DIVISIONLIST,
  });
}

function* addDivision(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_DIVISION,
    requestBody: action.payload.params,
  });
}

function* updateDivision(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_DIVISION,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Division Master APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_DIVISIONLIST, getDivisionList);
  yield takeLatest(ADD_DIVISION, addDivision);
  yield takeLatest(UPDATE_DIVISION, updateDivision);
}

export default dataSaga;
