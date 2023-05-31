import { takeLatest, call } from "redux-saga/effects";
import {
  GET_TREATMENTROOMMASTERLIST,
  GET_THERAPISTLIST,
  ADD_TREATMENTROOM,
  UPDATE_TREATMENTROOM,
  DELETE_TREATMENTROOM,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getTreatmentRoomMasterList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_TREATMENTROOMMASTERLIST,
    requestBody: action.payload.params,
  });
}
function* getAllTherapist(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_THERAPISTLIST,
    requestBody: action.payload.params,
  });
}
function* addTreatmentRoom(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_TREATMENTROOM,
    requestBody: action.payload.params,
  });
}

function* updateTreatmentRoom(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_TREATMENTROOM,
    requestBody: action.payload.params,
  });
}

function* deleteTreatmentRoom(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.DELETE_TREATMENTROOM,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Treatment Room Master APIs.
 */
function* dataSaga() {
  yield takeLatest(GET_TREATMENTROOMMASTERLIST, getTreatmentRoomMasterList);
  yield takeLatest(GET_THERAPISTLIST, getAllTherapist);
  yield takeLatest(ADD_TREATMENTROOM, addTreatmentRoom);
  yield takeLatest(UPDATE_TREATMENTROOM, updateTreatmentRoom);
  yield takeLatest(DELETE_TREATMENTROOM, deleteTreatmentRoom);
}

export default dataSaga;
