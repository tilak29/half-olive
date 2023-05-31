import { takeLatest, call } from "redux-saga/effects";

import {
  GET_DEPO_LIST
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getDepoList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DEPO_LIST,
  });
}

/**
 * This saga is used to get depo list
 * @author Arpan Patel
 */
function* dataSaga() {
  yield takeLatest(GET_DEPO_LIST, getDepoList);
}

export default dataSaga;
