import { takeLatest, call } from "redux-saga/effects";
import {
    GET_EFFECTIVEDATE,
    GET_DATEWISEMEALTEMPLATELIST,
    GET_EXISTINGDATEWISEMEALTEMPLATELIST,
    GET_DATEWISEMEALTEMPLATEEXISTINGDATA,
    ADD_DATEWISEMEALTEMPLATE,
    UPDATE_DATEWISEMEALTEMPLATE,
    DELETE_DATEWISEMEALTEMPLATE
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";
import { API } from "../../Constants";

function* getEffectiveDate(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.GET_EFFECTIVEDATE,
        requestBody: action.payload.params,
    });
}
function* getDateWiseMealTemplateList(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.GET_DATEWISEMEALTEMPLATELIST,
        requestBody: action.payload.params,
    });
}
function* getExistingDateWiseMealTemplateList(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.GET_EXISTINGDATEWISEMEALTEMPLATELIST,
        requestBody: action.payload.params,
    });
}
function* getDateWiseMealTemplateExistingData(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.GET_DATEWISEMEALTEMPLATEEXISTINGDATA,
        requestBody: action.payload.params,
    });
}
function* saveDateWiseMealTemplateData(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.ADD_DATEWISEMEALTEMPLATE,
        requestBody: action.payload.params,
    });
}
function* updateDateWiseMealTemplateData(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.UPDATE_DATEWISEMEALTEMPLATE,
        requestBody: action.payload.params,
    });
}
function* deletDateWiseMealTemplateData(action) {
    yield call(MasterSaga, {
        action,
        apiURL: API.DELETE_DATEWISEMEALTEMPLATE,
        requestBody: action.payload.params,
    });
}

/**
 * This saga is used to call Date Wise Meal Template APIs.
 */
function* dataSaga() {
    yield takeLatest(GET_EFFECTIVEDATE, getEffectiveDate);
    yield takeLatest(GET_DATEWISEMEALTEMPLATELIST, getDateWiseMealTemplateList);
    yield takeLatest(GET_EXISTINGDATEWISEMEALTEMPLATELIST, getExistingDateWiseMealTemplateList);
    yield takeLatest(GET_DATEWISEMEALTEMPLATEEXISTINGDATA, getDateWiseMealTemplateExistingData);
    yield takeLatest(ADD_DATEWISEMEALTEMPLATE, saveDateWiseMealTemplateData);
    yield takeLatest(UPDATE_DATEWISEMEALTEMPLATE, updateDateWiseMealTemplateData);
    yield takeLatest(DELETE_DATEWISEMEALTEMPLATE, deletDateWiseMealTemplateData);
}

export default dataSaga;
