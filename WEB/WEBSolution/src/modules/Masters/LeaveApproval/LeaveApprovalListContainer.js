import { connect } from "react-redux";
import {
  getApprovalLeave,updateApprovalLeave  
} from "../../../Saga/actions/ActionContainer";
import LeaveApprovalList from "../LeaveApproval/LeaveApprovalList";


const mapStateToProps = state => {
  return { };
};

const mapDispatchToProps = dispatch => {
  return {
    getApprovalLeave: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getApprovalLeave({
          params,
          onSuccess,
          onFailure
        })
      ),

    updateApprovalLeave: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateApprovalLeave({
          params,
          onSuccess,
          onFailure
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaveApprovalList);

