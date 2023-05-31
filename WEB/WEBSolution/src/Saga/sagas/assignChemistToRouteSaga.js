import { takeLatest, call } from "redux-saga/effects";

import { ASSIGN_CHEMIST_TO_ROUTE } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* assignChemistToRoute(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ASSIGN_CHEMIST_TO_ROUTE,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Assign chemist to Route APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(ASSIGN_CHEMIST_TO_ROUTE, assignChemistToRoute);
}

export default dataSaga;
