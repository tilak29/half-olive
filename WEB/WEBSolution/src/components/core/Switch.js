import React, { useState } from "react";

import { FormControlLabel, Switch } from "@material-ui/core";
import colors from "../../Colors/colors";

/**
 * switch control with mandatory props
 * @author Nirali Maradiya
 * @param id
 * @param {boolean} value
 * @param {string} color
 * @param {boolean} disabled
 * @param {string} size - [ "medium" || "small" ]
 * @param {string} labelPlacement - ["top" || "bottom" || "left" || "right"]
 * @param {string} label
 * @callback onChange
 */

const SwitchControl = props => {
  const {
    value: valFromProp = false,
    color = colors.primaryColor,
    disabled = false,
    onChange,
    size = "medium",
    labelPlacement = "end",
    label,
    id
  } = props;
  const [value, setvalue] = useState(valFromProp);
  return (
    <FormControlLabel
      id={id}
      control={
        <Switch
          value={value}
          color={"primary"} // "primary" || "secondary"
          style={{ color: color && color }}
          disabled={disabled}
          onChange={e => {
            setvalue(!value);
            onChange && onChange(e);
          }}
          size={size} // "medium" || "small"
        />
      }
      label={label}
      labelPlacement={labelPlacement}
    />
  );
};
export default SwitchControl;
