import { takeEvery, takeLatest, call } from "redux-saga/effects";

import {
  GET_CHEMISTLIST,
  ADD_CHEMIST,
  UPDATE_CHEMIST,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getChemistList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_CHEMISTLIST,
    requestBody: action.payload.params,
  });
}

function* addChemist(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_CHEMIST,
    requestBody: action.payload.params,
  });
}

function* updateChemist(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_CHEMIST,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Chemist Master APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeEvery(GET_CHEMISTLIST, getChemistList);
  yield takeLatest(ADD_CHEMIST, addChemist);
  yield takeLatest(UPDATE_CHEMIST, updateChemist);
}

export default dataSaga;
