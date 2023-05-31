import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import Button from "../core/Button";
/**
 * Confirmation dialog for Ok/Cancel operations
 * @author Tejal Sali
 * @param {boolean} open To manage the visibility of dialog
 * @callback onCancel Called on cancel button click
 * @callback onOk Called on OK button click
 * @param {string} dialogTitle
 * @param {string} dialogContentText
 * @param {string} cancelButtonText
 * @param {string} okButtonText
 * @param {string} isCancelButton
 */
export default function ConfirmationDialog({
  open = false,
  onCancel,
  onOk,
  dialogTitle,
  dialogContentText,
  cancelButtonText = "Cancel",
  okButtonText = "Ok",
  isCancelButton = true,
  maxWidth = "lg",
  fullWidth = false,
}) {
  return (
    <div>
      <Dialog open={open} maxWidth={maxWidth} fullWidth={fullWidth}>
        {dialogTitle && (
          <DialogTitle id="holiday-dialog-title">{dialogTitle}</DialogTitle>
        )}
        <DialogContent>
          <DialogContentText id="holiday-dialog-description">
            {dialogContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {isCancelButton && (
            <Button
              autoFocus
              onClick={onCancel}
              customClass="button button-black"
              label={cancelButtonText}
            >
              {cancelButtonText}
            </Button>
          )}
          <Button
            onClick={onOk}
            customClass="button button-primary"
            label={okButtonText}
          >
            {okButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
