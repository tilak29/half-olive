import { takeLatest, call } from "redux-saga/effects";
  import {
    GET_DISEASE_MASTER,SAVE_DISEASE_MASTER,DELETE_DISEASE_MASTER
  } from "../actions/ActionType";
  import MasterSaga from "./MasterSaga";
  import { API } from "../../Constants";
  
   function* getDiseaseMaster(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.GET_DISEASE_MASTER,
          requestBody: action.payload.params,
        });
      }; 
      function* saveDiseaseMaster(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.SAVE_DISEASE_MASTER,
          requestBody: action.payload.params,
        });
      }
      function* deleteDiseaseMaster(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.DELETE_DISEASE_MASTER,
          requestBody: action.payload.params,
        });
      }
  /**
   * This saga is used to call Disease Master APIs.
   */
  function* dataSaga() {
    yield takeLatest(GET_DISEASE_MASTER, getDiseaseMaster);
    yield takeLatest(SAVE_DISEASE_MASTER, saveDiseaseMaster);
    yield takeLatest(DELETE_DISEASE_MASTER, deleteDiseaseMaster);
  }
  export default dataSaga;
  