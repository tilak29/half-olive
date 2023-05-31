import { takeLatest, call } from "redux-saga/effects";

import {
  GET_PRIMARYPURCHASELIST,
  IMPORT_PRIMARYPURCHASE_LIST,
  SAVE_PRIMARYPURCHASE,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getPrimaryPurchaseList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_PRIMARYPURCHASELIST,
    requestBody: action.payload.params,
  });
}

function* importPrimaryPurchaseList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.IMPORT_PRIMARYPURCHASE_LIST,
    requestBody: action.payload.params,
    isUpload: true,
  });
}


function* savePrimaryPurchase(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_PRIMARYPURCHASE,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Primary Purchase APIs.
 * @author Ankita Gadhia
 */
function* dataSaga() {
  yield takeLatest(GET_PRIMARYPURCHASELIST, getPrimaryPurchaseList);
  yield takeLatest(IMPORT_PRIMARYPURCHASE_LIST, importPrimaryPurchaseList);
  yield takeLatest(SAVE_PRIMARYPURCHASE, savePrimaryPurchase);
}

export default dataSaga;
