import { takeLatest, call } from "redux-saga/effects";

import {GET_SURVEYREPORT_DATA, GET_SURVEYCHEMIST_DATA,GET_ACTIVESURVEY_DATA} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getSurveyReportData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SURVEYREPORT_DATA,
    requestBody: action.payload.params,
  });
}

function* getSurveyChemistData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SURVEYCHEMIST_DATA,
    requestBody: action.payload.params,
  });
}

function* getActiveSurveyData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ACTIVESURVEY_DATA,
    requestBody: action.payload.params,
  });
}

function* dataSaga() {
  yield takeLatest(GET_SURVEYREPORT_DATA, getSurveyReportData);
  yield takeLatest(GET_SURVEYCHEMIST_DATA,getSurveyChemistData);
  yield takeLatest(GET_ACTIVESURVEY_DATA,getActiveSurveyData);
}

export default dataSaga;
