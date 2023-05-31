import { takeLatest, call } from "redux-saga/effects";

import {
    GET_DEFAULT_SECONDARY,
    UPDATE_DEFAULT_SECONDARY,
    UPDATE_DEFAULTALL_SECONDARY
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getDefaultSecondary(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DEFAULT_SECONDARY,
    requestBody: action.payload.params,
  });
}

function* updategetDefaultSecondary(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_DEFAULT_SECONDARY,
    requestBody: action.payload.params,
  });
}

function* updategetAllDefaultSecondary(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_DEFAULTALL_SECONDARY,
    requestBody: action.payload.params,
  });
}

/**
 * @author Kishan Sirodariya
 */
function* dataSaga() {
  yield takeLatest(GET_DEFAULT_SECONDARY, getDefaultSecondary);
  yield takeLatest(UPDATE_DEFAULT_SECONDARY, updategetDefaultSecondary);
  yield takeLatest(UPDATE_DEFAULTALL_SECONDARY, updategetAllDefaultSecondary);
}

export default dataSaga;
