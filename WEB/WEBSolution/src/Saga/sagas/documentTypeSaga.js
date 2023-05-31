import { takeLatest, call } from "redux-saga/effects";
import { GET_DOCUMENTTYPELIST , ADD_DOCUMENTTYPE,UPDATE_DOCUMENTTYPE} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

/**
 * @author Kishan Sirodariya
 */

function* getData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DOCUMENTTYPELIST,
    requestBody: action.payload.params,
  });
}

function* addData(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_DOCUMENTTYPE,
    requestBody: action.payload.params,
  });
}

function* updateData(action) {
  debugger
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_DOCUMENTTYPE,
    requestBody: action.payload.params,
  });
}

function* dataSaga() {
  yield takeLatest(GET_DOCUMENTTYPELIST, getData);
  yield takeLatest(ADD_DOCUMENTTYPE, addData);
  yield takeLatest(UPDATE_DOCUMENTTYPE, updateData);
}

export default dataSaga;
