import { takeLatest, call } from "redux-saga/effects";

import { SAVE_ADVERTISE_IMAGES,GET_ADVERTISE_IMAGES } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* saveAdvertiseImages(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_ADVERTISE_IMAGES,
    requestBody: action.payload.params,
    isUpload: true,
  });
}


function* getAdvertiseImages(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ADVERTISE_IMAGES,
    requestBody: action.payload.params,
    // isUpload: true,
  });
}

/**
 * This saga is used to call advertise API's
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(SAVE_ADVERTISE_IMAGES, saveAdvertiseImages);
  yield takeLatest(GET_ADVERTISE_IMAGES, getAdvertiseImages);
}

export default dataSaga;
