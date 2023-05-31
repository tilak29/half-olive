import { connect } from "react-redux";

import Dashboard from "./Dashboard";
import {
  getDashboardSummaryData,
  getDashboardChemistBirthdayList,
  sendSms,
  getDashboardCountData,
  getDashboardStateWiseCountData,
  getOrderMonthlyCountData,
  getChemistList,
  getDashboardStateWiseData,
  getMonthlyExpenseSummaryReportList,
  getSingleEmyloyeeData,
  getHolidayList
} from "../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return {
    loggedInDesignationId:
      state.mainReducer.userData.authInfo.loggedInDesignationId,
    filterDesignation: state.mainReducer.filterDesignation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDashboardSummaryData: ({ onSuccess, onFailure }) =>
      dispatch(
        getDashboardSummaryData({
          onSuccess,
          onFailure
        })
      ),

    getDashboardChemistBirthdayList: ({ onSuccess, onFailure }) =>
      dispatch(
        getDashboardChemistBirthdayList({
          onSuccess,
          onFailure
        })
      ),
    sendSms: ({ params, onSuccess, onFailure }) =>
      dispatch(
        sendSms({
          params,
          onSuccess,
          onFailure
        })
      ),
    getDashboardCountData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDashboardCountData({
          params,
          onSuccess,
          onFailure
        })
      ),
      getDashboardStateWiseCountData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDashboardStateWiseCountData({
          params,
          onSuccess,
          onFailure
        })
      ),
      getOrderMonthlyCountData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getOrderMonthlyCountData({
          params,
          onSuccess,
          onFailure
        })
      ),
      getChemistList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getChemistList({
          params,
          onSuccess,
          onFailure
        })
      ),
      getDashboardStateWiseData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDashboardStateWiseData({
          params,
          onSuccess,
          onFailure
        })
      ),
      getMonthlyExpenseSummaryReportList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getMonthlyExpenseSummaryReportList({
          params,
          onSuccess,
          onFailure
        })
      ),
      getSingleEmyloyeeData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getSingleEmyloyeeData({
          params,
          onSuccess,
          onFailure
        })
      ),
      getHolidayList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getHolidayList({
          params,
          onSuccess,
          onFailure
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
