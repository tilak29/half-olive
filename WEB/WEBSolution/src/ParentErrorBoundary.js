import React, { Component } from "react";
import * as log from "loglevel";

import ErrorImage from "./Images/error.png";
/**
 * Parent error boundary to handle all errors occured in application and show fallback UI insted of crashing.
 * This must be a class component.
 * Error won't show up in production mode, it's just a development tool duplicating the normal browser console.
 * This won't work for:
        Event handlers 
        Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
        Server side rendering
        Errors thrown in the error boundary itself (rather than its children)    
 * @author Tejal Sali
 */

export default class ParentErrorBoundary extends Component {
  constructor(props) {
    log.setLevel(0, true); //setting this to the lowest level so that all msgs will be logged
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  //this method makes this component a ErrorBoundary component
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    //Log error message here
    log.info(`Error:: ${JSON.stringify(errorInfo)}`);
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          {/* <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details> */}
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div className="text-center">
              <h5 style={{ color: "#2F4563" }}>Something went wrong</h5>
              <h6 style={{ color: "#AAB3CE" }}>
                Please contact your administrator
              </h6>
            </div>
            <div>
              <img
                src={ErrorImage}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                }}
                alt={""}
              />
            </div>
            <div className="mt-3">
              <button
                className="btn btn-danger"
                onClick={() => {
                  window.location.replace("/");
                }}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
