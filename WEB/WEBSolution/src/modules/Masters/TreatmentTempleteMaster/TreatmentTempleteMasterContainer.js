import { connect } from "react-redux";
import TreatmentTempleteMasterScreen from "./TreatmentTempleteMasterScreen";
import {
  getDietMaster,
  saveDietMaster,
  getDietCategories,
  getDelete,
  getTreatmentMasterList,
  getDiet,
  getTreatment,
  saveTemplete,
  getDiseaseList,
  gettempleteDiseaseCategories,
  deletetemplete,
  updatetemplete,
  getTreatmentdetail
  
} from "../../../Saga/actions/ActionContainer";
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
      getDietMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDietMaster({
          params,
          onSuccess,
          onFailure,
        })
      ),
    saveDietMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveDietMaster({
          params,
          onSuccess,
          onFailure,
        })
      ),
      getDietCategories: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDietCategories({
          params,
          onSuccess,
          onFailure,
        })
      ),
      getDelete: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDelete({
          params,
          onSuccess,
          onFailure,
        })
      ),
      getTreatmentMasterList: ({params, onSuccess, onFailure }) =>
    
      dispatch(
        getTreatmentMasterList({
          params,
          onSuccess,
          onFailure
        })
      ),
      getDiet: ({params, onSuccess, onFailure }) =>
    
      dispatch(
        getDiet({
          params,
          onSuccess,
          onFailure
        })
      ),
      getTreatment: ({params, onSuccess, onFailure }) =>
    
      dispatch(
        getTreatment({
          params,
          onSuccess,
          onFailure
        })
      ),
      saveTemplete: ({params, onSuccess, onFailure }) =>
    
      dispatch(
        saveTemplete({
          params,
          onSuccess,
          onFailure
        })
      ),

      getDiseaseList: ({params, onSuccess, onFailure }) =>
      dispatch(
        getDiseaseList({
          params,
          onSuccess,
          onFailure
        })
      ),
      gettempleteDiseaseCategories: ({params, onSuccess, onFailure }) =>
      dispatch(
        gettempleteDiseaseCategories({
          params,
          onSuccess,
          onFailure
        })
      ),
      deletetemplete: ({params, onSuccess, onFailure }) =>
      dispatch(
        deletetemplete({
          params,
          onSuccess,
          onFailure
        })
      ),
      updatetemplete: ({params, onSuccess, onFailure }) =>
      dispatch(
        updatetemplete({
          params,
          onSuccess,
          onFailure
        })
      ),
      getTreatmentdetail: ({params, onSuccess, onFailure }) =>
      dispatch(
        getTreatmentdetail({
          params,
          onSuccess,
          onFailure
        })
      ),
  };
  
};
export default connect(mapStateToProps, mapDispatchToProps)(TreatmentTempleteMasterScreen);
