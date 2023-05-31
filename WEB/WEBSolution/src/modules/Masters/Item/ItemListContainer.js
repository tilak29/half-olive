import { connect } from "react-redux";
import {
  addItem,
  getCategories,
  getDivisions,
  getItemList,
  getStaticLookup,
  updateItem,
  exportItemList,
  importItemList,
  getAWSFileUploadURL
} from "../../../Saga/actions/ActionContainer";
import ItemList from "./ItemList";

const mapStateToProps = state => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStaticLookup: ({ params, onSuccess, onFailure }) =>
      dispatch(getStaticLookup({ params, onSuccess, onFailure })),

    getDivisions: ({ onSuccess, onFailure }) =>
      dispatch(
        getDivisions({
          onSuccess,
          onFailure
        })
      ),

    getCategories: ({ onSuccess, onFailure }) =>
      dispatch(
        getCategories({
          onSuccess,
          onFailure
        })
      ),

    getItemList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getItemList({
          params,
          onSuccess,
          onFailure
        })
      ),

    addItem: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addItem({
          params,
          onSuccess,
          onFailure
        })
      ),

    updateItem: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateItem({
          params,
          onSuccess,
          onFailure
        })
      ),

    exportItemList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        exportItemList({
          params,
          onSuccess,
          onFailure
        })
      ),

    importItemList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        importItemList({
          params,
          onSuccess,
          onFailure
        })
      ),

      getAWSFileUploadURL: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getAWSFileUploadURL({
          params,
          onSuccess,
          onFailure,
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
