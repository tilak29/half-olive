import { connect } from "react-redux";

import SchemeList from "./SchemeList";
import {
  getStaticLookup,
  getSchemesList,
  getAvailableItemsList,
  addScheme,
  updateScheme,
  updateSchemeItems,
  getAllDivisions
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStaticLookup: ({ params, onSuccess, onFailure }) =>
      dispatch(getStaticLookup({ params, onSuccess, onFailure })),

    getSchemesList: ({ onSuccess, onFailure }) =>
      dispatch(getSchemesList({ onSuccess, onFailure })),

    getAvailableItemsList: ({params, onSuccess, onFailure }) =>
      dispatch(getAvailableItemsList({params, onSuccess, onFailure })),

    addScheme: ({ params, onSuccess, onFailure }) =>
      dispatch(addScheme({ params, onSuccess, onFailure })),

    updateScheme: ({ params, onSuccess, onFailure }) =>
      dispatch(updateScheme({ params, onSuccess, onFailure })),

    updateSchemeItems: ({ params, onSuccess, onFailure }) =>
      dispatch(updateSchemeItems({ params, onSuccess, onFailure })),

    getAllDivisions: ({ onSuccess, onFailure }) =>
      dispatch(getAllDivisions({ onSuccess,onFailure})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchemeList);
