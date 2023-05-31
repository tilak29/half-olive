import { takeLatest, call } from "redux-saga/effects";

import {
  GET_SCHEMELIST,
  GET_AVAILABLE_ITEMLIST,
  ADD_SCHEME,
  UPDATE_SCHEME,
  UPDATE_SCHEME_ITEMS,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getSchemesList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SCHEMELIST,
  });
}

function* getAvailableItemsList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_AVAILABLE_ITEMLIST,
    requestBody: action.payload.params
  });
}

function* addScheme(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_SCHEME,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* updateScheme(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_SCHEME,
    requestBody: action.payload.params,
    isUpload: true,
  });
}

function* updateSchemeItems(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_SCHEME_ITEMS,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Scheme Master APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_SCHEMELIST, getSchemesList);
  yield takeLatest(GET_AVAILABLE_ITEMLIST, getAvailableItemsList);
  yield takeLatest(ADD_SCHEME, addScheme);
  yield takeLatest(UPDATE_SCHEME, updateScheme);
  yield takeLatest(UPDATE_SCHEME_ITEMS, updateSchemeItems);
}

export default dataSaga;
