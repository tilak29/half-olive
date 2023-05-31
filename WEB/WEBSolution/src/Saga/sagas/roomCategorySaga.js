import { takeLatest, call } from "redux-saga/effects";
import { GET_ROOM_CATEGORY, INSERT_ROOM_CATEGORY } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getRoomCategory(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ROOM_CATEGORY,
    requestBody: action.payload.params,
  });
}
function* insertRoomCategory(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.INSERT_ROOM_CATEGORY,
    requestBody: action.payload.params,
  });
}
/**
 * This saga is for Room Category
 */
function* dataSaga() {
  yield takeLatest(GET_ROOM_CATEGORY, getRoomCategory);
  yield takeLatest(INSERT_ROOM_CATEGORY, insertRoomCategory);
}
export default dataSaga;
