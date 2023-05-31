import { takeLatest, call } from "redux-saga/effects";

import {
  GET_STOCKIST_FILTER_LIST} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getStockistFilterList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_STOCKIST_FILTER_LIST,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to get stockist filter list in outstanding report.
 * @author Arpan Patel
 */
function* dataSaga() {
  yield takeLatest(GET_STOCKIST_FILTER_LIST, getStockistFilterList);
}

export default dataSaga;
