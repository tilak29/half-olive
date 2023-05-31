import { takeLatest, call } from "redux-saga/effects";
import {
  GET_TREATMENTTEMPLATE_CATEGORIES,
  GET_TREATMENTLIST_DATA,
  GET_DIETLIST_DATA,
    ADD_TREATMENTPLAN
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getTreatmentTemplateCategories(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_TREATMENTTEMPLATE_CATEGORIES,
    requestBody: action.payload.params,
  });
}

function* getTreatmentList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_TREATMENTLIST_DATA,
    requestBody: action.payload.params,
  });
}

function* getDietList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DIETLIST_DATA,
    requestBody: action.payload.params,
  });
}

function* addTreatmentPlan(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_TREATMENTPLAN,
    requestBody: action.payload.params,
  });
}
/**
 * This saga is for Treatment-Plan-Master
 */
function* dataSaga() {
  yield takeLatest(GET_TREATMENTTEMPLATE_CATEGORIES, getTreatmentTemplateCategories);
  yield takeLatest(GET_TREATMENTLIST_DATA, getTreatmentList);
  yield takeLatest(GET_DIETLIST_DATA, getDietList);
  yield takeLatest(ADD_TREATMENTPLAN, addTreatmentPlan);
}
export default dataSaga;
