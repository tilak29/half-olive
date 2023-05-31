import { connect } from "react-redux";

import MainPage from "./MainPage";
import {
  userLogout,
  setCurrentMenu,
  getNotificationCount,
} from "../../Saga/actions/ActionContainer";

const mapStateToProps = (state) => {
  return {
    menuItems: state.mainReducer.userData.userInfo.menuNames,
    currentMenu: state.mainReducer.currentMenu,
    userName: state.mainReducer.userData.userInfo.userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogout: () => dispatch(userLogout()),
    setCurrentMenu: (menuDetails) => dispatch(setCurrentMenu(menuDetails)),

    getNotificationCount: ({ onSuccess, onFailure }) =>
      dispatch(
        getNotificationCount({
          onSuccess,
          onFailure,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
