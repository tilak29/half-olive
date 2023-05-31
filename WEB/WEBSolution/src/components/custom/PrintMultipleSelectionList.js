import React, { useState } from "react";

import {
  Card,
  Checkbox,
  ListItemIcon,
  ListItemText,
  ListItem,
  FormControl
} from "@material-ui/core";

/**
 * Multiple Selection List as per the business requirement
 * @author Tejal Sali
 * @param id
 * @param {array of object} items - Array of items to be rendered in list key-value pair
 * @param keyField Selection field of option
 * @param textField Display Name field of option
 * @param checked selected items will be stored here
 * @param width optional
 */

function PrintMultipleSelectionList({
  items = [],
  keyField = "value",
  textField = "label",
  checked = [],
  width = "100%",
  required = false,
}) {


  return (
    <FormControl style={{ width }} required={required} className="form-group">
      <Card variant="outlined">
          {items.length === 0 ? (
            <div className="alert mt-3 bg-light alert-secondary mr-2 ml-2 text-center">
              No data to display
            </div>
          ) : (
            <div>
              {items.map((item) => {
                const id = item[keyField];
                const value = item[textField];
                const labelId = `list-item-${id}-label`;

                return (
                  <div style={{width: "30%", marginRight:"30px",display:"inline-block"}} key={id}>
                    <ListItem
                      key={id}
                      role="listitem"
                      button
                    //   onClick={handleToggle(id)}
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
      </Card>
    </FormControl>
  );
}

export default PrintMultipleSelectionList;
