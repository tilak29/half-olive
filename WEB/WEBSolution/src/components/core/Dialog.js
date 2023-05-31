import React, { useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

import DisplayMessage from "./DisplayMessage";
import Button from "./Button";
import { labels } from "../../Config.json";

/**
 * Dialog for Add/Update operations
 * @author Khushbu Shah
 * @param {boolean} open To manage the visibility of dialog
 * @callback onCancel Called on cancel button click
 * @callback onSubmit Called on Submit button click
 * @param {string} dialogTitleText
 * @param {string} isDialogTitle
 * @param {string} dialogContentText
 * @param {string} dialogContent
 * @param {string} cancelButtonText
 * @param {string} submitButtonText
 * @param {string} maxWidth
 * @param {boolean} submitAction
 */
export default function DialogControl(props) {
  const {
    open = true,
    onCancel,
    onSubmit,
    dialogTitleText = "Dialog Title",
    dialogContentText = "",
    dialogContent = "",
    cancelButtonText = labels.cancelButton,
    submitButtonText = labels.saveButton,
    maxWidth = "lg",
    fullWidth = false,
    submitAction = true,
    cancelAction = true,
    isDialogTitle = true
  } = { ...props };

  const [openModal, setModalOpen] = useState(open);
  const [displayMessage, setDisplayMessage] = useState({});

  const defaultOnCancel = () => {
    setModalOpen(!openModal);
  };
  const defaultOnSubmit = () => {
    setDisplayMessage({
      open: true,
      displayMessage: "Submit Button Clicked",
      severity: "success"
    });
  };
  return (
    <div>
      <Dialog open={open} maxWidth={maxWidth} fullWidth={fullWidth}>
        {isDialogTitle && (
          <DialogTitle id="holiday-dialog-title">
            <div className="d-flex justify-content-between align-items-center">
              {dialogTitleText}
              <div>
                <IconButton
                  aria-label="cancel"
                  onClick={() => {
                    defaultOnCancel();
                    onCancel && onCancel("cancel");
                  }}
                >
                  <Close />
                </IconButton>
              </div>
            </div>
          </DialogTitle>
        )}
        <DialogContent>
          <DialogContentText id="holiday-dialog-description">
            {dialogContentText}
          </DialogContentText>
          {dialogContent}
        </DialogContent>
        <DialogActions>
          {cancelAction && (
            <Button
              autoFocus
              onClick={() => {
                defaultOnCancel();
                onCancel && onCancel();
              }}
              customClass="button button-black"
              label={cancelButtonText}
            >
              {cancelButtonText}
            </Button>
          )}
          {submitAction && (
            <Button
              onClick={e => {
                onSubmit ? onSubmit(e) : defaultOnSubmit();
              }}
              customClass="button button-primary"
              label={submitButtonText}
            >
              {submitButtonText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
