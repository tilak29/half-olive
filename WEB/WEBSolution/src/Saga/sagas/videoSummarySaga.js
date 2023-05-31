import { takeLatest, call } from "redux-saga/effects";
import { GET_VIDEO_SUMMARY_REPORT_DATA , GET_VIDEO_SUMMARY_DETAILS_DATA } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

/**
 * @author Kishan Sirodariya
 */

function* getVideoSummary(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_VIDEO_SUMMARY_REPORT_DATA,
    requestBody: action.payload.params,
  });
}

function* getVideoSummaryData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_VIDEO_SUMMARY_DETAILS_DATA,
    requestBody: action.payload.params,    
  });
}

function* dataSaga() {
  yield takeLatest(GET_VIDEO_SUMMARY_REPORT_DATA, getVideoSummary);
  yield takeLatest(GET_VIDEO_SUMMARY_DETAILS_DATA, getVideoSummaryData);
}

export default dataSaga;
