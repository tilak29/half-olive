import { takeLatest, call } from "redux-saga/effects";
  import {
    GET_MANAGE_BOOKING,
    manageBooking_updateManageBooking,
    manageBooking_getRoomAssignDetails,
    manageBooking_getGuestBookingDetails,
    SAVE_MANAGE_BOOKING,
    GET_STATUS_FILTER,
    GET_LATESTGUEST,
    GET_ROOMLIST,
    GET_ROOMSTATUS,
    GET_DEFAULTROOMCATEGORY,
    GET_DEFAULTROOMSTATUS,
    manageBooking_getbookingData,
    manageBooking_deleteManageBooking,
    manageBooking_checkedOutPerticularRoom
  } from "../actions/ActionType";
  import MasterSaga from "./MasterSaga";
  import { API } from "../../Constants";  
  function* checkedOutPerticularRoom(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.manageBooking_checkedOutPerticularRoom,
      requestBody: action.payload.params,
    });
  }; 
  function* deleteManageBooking(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.manageBooking_deleteManageBooking,
      requestBody: action.payload.params,
    });
  }; 
  function* updateManageBooking(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.manageBooking_updateManageBooking,
      requestBody: action.payload.params,
    });
  }; 
  function* manageBooking_GetRoomAssignDetails(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.manageBooking_getRoomAssignDetails,
      requestBody: action.payload.params,
    });
  }; 
  function* manageBooking_GetGuestBookingDetails(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.manageBooking_getGuestBookingDetails,
      requestBody: action.payload.params,
    });
  }; 
  function* manageBooking_GetbookingData(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.manageBooking_getbookingData,
      requestBody: action.payload.params,
    });
  }; 
  function* getDefaultRoomStatus(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.GET_DEFAULTROOMSTATUS,
      requestBody: action.payload.params,
    });
  }; 
  function* getDefaultRoomCategory(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.GET_DEFAULTROOMCATEGORY,
      requestBody: action.payload.params,
    });
  }; 
  function* getRoomList(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.GET_ROOMLIST,
      requestBody: action.payload.params,
    });
  }; 
  function* getRoomStatus(action) {
    yield call(MasterSaga, {
      action,
      apiURL: API.GET_ROOMSTATUS,
      requestBody: action.payload.params,
    });
  }; 

   function* getManageBooking(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.GET_MANAGE_BOOKING,
          requestBody: action.payload.params,
        });
      }; 
      function* saveManageBooking(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.SAVE_MANAGE_BOOKING,
          requestBody: action.payload.params,
        });
      }; 
      function* getStatusFilter(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.GET_STATUS_FILTER,
          requestBody: action.payload.params,
        });
      };
      function* getLatestGuest(action) {
        yield call(MasterSaga, {
          action,
          apiURL: API.GET_LATESTGUEST,
          requestBody: action.payload.params,
        });
      }
  /**
   * This saga is for Manage Booking
   */
  function* dataSaga() {
    yield takeLatest(GET_MANAGE_BOOKING, getManageBooking);
    yield takeLatest(SAVE_MANAGE_BOOKING, saveManageBooking);
    yield takeLatest(GET_STATUS_FILTER, getStatusFilter);
    yield takeLatest(GET_LATESTGUEST, getLatestGuest);
    yield takeLatest(GET_ROOMLIST, getRoomList);
    yield takeLatest(GET_ROOMSTATUS, getRoomStatus);
    yield takeLatest(GET_DEFAULTROOMCATEGORY, getDefaultRoomCategory);
    yield takeLatest(GET_DEFAULTROOMSTATUS, getDefaultRoomStatus);
    yield takeLatest(manageBooking_getbookingData, manageBooking_GetbookingData);
    yield takeLatest(manageBooking_getGuestBookingDetails, manageBooking_GetGuestBookingDetails);
    yield takeLatest(manageBooking_getRoomAssignDetails, manageBooking_GetRoomAssignDetails);
    yield takeLatest(manageBooking_updateManageBooking, updateManageBooking);
    yield takeLatest(manageBooking_deleteManageBooking, deleteManageBooking);
    yield takeLatest(manageBooking_checkedOutPerticularRoom, checkedOutPerticularRoom);
  }
  export default dataSaga;