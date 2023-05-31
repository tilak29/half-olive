import { connect } from "react-redux";

import Login from "./Login";
import {
  userLogin,
  forgotPassword,
  callRefreshTokenSaga,
  userLogout
} from "../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return { isUserAuthorize: state.mainReducer.isUserAuthorize };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: ({ params, onSuccess, onValidationFailure, onFailure }) =>
      dispatch(
        userLogin({
          params,
          onSuccess,
          onValidationFailure,
          onFailure
        })
      ),
    forgotPassword: ({ params, onSuccess, onFailure }) =>
      dispatch(
        forgotPassword({
          params,
          onSuccess,
          onFailure
        })
      ),

    callRefreshTokenSaga: () => dispatch(callRefreshTokenSaga()),

    userLogout: () => dispatch(userLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
