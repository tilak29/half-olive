import { connect } from "react-redux";
import ManageBooking from "./ManageBookingScreen";
import {
  getStatusFilter,
  manageBooking_GetbookingData,
  deleteManageBooking
} from "../../../Saga/actions/ActionContainer";
const mapStateToProps = (state) => {
  return {operationRights: state.mainReducer.currentMenu.operationRights,
    filterDesignation: state.mainReducer.filterDesignation,};
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteManageBooking: ({params, onSuccess, onFailure }) =>
    dispatch(
      deleteManageBooking({
        params,
        onSuccess,
        onFailure,
      })
    ),
    manageBooking_GetbookingData: ({params, onSuccess, onFailure }) =>
    dispatch(
      manageBooking_GetbookingData({
        params,
        onSuccess,
        onFailure,
      })
    ),
    getStatusFilter: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getStatusFilter({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
