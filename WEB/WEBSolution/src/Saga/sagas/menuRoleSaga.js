import { takeLatest, call } from "redux-saga/effects";

import {
  GET_MENUROLE_LIST,
  REFRESH_MENU_ITEM,
  SAVE_MENUROLE_DATA,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getMenuRoleList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MENUROLE_LIST,
    requestBody: action.payload.params,
  });
}

function* refreshMenuItem(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.REFRESH_MENU_ITEM,
    requestBody: action.payload.params,
  });
}

function* saveMenuRoleData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_MENUROLE_DATA,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Menu role APIs.
 * @author Harsh Patel
 */
function* dataSaga() {
  yield takeLatest(GET_MENUROLE_LIST, getMenuRoleList);
  yield takeLatest(REFRESH_MENU_ITEM, refreshMenuItem);
  yield takeLatest(SAVE_MENUROLE_DATA, saveMenuRoleData);
}

export default dataSaga;
