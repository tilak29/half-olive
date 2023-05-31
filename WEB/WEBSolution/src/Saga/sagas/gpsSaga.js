import { takeLatest, call, takeEvery } from "redux-saga/effects";

import {
  GET_GPS_TRACK_DATA,
  GET_GPS_LOCATION_HISTORY_DATA,
  GET_MANAGER_VS_TEAM_DATA,
  GET_GPS_TRACK_DATA_BY_ATETIMEANDEMPLOYEE
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getGPSTrackData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_GPS_TRACK_DATA,
    requestBody: action.payload.params,
  });
}

function* getGPSLocationHistory(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_GPS_LOCATION_HISTORY_DATA,
    requestBody: action.payload.params,
  });
}

function* getManagerVsTeamData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MANAGER_VS_TEAM_DATA,
    requestBody: action.payload.params,
  });
}


function* getGPSTracerDataByDatetimeAndEmployee(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_GPS_TRACK_DATA_BY_ATETIMEANDEMPLOYEE,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call GPS APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_GPS_TRACK_DATA, getGPSTrackData);
  yield takeEvery(GET_GPS_LOCATION_HISTORY_DATA, getGPSLocationHistory);
  yield takeLatest(GET_MANAGER_VS_TEAM_DATA, getManagerVsTeamData);
  yield takeLatest(GET_GPS_TRACK_DATA_BY_ATETIMEANDEMPLOYEE, getGPSTracerDataByDatetimeAndEmployee);
}

export default dataSaga;
