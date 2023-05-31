import { takeLatest, call } from "redux-saga/effects";
import {
  GET_EFFECTIVEDATEFILTER,
  GET_MEALTEMPLATELIST,
  GET_EXISTINGMEALDATA,
  ADD_MEALTEMPLATE,
  UPDATE_MEALTEMPLATEATA,
  DELETE_MEALTEMPLATE,
  GET_MEALEDITDAY,
  GET_EXISTINGDATAONEFFEDATEWISE
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getEffectiveDateFilter(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EFFECTIVEDATEFILTER,
    requestBody: action.payload.params,
  });
}
function* saveMealTemplateData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_MEALTEMPLATE,
    requestBody: action.payload.params,
  });
}
function* getMealTemplateList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MEALTEMPLATELIST,
    requestBody: action.payload.params,
  });
}
function* getExistingMealData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EXISTINGMEALDATA,
    requestBody: action.payload.params,
  });
}
function* updateMealTemplateData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_MEALTEMPLATEATA,
    requestBody: action.payload.params,
  });
}
function* deleteMealTemplateData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.DELETE_MEALTEMPLATE,
    requestBody: action.payload.params,
  });
}
function* getMealEditDay(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MEALEDITDAY,
    requestBody: action.payload.params,
  });
}
function* getExistingDataOnEffeDateWise(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EXISTINGDATAONEFFEDATEWISE,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Meal Template APIs.
 */
function* dataSaga() {
  yield takeLatest(GET_EFFECTIVEDATEFILTER, getEffectiveDateFilter);
  yield takeLatest(GET_MEALTEMPLATELIST, getMealTemplateList);
  yield takeLatest(GET_EXISTINGMEALDATA, getExistingMealData);
  yield takeLatest(ADD_MEALTEMPLATE, saveMealTemplateData);
  yield takeLatest(UPDATE_MEALTEMPLATEATA, updateMealTemplateData);
  yield takeLatest(DELETE_MEALTEMPLATE, deleteMealTemplateData);
  yield takeLatest(GET_MEALEDITDAY, getMealEditDay);
  yield takeLatest(GET_EXISTINGDATAONEFFEDATEWISE, getExistingDataOnEffeDateWise);
}

export default dataSaga;
