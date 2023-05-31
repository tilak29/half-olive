import React, { useState, useEffect } from "react";

import {
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
} from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";

/**
 * Auto complete select
 * @author Tejal Sali
 * @param id
 * @param {string} label
 * @param {array of object} data - Array of items to be rendered in list key-value pair
 * @param value selected item will be stored here
 * @param {string} keyProp
 * @param {string} labelProp
 * @param {callback} onChange
 * @param {boolean} error
 * @param {boolean} required
 * @param {string} errorMessage
 * @param {boolean} autoFocus
 * @param {boolean} isInline
 */

const AutocompleteSelect = (props) => {
  const {
    id = "auto-complete-select",
    label = "",
    data = [], // Array of items to be rendered in list key-value pair
    value = null,
    keyProp = "value",
    labelProp = "label",
    onChange,
    autoFocus = false,
    error: isError = false,
    errorMessage: errorMessageFromProps = "This field is Required",
    required = false,
    isInline = false,
    disableField = false
  } = props;
  const [error, setError] = useState(isError);
  const [errorMessage, setErrorMessage] = useState(errorMessageFromProps);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(true);
  }, [value]);

  useEffect(() => {
    if ((isError && !isChanged) || isError === true) {
      setError(true);
      setErrorMessage(errorMessageFromProps);
    } else {
      setErrorMessage("");
      setError(false);
    }
  }, [errorMessageFromProps, isError, isChanged]);

  const handleChange = (event, value) => {
    onChange(event, value);
  };

  function blurEvent() {
    if (value === null && required) {
      setError(true);
      setErrorMessage(errorMessage);
    } else {
      setErrorMessage("");
      setError(false);
    }
  }

  return (
    <FormControl className="form-group">
      <InputLabel
        shrink
        htmlFor="bootstrap-input"
        id="demo-customized-select-label"
        required={required}
        className="select-label"
      >
        {label}
      </InputLabel>
      <Autocomplete
        labelId={`${id}-label`}
        id={id}
        options={data}
        disabled={disableField}
        autoHighlight={autoFocus}
        value={value}
        onChange={handleChange}
        getOptionLabel={(option) => option[labelProp]}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            // variant="outlined"
            margin="normal"
            fullWidth
            autoFocus={autoFocus}
            placeholder={label}
            style={{
              borderRadius: 4,
              position: "relative",
              //   backgroundColor: theme.palette.background.paper,
              border:
                ((props.isError && !props.isChanged) || props.error) &&
                props.isInline
                  ? `1px solid  #ed3237`
                  : "1px solid #AFAFAF",
              fontSize: "1rem",
              //   padding: "11px 16px 11px 16px",
              //   transition: theme.transitions.create([
              //     "border-color",
              //     "box-shadow",
              //   ]),
              // Use the system font instead of the default Roboto font.
              "&:focus": {
                borderRadius: "4px",
              },
            }}
          />
        )}
        onBlur={() => {
          blurEvent();
        }}
        getOptionSelected={(option, value) => {
          // console.log(value);
          return option[keyProp] === value[keyProp];
        }}
        error={isError || error}
      ></Autocomplete>
      {(error || isError) && !isInline && (
        <FormHelperText id="component-error-text">
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};
export default AutocompleteSelect;
