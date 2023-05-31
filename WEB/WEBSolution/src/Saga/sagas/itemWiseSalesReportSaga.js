import { takeLatest, call } from "redux-saga/effects";

import { GET_ITEMWISESALES } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getItemWiseSalesReportData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ITEMWISESALES,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Claim Reward Report APIs.
 * @author Ankita Gadhia
 */
function* dataSaga() {
  yield takeLatest(GET_ITEMWISESALES, getItemWiseSalesReportData);
}

export default dataSaga;
