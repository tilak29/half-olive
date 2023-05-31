import { takeLatest, call } from "redux-saga/effects";

import {
    GET_ORDER_LIST,
    GET_ORDERDATA_BYID,
    UPDATE_ORDER
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getOrderList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ORDER_LIST,
    requestBody: action.payload.params,
  });
}

function* getOrderDataById(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.GET_ORDERDATA_BYID,
      requestBody: action.payload.params,
    });
  }

  function* updateOrder(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.UPDATE_ORDER,
      requestBody: action.payload.params,
    });
  }

/**
 * This saga is used to call Order APIs.
 * @author Harsh Patel
 */
function* dataSaga() {
  yield takeLatest(GET_ORDER_LIST, getOrderList);
  yield takeLatest(GET_ORDERDATA_BYID, getOrderDataById);
  yield takeLatest(UPDATE_ORDER, updateOrder);
}

export default dataSaga;
