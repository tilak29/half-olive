import React, { useEffect } from "react";

import * as log from "loglevel";
import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";

import colors from "../../Colors/colors";
// will use it if required
// import { FavoriteBorder, Favorite } from "@material-ui/icons";

/**
 * Checkbox control with mandatory props
 * @author Nirali Maradiya
 * @param id
 * @param {string} color [colorCode] - color of Checkbox
 * @param {boolean} isOptionAlignRow - option alignment
 * @param {string} labelPlacement - ["top" || "bottom" || "left" || "right"]
 * @param {array} options -[
              {
              label: "Option 1",
              value: "option1"
              }
          ]
 * @param defaultValue - default value to be checked in checkbox list
 * @callback onChange 
 */

const CheckBox = (props) => {
  const {
    color = colors.primaryColor,
    isOptionAlignRow = true,
    labelPlacement = "end",
    options,
    onChange,
    id,
  } = props;
  useEffect(() => {
    !options &&
      log.error(
        "Required prop 'options' of type array of objects to CheckBox control "
      );
  }, [options]);

  const handleChange = (name) => (event) => {};

  return (
    <div>
      {options && (
        <FormGroup row={isOptionAlignRow} id={id}>
          {options.map((op, index) => (
            <FormControlLabel
              key={index}
              labelPlacement={labelPlacement}
              control={
                <Checkbox
                  onChange={(e) => {
                    handleChange(e);
                    onChange && onChange(e);
                  }}
                  // icon={<FavoriteBorder />}
                  // checkedIcon={<Favorite />}
                  value={op.value}
                  defaultChecked={op.defaultChecked}
                  style={{ color: color }}
                />
              }
              label={op.label}
            />
          ))}
        </FormGroup>
      )}
    </div>
  );
};
export default CheckBox;
