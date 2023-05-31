import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  InputBase,
  FormHelperText,
} from "@material-ui/core";
/**
 *  select control with mandatory props
 * @author Nirali Maradiya,Khushbu Shah
 * @param id
 * @param {string} label
 * @param {array of object} data - [
            {
                label: "Option 1",
                value: "option1"
            }
        ]
 * @param value
 * @callback onChange
 */

const SelectControl = ({ ...props }) => {
  const {
    label,
    onChange,
    data,
    value: valFromProps = 0,
    error: isError = false,
    errorMessage: errorMessageFromProps = "This Field is Required",
    required = false,
    isAutoFocus: autoFocus = false,
    disabled = false,
    setEmptyMessage,
    conditionValueForEmptyMessage,
    isInline = false,
    disabledDefault = true,
    selectedLabel: selectedLabelFromProps = "",
    isChanged: isChangedFromProps = false,
    width,
  } = props;
  const [value, setValue] = useState(valFromProps);
  const [errorMessage, setErrorMessage] = useState(errorMessageFromProps);
  const [error, setError] = useState(isError);
  const [isChanged, setIsChanged] = useState(isChangedFromProps);
  const [selectedLabel, setSelectedLabel] = useState(selectedLabelFromProps);

  useEffect(() => {
    setValue(valFromProps);
    setSelectedLabel(""); //U166263
    if (
      selectedLabelFromProps === "" &&
      data.length > 0 &&
      valFromProps !== null &&
      valFromProps !== undefined
    ) {
      const selectedData = data.filter(
        (x) => x.value.toString() === valFromProps.toString()
      );
      if (selectedData && selectedData[0]) {
        setSelectedLabel(selectedData[0].label);
      }
    }
  }, [valFromProps, data, selectedLabelFromProps]);

  useEffect(() => {
    setIsChanged(isChangedFromProps);
  }, [isChangedFromProps]);

  useEffect(() => {
    if (
      (isError &&
        !isChanged &&
        conditionValueForEmptyMessage === undefined &&
        setEmptyMessage === undefined) ||
      (isError === true &&
        conditionValueForEmptyMessage &&
        conditionValueForEmptyMessage !== valFromProps &&
        setEmptyMessage &&
        setEmptyMessage === false)
    ) {
      setError(true);
      setErrorMessage(errorMessageFromProps);
    } else if (
      !isChanged &&
      conditionValueForEmptyMessage &&
      conditionValueForEmptyMessage !== valFromProps &&
      setEmptyMessage &&
      setEmptyMessage === false
    ) {
      setError(true);
      setErrorMessage(errorMessageFromProps);
    } else if (
      (setEmptyMessage && setEmptyMessage === true) ||
      setEmptyMessage === undefined
    ) {
      setErrorMessage("");
      setError(false);
    }
  }, [
    setEmptyMessage,
    errorMessageFromProps,
    valFromProps,
    isError,
    isChanged,
    conditionValueForEmptyMessage,
  ]);

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);    
    if (value !== "") {
      const selectedData = data.filter(
        (x) => x.value.toString() === value.toString()
      );
      if (selectedData && selectedData[0].label) {
        const label = selectedData[0].label;
        setSelectedLabel(label);
      } else {
        setSelectedLabel("");
      }
    } else {
      setSelectedLabel("");
    }

    if (
      conditionValueForEmptyMessage &&
      conditionValueForEmptyMessage !== value &&
      (isError || error)
    ) {
      setError(true);
      setErrorMessage(errorMessageFromProps);
    } else if (
      conditionValueForEmptyMessage &&
      conditionValueForEmptyMessage === value
    ) {
      setIsChanged(true);
      //  setErrorMessage("");
      setError(false);
    } else if (setEmptyMessage === undefined) {
      setIsChanged(true);
      setErrorMessage("");
      setError(false);
    }
  };

  function blurEvent() {
    if (!value && required) {
      setError(true);
      setErrorMessage(errorMessageFromProps);
    }
    if (value) {
      setError(false);
      setErrorMessage("");
    }
  }

  const BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        // marginTop: theme.spacing(3)
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border:
        ((props.isError && !props.isChanged) || props.error) && props.isInline
          ? `1px solid  #ed3237`
          : "1px solid #AFAFAF",
      fontSize: "1rem",
      padding: "11px 16px 11px 16px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      "&:focus": {
        borderRadius: "4px",
      },
    },
  }))(InputBase);

  // const useStyles = makeStyles(theme => ({
  //   margin: {
  //     margin: theme.spacing(1),
  //   },
  // }));

  return (
    // New Form Control
    <div>
      <FormControl
        className="form-group"
        required={required}
        disabled={disabled}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width,
        }}
      >
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
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          displayEmpty
          value={value}
          onChange={(event) => {
            handleChange(event);
            onChange && onChange(event);
          }}
          autoFocus={autoFocus}
          required={required}
          input={<BootstrapInput />}
          error={isError || error}
          onBlur={() => {
            blurEvent();
          }}
          className="select-input"
          title={selectedLabel}
        >
          <MenuItem disabled={disabledDefault} value={""}>
            <span
              className={disabledDefault || value === "" ? "placeholder" : ""}
            >
              Select {label}
            </span>
          </MenuItem>
          {data.map((val, index) => (
            <MenuItem value={val.value} key={index}>
              {val.label}
            </MenuItem>
          ))}
        </Select>
        {(error || isError) && !isInline && (
          <FormHelperText id="component-error-text">
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};
export default SelectControl;
