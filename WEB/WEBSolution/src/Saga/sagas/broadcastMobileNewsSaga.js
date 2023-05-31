import { takeLatest, call } from "redux-saga/effects";

import {
  GET_BROADCAST_MOBILE_NEWS_LIST,
  ADD_BROADCAST_MOBILE_NEWS_LIST,
  UPDATE_BROADCAST_MOBILE_NEWS_LIST,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getBroadcastMobileNewsList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_BROADCAST_MOBILE_NEWS_LIST,
    requestBody: action.payload.params,
  });
}
function* addBroadcastMobileNewsList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_BROADCAST_MOBILE_NEWS_LIST,
    requestBody: action.payload.params,
  });
}
function* updateBroadcastMobileNewsList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_BROADCAST_MOBILE_NEWS_LIST,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call broadcast mobile news APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(GET_BROADCAST_MOBILE_NEWS_LIST, getBroadcastMobileNewsList);
  yield takeLatest(ADD_BROADCAST_MOBILE_NEWS_LIST, addBroadcastMobileNewsList);
  yield takeLatest(
    UPDATE_BROADCAST_MOBILE_NEWS_LIST,
    updateBroadcastMobileNewsList
  );
}

export default dataSaga;
