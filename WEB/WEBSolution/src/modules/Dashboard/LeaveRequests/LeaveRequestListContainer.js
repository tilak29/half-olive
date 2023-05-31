import { connect } from "react-redux";

import LeaveRequestList from "./LeaveRequestList";
import {
  getLeaveList,
  updateLeave,
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLeaveList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getLeaveList({
          params,
          onSuccess,
          onFailure,
        })
      ),

    updateLeave: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateLeave({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaveRequestList);
