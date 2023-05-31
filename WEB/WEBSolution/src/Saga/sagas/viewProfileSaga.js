import { takeLatest, call } from "redux-saga/effects";

import { GET_USERPROFILE_DATA } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getUserProfileData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_USERPROFILE_DATA,
  });
}

/**
 * This saga is used to get User Profile Data
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_USERPROFILE_DATA, getUserProfileData);
}

export default dataSaga;
