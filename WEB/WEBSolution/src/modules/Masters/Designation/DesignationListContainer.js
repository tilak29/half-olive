import { connect } from "react-redux";

import DesignationList from "./DesignationList";
import {
  getDesignationList,
  addDesignation,
  updateDesignation
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = dispatch => {
  return {
    getDesignationList: ({ onSuccess, onFailure }) =>
      dispatch(
        getDesignationList({
          onSuccess,
          onFailure
        })
      ),

    addDesignation: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addDesignation({
          params,
          onSuccess,
          onFailure
        })
      ),

    updateDesignation: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateDesignation({
          params,
          onSuccess,
          onFailure
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignationList);
