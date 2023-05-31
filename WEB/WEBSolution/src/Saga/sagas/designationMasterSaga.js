import { takeLatest, call } from "redux-saga/effects";

import {
  GET_DESIGNATIONLIST,
  ADD_DESIGNATION,
  UPDATE_DESIGNATION,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getDesignationsList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DESIGNATIONLIST,
  });
}

function* addDesignation(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_DESIGNATION,
    requestBody: action.payload.params,
  });
}

function* updateDesignation(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_DESIGNATION,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Designation Master APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_DESIGNATIONLIST, getDesignationsList);
  yield takeLatest(ADD_DESIGNATION, addDesignation);
  yield takeLatest(UPDATE_DESIGNATION, updateDesignation);
}

export default dataSaga;
