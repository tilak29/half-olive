import { connect } from "react-redux";
import {
  addItemPrice,
  exportItemPriceList,
  getCategories,
  getDivisions,
  getItemPriceExportDates,
  getItemPriceList
} from "../../../Saga/actions/ActionContainer";
import ItemPrice from "./itemPrice";

const mapStateToProps = state => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
    serverDate: state.mainReducer.otherInfo.serverDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
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

    getItemPriceList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getItemPriceList({
          params,
          onSuccess,
          onFailure
        })
      ),

    addItemPrice: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addItemPrice({
          params,
          onSuccess,
          onFailure
        })
      ),

    getItemPriceExportDates: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getItemPriceExportDates({
          params,
          onSuccess,
          onFailure
        })
      ),

    exportItemPriceList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        exportItemPriceList({
          params,
          onSuccess,
          onFailure
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemPrice);
