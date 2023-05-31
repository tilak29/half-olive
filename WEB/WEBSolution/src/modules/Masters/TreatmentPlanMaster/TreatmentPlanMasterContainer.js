import { connect } from "react-redux";
import {
  getTreatmentTemplateCategories,
  getTreatmentList,
  getDietList,
  addTreatmentPlan
} from "../../../Saga/actions/ActionContainer";
import TreatmentPlanMasterScreen from './TreatmentPlanMasterScreen'

const mapStateToProps = state => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = dispatch => {
  return {
    getTreatmentTemplateCategories: ({ onSuccess, onFailure }) =>
      dispatch(
        getTreatmentTemplateCategories({
          onSuccess,
          onFailure,
        })
      ),
      getTreatmentList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getTreatmentList({
          params,
          onSuccess,
          onFailure,
        })
      ),
      getDietList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDietList({
          params,
          onSuccess,
          onFailure,
        })
      ),
      addTreatmentPlan: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addTreatmentPlan({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TreatmentPlanMasterScreen);
