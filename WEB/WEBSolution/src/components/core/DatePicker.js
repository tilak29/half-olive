import React, { useState, useEffect } from "react";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  InputLabel,
  FormHelperText,
  TextField,
  IconButton,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import config from "../../Config.json";
import { getDateFormatForDatePicker } from "../../Utils/DateTimeUtils.js";

/**
 * Date picker control with mandatory props
 * @author Nirali Maradiya
 * @param id
 * @param {date Object} defaultValue
 * @param {string} variant - ["static" || "dialog" ||"inline"]
 * @param {string} format - [default- " dd/MM/yyyy " ]
 * @param {string} margin - ["none" < "dense" <"normal"]
 * @param {string} label
 * @param {date object} minDate - Min selectable date
 * @param {string} minDateMessage - Error message, shown if date is less then minimal date
 * @param {date object} maxDate - max selectable date
 * @param {string} maxDateMessage - Error message, shown if date is more then maximal date
 * @param {boolean} disableFuture - disable future date || NOTE: having high priority than minDate or maxDate
 * @param {boolean} disablePast - disable past date || NOTE: having high priority than minDate or maxDate
 * @param {boolean} error
 * @param {string} errorMessage
 * @param {boolean} required
 * @callback onChange
 * @param {boolean} isInline
 * @param {boolean} disabled
 * @param {string} placeholder
 */

const DatePicker = ({ ...props }) => {
  const {
    id,
    defaultValue,
    variant = "dialog",
    format = config.appConfig.dateFormatForPicker,
    margin = "none",
    label,
    onChange,
    minDate,
    minDateMessage,
    maxDate,
    maxDateMessage,
    disableFuture = false,
    disablePast = false,
    required = false,
    error: isError = false,
    errorMessage: errorMessageFromProps = "This Field is Required",
    isInline = false,
    views,
    disabled = false,
    placeholder = "DD-MMM-YYYY",
    tooltipText = "",
  } = props;

  const [selectedDate, setSelectedDate] = useState(
    getDateFormatForDatePicker(defaultValue) || null
  );
  const [error, setError] = useState(isError);
  const [errorMessage, setErrorMessage] = useState(errorMessageFromProps);

  useEffect(() => {
    if (
      isError &&
      (defaultValue === null || defaultValue === "") &&
      selectedDate === null
    ) {
      setError(isError);
    }
    if (minDate && (defaultValue === null || defaultValue === "")) {
      setErrorMessage(errorMessageFromProps);
    }
  }, [isError, minDate, errorMessageFromProps, defaultValue, selectedDate]);

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

  useEffect(() => {
    if (selectedDate !== defaultValue)
      defaultValue !== null
        ? setSelectedDate(getDateFormatForDatePicker(defaultValue))
        : setSelectedDate(defaultValue);
  }, [defaultValue, selectedDate]);

  const blurEvent = () => {
    if ((!selectedDate || selectedDate === null) && required) {
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
        <KeyboardDatePicker
          id={id}
          variant={variant} // "static" || "dialog" ||"inline"
          format={format}
          margin={margin} // "none" > "dense" >"normal"
          value={selectedDate}
          onChange={(date) => {
            handleDateChange(date);
            onChange && onChange(date);
          }}
          onBlur={() => {
            blurEvent();
          }}
          autoOk
          views={views}
          minDate={minDate}
          minDateMessage={minDateMessage}
          maxDate={maxDate}
          maxDateMessage={maxDateMessage}
          disableFuture={disableFuture}
          disablePast={disablePast}
          error={isError || error}
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
                disabled={disabled}
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
export default DatePicker;
// Thu Jan 08 2020 15:32:00 GMT+0530 (India Standard Time)
