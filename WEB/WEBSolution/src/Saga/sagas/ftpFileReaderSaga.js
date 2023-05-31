import { takeLatest, call } from "redux-saga/effects";

import { READ_FTP_FILES } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* readFTPFiles(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.READ_FTP_FILES,
  });
}

/**
 * This saga is used to read FTP files
 * @author Brinda Patel
 */
function* dataSaga() {
  yield takeLatest(READ_FTP_FILES, readFTPFiles);
}

export default dataSaga;
