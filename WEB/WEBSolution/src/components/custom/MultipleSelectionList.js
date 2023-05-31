import React, { useState } from "react";

import {
  Card,
  CardHeader,
  Checkbox,
  Divider,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@material-ui/core";

/**
 * Multiple Selection List as per the business requirement
 * @author Tejal Sali
 * @param id
 * @param {string} label
 * @param {array of object} items - Array of items to be rendered in list key-value pair
 * @param keyField Selection field of option
 * @param textField Display Name field of option
 * @param checked selected items will be stored here
 * @callback setChecked This will update the value in parent control
 * @param columns optional columns to be displayed for the options.It should be dividend of 12 e.g. 1, 2, 3, 4, 6
 * @param width optional
 */

function MultipleSelectionList({
  label = "",
  items = [],
  keyField = "value",
  textField = "label",
  checked = [],
  setChecked,
  columns = 1,
  style,
  width = "100%",
  error: isError = false,
  errorMessage: errorMessageFromProps = "This Field is Required",
  required = false,
  setError: setParentError = null,
}) {
  const [errorMessage, setErrorMessage] = useState(errorMessageFromProps);
  const [error, setError] = useState(isError);

  const handleToggleAll = (items) => () => {
    const selected = items.map((items) => items[keyField]);
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, selected));
      if (required) {
        setParentError && setParentError(false);
        setError(true);
        setErrorMessage(errorMessageFromProps);
      }
    } else {
      setChecked(union(checked, selected));
      if (required) {
        setParentError && setParentError(false);
        setError(false);
        setErrorMessage("");
      }
    }
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (required && newChecked.length === 0) {
      setParentError && setParentError(false);
      setError(true);
      setErrorMessage(errorMessageFromProps);
    } else {
      setParentError && setParentError(false);
      setError(false);
      setErrorMessage("");
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) =>
    intersection(
      checked,
      items.map((items) => items[keyField])
    ).length;

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  function union(a, b) {
    return [...a, ...not(b, a)];
  }

  return (
    <FormControl style={{ width }} required={required} className="form-group">
      <Card variant="outlined">
        <CardHeader
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}                     
              checked={
                numberOfChecked(items) === items.length && items.length !== 0
              }
              indeterminate={
                numberOfChecked(items) !== items.length &&
                numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{ "aria-label": "all items selected" }}
            />
          }
          title={
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              id="demo-customized-select-label"
              required={required}
              className="select-label"
            >
              {label}
            </InputLabel>
          }
          subheader={`${numberOfChecked(items)}/${items.length} selected`}
        />
        <Divider />
        <List dense component="div" role="list" disablePadding className="pt-2">
          {items.length === 0 ? (
            <div className="alert mt-3 bg-light alert-secondary mr-2 ml-2 text-center" >
              No data to display
            </div>
          ) : (
            <div className="row no-gutters" style={style}>
              {items.map((item) => {
                const id = item[keyField];
                const value = item[textField];
                const labelId = `list-item-${id}-label`;

                return (
                  <div className={`col-md-${12 / columns}`} key={id}>
                    <ListItem
                      key={id}
                      role="listitem"
                      button
                      onClick={handleToggle(id)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          checked={checked.indexOf(id) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={value}
                        style={{ whiteSpace: "break-spaces" }}
                      />
                    </ListItem>
                  </div>
                );
              })}
            </div>
          )}
          <ListItem />
        </List>
      </Card>
      {required && (error || isError) && (
        <FormHelperText id="component-error-text">
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default MultipleSelectionList;
