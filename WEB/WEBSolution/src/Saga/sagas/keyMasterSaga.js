import { takeLatest, call } from "redux-saga/effects";
  import {
    GET_KEY_MASTER,SAVE_KEY_MASTER
  } from "../actions/ActionType";
  import MasterSaga from "./MasterSaga";
  import { API } from "../../Constants";
  
   function* getKeyMaster(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.GET_KEY_MASTER,
          requestBody: action.payload.params,
        });
      }; function* saveKeyMaster(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.SAVE_KEY_MASTER,
          requestBody: action.payload.params,
        });
      }
  /**
   * This saga is for Key Master
   */
  function* dataSaga() {
    yield takeLatest(GET_KEY_MASTER, getKeyMaster);;yield takeLatest(SAVE_KEY_MASTER, saveKeyMaster);
  }
  export default dataSaga;
  