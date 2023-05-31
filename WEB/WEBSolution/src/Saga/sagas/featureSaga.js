import { takeLatest, call } from "redux-saga/effects";

import {GET_FEATURE_DATA, SAVE_FEATURE_DATA,SEND_NOTIFICATION,SEND_FEATURE_SMS} from "../actions/ActionType";
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

function* SendNotification(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SEND_NOTIFICATION,
    requestBody: action.payload.params,
  });
}
function* SendFeatureSMS(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SEND_FEATURE_SMS,
    requestBody: action.payload.params,
  });
}
function* dataSaga() {
  yield takeLatest(GET_FEATURE_DATA, getFeatureData);
  yield takeLatest(SAVE_FEATURE_DATA,saveFeatureData);
  yield takeLatest(SEND_NOTIFICATION,SendNotification);
  yield takeLatest(SEND_FEATURE_SMS,SendFeatureSMS);
}

export default dataSaga;
