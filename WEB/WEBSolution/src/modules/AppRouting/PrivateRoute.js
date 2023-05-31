import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * PrivateRoute serves as a wrapper component to all of the routes that need authentication.
 * @author Tejal Sali
 * @param {boolean} authed if false then returns to loginpage else to the props component
 * @param {Object} component
 */
function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
