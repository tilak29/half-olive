import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Login from "../Login/LoginContainer";
import MainPage from "./MainPageContainer";
import DisplayMessage from "../../components/core/DisplayMessage";
import GuestFormScreen from "../Masters/GuestForm/GuestFormContainer";

/**
 * Parent App component with routing
 * @author Tejal Sali
 */
function AppRoute(props) {
  return (
    <div>
      <HashRouter basename="/">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/checkedinform/:id" exact component={GuestFormScreen} />
          <PrivateRoute
            authed={props.isUserAuthorize}
            path="/"
            component={MainPage}
          />
        </Switch>
      </HashRouter>
      <DisplayMessage
        {...props.displayMessage}
        onClose={() => props.hideDisplayMessage()}
      />
    </div>
  );
}

export default AppRoute;
