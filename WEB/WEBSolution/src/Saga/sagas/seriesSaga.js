import { takeLatest, call } from "redux-saga/effects";
import { GET_SERIESLIST } from "../actions/ActionType";
import { ADD_SERIES } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

/**
 * @author Kishan Sirodariya
 */

function* getSeriesData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SERIESLIST,
    requestBody: action.payload.params,
  });
}

function* addUpdateSeriesData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_SERIES,
    requestBody: action.payload.params,
    isUpload: true,
  });
}
function* dataSaga() {
  yield takeLatest(GET_SERIESLIST, getSeriesData);
  yield takeLatest(ADD_SERIES, addUpdateSeriesData);
}

export default dataSaga;
