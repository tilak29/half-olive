import { call, takeLatest } from "redux-saga/effects";
import { API } from "../../Constants";
import {
  ADD_ITEMPRICE,
  EXPORT_ITEM_PRICELIST,
  GET_ITEMPRICE_EXPORTDATES,
  GET_ITEM_PRICELIST,
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";

function* getItemPriceList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ITEM_PRICELIST,
    requestBody: action.payload.params,
  });
}

function* addItemPrice(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.ADD_ITEMPRICE,
    requestBody: action.payload.params,
  });
}

function* getItemPriceExportDates(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ITEMPRICE_EXPORTDATES,
  });
}

function* exportItemPriceList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.EXPORT_ITEM_PRICELIST,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to call ItemPrice Master APIs.
 * @author Tejal Sali
 */
function* dataSaga() {
  yield takeLatest(GET_ITEM_PRICELIST, getItemPriceList);
  yield takeLatest(ADD_ITEMPRICE, addItemPrice);
  yield takeLatest(GET_ITEMPRICE_EXPORTDATES, getItemPriceExportDates);
  yield takeLatest(EXPORT_ITEM_PRICELIST, exportItemPriceList);
}

export default dataSaga;
