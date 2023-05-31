import { takeLatest, call, put } from "redux-saga/effects";

import {
    GET_CUSTOME_RORDER_DATA,
    GET_CUSTOME_RORDER_DATA_BYID,
    UPDATE_CUSTOME_RORDER_DATA,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getCustomerOrderData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_CUSTOME_RORDER_DATA,
    requestBody: action.payload.params,
  });
}

function* getCustomerOrderDataById(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_CUSTOME_RORDER_DATA_BYID,
    requestBody: action.payload.params,
  });
}

function* updateCustomerOrderData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_CUSTOME_RORDER_DATA,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call City Master APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_CUSTOME_RORDER_DATA, getCustomerOrderData);
  yield takeLatest(GET_CUSTOME_RORDER_DATA_BYID, getCustomerOrderDataById);
  yield takeLatest(UPDATE_CUSTOME_RORDER_DATA, updateCustomerOrderData);
}

export default dataSaga;
