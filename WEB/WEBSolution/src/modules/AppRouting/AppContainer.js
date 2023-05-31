import { connect } from "react-redux";

import AppRoute from "./AppRoute";
import { hideDisplayMessage } from "../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return {
    isUserAuthorize: state.mainReducer.isUserAuthorize,
    displayMessage: state.mainReducer.displayMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideDisplayMessage: () => dispatch(hideDisplayMessage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoute);
