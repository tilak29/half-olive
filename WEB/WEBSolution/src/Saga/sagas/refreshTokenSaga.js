import { takeLatest, call, delay, cancel, select } from "redux-saga/effects";

import {
  START_REFRESH_TOKEN_SAGA,
  GET_REFRESH_TOKEN,
  GET_REFRESH_TOKEN_SUCCESS,
  USER_LOGOUT,
  FORCE_LOGOUT,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";
import * as selectors from "./selectors";

function* fetchData() {
  try {
    const authInfo = yield select(selectors.authInfo);
    const { loggedInDesignationId } = authInfo;

    const requestBody = { loggedInDesignationId };

    const action = {
      type: GET_REFRESH_TOKEN,
    };

    yield call(MasterSaga, {
      action,
      apiURL: API.REFRESH_TOKEN,
      requestBody,
      successAction: GET_REFRESH_TOKEN_SUCCESS,
    });
  } catch (e) {}
}

const refreshInterval = 10000;
function* fetchSagaPeriodically() {
  try {
    while (true) {
      const authInfo = yield select(selectors.authInfo);

      const refrshIntervalInMs =
        authInfo.refrshIntervalInMs === undefined ||
        authInfo.refrshIntervalInMs === null
          ? refreshInterval
          : authInfo.refrshIntervalInMs;

      yield delay(parseInt(refrshIntervalInMs));
      yield call(fetchData);
    }
  } catch (e) {}
}

function* cancelFetchSagaPeriodically(task) {
  yield cancel(task);
}

/**
 * This saga is used to run a task in background to refresh JWT token after a specific interval.
 * It starts after the success callback of login.
 * Calls the refersh-token API at specific interval.
 * It has a callback event to update the new token in state.
 * It stops when the logout action in dispatched. *
 *  @author Tejal Sali
 */
function* dataSaga() {
  const bgRefreshTask = yield takeLatest(
    START_REFRESH_TOKEN_SAGA,
    fetchSagaPeriodically
  );
  yield takeLatest(USER_LOGOUT, cancelFetchSagaPeriodically, bgRefreshTask);
  yield takeLatest(FORCE_LOGOUT, cancelFetchSagaPeriodically, bgRefreshTask);
}

export default dataSaga;
