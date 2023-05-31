import { takeLatest, call } from "redux-saga/effects";

import {GET_MYORDER_LIST, GET_MYORDER_ITEMPRICE,SAVE_MYORDER,GET_SUPERSTOCKIST} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getMyOrderList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MYORDER_LIST,
    requestBody: action.payload.params,
  });
}

function* getMyOrderItemPriceList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MYORDER_ITEMPRICE,
    requestBody: action.payload.params,
  });
}

function* saveMyOrder(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_MYORDER,
    requestBody: action.payload.params,
  });
}

// function* getSuperStockists(action) {
//   yield call(MasterSaga, {
//     action,
//     apiURL: API.GET_SUPERSTOCKIST,
//     requestBody: action.payload.params,
//   });
// }

function* dataSaga() {
  yield takeLatest(GET_MYORDER_LIST, getMyOrderList);
  yield takeLatest(GET_MYORDER_ITEMPRICE,getMyOrderItemPriceList);
  yield takeLatest(SAVE_MYORDER, saveMyOrder);
  // yield takeLatest(GET_SUPERSTOCKIST, getSuperStockists);
}

export default dataSaga;
