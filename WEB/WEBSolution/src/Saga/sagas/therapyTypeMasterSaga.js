import { takeLatest, call } from "redux-saga/effects";
  import {
    GET_THERAPYTYPE,SAVE_THERAPYTYPE,DELETE_THERAPYTYPE
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
      function* saveTherapyType(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.SAVE_THERAPYTYPE,
          requestBody: action.payload.params,
        });
      }
      function* deleteTherapyType(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.DELETE_THERAPYTYPE,
          requestBody: action.payload.params,
        });
      }
  /**
   * This saga is used to call Disease Master APIs.
   */
  function* dataSaga() {
    yield takeLatest(GET_THERAPYTYPE, getTherapyType);
    yield takeLatest(SAVE_THERAPYTYPE, saveTherapyType);
    yield takeLatest(DELETE_THERAPYTYPE, deleteTherapyType);
  }
  export default dataSaga;
  