import { connect } from "react-redux";
import PatientList from "./PatientList";
import {
  getPatientName,
  getPersonalDetails,
  getDivisions,
  getDesignations,
  getEmployeeList,
  addEmployee,
  updateEmployee,
  getStaticLookup,
  getCountries,
  getEmployees,
  sendSms,
  getMobileOwnerName,
  getAllDivisions,
  dietPlanGetData,
  therapyPlanGetData,
  getDiseaseMaster,
  updateDiseaseList,
  getHealthDisease,
  getManageBooking,
  saveManageBooking,
  getGuestList,
  getRoomCategories,
  getRoomMaster,
  getKeyMaster,
  getExistingDateWiseMealTemplateList,
  getStatusFilter,
  getDayWiseDate,
  getMorningTherapy,
  getDefaultTherapy,
  getAdditionalTherapy,
  getDietPlanName,
  getExistingRecord,
  saveTreatmentSectionDetails,
  getMealTypeName,
  manageBooking_GetbookingData,
  updateDateWiseMealTemplateData,
  getMealEditDay
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
    filterDesignation: state.mainReducer.filterDesignation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMealEditDay: ({ params, onSuccess, onFailure }) =>
    dispatch(
      getMealEditDay({
        params,
        onSuccess,
        onFailure
      })
    ),
    updateDateWiseMealTemplateData: ({ params, onSuccess, onFailure }) =>
    dispatch(
      updateDateWiseMealTemplateData({
        params,
        onSuccess,
        onFailure
      })
    ),
    getExistingDateWiseMealTemplateList: ({ params, onSuccess, onFailure }) =>
    dispatch(
      getExistingDateWiseMealTemplateList({
        params,
        onSuccess,
        onFailure
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
    getPatientName: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getPatientName({
          params,
          onSuccess,
          onFailure,
        })
      ),

    getPersonalDetails: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getPersonalDetails({
          params,
          onSuccess,
          onFailure,
        })
      ),

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
    dietPlanGetData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        dietPlanGetData({
          params,
          onSuccess,
          onFailure,
        })
      ),
    therapyPlanGetData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        therapyPlanGetData({
          params,
          onSuccess,
          onFailure,
        })
      ), getDiseaseMaster: ({ params, onSuccess, onFailure }) =>
        dispatch(
          getDiseaseMaster({
            params,
            onSuccess,
            onFailure
          })
        ),
    getHealthDisease: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getHealthDisease({
          params,
          onSuccess,
          onFailure
        })
      ),
    updateDiseaseList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateDiseaseList({
          params,
          onSuccess,
          onFailure
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
    getRoomMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getRoomMaster({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getKeyMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getKeyMaster({
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
    getHealthDisease: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getHealthDisease({
          params,
          onSuccess,
          onFailure
        })
      ),
    getDayWiseDate: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDayWiseDate({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getMorningTherapy: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getMorningTherapy({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getDefaultTherapy: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDefaultTherapy({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getAdditionalTherapy: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getAdditionalTherapy({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getDietPlanName: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDietPlanName({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getExistingRecord: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getExistingRecord({
          params,
          onSuccess,
          onFailure,
        })
      ),
    saveTreatmentSectionDetails: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveTreatmentSectionDetails({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getMealTypeName: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getMealTypeName({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PatientList);