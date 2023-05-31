import React, { useState, useEffect } from "react";

import {
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
  ListItemText,
  Checkbox,
  FormHelperText
} from "@material-ui/core";

/**
 * Multiple Selection Dropdown as per the business requirement
 * @author Tejal Sali, Khushbu Shah
 * @param id
 * @param {string} label
 * @param {array of object} items - Array of items to be rendered in list key-value pair
 * @param checked selected items will be stored here
 * @callback setChecked This will update the value in parent control
 * @param width optional
 * @param {boolean} error
 * @param {boolean} required
 * @param {string} errorMessage
 */

export default function MultipleCheckboxSelect({
  id = "mutiple-checkbox",
  label = "",
  data = [], // Array of items to be rendered in list key-value pair
  checked = [], // To store the selection in parent
  setChecked, // Update parent selection value
  error: isError = false,
  errorMessage: errorMessageFromProps = "This field is Required",
  required = false,
  isInline = false,
  isChanged: isChangedFromProps = false
}) {
  const [error, setError] = useState(isError);
  const [errorMessage, setErrorMessage] = useState(errorMessageFromProps);
  const [isChanged, setIsChanged] = useState(isChangedFromProps);

  useEffect(() => {
    setIsChanged(isChangedFromProps);
  }, [isChangedFromProps]);

  useEffect(() => {
    if ((isError && !isChanged) || isError === true) {
      setError(true);
      setErrorMessage(errorMessageFromProps);
    } else {
      setErrorMessage("");
      setError(false);
    }
  }, [errorMessageFromProps, isError, isChanged]);

  const handleChange = event => {
    setError(false);
    setErrorMessage("");
    setChecked(event.target.value);
    setIsChanged(true);
  };

  function blurEvent() {
    if (checked.length === 0 && required) {
      setError(true);
      setErrorMessage(errorMessage);
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
      <Select
        labelId={`${id}-label`}
        id={id}
        multiple
        displayEmpty
        value={checked}
        onChange={handleChange}
        input={<Input />}
        renderValue={selected => {
          if (selected.length === 0) {
            return <span className="placeholder">Select {label}</span>;
          }
          const selectedText = data
            .filter(item => checked.includes(item.value))
            .map(item => item.label);
          return selectedText.join(", ");
        }}
        onBlur={() => {
          blurEvent();
        }}
        style={{
          border:
            ((isError && !isChanged) || error) && isInline
              ? `1px solid  #ed3237`
              : "1px solid #AFAFAF"
        }}
        error={isError || error}
      >
        <MenuItem disabled value="-1">
          <span className="placeholder">Select {label}</span>
        </MenuItem>

        {data.map(({ value, label }) => {
          return (
            <MenuItem key={value} value={value}>
              <Checkbox checked={checked.indexOf(value) > -1} />
              <ListItemText primary={label} />
            </MenuItem>
          );
        })}
      </Select>
      {(error || isError) && !isInline && (
        <FormHelperText id="component-error-text">
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}
