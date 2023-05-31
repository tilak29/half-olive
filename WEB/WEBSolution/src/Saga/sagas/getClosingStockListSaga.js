import { takeLatest, call } from "redux-saga/effects";

import {
  GET_CLOSING_STOCK_LIST
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getClosingStockList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_CLOSING_STOCK_LIST,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to get closing stock report list.
 * @author Arpan Patel
 */
function* dataSaga() {
  yield takeLatest(GET_CLOSING_STOCK_LIST, getClosingStockList);
}

export default dataSaga;
