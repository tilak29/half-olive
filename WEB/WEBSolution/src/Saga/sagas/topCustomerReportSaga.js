import { takeLatest, call } from "redux-saga/effects";
import { GET_TOPCUSTOMER } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getTopCustomerReportData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_TOPCUSTOMER,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Top Customer Report APIs.
 * @author Imran Patwa
 */
function* dataSaga() {
  yield takeLatest(GET_TOPCUSTOMER, getTopCustomerReportData);
}

export default dataSaga;
