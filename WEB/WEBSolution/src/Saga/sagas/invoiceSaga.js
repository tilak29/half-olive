import { takeLatest, call } from "redux-saga/effects";

import {
  GET_INVOICE_LIST,
  UPDATE_INVOICE,
  APPROVE_RETURN_INVOICE,
  CHECK_DUPLICATE_INVOICE,
  UPDATE_RETURN_INVOICE,
  GET_INVOICEITEMDATA
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getInvoiceList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_INVOICE_LIST,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* updateInvoice(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_INVOICE,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* checkDuplicateInvoice(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.CHECK_DUPLICATE_INVOICE,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* approveReturnInvoice(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.APPROVE_RETURN_INVOICE,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function*updateReturnInvoice(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_RETURN_INVOICE,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* getInvoiceItemData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_INVOICEITEMDATA,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

/**
 * This saga is used to call Invoice API's
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_INVOICE_LIST, getInvoiceList);
  yield takeLatest(UPDATE_INVOICE, updateInvoice);
  yield takeLatest(CHECK_DUPLICATE_INVOICE, checkDuplicateInvoice);
  yield takeLatest(APPROVE_RETURN_INVOICE, approveReturnInvoice);
  yield takeLatest(UPDATE_RETURN_INVOICE, updateReturnInvoice);
  yield takeLatest(GET_INVOICEITEMDATA, getInvoiceItemData);
}

export default dataSaga;
