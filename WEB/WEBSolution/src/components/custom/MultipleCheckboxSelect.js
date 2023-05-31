import React, { useState, useEffect } from "react";

import {
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
  ListItemText,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";

/**
 * Multiple Selection Dropdown as per the business requirement
 * @author Tejal Sali
 * @param id
 * @param {string} label
 * @param {array of object} items - Array of items to be rendered in list key-value pair
 * @param keyField Selection field of option
 * @param textField Display Name field of option
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
  items = [], // Array of items to be rendered in list key-value pair
  keyField = "id", // Selection field
  textField = "value", // Display Name field
  checked = [], // To store the selection in parent
  setChecked, // Update parent selection value
  error: isError = false,
  errorMessage: errorMessageFromProps = "This field is Required",
  required = false,
  disabled = false,
  subString = false
}) {
  const allValues = items.map((item) => item[keyField]);

  const [error, setError] = useState(isError);
  const [errorMessage, setErrorMessage] = useState(errorMessageFromProps);

  useEffect(() => {
    if (isError === true) {
      setError(true);
      setErrorMessage(errorMessageFromProps);
    } else {
      setErrorMessage("");
      setError(false);
    }
  }, [errorMessageFromProps, isError]);

  const handleChange = (event) => {
    let selectedValues = event.target.value;
    if (selectedValues.includes(0)) {
      const index = selectedValues.indexOf(0);
      selectedValues.splice(index, 1);
    }
    if (selectedValues.includes(-1)) {
      if (checked.length === items.length) {
        setChecked([]);
        if (required) {
          setError(true);
          setErrorMessage(errorMessageFromProps);
        }
      } else {
        setError(false);
        setErrorMessage("");
        setChecked(allValues);
      }
    } else {
      setError(false);
      setErrorMessage("");
      setChecked(selectedValues);
    }
  };

  return (
    <FormControl className="form-group" disabled={disabled}>
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        multiple
        value={checked.length === 0 ? [0] : checked}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => {
          if (checked.length === 0) {
            return <span className="placeholder">Select {label}</span>;
          } else {
            let selectedText= (subString)?items
            .filter((item) => checked.includes(item.value))
            .map((item) => item.label.substring(0,8))
            :
            items
            .filter((item) => checked.includes(item.value))
            .map((item) => item.label);
            return selectedText.join(", ");
          }
        }}
        error={isError || error}
      >
        <MenuItem key={-1} value={-1}>
          <Checkbox
            checked={checked.length === items.length && items.length !== 0}
            indeterminate={
              checked.length !== items.length && checked.length !== 0
            }
            disabled={items.length === 0}
          />
          <ListItemText primary={"Select All"} />
        </MenuItem>
        {items.map((item) => {
          const id = item[keyField];
          const value = item[textField];
          return (
            <MenuItem key={id} value={id}>
              <Checkbox checked={checked.indexOf(id) > -1} />
              <ListItemText primary={value} />
            </MenuItem>
          );
        })}
      </Select>
      {(error || isError) && (
        <FormHelperText id="component-error-text">
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}
