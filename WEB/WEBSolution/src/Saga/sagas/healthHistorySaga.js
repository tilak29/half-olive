import { takeLatest, call } from "redux-saga/effects";
  import {
     GET_HEALTHLIST, UPDATE_DISEASEDATA
  } from "../actions/ActionType";
  import MasterSaga from "./MasterSaga";
  import { API } from "../../Constants";
  
    
      function* getHealthDisease(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.GET_HEALTHLIST,
          requestBody: action.payload.params,
        });
      }
      function* updateDiseaseList(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.UPDATE_DISEASEDATA,
          requestBody: action.payload.params,
        });
      }
      
  /**
   * This saga is for Health History
   */
  function* dataSaga() {
    yield takeLatest(GET_HEALTHLIST, getHealthDisease);
    yield takeLatest(UPDATE_DISEASEDATA, updateDiseaseList);    
  }
  export default dataSaga;