import { takeLatest, call, put } from "redux-saga/effects";

import {
  guestUploadFile_downloadFile
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* guestUploadFile_DownloadFile(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.guestUploadFile_downloadFile,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Guest Master APIs.
 * @author Manish Viradiya
 */
function* dataSaga() {
  yield takeLatest(guestUploadFile_downloadFile, guestUploadFile_DownloadFile);
}

export default dataSaga;
