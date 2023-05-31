import { takeLatest, call } from "redux-saga/effects";

import {
    UPDATE_POINTS
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* saveUpdatePoints(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_POINTS,
    requestBody: action.payload.params
  });
}

/**
 * This saga is used to update box and balance points of chemists
 * @author Harsh Patel
 */
function* dataSaga() {
  yield takeLatest(UPDATE_POINTS, saveUpdatePoints);
}

export default dataSaga;
