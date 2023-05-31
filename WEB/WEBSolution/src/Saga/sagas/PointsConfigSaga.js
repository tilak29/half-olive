import { takeLatest, call } from "redux-saga/effects";

import {
    GET_POINTSCONFIG_DATA,
    SAVE_POINTSCONFIG_DATA,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getPointsConfig(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_POINTSCONFIG_DATA,
    requestBody: action.payload.params,
  });
}

function* savePointsConfig(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_POINTSCONFIG_DATA,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Notification APIs.
 * @author Kishan Sirodariya
 */
function* dataSaga() {
  yield takeLatest(GET_POINTSCONFIG_DATA, getPointsConfig);
  yield takeLatest(SAVE_POINTSCONFIG_DATA, savePointsConfig);
}

export default dataSaga;
