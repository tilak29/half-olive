import { connect } from "react-redux";
import {
  addEmployee, getAllDivisions, getCountries, getDesignations, getDivisions, getEmployeeList, getEmployees, getMobileOwnerName, getStaticLookup, sendSms, updateEmployee
} from "../../../Saga/actions/ActionContainer";
import EmployeeList from "./EmployeeList";


const mapStateToProps = (state) => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
    filterDesignation: state.mainReducer.filterDesignation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: ({ onSuccess, onFailure }) =>
      dispatch(
        getCountries({
          onSuccess,
          onFailure,
        })
      ),
    getDivisions: ({ onSuccess, onFailure }) =>
      dispatch(
        getDivisions({
          onSuccess,
          onFailure,
        })
      ),

    getDesignations: ({ onSuccess, onFailure }) =>
      dispatch(
        getDesignations({
          onSuccess,
          onFailure,
        })
      ),
    getEmployeeStatus: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getStaticLookup({
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

    getEmployees: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getEmployees({
          params,
          onSuccess,
          onFailure,
        })
      ),

    getMobileOwnerName: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getMobileOwnerName({
          params,
          onSuccess,
          onFailure,
        })
      ),

    addEmployee: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addEmployee({
          params,
          onSuccess,
          onFailure,
        })
      ),
    updateEmployee: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateEmployee({
          params,
          onSuccess,
          onFailure,
        })
      ),

    sendSms: ({ params, onSuccess, onFailure }) =>
      dispatch(
        sendSms({
          params,
          onSuccess,
          onFailure,
        })
      ),

    getAllDivisions: ({ onSuccess, onFailure }) =>
      dispatch(
        getAllDivisions({
          onSuccess,
          onFailure,
        })
      ),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
