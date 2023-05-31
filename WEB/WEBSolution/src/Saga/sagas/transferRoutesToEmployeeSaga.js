import { takeLatest, call } from "redux-saga/effects";

import { TRANSFER_ROUTES_TO_EMPLOYEE, GET_LOOKUP_ROUTES } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* transferRoutesToEmployee(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.TRANSFER_ROUTES_TO_EMPLOYEE,
    requestBody: action.payload.params,
  });
}

function* getLookupRoutes(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_LOOKUP_ROUTES,
    requestBody: action.payload.params,
  });
}
/**
 * This saga is used to call transfer routes to employee APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(TRANSFER_ROUTES_TO_EMPLOYEE, transferRoutesToEmployee);
  yield takeLatest(GET_LOOKUP_ROUTES, getLookupRoutes);
}

export default dataSaga;
