import { connect } from "react-redux";

import HolidayList from "./HolidayList";
import {
  getStates,
  getHolidayList,
  addHoliday,
  updateHoliday,
  deleteHoliday,
  getHolidayYearList,
  exportHolidayList,
  importHolidayList
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
    stateList: state.mainReducer.stateList,
    serverDate: state.mainReducer.otherInfo.serverDate
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStates: () => dispatch(getStates()),

    getHolidayYearList: ({ onSuccess, onFailure }) =>
      dispatch(
        getHolidayYearList({
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

    addHoliday: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addHoliday({
          params,
          onSuccess,
          onFailure
        })
      ),

    updateHoliday: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateHoliday({
          params,
          onSuccess,
          onFailure
        })
      ),

    deleteHoliday: ({ params, onSuccess, onFailure }) =>
      dispatch(
        deleteHoliday({
          params,
          onSuccess,
          onFailure
        })
      ),

    exportHolidayList: ({ onSuccess, onFailure }) =>
      dispatch(
        exportHolidayList({
          onSuccess,
          onFailure
        })
      ),

    importHolidayList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        importHolidayList({
          params,
          onSuccess,
          onFailure
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HolidayList);
