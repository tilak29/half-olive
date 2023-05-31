import { connect } from "react-redux";
import {
  getGuestList,
  guestUploadFilegetData
} from "../../../Saga/actions/ActionContainer";
import GuestList from "./GuestList";
const mapStateToProps = (state) => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
    filterDesignation: state.mainReducer.filterDesignation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGuestList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getGuestList({
          params,
          onSuccess,
          onFailure,
        })
      ),
      guestUploadFilegetData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        guestUploadFilegetData({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestList);
