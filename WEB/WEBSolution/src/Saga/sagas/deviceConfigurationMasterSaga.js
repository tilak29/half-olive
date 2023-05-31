import { takeLatest, call } from "redux-saga/effects";

import {
  GET_DEVICECONFIGURATIONLIST,
  UPDATE_DEVICECONFIGURATIONLIST,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getDeviceConfigurationList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DEVICECONFIGURATIONLIST,
    requestBody: action.payload.params,
  });
}

function* updateDeviceConfigurationList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_DEVICECONFIGURATIONLIST,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Device Configuration Master APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(GET_DEVICECONFIGURATIONLIST, getDeviceConfigurationList);
  yield takeLatest(
    UPDATE_DEVICECONFIGURATIONLIST,
    updateDeviceConfigurationList
  );
}

export default dataSaga;
