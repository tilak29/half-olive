import { takeLatest, call } from "redux-saga/effects";

import {
  GET_MANAGER_TOURPLAN,
  GET_MANAGER_WORKINGWITH,
  SAVE_MANAGER_TOURPLAN,
  SAVE_REJECT_MANAGER_TOURPLAN,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getManagerTourPlan(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MANAGER_TOURPLAN,
    requestBody: action.payload.params,
  });
}

function* saveManagerTourPlan(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_MANAGER_TOURPLAN,
    requestBody: action.payload.params,
  });
}

function* getManagerWorkingWith(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MANAGER_WORKINGWITH,
  });
}

function* rejectSLTourPlan(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_REJECT_MANAGER_TOURPLAN,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Manager Tour Plan API's
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_MANAGER_TOURPLAN, getManagerTourPlan);
  yield takeLatest(SAVE_MANAGER_TOURPLAN, saveManagerTourPlan);
  yield takeLatest(GET_MANAGER_WORKINGWITH, getManagerWorkingWith);
  yield takeLatest(SAVE_REJECT_MANAGER_TOURPLAN, rejectSLTourPlan);
}

export default dataSaga;
