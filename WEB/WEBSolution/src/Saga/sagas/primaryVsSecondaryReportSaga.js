import { takeLatest, call } from "redux-saga/effects";

import {
  GET_PRIMARYVSSECONDARY
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getPrimaryVsSecondaryReportData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_PRIMARYVSSECONDARY,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Primary Vs Secondary APIs.
 * @author Ankita Gadhia
 */
function* dataSaga() {
  yield takeLatest(GET_PRIMARYVSSECONDARY, getPrimaryVsSecondaryReportData);
}

export default dataSaga;
