import { takeLatest, call, put } from "redux-saga/effects";

import {
  GET_GUESTLIST,
  ADD_GUEST,
  UPDATE_GUEST,
  guestUploadFile_getData
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* guestUploadFilegetData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.guestUploadFile_getData,
    requestBody: action.payload.params,
  });
}

function* getGuestList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_GUESTLIST,
    requestBody: action.payload.params,
  });
}

function* addGuest(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_GUEST,
    requestBody: action.payload.params,
  });

 // yield put({ type: UPDATE_EMPLOYEES }); // Updating lookup data for employee
}

function* updateGuest(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_GUEST,
    requestBody: action.payload.params,
  });

  //yield put({ type: UPDATE_EMPLOYEES }); // Updating lookup data for employee
}


/**
 * This saga is used to call Guest Master APIs.
 * @author Imran Patwa
 */
function* dataSaga() {
  yield takeLatest(guestUploadFile_getData, guestUploadFilegetData);
  yield takeLatest(GET_GUESTLIST, getGuestList);
  yield takeLatest(ADD_GUEST, addGuest);
  yield takeLatest(UPDATE_GUEST, updateGuest);
}

export default dataSaga;
