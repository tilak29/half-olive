import { takeLatest, call } from "redux-saga/effects";

import {
  GET_ITEMLIST,
  ADD_ITEM,
  UPDATE_ITEM,
  EXPORT_ITEM_LIST,
  IMPORT_ITEM_LIST,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getItemList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ITEMLIST,
    requestBody: action.payload.params,
  });
}

function* addItem(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_ITEM,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* updateItem(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_ITEM,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* exportItemList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.EXPORT_ITEM_LIST,
    requestBody: action.payload.params,
  });
}

function* importItemList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.IMPORT_ITEM_LIST,
    requestBody: action.payload.params,
    isUpload: true,
  });
}
/**
 * This saga is used to call Item Master APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_ITEMLIST, getItemList);
  yield takeLatest(ADD_ITEM, addItem);
  yield takeLatest(UPDATE_ITEM, updateItem);
  yield takeLatest(EXPORT_ITEM_LIST, exportItemList);
  yield takeLatest(IMPORT_ITEM_LIST, importItemList);
}

export default dataSaga;
