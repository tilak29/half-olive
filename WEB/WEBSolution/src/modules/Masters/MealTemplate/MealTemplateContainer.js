import { connect } from "react-redux";
import {
  getEffectiveDateFilter,
  getMealTemplateList,
  getExistingMealData,
  saveMealTemplateData,
  updateMealTemplateData,
  deleteMealTemplateData,
  getMealEditDay,
  getExistingDataOnEffeDateWise
} from "../../../Saga/actions/ActionContainer";
import MealTemplateScreen from './MealTemplateScreen';

const mapStateToProps = state => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = dispatch => {
  return {
    getEffectiveDateFilter: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getEffectiveDateFilter({
          params,
          onSuccess,
          onFailure
        })
      ),
    getMealTemplateList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getMealTemplateList({
          params,
          onSuccess,
          onFailure
        })
      ),
    getExistingMealData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getExistingMealData({
          params,
          onSuccess,
          onFailure
        })
      ),
    saveMealTemplateData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveMealTemplateData({
          params,
          onSuccess,
          onFailure
        })
      ),
    updateMealTemplateData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateMealTemplateData({
          params,
          onSuccess,
          onFailure
        })
      ),
    deleteMealTemplateData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        deleteMealTemplateData({
          params,
          onSuccess,
          onFailure
        })
      ),
    getMealEditDay: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getMealEditDay({
          params,
          onSuccess,
          onFailure
        })
      ),
    getExistingDataOnEffeDateWise: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getExistingDataOnEffeDateWise({
          params,
          onSuccess,
          onFailure
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MealTemplateScreen);
