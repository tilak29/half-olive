import { takeLatest, call } from "redux-saga/effects";

import { GET_TP_VS_ACTUAL_DATA } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getTpVsActualRouteData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_TP_VS_ACTUAL_DATA,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to get TP vs Actual Route Report APIs
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_TP_VS_ACTUAL_DATA, getTpVsActualRouteData);
}

export default dataSaga;
