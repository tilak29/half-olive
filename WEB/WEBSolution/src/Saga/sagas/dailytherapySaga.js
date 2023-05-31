import { takeLatest, call } from "redux-saga/effects";

import {
    GET_DAILYTHERAPY,
    GET_DAILYTHERAPY_TYPENAME,
    GET_DAILYTHERAPY_UPDATE,
    GET_DAILYTHERAPY_SLOT
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getDailyTherapy(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DAILYTHERAPY,
    requestBody: action.payload.params,
  });
}
function* getDailytherapyTypeName(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DAILYTHERAPY_TYPENAME,
    requestBody: action.payload.params,
  });
}
function* updateDailytherapy(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DAILYTHERAPY_UPDATE,
    requestBody: action.payload.params,
  });
}
function* getDailytherapySlot(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DAILYTHERAPY_SLOT,
    requestBody: action.payload.params,
  });
}



/**
 * This saga is used to call daily therapy APIs.
 * @author Dileep Lohar
 */
function* dataSaga() {
  yield takeLatest(GET_DAILYTHERAPY, getDailyTherapy);
  yield takeLatest(GET_DAILYTHERAPY_TYPENAME, getDailytherapyTypeName);
  yield takeLatest(GET_DAILYTHERAPY_UPDATE, updateDailytherapy);
  yield takeLatest(GET_DAILYTHERAPY_SLOT, getDailytherapySlot);
}

export default dataSaga;
