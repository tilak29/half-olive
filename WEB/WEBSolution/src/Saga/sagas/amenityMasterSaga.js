import { takeLatest, call } from "redux-saga/effects";
import { GET_AMENITY_MASTER, SAVE_AMENITY_MASTER } from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getAmenityMaster(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_AMENITY_MASTER,
    requestBody: action.payload.params,
  });
}
function* saveAmenityMaster(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.SAVE_AMENITY_MASTER,
    requestBody: action.payload.params,
  });
}
/**
 * This saga is for Amenity Master
 */
function* dataSaga() {
  yield takeLatest(GET_AMENITY_MASTER, getAmenityMaster);
  yield takeLatest(SAVE_AMENITY_MASTER, saveAmenityMaster);
}
export default dataSaga;
