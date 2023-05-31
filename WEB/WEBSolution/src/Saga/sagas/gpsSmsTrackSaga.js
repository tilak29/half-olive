import { takeLatest, call } from "redux-saga/effects";
import { GET_GPSSMSTRACK } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getGPSSMSTrackData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_GPSSMSTRACK,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call GPS SMS Track APIs.
 * @author Imran Patwa
 */
function* dataSaga() {
  yield takeLatest(GET_GPSSMSTRACK, getGPSSMSTrackData);
}

export default dataSaga;
