import { call, takeEvery } from "redux-saga/effects";
import { API, STATIC_LOOKUP_CODES } from "../../Constants";
import { GET_STATIC_LOOKUP } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";

function* fetchData(action) {
  if (action.payload.params.code) {
    const requestBody = {
      code: STATIC_LOOKUP_CODES[action.payload.params.code],
    };
    yield call(MasterSaga, {
      action,
      requestBody,
      apiURL: API.GET_STATIC_LOOKUP,
    });
  }
}

/**
 * This saga is used to get all static lookups data
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeEvery(GET_STATIC_LOOKUP, fetchData);
}

export default dataSaga;
