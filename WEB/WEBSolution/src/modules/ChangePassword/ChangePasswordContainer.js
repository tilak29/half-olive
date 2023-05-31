import { connect } from "react-redux";

import ChangePassword from "./ChangePassword";
import { changePassword, userLogout } from "../../Saga/actions/ActionContainer";

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    changePassword: ({ params, onSuccess, onFailure }) =>
      dispatch(
        changePassword({
          params,
          onSuccess,
          onFailure
        })
      ),
    userLogout: () => dispatch(userLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
