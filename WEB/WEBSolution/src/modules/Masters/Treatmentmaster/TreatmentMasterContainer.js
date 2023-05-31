import { connect } from "react-redux";
import {
  getTreatmentMasterList,getEmployeeList,saveTreatmentMaster,deleteTreatmentMaster,editTreatmentMaster,getAllDisease
} from "../../../Saga/actions/ActionContainer";
import TreatmentMasterScreen from "./TreatmentMasterScreen";


const mapStateToProps = state => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = dispatch => {
  return {
    getTreatmentMasterList: ({params, onSuccess, onFailure }) =>
      dispatch(
        getTreatmentMasterList({
          params,
          onSuccess,
          onFailure
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
      saveTreatmentMaster: ({params, onSuccess, onFailure}) => 
      dispatch(
        saveTreatmentMaster({
          params,
          onSuccess,
          onFailure
        })
      ),
      editTreatmentMaster: ({params, onSuccess, onFailure}) => 
      dispatch(
        editTreatmentMaster({
          params,
          onSuccess,
          onFailure
        })
      ),
      deleteTreatmentMaster: ({params, onSuccess, onFailure}) => 
      dispatch(
        deleteTreatmentMaster({
          params,
          onSuccess,
          onFailure
        })
      ),
      getAllDisease: ({params, onSuccess, onFailure}) => 
      dispatch(
        getAllDisease({
          params,
          onSuccess,
          onFailure
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TreatmentMasterScreen);
