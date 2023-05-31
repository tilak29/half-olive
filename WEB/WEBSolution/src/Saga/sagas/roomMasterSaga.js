import { takeLatest, call } from "redux-saga/effects";
import {
  GET_ROOM_MASTER,
  SAVE_ROOM_MASTER,
  GET_ROOM_CATEGORIES,
  GET_KEY_LIST,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getRoomMaster(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ROOM_MASTER,
    requestBody: action.payload.params,
  });
}
function* saveRoomMaster(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_ROOM_MASTER,
    requestBody: action.payload.params,
  });
}
function* getRoomCategories(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ROOM_CATEGORIES,
    requestBody: action.payload.params,
  });
}
function* getKeyList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_KEY_LIST,
    requestBody: action.payload.params,
  });
}
/**
 * This saga is for Room Master
 */
function* dataSaga() {
  yield takeLatest(GET_ROOM_MASTER, getRoomMaster);
  yield takeLatest(SAVE_ROOM_MASTER, saveRoomMaster);
  yield takeLatest(GET_ROOM_CATEGORIES, getRoomCategories);
  yield takeLatest(GET_KEY_LIST, getKeyList);
}
export default dataSaga;
