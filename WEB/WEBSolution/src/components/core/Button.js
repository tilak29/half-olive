import React from "react";

import Button from "@material-ui/core/Button";

// import colors from "../../Colors/colors";
/**
 * Button control with mandatory props
 * @author Nirali Maradiya
 * @param id
 * @param {string} variant   ["contained" || "outlined"]
 * @param {string} size  [ "small" || "medium" || "large"]
 * @param {boolean} disabled
 * @param {string} textColor [colorCode(hax)]
 * @param {string} label
 * @param {string} textTransform  ["capitalize" || "uppercase" || "lowercase"]
 * @param {string} borderColor [colorCode(hax)]
 * @param {string} backgroundColor [colorCode(hax)]
 * @param {link} href
 * @callback onClick
 */

const ButtonControl = props => {
  const {
    id,
    variant = "contained",
    size = "medium",
    disabled = false,
    onClick,
    // textColor = colors.defaultWhite,
    // backgroundColor = "#ED3237",
    label = "Label ",
    textTransform = "capitalize",
    // borderColor,
    href,
    style={
      // color: textColor && textColor,
      // backgroundColor: backgroundColor && backgroundColor,
      // borderColor: borderColor && borderColor,
      textTransform: textTransform // "capitalize" || "uppercase" || "lowercase"
    },
    customClass = "button"
  } = props;

  return (
    <div>
      <Button
        id={id}
        variant={variant} //"contained" || "outlined"
        size={size} // "small" // "medium" // "large"
        // style={{
        //   // color: textColor && textColor,
        //   // backgroundColor: backgroundColor && backgroundColor,
        //   // borderColor: borderColor && borderColor,
        //   textTransform: textTransform // "capitalize" || "uppercase" || "lowercase"
        // }}
        style={style}
        disabled={disabled}
        onClick={e => onClick && onClick(e)}
        href={href && href}
        // classes={{root:"btn-"}}
        className={customClass}
      >
        {label}
      </Button>
    </div>
  );
};
export default ButtonControl;
