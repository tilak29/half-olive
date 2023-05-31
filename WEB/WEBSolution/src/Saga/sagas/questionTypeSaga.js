import { takeLatest, call } from "redux-saga/effects";
import {GET_QUESTION_TYPE, SAVE_QUESTION_TYPE} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getQuestionsData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_QUESTION_TYPE,
    requestBody: action.payload.params,
  });
}

function* addUpdateQuestions(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_QUESTION_TYPE,
    requestBody: action.payload.params,
  });
}

function* dataSaga() {
  yield takeLatest(GET_QUESTION_TYPE, getQuestionsData);
  yield takeLatest(SAVE_QUESTION_TYPE,addUpdateQuestions);
}

export default dataSaga;
