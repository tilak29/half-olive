import { takeLatest, call } from "redux-saga/effects";

import {
  GET_APPROVAL_LEAVE,
  UPDATE_APPROVAL_LEAVE,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";


function* getApprovalLeave(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_APPROVAL_LEAVE,
    requestBody: action.payload.params,
  });
}

function* updateApprovalLeave(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_APPROVAL_LEAVE,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Employee leaves APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(GET_APPROVAL_LEAVE, getApprovalLeave);
  yield takeLatest(UPDATE_APPROVAL_LEAVE, updateApprovalLeave);
}

export default dataSaga;
