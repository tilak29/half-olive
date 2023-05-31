import { takeLatest, call } from "redux-saga/effects";

import {
  GET_SMARTSETUAPP
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getSmartSetuAppReportData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SMARTSETUAPP,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Smart Setu App APIs.
 * @author Ankita Gadhia
 */
function* dataSaga() {
  yield takeLatest(GET_SMARTSETUAPP, getSmartSetuAppReportData);
}

export default dataSaga;
