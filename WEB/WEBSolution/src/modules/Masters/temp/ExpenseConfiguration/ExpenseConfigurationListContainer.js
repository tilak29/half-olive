import { connect } from "react-redux";
import {
  getExpenseConfig,
  saveExpenseConfig
} from "../../../Saga/actions/ActionContainer";
import ExpenseConfigurationList from "./ExpenseConfigurationList";

const mapStateToProps = state => {
  return {
    operationRights: state.mainReducer.currentMenu.operationRights,
    serverDate: state.mainReducer.otherInfo.serverDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getExpenseConfig: ({ params, onSuccess, onFailure }) =>
      dispatch(
        getExpenseConfig({
          params,
          onSuccess,
          onFailure
        })
      ),
    saveExpenseConfig: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveExpenseConfig({
          params,
          onSuccess,
          onFailure
        })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseConfigurationList);
