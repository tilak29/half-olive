import { takeLatest, call } from "redux-saga/effects";

import {
  GET_FTP_DIVISION_LIST
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getDepoList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_FTP_DIVISION_LIST,
  });
}

/**
 * This saga is used to get FTP Division list
 * @author Brinda Patel
 */
function* dataSaga() {
  yield takeLatest(GET_FTP_DIVISION_LIST, getDepoList);
}

export default dataSaga;
