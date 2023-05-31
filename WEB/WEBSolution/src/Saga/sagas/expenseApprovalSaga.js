import { takeLatest, call } from "redux-saga/effects";

import {
  GET_EXPENSE_APPROVAL_LIST,
  GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE,
  UPDATE_EXPENSE_APPROVAL,
  GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE_ASYNC
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getExpenseApprovalList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EXPENSE_APPROVAL_LIST,
    requestBody: action.payload.params,
  });
}

function* getExpenseApprovalListOfEmployee(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE,
    requestBody: action.payload.params,
  });
}

function* getExpenseApprovalAsyncListOfEmployee(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE_ASYNC,
    requestBody: action.payload.params,
  });
}

function* updateExpenseApprovalList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_EXPENSE_APPROVAL,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Expense Approval APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(GET_EXPENSE_APPROVAL_LIST, getExpenseApprovalList);
  yield takeLatest(
    GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE,
    getExpenseApprovalListOfEmployee
  );
  yield takeLatest(UPDATE_EXPENSE_APPROVAL, updateExpenseApprovalList);
  yield takeLatest(GET_EXPENSE_APPROVAL_LIST_OF_EMPLOYEE_ASYNC, getExpenseApprovalAsyncListOfEmployee);
}

export default dataSaga;
