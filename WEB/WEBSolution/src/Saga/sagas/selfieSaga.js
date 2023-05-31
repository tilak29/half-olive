import { takeLatest, call } from "redux-saga/effects";
import { GET_SELFIE_DATA , SAVE_SELFIE_DATA } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

/**
 * @author Kishan Sirodariya
 */

function* getSelfieData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SELFIE_DATA,
    requestBody: action.payload.params,
  });
}

function* SaveSelfieData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_SELFIE_DATA,
    requestBody: action.payload.params,    
  });
}

function* dataSaga() {
  yield takeLatest(GET_SELFIE_DATA, getSelfieData);
  yield takeLatest(SAVE_SELFIE_DATA, SaveSelfieData);
}

export default dataSaga;
