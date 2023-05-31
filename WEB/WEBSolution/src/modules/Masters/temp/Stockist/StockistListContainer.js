import { connect } from "react-redux";

import Stockist from "./StockistList";
import {
  getCountries,
  getStockistList,
  addStockist,
  updateStockist,
  getSuperStockists,
  getMobileOwnerName,
  getAreas,
  getAllDivisions,
  getCities
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
    cityList: state.mainReducer.cityList,
    loggedInDesignationId:
      state.mainReducer.userData.authInfo.loggedInDesignationId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCountries: ({ onSuccess, onFailure }) =>
      dispatch(
        getCountries({
          onSuccess,
          onFailure
        })
      ),
    getStockistList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getStockistList({
          params,
          onSuccess,
          onFailure
        })
      ),
    getSuperStockists: ({ onSuccess, onFailure }) =>
      dispatch(
        getSuperStockists({
          onSuccess,
          onFailure
        })
      ),
    addStockist: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addStockist({
          params,
          onSuccess,
          onFailure
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
    updateStockist: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateStockist({
          params,
          onSuccess,
          onFailure
        })
      ),
    getAreas: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getAreas({
          params,
          onSuccess,
          onFailure
        })
      ),
    
      getAllDivisions: ({ onSuccess, onFailure }) =>
      dispatch(
        getAllDivisions({
          onSuccess,
          onFailure,
        })
      ),

      getCities: () => dispatch(getCities())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stockist);
