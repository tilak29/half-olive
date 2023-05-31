import { takeLatest, call } from "redux-saga/effects";

import { GET_CHEMIST_CUMULATIVE_PROD_CALLS_LIST } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getChemistCumulativeProductiveCallList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_CHEMIST_CUMULATIVE_PROD_CALLS_LIST,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call get Chemist CumulativeProductive Call report APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(
    GET_CHEMIST_CUMULATIVE_PROD_CALLS_LIST,
    getChemistCumulativeProductiveCallList
  );
}

export default dataSaga;
