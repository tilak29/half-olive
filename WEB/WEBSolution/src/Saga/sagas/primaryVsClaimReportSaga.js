import { takeLatest, call } from "redux-saga/effects";

import {
  GET_PRIMARYVSCLAIM
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getPrimaryVsClaimReportData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_PRIMARYVSCLAIM,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Primary Vs Secondary APIs.
 * @author Ankita Gadhia
 */
function* dataSaga() {
  yield takeLatest(GET_PRIMARYVSCLAIM, getPrimaryVsClaimReportData);
}

export default dataSaga;
