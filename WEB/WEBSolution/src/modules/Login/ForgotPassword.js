import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import DisplayMessage from "../../components/core/DisplayMessage";
import TextField from "../../components/core/TextField";
import DialogControl from "../../components/core/Dialog";

/**
 * Forgot Password dialog for Login Page
 * @author Tejal Sali
 */
export default function ForgotPassword(props) {
  const [mobileNumber, setMobileNumber] = useState();
  const [mobileNumberError, setMobileNumberError] = useState({
    error: false,
    errorMessage: "Mobile Number is Required",
  });
  const [displayMessage, setDisplayMessage] = useState({});

  const forgotPassword = () => {
    if (!mobileNumber || mobileNumber === "" || mobileNumber === null) {
      setMobileNumberError({
        error: true,
        errorMessage: "Mobile Number is Required",
      });
    } else {
      if (mobileNumber.length === 10) {
        setMobileNumberError({
          error: false,
          errorMessage: "",
        });
        props.forgotPassword({
          params: { mobileNumber: mobileNumber, code: "ForgotPassword" },
          onSuccess: ({ message: displayMessage }) => {
            // Displaying forgot password success message in parent as the dialog is closed
            props.setDisplayMessage({
              open: true,
              displayMessage,
              severity: "success",
            });
            props.setForgotPwdDialog(false);
          },
          onFailure: ({ message: displayMessage }) => {
            setDisplayMessage({
              open: true,
              displayMessage,
              severity: "error",
            });
          },
        });
      } else {
        setMobileNumberError({
          error: true,
          errorMessage: "Mobile number should be 10 digits",
        });
      }
    }
  };

  return (
    <div>
      <DialogControl
        dialogTitleText={`Forgot Password`}
        dialogContent={
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required={true}
                numeric={true}
                value={mobileNumber}
                onKeyUp={(event) => {
                  if (event.keyCode === 13) forgotPassword();
                }}
                label="Mobile Number"
                placeholder="Registered Mobile Number"
                isAutoFocus={false}
                onChange={(e) => {
                  setMobileNumber(e.target.value);

                  setMobileNumberError({
                    ...mobileNumberError,
                    error: false,
                    errorMessage: "",
                  });
                }}
                maxLength={10}
                {...mobileNumberError}
              />
            </Grid>
          </Grid>
        }
        onCancel={() => {
          props.setForgotPwdDialog(false);
        }}
        submitButtonText={"Request Password"}
        onSubmit={() => {
          forgotPassword();
        }}
      />
      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
