import { takeLatest, call } from "redux-saga/effects";

import {
  GET_DISEASE_NAME,
  GET_TREATMENT_NAME,
  SAVE_TEMPLETE_NAME,
  GET_DISEASELIST,
  GET_TEMPLETEDISEASE,
  DELETE_TEMPLETE,
  UPDATE_TEMPLETE,
  GET_TEMPLATENAMELIST,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getDiet(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DISEASE_NAME,
    requestBody: action.payload.params,
  });
}
function* getTreatment(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_TREATMENT_NAME,
    requestBody: action.payload.params,
  });
}
function* saveTemplete(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_TEMPLETE_NAME,
    requestBody: action.payload.params,
  });
}
function* getDiseaseList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DISEASELIST,
    requestBody: action.payload.params,
  });
}
function* gettempleteDiseaseCategories(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_TEMPLETEDISEASE,
    requestBody: action.payload.params,
  });
}

function* deletetemplete(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.DELETE_TEMPLETE,
    requestBody: action.payload.params,
  });
}
function* updatetemplete(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_TEMPLETE,
    requestBody: action.payload.params,
  });
}
function* getTreatmentdetail(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_TEMPLATENAMELIST,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Area Master APIs.
 * @author Vishal Thakkar
 */
function* dataSaga() {
  yield takeLatest(GET_DISEASE_NAME, getDiet);
  yield takeLatest(GET_TREATMENT_NAME, getTreatment);
  yield takeLatest(SAVE_TEMPLETE_NAME, saveTemplete);
  yield takeLatest(GET_DISEASELIST, getDiseaseList);
  yield takeLatest(GET_TEMPLETEDISEASE, gettempleteDiseaseCategories);
  yield takeLatest(DELETE_TEMPLETE, deletetemplete);
  yield takeLatest(UPDATE_TEMPLETE, updatetemplete);
  yield takeLatest(GET_TEMPLATENAMELIST, getTreatmentdetail);
}

export default dataSaga;
