import { takeLatest, call } from "redux-saga/effects";

import {
  GET_NOTIFICATIONS,
  ADD_NOTIFICATION,
  GET_NOTIFICATION_COUNT,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getNotifications(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_NOTIFICATIONS,
    requestBody: action.payload.params,
  });
}

function* addNotifications(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_NOTIFICATION,
    requestBody: action.payload.params,
  });
}

function* getNotificationCount(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_NOTIFICATION_COUNT,
  });
}

/**
 * This saga is used to call Notification APIs.
 * @author Nirali Maradiya, Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_NOTIFICATIONS, getNotifications);
  yield takeLatest(ADD_NOTIFICATION, addNotifications);
  yield takeLatest(GET_NOTIFICATION_COUNT, getNotificationCount);
}

export default dataSaga;
