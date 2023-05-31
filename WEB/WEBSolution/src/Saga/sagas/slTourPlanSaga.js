import { takeLatest, call } from "redux-saga/effects";

import {
  GET_SL_TOURPLAN,
  GET_SL_WORKINGWITH,
  SAVE_SL_TOURPLAN,
  SAVE_REJECT_SL_TOURPLAN,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getSLTourPlan(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SL_TOURPLAN,
    requestBody: action.payload.params,
  });
}

function* saveSLTourPlan(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_SL_TOURPLAN,
    requestBody: action.payload.params,
  });
}

function* getSLWorkingWith(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SL_WORKINGWITH,
  });
}

function* rejectSLTourPlan(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_REJECT_SL_TOURPLAN,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call SL Tour Plan API's
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_SL_TOURPLAN, getSLTourPlan);
  yield takeLatest(SAVE_SL_TOURPLAN, saveSLTourPlan);
  yield takeLatest(GET_SL_WORKINGWITH, getSLWorkingWith);
  yield takeLatest(SAVE_REJECT_SL_TOURPLAN, rejectSLTourPlan);
}

export default dataSaga;
