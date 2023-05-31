import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  InputBase,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

/**
 * textField control with mandatory props
 * @author  Khushbu shah
 * @param id
 * @param {string} value
 * @param {boolean} error
 * @param {boolean} required
 * @param {boolean} multiline
 * @param {int} rows
 * @param {boolean} fullWidth
 * @param {boolean} numeric
 * @param {string} defaultvalue
 * @param {boolean} isAutoFocus
 * @param {string} errorMessage
 * @param {string} label
 * @param {string} placeholder
 * @param options
 * @param disabled
 * @callback onChange
 * @param {boolean} isInline
 * @param {string} type // VISIT : https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
 *  When float value is there then type="decimal"
 */

const BootstrapInput = (theme) => ({
  root: {
    "label + &": {
      // marginTop: theme.spacing(3)
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #AFAFAF",
    fontSize: "1rem",
    width: "auto",
    // padding: "10px 5px",
    "&:focus": {
      boxShadow: `rgba(0,0,0,0.15) 0 0 0 0.2rem`,
      borderColor: "#666666",
    },
  },
  inputInline: {
    borderRadius: "4 !important",
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ed3237",
    fontSize: "1rem",
    width: "auto",
    // padding: "10px 5px",
    "&:focus": {
      boxShadow: `rgba(0,0,0,0.15) 0 0 0 0.2rem`,
      borderColor: "#666666",
    },
  },
});

const TextInput = ({ ...props }) => {
  const {
    id,
    value: valueFromProps,
    error: isError = false,
    required = false,
    multiline = false,
    rows = 1,
    options,
    fullWidth = true,
    numeric = false,
    type = "text",
    defaultvalue,
    onChange,
    onKeyUp,
    isAutoFocus: autoFocusFromProps = false,
    errorMessage: errorMessageFromProps = "This Field is Required",
    label,
    placeholder = label,
    isInline = false,
    disabled = false,
    classes,
    maxLength,
  } = props;

  const [value, setValue] = useState(valueFromProps || "");

  const [autoFocus, setAutoFocus] = useState(autoFocusFromProps);

  const [errorMessage, setErrorMessage] = useState(errorMessageFromProps);
  const [error, setError] = useState(isError);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(false);
    setValue(valueFromProps);
  }, [valueFromProps]);

  useEffect(() => {
    setErrorMessage(errorMessageFromProps);
  }, [errorMessageFromProps]);

  function TextChange(event) {
    let newValue = event.target.value;
    if (type && type === "decimal") {
      if (newValue.length <= maxLength) setValue(newValue);
    } else {
      setValue(newValue);
    }

    setError(false);
    if (isInline) {
      if (newValue !== "") {
        setIsChanged(true);
      } else {
        setIsChanged(false);
      }
    }
    setErrorMessage("");
    setAutoFocus(true);
  }

  const mobile = new RegExp(/^\d*$/);
  const email = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const password = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
  );
  const gstNumber = new RegExp(
    /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/
  );
  const dlNo = new RegExp(/[A-Z]{2}\d{13}/);

  const invoiceNo = new RegExp(/^([a-zA-Z0-9/-]+)$/);

  function regexCheck(id) {
    if (id === "mobile") {
      if (!(mobile.test(value) && value.length === 10)) {
        setErrorMessage("Mobile number should be 10 digits");
        setError(true);
         props.setIsMobileRegexValid(false);
      } else {
        // props.setIsMobileRegexValid(true);
      }
    } else if (id === "email") {
      if (!email.test(value)) {
        setErrorMessage("Please Enter Valid Email");
        setError(true);
        props.setIsEmailRegexValid(false);
      } else {
        props.setIsEmailRegexValid(true);
      }
    } else if (id === "password") {
      if (!password.test(value)) {
        setErrorMessage("Please Enter Valid password");
        setError(true);
      }
    } else if (id === "dlNo") {
      if (!dlNo.test(value)) {
        setErrorMessage("Please Enter Valid DL number ");
        setError(true);
        props.setIsDlNoValid(false);
      } else {
        props.setIsDlNoValid(true);
      }
    } else if (id === "gstNo") {
      if (!gstNumber.test(value)) {
        setErrorMessage("Please Enter Valid GST Number");
        setError(true);
        props.setIsGstNoRegexValid(false);
      } else {
        props.setIsGstNoRegexValid(true);
      }
    }
    else if (id === "invoiceNo") {
      if (!invoiceNo.test(value)) {
        setErrorMessage("Please Enter Valid Invoice Number");
        setError(true);
        props.setIsInvoiceNoRegexValid(false);
      } else {
        props.setIsInvoiceNoRegexValid(true);
      }
    }
  }

  function blurEvent() {
    if (!value && required) {
      setError(true);
      setErrorMessage(errorMessageFromProps);
    }
    if (value) {
      if (options && options.type) {
        regexCheck(options.type);
      } else {
        setError(false);
        setErrorMessage("");
      }
    }
  }

  return (
    <FormControl className="form-group" required={required}>
      <InputLabel shrink htmlFor="bootstrap-input" required={required}>
        {label}
      </InputLabel>
      <InputBase
        disabled={disabled}
        error={isError || error}
        required={required}
        autoFocus={autoFocus}
        type={type}
        id={id || value}
        multiline={multiline}
        rows={rows}
        defaultValue={defaultvalue}
        value={value}
        fullWidth={fullWidth}
        label={label}
        onChange={(e) => {
          TextChange(e);
          onChange && onChange(e);
        }}
        onKeyUp={(e) => {
          onKeyUp && onKeyUp(e);
        }}
        onBlur={() => {
          blurEvent();
        }}
        onKeyDown={(e) => {
          if (type && type === "decimal") {
            const value = e.key;
            const invalidChars = ["-", "+", "e", "E"];
            const isDotContain = (e.target.value.match(/[.]/g) || []).length;
            const isNotDecimal = /^[0-9]*(\.[0-9]*)?$/.test(value);

            if (
              e.keyCode !== 8 &&
              (invalidChars.includes(value) ||
                isNotDecimal === false ||
                (isDotContain === 1 && value === ".") ||
                isDotContain > 1)
            ) {
              e.preventDefault();
            }
          }
        }}
        onPaste={(e) => {
          if (type && type === "decimal") {
            const value = e.clipboardData.getData("Text");
            const invalidChars = ["-", "+", "e", "E"];
            const isNotDecimal = /^[0-9](\.[0-9]*)?$/.test(value);
            if (invalidChars.includes(value) || isNotDecimal === false) {
              e.preventDefault();
            }
          }
        }}
        placeholder={placeholder}
        className={
          ((isError && !isChanged) || error) && isInline
            ? classes.inputInline
            : classes.input
        }
        inputProps={{ maxLength }}
        onInput={(e) => {
          if (numeric) e.target.value = e.target.value.replace(/[^0-9]/g, "");
        }}
        title={value}
      />
      {(error || isError) && !isInline && (
        <FormHelperText id="component-error-text">
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default withStyles(BootstrapInput)(TextInput);
