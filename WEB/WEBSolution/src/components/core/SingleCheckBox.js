import React, { useState, useEffect } from "react";
import {
  Checkbox,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

/**
 * textField control with mandatory props
 * @author  Khushbu shah
 * @param id
 * @param {boolean} checked
 * @param {boolean} error
 * @param {boolean} required
 * @callback onChange
 * @param {boolean} isAutoFocus
 * @param {string} errorMessage
 * @param {string} label
 * @param {boolean} disabled
 */

export default function SingleCheckbox({ ...props }) {
  const {
    id = "checkbox",
    checked: checkedFromProps = false,
    error: isError = false,
    required = false,
    onChange,
    errorMessage: errorMessageFromProps = "This Field is required",
    label,
    disabled = false,
  } = props;
  const [checked, setChecked] = useState(checkedFromProps);
  const [errorMessage, setErrorMessage] = useState(errorMessageFromProps);
  const [error, setError] = useState(isError);

  useEffect(() => {
    setChecked(checkedFromProps);
  }, [checkedFromProps]);

  function handleChange(event) {
    const checkedValue = event.target.checked;
    setChecked(checkedValue);
    if (!checkedValue && required) {
      setError(true);
      setErrorMessage("This Field is required");
    } else {
      setError(false);
      setErrorMessage("");
    }
  }

  return (
    <FormControl required={required} disabled={disabled}>
      <div className="d-inline-flex flex-row align-items-center checkbox-wrap">
        {label && label !== "" && (
          <InputLabel shrink required={required} className="m-0 mr-2">
            {label}
          </InputLabel>
        )}
        <Checkbox
          checked={checked}
          id={id}
          onChange={(event) => {
            handleChange(event);
            onChange && onChange(event);
          }}
        />
      </div>
      {(error || isError) && (
        <FormHelperText id="component-error-text">
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}
