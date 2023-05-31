import { takeLatest, call } from "redux-saga/effects";

import {GET_SURVEY_DATA, SAVE_SURVEY_DATA, GET_SURVEYQUESTION_DATA, 
  GET_ANSWERGROUP_DATA, SAVE_SURVEYQUESTION_DATA, 
  DELETE_SURVEYQUESTION_DATA, SAVE_SURVEYCOPY_DATA} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getSurveyData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SURVEY_DATA,
    requestBody: action.payload.params,
  });
}

function* saveSurveyData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_SURVEY_DATA,
    requestBody: action.payload.params,
  });
}

function* getSurveyQuestionData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SURVEYQUESTION_DATA,
    requestBody: action.payload.params,
  });
}

function* getAnswerGroupData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ANSWERGROUP_DATA,
    requestBody: action.payload.params,
  });
}

function* saveSurveyQuestionData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_SURVEYQUESTION_DATA,
    requestBody: action.payload.params,
  });
}

function* deleteSurveyQuestionData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.DELETE_SURVEYQUESTION_DATA,
    requestBody: action.payload.params,
  });
}

function* saveSurveyCopyData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_SURVEYCOPY_DATA,
    requestBody: action.payload.params,
  });
}

function* dataSaga() {
  yield takeLatest(GET_SURVEY_DATA, getSurveyData);
  yield takeLatest(SAVE_SURVEY_DATA,saveSurveyData);
  yield takeLatest(GET_SURVEYQUESTION_DATA, getSurveyQuestionData);
  yield takeLatest(GET_ANSWERGROUP_DATA, getAnswerGroupData);
  yield takeLatest(SAVE_SURVEYQUESTION_DATA, saveSurveyQuestionData);
  yield takeLatest(DELETE_SURVEYQUESTION_DATA, deleteSurveyQuestionData);
  yield takeLatest(GET_ANSWERGROUP_DATA, getAnswerGroupData);
  yield takeLatest(SAVE_SURVEYCOPY_DATA, saveSurveyCopyData);
}

export default dataSaga;
