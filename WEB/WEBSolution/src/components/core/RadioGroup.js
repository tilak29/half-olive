import React, { useEffect } from "react";

import * as log from "loglevel";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  FormControlLabel
} from "@material-ui/core";

import colors from "../../Colors/colors";

/**
 * radio group control with mandatory props
 * @author Nirali Maradiya,,Khushbu Shah
 * @param id
 * @param {boolean} isOptionAlignRow - optional alignment in row or not
 * @param {string} label
 * @param {string} labelPlacement - ["end" || "start" || "top" || "bottom" ]
 * @param {string} color - color of RadioGroup
 * @param {string} errorMessage 
 * @param {string} value
 * @param {string} type "IsActive"
 * @param {array of object} options -  [
                {
                    label: "Male",
                    value: "male",
                    disabled: true (optional)
                }
            ]
 * @callback onChange
 */

const RadioGrp = props => {
  const {
    id,
    isOptionAlignRow = false,
    label,
    labelPlacement = "end",
    color = colors.primaryColor,
    errorMessage,
    onChange,
    options: optionsFromProps = [],
    value,
    type,
    required = false
  } = props;

  useEffect(() => {
    !optionsFromProps &&
      log.error(
        "Required prop 'options' of type array of objects to RadioGroup control "
      );
  }, [optionsFromProps]);

  const IsActiveOptions = [
    {
      label: "Yes",
      value: "1"
    },
    {
      label: "No",
      value: "0"
    }
  ];

  const options =
    type && type === "IsActive" ? IsActiveOptions : optionsFromProps;

  return (
    <FormControl
      component="fieldset"
      style={{ width: "100%" }}
      id={id}
      required={required}
    >
      <FormLabel component="legend">{label}</FormLabel>
      {options && (
        <RadioGroup
          name={label}
          value={value}
          onChange={e => {
            onChange && onChange(e);
          }}
          row={isOptionAlignRow}
        >
          {options.map((op, index) => (
            <FormControlLabel
              key={index}
              value={op.value}
              control={<Radio style={{ color: color }} />}
              label={op.label}
              labelPlacement={labelPlacement} // "end" || "start" || "top" || "bottom"
              disabled={op.disabled ? op.disabled : false}
            />
          ))}
        </RadioGroup>
      )}
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};
export default RadioGrp;
