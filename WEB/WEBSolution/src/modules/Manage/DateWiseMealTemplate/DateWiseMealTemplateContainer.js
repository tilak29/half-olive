import { connect } from "react-redux";
import {
  getEffectiveDate,
  getDateWiseMealTemplateList,
  getExistingDateWiseMealTemplateList,
  getDateWiseMealTemplateExistingData,
  saveDateWiseMealTemplateData,
  updateDateWiseMealTemplateData,
  deleteDateWiseMealTemplateData,
  getMealEditDay
} from "../../../Saga/actions/ActionContainer";
import DateWiseMealTemplateScreen from './DateWiseMealTemplateScreen';

const mapStateToProps = state => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = dispatch => {
  return {
    getEffectiveDate: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getEffectiveDate({
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
    getDateWiseMealTemplateList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDateWiseMealTemplateList({
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
    getDateWiseMealTemplateExistingData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getDateWiseMealTemplateExistingData({
          params,
          onSuccess,
          onFailure
        })
      ),
    saveDateWiseMealTemplateData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveDateWiseMealTemplateData({
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
    deleteDateWiseMealTemplateData: ({ params, onSuccess, onFailure }) =>
      dispatch(
        deleteDateWiseMealTemplateData({
          params,
          onSuccess,
          onFailure
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DateWiseMealTemplateScreen);
