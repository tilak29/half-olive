import { takeLatest, call } from "redux-saga/effects";
import { GET_VIDEOLIST , ADD_VIDEOSERIES,GET_SERIESDATA, GET_AWS_FILEUPLOAD_URL } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

/**
 * @author Kishan Sirodariya
 */

function* getSeriesData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SERIESDATA,
    // requestBody: action.payload.params,
  });
}
function* getVideoData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_VIDEOLIST,
    requestBody: action.payload.params,
  });
}

function* addVideoData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_VIDEOSERIES,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* getAWSFileUploadURL(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_AWS_FILEUPLOAD_URL,
    requestBody: action.payload.params,
  });
}

function* dataSaga() {
  yield takeLatest(GET_SERIESDATA, getSeriesData);
  yield takeLatest(GET_VIDEOLIST, getVideoData);
  yield takeLatest(ADD_VIDEOSERIES, addVideoData);
  yield takeLatest(GET_AWS_FILEUPLOAD_URL, getAWSFileUploadURL);
}

export default dataSaga;
