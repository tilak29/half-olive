import { connect } from "react-redux";
import {
  getLeaveList,getEmployeeList,addLeave,updateLeave,deleteLeave,getMonthlyExpenseSummaryReportList
} from "../../../Saga/actions/ActionContainer";
import LeaveList from "./LeaveList";


const mapStateToProps = state => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = dispatch => {
  return {
    getLeaveList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getLeaveList({
          params,
          onSuccess,
          onFailure,
        },
        )
      ),
      addLeave: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addLeave({
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
      deleteLeave: ({ params, onSuccess, onFailure }) =>
      dispatch(
        deleteLeave({
          params,
          onSuccess,
          onFailure,
        })
      ),
      getEmployeeList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getEmployeeList({
          params,
          onSuccess,
          onFailure,
        })
      ),
      getMonthlyExpenseSummaryReportList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getMonthlyExpenseSummaryReportList({
          params,
          onSuccess,
          onFailure,
        })
      )
      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaveList);
