import { takeLatest, call } from "redux-saga/effects";

import { SEND_SMS } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* sendSms(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SEND_SMS,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call send SMS APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(SEND_SMS, sendSms);
}

export default dataSaga;
