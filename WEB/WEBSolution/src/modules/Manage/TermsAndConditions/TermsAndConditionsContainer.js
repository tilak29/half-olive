import { connect } from "react-redux";

import TermsAndConditions from "./TermsAndConditions";
import { getTandC, saveTandC } from "../../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return { operationRights: state.mainReducer.currentMenu.operationRights };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveTandC: ({ params, onSuccess, onFailure }) =>
      dispatch(
        saveTandC({
          params,
          onSuccess,
          onFailure,
        })
      ),
      getTandC: ({ onSuccess, onFailure }) =>
      dispatch(
        getTandC({
          onSuccess,
          onFailure,
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TermsAndConditions);
