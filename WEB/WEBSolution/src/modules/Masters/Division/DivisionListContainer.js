import { connect } from "react-redux";
import {
  addDivision, getDivisionList, updateDivision

} from "../../../Saga/actions/ActionContainer";
import DivisionList from "./DivisionList";


const mapStateToProps = state => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = dispatch => {
  return {
    getDivisionList: ({ onSuccess, onFailure }) =>
      dispatch(
        getDivisionList({
          onSuccess,
          onFailure
        })
      ),

    addDivision: ({ params, onSuccess, onFailure }) =>
      dispatch(
        addDivision({
          params,
          onSuccess,
          onFailure
        })
      ),

    updateDivision: ({ params, onSuccess, onFailure }) =>
      dispatch(
        updateDivision({
          params,
          onSuccess,
          onFailure
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DivisionList);
