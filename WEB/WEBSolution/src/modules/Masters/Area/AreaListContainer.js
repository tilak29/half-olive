import { connect } from "react-redux";

import AreaList from "./AreaList";
import {
  getAreaList,
  addArea,
  updateArea,
  getChemistList,
} from "../../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAreaList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getAreaList({
          params,
          onSuccess,
          onFailure,
        })
      ),
    getChemistList: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getChemistList({
          params,
          onSuccess,
          onFailure,
        })
      ),
    addArea: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addArea({
          params,
          onSuccess,
          onFailure,
        })
      ),

    updateArea: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateArea({
          params,
          onSuccess,
          onFailure,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaList);
