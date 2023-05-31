import { takeLatest, call } from "redux-saga/effects";

import {
  GET_QRLIST,
  ADD_QR,
  UPDATE_QR,
  DELETE_QR,
  GENERATE_QR,
  PRINTDOWNLOAD_QR,
  GET_QRPRINTHISTORY
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getQRList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_QRLIST,
  });
}

function* addQR(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_QR,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* updateQR(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_QR,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* deleteQR(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.DELETE_QR,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* printDownloadQR(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.PRINTDOWNLOAD_QR,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* generateQRCode(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GENERATE_QR,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* getQRPrintHistory(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_QRPRINTHISTORY,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

/**
 * This saga is used to call QR Master APIs.
 * @author Imran Patwa
 */
function* dataSaga() {
  yield takeLatest(GET_QRLIST, getQRList);
  yield takeLatest(ADD_QR, addQR);
  yield takeLatest(UPDATE_QR, updateQR);
  yield takeLatest(DELETE_QR, deleteQR);
  yield takeLatest(PRINTDOWNLOAD_QR, printDownloadQR);
  yield takeLatest(GENERATE_QR, generateQRCode);
  yield takeLatest(GET_QRPRINTHISTORY, getQRPrintHistory);
}

export default dataSaga;