import { takeLatest, call } from "redux-saga/effects";

import {
  GET_MONTHLY_SALES_DATA
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getSalesReportData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MONTHLY_SALES_DATA,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to get sales report data.
 * @author Brinda Patel
 */
function* dataSaga() {
  yield takeLatest(GET_MONTHLY_SALES_DATA, getSalesReportData);
}

export default dataSaga;
