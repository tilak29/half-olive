import { takeLatest, call } from "redux-saga/effects";
  import {
    GET_THERAPYSLOT,SAVE_THERAPYSLOT,DELETE_THERAPYSLOT, GET_THERAPYTYPE , GET_THERAPY
  } from "../actions/ActionType";
  import MasterSaga from "./MasterSaga";
  import { API } from "../../Constants";
  
  function* getTherapyType(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.GET_THERAPYTYPE,
      requestBody: action.payload.params,
    });
  };  
  function* getTherapyCategory(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.GET_THERAPY,
      requestBody: action.payload.params,
    });
  };  
  function* getTherapySlot(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.GET_THERAPYSLOT,
          requestBody: action.payload.params,
        });
      }; 
      function* saveTherapySlot(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.SAVE_THERAPYSLOT,
          requestBody: action.payload.params,
        });
      }
      function* deleteTherapySlot(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.DELETE_THERAPYSLOT,
          requestBody: action.payload.params,
        });
      }
  /**
   * This saga is used to call Disease Master APIs.
   */
  function* dataSaga() {
    yield takeLatest(GET_THERAPYTYPE, getTherapyType);
    yield takeLatest(GET_THERAPY, getTherapyCategory);
    yield takeLatest(GET_THERAPYSLOT, getTherapySlot);
    yield takeLatest(SAVE_THERAPYSLOT, saveTherapySlot);
    yield takeLatest(DELETE_THERAPYSLOT, deleteTherapySlot);
  }
  export default dataSaga;
  