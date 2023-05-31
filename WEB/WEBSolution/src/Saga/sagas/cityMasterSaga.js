import { takeLatest, call, put } from "redux-saga/effects";

import {
  GET_CITYLIST,
  ADD_CITY,
  UPDATE_CITY,
  UPDATE_CITIES,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getCityList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_CITYLIST,
    requestBody: action.payload.params,
  });
}

function* addCity(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_CITY,
    requestBody: action.payload.params,
  });
  yield put({ type: UPDATE_CITIES }); // Updating lookup data for city
}

function* updateCity(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_CITY,
    requestBody: action.payload.params,
  });
  yield put({ type: UPDATE_CITIES }); // Updating lookup data for city
}

/**
 * This saga is used to call City Master APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_CITYLIST, getCityList);
  yield takeLatest(ADD_CITY, addCity);
  yield takeLatest(UPDATE_CITY, updateCity);
}

export default dataSaga;
