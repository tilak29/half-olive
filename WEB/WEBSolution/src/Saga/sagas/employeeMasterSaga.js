import { takeLatest, call, put } from "redux-saga/effects";

import {
  GET_EMPLOYEELIST,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEES,
  GET_MOB_OWNER_NAME,
  SINGLE_EMPLOYEE
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getEmployeeList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EMPLOYEELIST,
    requestBody: action.payload.params,
  });
}

function* addEmployee(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_EMPLOYEE,
    requestBody: action.payload.params,
  });

  yield put({ type: UPDATE_EMPLOYEES }); // Updating lookup data for employee
}

function* updateEmployee(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_EMPLOYEE,
    requestBody: action.payload.params,
  });

  yield put({ type: UPDATE_EMPLOYEES }); // Updating lookup data for employee
}

function* getMobileOwnerName(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MOB_OWNER_NAME,
    requestBody: action.payload.params,
  });
}
function* getSingleEmyloyeeData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SINGLE_EMPLOYEE,
    requestBody: action.payload.params,
  });
}
/**
 * This saga is used to call Employee Master APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(GET_EMPLOYEELIST, getEmployeeList);
  yield takeLatest(ADD_EMPLOYEE, addEmployee);
  yield takeLatest(UPDATE_EMPLOYEE, updateEmployee);
  yield takeLatest(GET_MOB_OWNER_NAME, getMobileOwnerName);
  yield takeLatest(SINGLE_EMPLOYEE, getSingleEmyloyeeData);
}

export default dataSaga;
