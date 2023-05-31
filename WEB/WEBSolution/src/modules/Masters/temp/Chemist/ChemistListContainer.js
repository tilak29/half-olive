import { connect } from "react-redux";

import ChemistList from "./ChemistList";
import {
  getAreas,
  getRoutes,
  getChemistList,
  addChemist,
  updateChemist,
  getSLOrManagerList,
  getMobileOwnerName,
  getStaticLookup
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return {
    loggedInDesignationId:
      state.mainReducer.userData.authInfo.loggedInDesignationId,
    operationRights: state.mainReducer.currentMenu.operationRights,
    filterDesignation: state.mainReducer.filterDesignation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSLOrManagerList: ({ params, onSuccess, onFailure }) =>
      dispatch(getSLOrManagerList({ params, onSuccess, onFailure })),

      getStaticLookup: ({ params, onSuccess, onFailure }) =>
    dispatch(getStaticLookup({ params, onSuccess, onFailure })),

    getAreas: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getAreas({
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

    getRoutes: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getRoutes({
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

    addChemist: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addChemist({
          params,
          onSuccess,
          onFailure
        })
      ),

    updateChemist: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateChemist({
          params,
          onSuccess,
          onFailure
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChemistList);
