import { takeLatest, call, put } from "redux-saga/effects";

import {
  GET_STATELIST,
  ADD_STATE,
  UPDATE_STATE,
  UPDATE_STATES,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getStatesList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_STATELIST,
    requestBody: action.payload.params,
  });
}

function* addState(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_STATE,
    requestBody: action.payload.params,
  });
  yield put({ type: UPDATE_STATES }); // Updating lookup data for state
}

function* updateState(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_STATE,
    requestBody: action.payload.params,
  });
  yield put({ type: UPDATE_STATES }); // Updating lookup data for state
}

/**
 * This saga is used to call State Master APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_STATELIST, getStatesList);
  yield takeLatest(ADD_STATE, addState);
  yield takeLatest(UPDATE_STATE, updateState);
}

export default dataSaga;
