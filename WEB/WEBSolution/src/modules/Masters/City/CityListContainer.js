import { connect } from "react-redux";

import CityList from "./CityList";
import {
  getCityList,
  addCity,
  updateCity,
  getChemistList
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = dispatch => {
  return {
    getCityList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getCityList({
          params,
          onSuccess,
          onFailure
        })
      ),
    getChemistList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getChemistList({
          params,
          onSuccess,
          onFailure
        })
      ),

    addCity: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addCity({
          params,
          onSuccess,
          onFailure
        })
      ),

    updateCity: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateCity({
          params,
          onSuccess,
          onFailure
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
