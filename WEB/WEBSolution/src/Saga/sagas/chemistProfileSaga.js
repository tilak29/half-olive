import { takeLatest, call } from "redux-saga/effects";

import {
GET_CHEMIST_PROFILE_LIST,
GET_CHEMIST_PROFILE_DATA,
UPDATE_CHEMIST_PROFILE
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getChemistProfileList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_CHEMIST_PROFILE_LIST,
    requestBody: action.payload.params,
  });
}

function* getChemistProfileData(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.GET_CHEMIST_PROFILE_DATA,
      requestBody: action.payload.params,
    });
  }

function* updateChemistProfile(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_CHEMIST_PROFILE,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Chemist Profile APIs.
 * @author Harsh Patel
 */
function* dataSaga() {
  yield takeLatest(GET_CHEMIST_PROFILE_LIST, getChemistProfileList);
  yield takeLatest(GET_CHEMIST_PROFILE_DATA, getChemistProfileData);
  yield takeLatest(UPDATE_CHEMIST_PROFILE, updateChemistProfile);
}

export default dataSaga;
