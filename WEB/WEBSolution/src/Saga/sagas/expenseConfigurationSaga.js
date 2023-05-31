import { takeLatest, call } from "redux-saga/effects";

import { GET_EXPENSE_CONFIG, SAVE_EXPENSE_CONFIG } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getExpenseConfig(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EXPENSE_CONFIG,
    requestBody: action.payload.params,
  });
}

function* saveExpenseConfig(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_EXPENSE_CONFIG,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Expense configuration Master APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(GET_EXPENSE_CONFIG, getExpenseConfig);
  yield takeLatest(SAVE_EXPENSE_CONFIG, saveExpenseConfig);
}

export default dataSaga;
