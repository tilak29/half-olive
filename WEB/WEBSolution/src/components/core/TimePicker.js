import React, { useState } from "react";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import {
  InputLabel,
  FormHelperText,
  TextField,
  IconButton,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

/**
 * Time picker control with mandatory props
 * @author Tejal Sali,Khushbu Shah
 * @param id
 * @param {date Object} value
 * @param {boolean} error
 * @param {string} errorMessage
 * @param {boolean} required
 * @callback onChange
 * @param {boolean} isInline
 * @param {boolean} disabled
 * @param {string} placeholder
 */

const TimePicker = ({ ...props }) => {
  const {
    id,
    defaultValue,
    onChange,
    label,
    disabled = false,
    placeholder = "HH:MM AM/PM",
    tooltipText = "",
    required = false,
    error: isError = false,
    errorMessage: errorMessageFromProps = "This Field is Required",
    isInline = false,
  } = props;

  const [error, setError] = useState(isError);
  const [errorMessage, setErrorMessage] = useState(errorMessageFromProps);
  const [selectedDate, setSelectedDate] = useState(defaultValue || null);

  const blurEvent = () => {
    if ((!selectedDate || selectedDate === null) && required) {
      setError(true);
      setErrorMessage(errorMessageFromProps);
    } else {
      setError(false);
      setErrorMessage("");
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date === null && required) {
      setError(true);
      setErrorMessage(errorMessageFromProps);
    } else {
      setError(false);
      setErrorMessage("");
    }
  };

  const TextFieldComponent = (props) => {
    return (
      <TextField {...props} disabled={true} name="datepicker" classes={{}} />
    );
  };
  return (
    <div className="form-group datepicker-input" title={tooltipText}>
      <InputLabel shrink htmlFor="bootstrap-input" required={required}>
        {label}
      </InputLabel>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          id={id}
          value={selectedDate}
          autoOk
          onChange={(date) => {
            handleDateChange(date);
            onChange && onChange(date);
          }}
          onBlur={() => {
            blurEvent();
          }}
          error={error}
          placeholder={placeholder}
          disabled={disabled}
          TextFieldComponent={TextFieldComponent}
          InputProps={{
            style: {
              borderColor:
                (isError || error) && isInline ? "#ed3237" : "#AFAFAF",
            },
            endAdornment: (
              <IconButton
                onClick={() => {
                  handleDateChange(null);
                  onChange && onChange(null);
                }}
              >
                <ClearIcon />
              </IconButton>
            ),
          }}
          InputAdornmentProps={{
            position: "start",
          }}
          okLabel=""
          cancelLabel=""
        />
      </MuiPickersUtilsProvider>
      {(error || isError) && !isInline && (
        <FormHelperText id="component-error-text">
          {errorMessage}
        </FormHelperText>
      )}
    </div>
  );
};
export default TimePicker;
// Thu Jan 08 2020 15:32:00 GMT+0530 (India Standard Time)
