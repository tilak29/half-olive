import { connect } from "react-redux";

import StateList from "./StateList";
import {
  getStatesList,
  addState,
  updateState
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatesList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getStatesList({
          params,
          onSuccess,
          onFailure
        })
      ),

    addState: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addState({
          params,
          onSuccess,
          onFailure
        })
      ),

    updateState: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateState({
          params,
          onSuccess,
          onFailure
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StateList);
