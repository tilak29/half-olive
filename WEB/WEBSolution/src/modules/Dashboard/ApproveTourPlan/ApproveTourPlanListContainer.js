import { connect } from "react-redux";

import ApproveTourPlanList from "./ApproveTourPlanList";
import {
  getSLTourPlan,
  getManagerTourPlan,
  getTPApprovalList,
  updateTPStatus
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return { filterDesignation: state.mainReducer.filterDesignation };
};

const mapDispatchToProps = dispatch => {
  return {
    getSLTourPlan: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getSLTourPlan({
          params,
          onSuccess,
          onFailure
        })
      ),

    getManagerTourPlan: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getManagerTourPlan({
          params,
          onSuccess,
          onFailure
        })
      ),

    getTPApprovalList: ({ onSuccess, onFailure }) =>
      dispatch(
        getTPApprovalList({
          onSuccess,
          onFailure
        })
      ),

    updateTPStatus: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateTPStatus({
          params,
          onSuccess,
          onFailure
        })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApproveTourPlanList);
