import { takeLatest, call } from "redux-saga/effects";

import {
  GET_OUTSTANDING_REPORT
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getOutStandingReport(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_OUTSTANDING_REPORT,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to get OutStanding Report list.
 * @author Arpan Patel
 */
function* dataSaga() {
  yield takeLatest(GET_OUTSTANDING_REPORT, getOutStandingReport);
}

export default dataSaga;
