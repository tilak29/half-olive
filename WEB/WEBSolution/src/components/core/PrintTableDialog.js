import React, { useState,useRef } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { AddBox, Clear, Edit, Refresh, CheckCircleOutline, HighlightOff, Cancel } from "@material-ui/icons";
import MaterialTable from "material-table";

import DisplayMessage from "./DisplayMessage";
import Button from "./Button";
import { labels } from "../../Config.json";

import { useReactToPrint } from 'react-to-print';
import { constants } from "fs";
import {
    tableoptions,
    style
} from "../../components/custom/GridConfig";

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
const PrintDialogControl = React.forwardRef((props, ref) => {
    const componentRef = useRef();
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
    isDialogTitle = true,
    columns,
    data
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

  
const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div ref={ref}>
        <MaterialTable
                    title={`List of Daily Therapy`}
                    columns={columns}
                    data={data}
                    options={tableoptions}
                    style={style}
                />
      </div>
    );
  }
  )
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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
          </DialogContentText >
          <ComponentToPrint ref={componentRef} />
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
                onClick={handlePrint}
              customClass="button button-primary"
              label={"Print"}
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
})

export default PrintDialogControl
