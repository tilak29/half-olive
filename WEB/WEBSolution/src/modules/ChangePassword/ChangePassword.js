import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import DisplayMessage from "../../components/core/DisplayMessage";
import TextField from "../../components/core/TextField";
import DialogControl from "../../components/core/Dialog";

/**
 * Change Password dialog
 * @author Tejal Sali
 */
export default function ChangePassword(props) {
  const [rowData, setRowData] = useState({});
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});

  const validateField = field => {
    let isValid = true;
    if (
      !rowData[field] ||
      rowData[field] === "" ||
      rowData[field] === null ||
      (rowData[field] && rowData[field].length === 0)
    ) {
      setValidationList({ ...validationList, [field]: true });
      isValid = false;
    } else {
      setValidationList({ ...validationList, [field]: false });
    }
    return isValid;
  };

  const checkAllValidation = () => {
    const oldPassword = !validateField("oldPassword");
    const newPassword = !validateField("newPassword");
    const confirmPassword = !validateField("confirmPassword");

    setValidationList({ oldPassword, newPassword, confirmPassword });

    if (!oldPassword && !newPassword && !confirmPassword) {
      const samePwd =
        rowData.newPassword.trim() === rowData.confirmPassword.trim()
          ? true
          : false;

      if (!samePwd) {
        setDisplayMessage({
          open: true,
          displayMessage: "The New password and Confirm Password must match.",
          severity: "error"
        });
      }

      return samePwd;
    } else {
      return false;
    }
  };

  const changePassword = () => {
    if (checkAllValidation()) {
      props.changePassword({
        params: rowData,
        onSuccess: ({ message: displayMessage }) => {
          // Displaying change password success message in parent as the dialog is closed
          props.setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success"
          });
          props.setChangePwdDialog(false);
          //Force Logout
          setTimeout(function () {
            props.userLogout();
          }, 5000);
        },
        onFailure: ({ message: displayMessage }) => {
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "error"
          });
        }
      });
    }
  };

  return (
    <div>
      <DialogControl
        dialogTitleText={`Change Password`}
        dialogContent={
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required={true}
                maxLength={10}
                type="password"
                value={rowData.oldPassword}
                label="Old Password"
                numeric={false}
                isAutoFocus={false}
                onChange={e => {
                  setRowData({ ...rowData, oldPassword: e.target.value });
                  validateField("oldPassword");
                }}
                error={
                  validationList && validationList.oldPassword ? true : false
                }
                errorMessage={"Old Password is Required"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={true}
                maxLength={10}
                type="password"
                value={rowData.newPassword}
                label="New Password"
                numeric={false}
                isAutoFocus={false}
                onChange={e => {
                  setRowData({ ...rowData, newPassword: e.target.value });
                  validateField("newPassword");
                }}
                error={
                  validationList && validationList.newPassword ? true : false
                }
                errorMessage={"New Password is Required"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={true}
                maxLength={10}
                type="password"
                value={rowData.confirmPassword}
                label="Confirm Password"
                numeric={false}
                isAutoFocus={false}
                onChange={e => {
                  setRowData({ ...rowData, confirmPassword: e.target.value });
                  validateField("confirmPassword");
                }}
                error={
                  validationList && validationList.confirmPassword
                    ? true
                    : false
                }
                errorMessage={"Confirm Password is Required"}
              />
            </Grid>
          </Grid>
        }
        onCancel={() => {
          props.setChangePwdDialog(false);
        }}
        onSubmit={() => {
          changePassword();
        }}
      />
      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
