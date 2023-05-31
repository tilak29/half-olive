import { takeLatest, call } from "redux-saga/effects";

import { GET_TREATMENT_MASTER,SAVE_TREATMENT_MASTER,GET_DISEASE_FOR_TREATMENT_MASTER,DELETE_TREATMENT_MASTER,EDIT_TREATMENT_MASTER } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";


function* getTreatmentMasterList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_TREATMENT_MASTER,
    requestBody: action.payload.params,
  });
}

function* saveTreatmentMaster(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_TREATMENT_MASTER,
    requestBody: action.payload.params,
  });
}

function* editTreatmentMaster(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.EDIT_TREATMENT_MASTER,
    requestBody: action.payload.params,
  });
}

function* deleteTreatmentMaster(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.DELETE_TREATMENT_MASTER,
    requestBody: action.payload.params,
  });
}

function* getAllDisease(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DISEASE_FOR_TREATMENT_MASTER,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Treatment Master APIs.
 * @author Dileep Lohar
 */
function* dataSaga() {
  yield takeLatest(GET_TREATMENT_MASTER, getTreatmentMasterList);
  yield takeLatest(SAVE_TREATMENT_MASTER, saveTreatmentMaster);
  yield takeLatest(EDIT_TREATMENT_MASTER, editTreatmentMaster);
  yield takeLatest(DELETE_TREATMENT_MASTER, deleteTreatmentMaster);
  yield takeLatest(GET_DISEASE_FOR_TREATMENT_MASTER, getAllDisease);
}

export default dataSaga;
