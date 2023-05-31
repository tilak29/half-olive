import { takeLatest, call } from "redux-saga/effects";
import {
    GET_DAYWISEDATE,
    GET_MORNINGTHERAPY,
    GET_DEFAULTTHERAPY,
    GET_ADDITIONALTHERAPY,
    GET_DIETPLANNAME,
    GET_EXISTINGRECORD,
    ADD_TREATMENTSECTIONDATA,
    GET_MEALTYPENAME,
} from "../actions/ActionType";
import MasterSaga from './MasterSaga'
import { API } from "../../Constants";

function* getDayWiseDate(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.GET_DAYWISEDATE,
        requestBody: action.payload.params,
    });
}
function* getMorningTherapy(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.GET_MORNINGTHERAPY,
        requestBody: action.payload.params,
    });
}
function* getDefaultTherapy(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.GET_DEFAULTTHERAPY,
        requestBody: action.payload.params,
    });
}
function* getAdditionalTherapy(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.GET_ADDITIONALTHERAPY,
        requestBody: action.payload.params,
    });
}
function* getDietPlanName(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.GET_DIETPLANNAME,
        requestBody: action.payload.params,
    });
}
function* getExistingRecord(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.GET_EXISTINGRECORD,
        requestBody: action.payload.params,
    });
}
function* saveTreatmentSectionDetails(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.ADD_TREATMENTSECTIONDATA,
        requestBody: action.payload.params,
    });
}
function* getMealTyepeName(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.GET_MEALTYPENAME,
        requestBody: action.payload.params,
    });
}
/**
 * This saga is used to call Location Master APIs.
 */
function* dataSaga() {
    yield takeLatest(GET_DAYWISEDATE, getDayWiseDate);
    yield takeLatest(GET_MORNINGTHERAPY, getMorningTherapy);
    yield takeLatest(GET_DEFAULTTHERAPY, getDefaultTherapy);
    yield takeLatest(GET_ADDITIONALTHERAPY, getAdditionalTherapy);
    yield takeLatest(GET_DIETPLANNAME, getDietPlanName);
    yield takeLatest(GET_EXISTINGRECORD, getExistingRecord);
    yield takeLatest(ADD_TREATMENTSECTIONDATA, saveTreatmentSectionDetails);
    yield takeLatest(GET_MEALTYPENAME, getMealTyepeName);
}

export default dataSaga;