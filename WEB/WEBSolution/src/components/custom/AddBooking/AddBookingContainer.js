import { connect } from "react-redux";
import AddBooking from "./AddBooking";
import {
  getManageBooking,
  saveManageBooking,  
  getGuestList,
  getRoomCategories,
  getLatestGuest,
  getRoomList,
  getRoomStatus,
  getDefaultRoomCategory,
  getDefaultRoomStatus,
  manageBooking_GetGuestBookingDetails,
  manageBooking_GetRoomAssignDetails,
  updateManageBooking,
  checkedOutPerticularRoom
} from "../../../Saga/actions/ActionContainer";
const mapStateToProps = (state) => {
  return {operationRights: state.mainReducer.currentMenu.operationRights,
    filterDesignation: state.mainReducer.filterDesignation,};
};
const mapDispatchToProps = (dispatch) => {
  return {
    checkedOutPerticularRoom: ({params, onSuccess, onFailure }) =>
    dispatch(
      checkedOutPerticularRoom({
        params,
        onSuccess,
        onFailure,
      })
    ),
    updateManageBooking: ({params, onSuccess, onFailure }) =>
    dispatch(
      updateManageBooking({
        params,
        onSuccess,
        onFailure,
      })
    ),
    manageBooking_GetRoomAssignDetails: ({params, onSuccess, onFailure }) =>
    dispatch(
      manageBooking_GetRoomAssignDetails({
        params,
        onSuccess,
        onFailure,
      })
    ),
    manageBooking_GetGuestBookingDetails: ({params, onSuccess, onFailure }) =>
    dispatch(
      manageBooking_GetGuestBookingDetails({
        params,
        onSuccess,
        onFailure,
      })
    ),
    getDefaultRoomCategory: ({params, onSuccess, onFailure }) =>
    dispatch(
      getDefaultRoomCategory({
        params,
        onSuccess,
        onFailure,
      })
    ),
    getDefaultRoomStatus: ({params, onSuccess, onFailure }) =>
    dispatch(
      getDefaultRoomStatus({
        params,
        onSuccess,
        onFailure,
      })
    ),
    getRoomList: ({params, onSuccess, onFailure }) =>
    dispatch(
      getRoomList({
        params,
        onSuccess,
        onFailure,
      })
    ),
    getRoomStatus: ({ onSuccess, onFailure }) =>
    dispatch(
      getRoomStatus({
        onSuccess,
        onFailure,
      })
    ),
    getLatestGuest: ({ onSuccess, onFailure }) =>
    dispatch(
      getLatestGuest({
        onSuccess,
        onFailure,
      })
    ),
    getManageBooking: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getManageBooking({
          params,
          onSuccess,
          onFailure,
        })
      ),
    saveManageBooking: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveManageBooking({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getGuestList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getGuestList({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getRoomCategories: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getRoomCategories({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddBooking);
