import { connect } from "react-redux";

import UserProfile from "./UserProfile";
import { getUserProfileData } from "../../Saga/actions/ActionContainer";

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProfileData: ({ params, onSuccess, onFailure }) =>
      dispatch(getUserProfileData({ params, onSuccess, onFailure }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
