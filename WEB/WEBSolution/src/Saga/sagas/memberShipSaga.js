import { takeLatest, call } from "redux-saga/effects";
  import {
GET_MEMBERSHIP,GET_DAYS,GET_OCCUPANCY,ADD_MEMBERSHIP,UPDATE_MEMBERSHIP,GET_MEMBERSHIP_EFFECTIVEDATE,DELETE_MEMBERSHIP
  } from "../actions/ActionType";
  import MasterSaga from "./MasterSaga";
  import { API } from "../../Constants";

  function* deleteMemberShipData(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.DELETE_MEMBERSHIP,
      requestBody: action.payload.params,
    });
  }; 

  function* getMemberShipMasterEffectiveDate(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.GET_MEMBERSHIP_EFFECTIVEDATE,
      requestBody: action.payload.params,
    });
  }; 

  function* insertMemberShipData(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.ADD_MEMBERSHIP,
      requestBody: action.payload.params,
    });
  }; 
  function* updateMemberShipData(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.UPDATE_MEMBERSHIP,
      requestBody: action.payload.params,
    });
  }; 
  
   function* getMemberShip(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.GET_MEMBERSHIP,
          requestBody: action.payload.params,
        });
      }; 
      function* getMemberShipDays(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.GET_DAYS,
          requestBody: action.payload.params,
        });
      }
      function* getOccupancy(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.GET_OCCUPANCY,
          requestBody: action.payload.params,
        });
      }
  /**
   * This saga is used to call MemberShip Master APIs.
   */
  function* dataSaga() {
    yield takeLatest(GET_MEMBERSHIP, getMemberShip);
    yield takeLatest(ADD_MEMBERSHIP, insertMemberShipData);
    yield takeLatest(UPDATE_MEMBERSHIP, updateMemberShipData);
    yield takeLatest(GET_DAYS, getMemberShipDays);
    yield takeLatest(GET_OCCUPANCY, getOccupancy);
    yield takeLatest(GET_MEMBERSHIP_EFFECTIVEDATE, getMemberShipMasterEffectiveDate);
    yield takeLatest(DELETE_MEMBERSHIP, deleteMemberShipData);
  }
  export default dataSaga;
  