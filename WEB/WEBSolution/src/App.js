import React, { memo, useEffect, useState } from "react";
import axios from "axios";
// import * as log from "loglevel";

import "bootstrap/dist/css/bootstrap.min.css";

import { BASE_URL, API } from "./Constants";
import "./App.css";
import AppContainer from "./modules/AppRouting/AppContainer";
import { StylesProvider } from "@material-ui/core/styles";
import ErrorImage from "./Images/error.png";
import { appConfig } from "./Config.json";


/**
 * Parent App component
 * @author Tejal Sali,Khushbu Shah
 */

const App = memo((props) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("App.js is loading...");
  }, []);

  // useEffect(() => {
  //   //report all user console errors
  //   window.onerror = function (message) {
  //     const {
  //       APIVersion,
  //     } = appConfig;

  //     setError(true);
  //     console.log("Window Error in App.js...");
  //     console.log(message);

  //     if (error === true) {
  //       axios.post(
  //         BASE_URL + API.LOG_ERROR,
  //         message,
  //         {
  //           "content-type": "application/json",
  //           "accept-version": `${APIVersion}`
  //         },
  //         { maxRedirects: 100 }
  //       );
  //     }
  //   };
  // }, [error]);
  return (
    <StylesProvider injectFirst>
      {/* {error && (
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
      )} */}
      {!error && <AppContainer />}
    </StylesProvider>
  );
});

export default App;
