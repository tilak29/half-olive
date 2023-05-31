import { takeLatest, call, select } from "redux-saga/effects";

import { USER_LOGOUT, USER_LOGOUT_SUCCESS } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";
import * as selectors from "./selectors";

function* fetchData(action) {
  const authInfo = yield select(selectors.authInfo);

  const requestBody = {
    loggedInEmployeeId: authInfo.loggedInEmployeeId,
    token: authInfo.token,
  };

  yield call(MasterSaga, {
    action,
    apiURL: API.USER_LOGOUT,
    requestBody,
    successAction: USER_LOGOUT_SUCCESS,
  });
}

/**
 * This saga is used to call the logout API.
 * It calls callback event to wipe out userData saved in state on API success.
 *
 *  @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(USER_LOGOUT, fetchData);
}

export default dataSaga;
