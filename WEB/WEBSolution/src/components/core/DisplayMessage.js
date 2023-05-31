import React, { useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

/**
 * Display message for various events
 * @author Tejal Sali
 * @param {boolean} open To manage the visibility of display message
 * @param {string} displayMessage Message text to be displayed
 * @param {string} severity "error" | "warning" | "info" | "success"
 * @param {string} anchorOrigin_vertical "top" | "bottom"
 * @param {string} anchorOrigin_horizontal "center" | "right" | "left"
 * @callback onClose
 */
export default function DisplayMessage({
  open: openFromProps = false,
  displayMessage = "",
  severity = "info",
  anchorOrigin_vertical: vertical = "top",
  anchorOrigin_horizontal: horizontal = "center",
  onClose
}) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(openFromProps);
  }, [openFromProps]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    onClose && onClose();
  };

  return (
    <div>
      {displayMessage !== "" && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical, horizontal }}
          onClose={handleClose}
          className="custom-snackbar-wrap"
        >
          <Alert onClose={handleClose} severity={severity} className="custom-snackbar">
            {displayMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
