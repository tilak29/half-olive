import { takeLatest, call } from "redux-saga/effects";

import { GET_USERPANELLIST, UPDATE_USERPANELLIST } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getUserPanelList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_USERPANELLIST,
    requestBody: action.payload.params,
  });
}

function* updateUserPanelList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_USERPANELLIST,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call User Panel APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(GET_USERPANELLIST, getUserPanelList);
  yield takeLatest(UPDATE_USERPANELLIST, updateUserPanelList);
}

export default dataSaga;
