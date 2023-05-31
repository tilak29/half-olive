
import { connect } from "react-redux";
import DietMaster from "./DietList";
import {
  getDietMaster,
  saveDietMaster,
  getDietCategories,
  getDelete,
  updateDietMaster,
  getMealTypeName,
  viewMealData
} from "../../../Saga/actions/ActionContainer";
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMealTypeName: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getMealTypeName({
          params,
          onSuccess,
          onFailure,
        })
      ),
    viewMealData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        viewMealData({
          params,
          onSuccess,
          onFailure,
        })
      ),
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
    updateDietMaster: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateDietMaster({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DietMaster)