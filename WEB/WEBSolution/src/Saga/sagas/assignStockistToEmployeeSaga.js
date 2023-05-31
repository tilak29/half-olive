import { takeLatest, call } from "redux-saga/effects";

import {
  GET_STOCKISTLIST_OF_STATE_EMPLOYEE,
  ASSIGN_STOCKIST_TO_EMPLOYEE,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getStockistOfStateEmployee(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_STOCKISTLIST_OF_STATE_EMPLOYEE,
    requestBody: action.payload.params,
  });
}

function* assignStockistToEmployee(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ASSIGN_STOCKIST_TO_EMPLOYEE,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Assign stockist to employee APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(
    GET_STOCKISTLIST_OF_STATE_EMPLOYEE,
    getStockistOfStateEmployee
  );
  yield takeLatest(ASSIGN_STOCKIST_TO_EMPLOYEE, assignStockistToEmployee);
}

export default dataSaga;
