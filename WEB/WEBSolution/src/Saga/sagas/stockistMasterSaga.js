import { takeLatest, call } from "redux-saga/effects";

import {
  GET_STOCKISTLIST,
  ADD_STOCKIST,
  UPDATE_STOCKIST,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getStockistList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_STOCKISTLIST,
    requestBody: action.payload.params,
  });
}

function* addStockist(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_STOCKIST,
    requestBody: action.payload.params,
  });
}

function* updateStockist(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.UPDATE_STOCKIST,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call Stockist Master APIs.
 * @author Nirali Maradiya
 */
function* dataSaga() {
  yield takeLatest(GET_STOCKISTLIST, getStockistList);
  yield takeLatest(ADD_STOCKIST, addStockist);
  yield takeLatest(UPDATE_STOCKIST, updateStockist);
}

export default dataSaga;
