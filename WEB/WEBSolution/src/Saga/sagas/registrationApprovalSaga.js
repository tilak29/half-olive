import { takeLatest, call } from "redux-saga/effects";

import {
  GET_MATCHING_CHEMIST_DATA,
  GET_REGISTRATION_APPROVAL_DATA,
  UPDATE_REGISTRATION_REQ,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getRegistrationList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_REGISTRATION_APPROVAL_DATA,
    requestBody: action.payload.params,
  });
}

function* updateRegistration(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_REGISTRATION_REQ,
    requestBody: action.payload.params,
  });
}

function* getMatchingChemistData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MATCHING_CHEMIST_DATA,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to get Approval -> Registration APIs
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_REGISTRATION_APPROVAL_DATA, getRegistrationList);
  yield takeLatest(UPDATE_REGISTRATION_REQ, updateRegistration);
  yield takeLatest(GET_MATCHING_CHEMIST_DATA, getMatchingChemistData);
}

export default dataSaga;
