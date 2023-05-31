import { takeLatest, call } from "redux-saga/effects";
import {
    GET_DIETLIST_MASTER,
    GET_THERAPYLIST_MASTER
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* dietPlanGetData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DIETLIST_MASTER,
    requestBody: action.payload.params,
  });
}
function* therapyPlanGetData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_THERAPYLIST_MASTER,
    requestBody: action.payload.params,
  });
}
/**
 * This saga is for Room Master
 */
function* dataSaga() {
  yield takeLatest(GET_DIETLIST_MASTER, dietPlanGetData);
  yield takeLatest(GET_THERAPYLIST_MASTER, therapyPlanGetData);
}
export default dataSaga;
