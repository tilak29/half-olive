import React, { useState } from "react";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import config from "../../Config.json";

/**
 * date & time picker control with mandatory props
 * @author Nirali Maradiya
 * @param id
 * @param {string} lable
 * @param {string} variant - ["static" || "dialog" ||"inline"]
 * @param {date object} value
 * @param {string datetimeformat} format - dateTime format
 * @param {string} margin -  ["none" < "dense" <"normal"]
 * @param {date object} minDate -  Min selectable date
 * @param {string} minDateMessage - Error message, shown if date is less then minimal date
 * @param {date object} maxDate - max selectable date
 * @param {string} maxDateMessage - Error message, shown if date is more then maximal date
 * @param {boolean} disableFuture - disable future date || NOTE: having high priority than minDate or maxDate
 * @param {boolean} disablePast -  disable past date || NOTE: having high priority than minDate or maxDate
 * @callback onChange
 */

function DateTimePickerDemo(props) {
  const {
    id,
    label,
    variant = "inline",
    value: valueFromProps,
    margin = "none",
    minDate,
    minDateMessage,
    maxDate,
    maxDateMessage,
    onChange,
    format = config.appConfig.dateTimeFormatForPicker,
    disableFuture = false,
    disablePast = false
  } = props;

  const [selectedDate, setSelectedDate] = useState(
    valueFromProps || new Date()
  );
  const handleDateTimeChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className="form-group datepicker-input">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          id={id}
          variant={variant} //["static" || "dialog" ||"inline"]
          ampm={true}
          label={label}
          value={selectedDate}
          onChange={date => {
            handleDateTimeChange(date);
            onChange && onChange(date);
          }}
          minDate={minDate}
          minDateMessage={minDateMessage}
          maxDate={maxDate}
          maxDateMessage={maxDateMessage}
          format={format}
          margin={margin}
          autoOk={true}
          disableFuture={disableFuture}
          disablePast={disablePast}
          placeholder={"DD-MMM-YYYY HH:MM:SS"}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default DateTimePickerDemo;
