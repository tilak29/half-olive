import React, { useState } from "react";

import { Button } from "@material-ui/core";

import TextField from "./TextField";
import CheckBox from "./CheckBox";
import DatePicker from "./DatePicker";
import DateTimePicker from "./DateTimePicker";
import RadioGroup from "./RadioGroup";
import DialogControl from "./Dialog";
import Switch from "./Switch";
import Select from "./Select";
import ButtonControl from "./Button";
import DisplayMessage from "./DisplayMessage";
import SingleCheckBox from "./SingleCheckBox";
//import FileUpload from "./FileUpload";

/**
 * Demo form to render all core controls for testing
 * @author Nirali Maradiya,Khushbu Shah
 */
const Form = () => {
  const [controlType, setControlType] = useState("");
  const [isDialogeOpen, setIsDialogeOpen] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});

  const buttons = [
    {
      label: "Textfield",
      onClick: () => {
        onClick("textfield");
      }
    },
    {
      label: "Radiogroup",
      onClick: () => {
        onClick("radiogroup");
      }
    },
    {
      label: "Checkbox",
      onClick: () => {
        onClick("checkbox");
      }
    },
    {
      label: "Datepicker",
      onClick: () => {
        onClick("datepicker");
      }
    },
    {
      label: "Datetimepicker",
      onClick: () => {
        onClick("datetimepicker");
      }
    },
    {
      label: "Dialog",
      onClick: () => {
        onClick("dialog");
      }
    },
    {
      label: "Switch",
      onClick: () => {
        onClick("switch");
      }
    },
    {
      label: "Select",
      onClick: () => {
        onClick("select");
      }
    },
    {
      label: "Button",
      onClick: () => {
        onClick("button");
      }
    },
    {
      label: "File upload",
      onClick: () => {
        onClick("");
      }
    },
    {
      label: "Display Message",
      onClick: () => {
        onClick("displayMessage");
      }
    },
    {
      label: "Single Checkbox",
      onClick: () => {
        onClick("singlecheckbox");
      }
    }
  ];
  const onTextChange = e => {
    // alert("call from root " + e.target.value);
  };
  const onDateChange = date => {
    alert(date);
  };
  const onRadioChange = event => {
    alert("From parent: " + event.target.value);
  };
  const onClick = val => {
    setControlType(val);
  };
  const onSwitchToggle = e => {
    alert(e.target.checked);
  };
  const selectChange = e => {
    alert(e.target.value);
  };

  // Options has been given as props to the radio button and checkBox control
  const options = [
    {
      label: "Male",
      value: "male",
      disabled: true
    },
    {
      label: "Female",
      value: "female"
    },
    {
      label: "Other",
      value: "other",
      disabled: false
    }
  ];

  // data has been given to Select control
  const data = [
    {
      label: "Option 1",
      value: "option1"
    },
    {
      label: "Option 2",
      value: "option2"
    },
    {
      label: "Option 3",
      value: "option3"
    },
    {
      label: "Option 4",
      value: "option4"
    }
  ];
  return (
    <div style={{ width: "100%" }}>
      <div style={{ margin: 15 }}>
        {buttons.map((btn, index) => (
          <button onClick={btn.onClick} key={index}>
            {btn.label}
          </button>
        ))}
      </div>
      <div style={{ margin: 15 }}>
        {controlType === "textfield" && (
          <div>
            <TextField
              required={true}
              numeric={false}
              autoFocusFromProps={true}
              onChange={onTextChange}
              placeholder={"Enter your name"}
              // error={true}
            />
          </div>
        )}

        {controlType === "datepicker" && (
          <div>
            <DatePicker
              variant="inline"
              margin="none"
              label="Label from props"
              defaultValue={
                "Thu Jan 16 2020 15:32:00 GMT+0530 (India Standard Time)"
              }
              minDate={
                "Wed Jan 08 2020 15:32:00 GMT+0530 (India Standard Time)"
              }
              maxDate={
                "Fri Jan 24 2020 15:32:00 GMT+0530 (India Standard Time)"
              }
              onChange={onDateChange}
            />
          </div>
        )}
        {controlType === "radiogroup" && (
          <div>
            <RadioGroup
              options={options}
              isOptionAlignRow={true}
              label={"label from prop"}
              labelPlacement={"end"}
              // color={"green"}
              errorMessage={"Error Message "}
              defaultValue={options[0].value}
              onChange={onRadioChange}
            />
          </div>
        )}
        {controlType === "checkbox" && (
          <CheckBox
            options={options}
            // color="green"
            isOptionAlignRow={true}
            labelPlacement="end"
            onChecked={e => {
              // alert(e.target.value);
            }}
            defaultValue={options[1].value}
          />
        )}
        {controlType === "datetimepicker" && (
          <DateTimePicker
            lable="label from prop"
            variant="inline"
            maxDate="Fri Jan 31 2020 15:32:00 GMT+0530 (India Standard Time)"
            onChange={onDateChange}
          />
        )}
        {controlType === "dialog" && (
          <div>
            <Button
              onClick={() => {
                setIsDialogeOpen(true);
              }}
              style={{ color: "cadetblue", backgroundColor: "lightgray" }}
            >
              Open
            </Button>
            {isDialogeOpen && (
              <DialogControl
                open={true}
                onCancel={() => setIsDialogeOpen(false)}
              />
            )}
          </div>
        )}
        {controlType === "switch" && (
          <div>
            <Switch
              onChange={onSwitchToggle}
              label={"Label from prop"}
              labelPlacement={"start"}
            />
            <Switch
              onChange={onSwitchToggle}
              label={"Label 2 from prop"}
              labelPlacement={"start"}
            />
          </div>
        )}
        {controlType === "select" && (
          <Select
            data={data}
            value={data[0].value}
            label={"Label from props"}
            onChange={selectChange}
          />
        )}
        {controlType === "button" && (
          <ButtonControl
            disabled={false}
            label="Label from prop"
            onClick={() => alert("call from parent")}
          />
        )}
        {controlType === "displayMessage" && (
          <div>
            <ButtonControl
              label="Error Message"
              onClick={() => {
                setDisplayMessage({
                  open: true,
                  displayMessage: "Error Display Message",
                  severity: "error"
                });
              }}
            />
            <ButtonControl
              label="Warning Message"
              onClick={() => {
                setDisplayMessage({
                  open: true,
                  displayMessage: "Warning Display Message",
                  severity: "warning"
                });
              }}
            />
            <ButtonControl
              label="Success Message"
              onClick={() => {
                setDisplayMessage({
                  open: true,
                  displayMessage: "Success Display Message",
                  severity: "success"
                });
              }}
            />
            <ButtonControl
              label="Info Message"
              onClick={() => {
                setDisplayMessage({
                  open: true,
                  displayMessage: "Info Display Message",
                  severity: "info"
                });
              }}
            />

            <DisplayMessage
              {...displayMessage}
              onClose={() => setDisplayMessage({ open: false })}
            />
          </div>
        )}
        {controlType === "singlecheckbox" && (
          <div>
            <SingleCheckBox label={""} required={true} />
            <SingleCheckBox
              label={"Reuired Checkbox2"}
              checked={true}
              required={true}
            />
            <SingleCheckBox label={"Disabled Checkbox"} disabled={true} />
          </div>
        )}

        {/* {controlType === "" && 
        <FileUpload />
        } */}
      </div>
    </div>
  );
};
export default Form;
