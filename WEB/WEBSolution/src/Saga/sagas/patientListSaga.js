import { takeLatest, call } from "redux-saga/effects";
import { GET_PATIENTNAME } from "../actions/ActionType";
import MasterSaga from './MasterSaga'
import { API } from "../../Constants";

function* getPatientName(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_PATIENTNAME,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Location Master APIs.
 */
function* dataSaga() {
  yield takeLatest(GET_PATIENTNAME, getPatientName);
}

export default dataSaga;