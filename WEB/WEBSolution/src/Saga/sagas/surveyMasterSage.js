import { takeLatest, call } from "redux-saga/effects";

import {GET_FEATURE_DATA, SAVE_FEATURE_DATA} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getFeatureData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_FEATURE_DATA,
    requestBody: action.payload.params,
  });
}

function* saveFeatureData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_FEATURE_DATA,
    requestBody: action.payload.params,
  });
}

function* dataSaga() {
  yield takeLatest(GET_FEATURE_DATA, getFeatureData);
  yield takeLatest(SAVE_FEATURE_DATA,saveFeatureData);
}

export default dataSaga;
