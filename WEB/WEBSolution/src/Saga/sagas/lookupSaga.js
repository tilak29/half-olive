import { call, takeLatest } from "redux-saga/effects";
import { API } from "../../Constants";
import {
  GET_AREAS,
  GET_CATEGORIES,
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_COUNTRIES,
  GET_DESIGNATIONS,
  GET_DIVISIONS,
  GET_EMPLOYEES,
  GET_FINANCIAL_MONTHYEARLIST,
  GET_MONTHYEAR_RANGE_LIST,
  GET_ROUTES,
  GET_SCHEMES,
  GET_SL_OR_MANAGER_LIST,
  GET_STATES,
  GET_STATES_SUCCESS,
  GET_SUBORDINATES,
  GET_TOURPLAN_MONTHYEARLIST,
  UPDATE_CITIES,
  UPDATE_STATES,
  GET_STOCKIST,
  GET_SUPERSTOCKIST,
  GET_WORKFLOW,
  GET_ALLDIVISIONS,
  GET_STOCKISTASSIGNEDDIVISION
} from "../actions/ActionType";
import MasterSaga from "./MasterSaga";

function* fetchCountries(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_COUNTRIES,
  });
}

function* fetchStates(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_STATES,
    successAction: GET_STATES_SUCCESS,
  });
}

function* fetchDivisions(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DIVISIONS,
  });
}

function* getAllDivisions(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ALLDIVISIONS,
  });
}

function* fetchAssignedDivisions(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_STOCKISTASSIGNEDDIVISION,
  });
}

function* fetchDesignation(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_DESIGNATIONS,
  });
}

function* fetchFinancialMonthYear(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_FINANCIAL_MONTHYEARLIST,
  });
}

function* fetchMonthYearRangeList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_MONTHYEAR_RANGE_LIST,
    requestBody: action.payload.params,
  });
}

function* fetchCities(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_CITIES,
    successAction: GET_CITIES_SUCCESS,
  });
}

function* fetchEmployees(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_EMPLOYEES,
    // successAction: GET_EMPLOYEES_SUCCESS,
    requestBody: action.payload.params,
  });
}

function* fetchAreas(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_AREAS,
    requestBody: action.payload.params,
  });
}

function* fetchRoutes(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_ROUTES,
    requestBody: action.payload.params,
  });
}

function* getCategories(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_CATEGORIES,
  });
}

function* getTourPlanMonthYearList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_TOURPLAN_MONTHYEARLIST,
  });
}

function* getSLOrManagerList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SL_OR_MANAGER_LIST,
    requestBody: action.payload.params,
  });
}

function* getSubOrdinates(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SUBORDINATES,
    requestBody: action.payload.params,
  });
}

function* getSchemes(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SCHEMES,
    requestBody: action.payload.params,
  });
}

function* getStockists(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_STOCKIST,
    requestBody: action.payload.params,
  });
}

function* getSuperStockists(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_SUPERSTOCKIST,
    requestBody: action.payload.params,
  });
}


function* getWorkFlowList(action) {
  yield call(MasterSaga, {
    action,
    apiURL: API.GET_WORKFLOW,
    requestBody: action.payload.params,
  });
}

/**
 * This saga is used to get all lookups data
 * @author Tejal Sali
 */
function* dataSaga() {

  yield takeLatest(GET_COUNTRIES, fetchCountries);
  yield takeLatest(GET_STATES, fetchStates);
  yield takeLatest(UPDATE_STATES, fetchStates);

  yield takeLatest(GET_CITIES, fetchCities);
  yield takeLatest(UPDATE_CITIES, fetchCities);

  yield takeLatest(GET_EMPLOYEES, fetchEmployees);

  yield takeLatest(GET_AREAS, fetchAreas);

  yield takeLatest(GET_DIVISIONS, fetchDivisions);
  yield takeLatest(GET_DESIGNATIONS, fetchDesignation);

  yield takeLatest(GET_ROUTES, fetchRoutes);

  yield takeLatest(GET_CATEGORIES, getCategories);

  yield takeLatest(GET_TOURPLAN_MONTHYEARLIST, getTourPlanMonthYearList);

  yield takeLatest(GET_SL_OR_MANAGER_LIST, getSLOrManagerList);

  yield takeLatest(GET_FINANCIAL_MONTHYEARLIST, fetchFinancialMonthYear);

  yield takeLatest(GET_MONTHYEAR_RANGE_LIST, fetchMonthYearRangeList);

  yield takeLatest(GET_SUBORDINATES, getSubOrdinates);

  yield takeLatest(GET_SCHEMES, getSchemes);

  yield takeLatest(GET_STOCKIST, getStockists);

  yield takeLatest(GET_SUPERSTOCKIST, getSuperStockists);

  yield takeLatest(GET_WORKFLOW, getWorkFlowList);

  yield takeLatest(GET_ALLDIVISIONS, getAllDivisions);

  yield takeLatest(GET_STOCKISTASSIGNEDDIVISION, fetchAssignedDivisions);
  
}

export default dataSaga;
