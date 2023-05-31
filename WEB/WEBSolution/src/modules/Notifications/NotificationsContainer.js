import { connect } from "react-redux";

import Notifications from "./Notifications";
import { getNotifications } from "../../Saga/actions/ActionContainer";

const mapStateToProps = state => {
  return {
    userData: state.mainReducer.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNotifications: ({ params, onSuccess, onFailure }) =>
      dispatch(getNotifications({ params, onSuccess, onFailure }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
