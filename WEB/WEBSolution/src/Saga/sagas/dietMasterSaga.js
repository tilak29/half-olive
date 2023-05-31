import { takeLatest, call } from "redux-saga/effects";
import {
  GET_DIET_MASTER,
  SAVE_DIET_MASTER,
  GET_DIET_CATEGORIES,
  GET_DIET_DELETE,
  UPDATE_DIET,
  VIEW_MEALDATA,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getDietMaster(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DIET_MASTER,
    requestBody: action.payload.params,
  });
}
function* saveDietMaster(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_DIET_MASTER,
    requestBody: action.payload.params,
  });
}
function* getDietCategories(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DIET_CATEGORIES,
    requestBody: action.payload.params,
  });
}
function* getDelete(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DIET_DELETE,
    requestBody: action.payload.params,
  });
}
function* updateDietMaster(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_DIET,
    requestBody: action.payload.params,
  });
}
function* viewMealData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.VIEW_MEALDATA,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is for Room Master
 */
/**
 * @author "Vishal Thakkar"
 */

function* dataSaga() {
  yield takeLatest(GET_DIET_MASTER, getDietMaster);
  yield takeLatest(SAVE_DIET_MASTER, saveDietMaster);
  yield takeLatest(GET_DIET_CATEGORIES, getDietCategories);
  yield takeLatest(GET_DIET_DELETE, getDelete);
  yield takeLatest(UPDATE_DIET, updateDietMaster);
  yield takeLatest(VIEW_MEALDATA, viewMealData);
}
export default dataSaga;
