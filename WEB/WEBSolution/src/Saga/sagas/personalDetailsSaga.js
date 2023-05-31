import { takeLatest, call } from "redux-saga/effects";
import { GET_PERSONALDETAILS } from "../actions/ActionType";
import MasterSaga from './MasterSaga'
import { API } from "../../Constants";

function* getPersonalDetails(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_PERSONALDETAILS,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Location Master APIs.
 */
function* dataSaga() {
  yield takeLatest(GET_PERSONALDETAILS, getPersonalDetails);
}

export default dataSaga;