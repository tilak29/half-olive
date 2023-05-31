import { takeLatest, call } from "redux-saga/effects";

import { MERGE_ROUTES } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* mergeRoutes(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.MERGE_ROUTES,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Merge Route API.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(MERGE_ROUTES, mergeRoutes);
}

export default dataSaga;
