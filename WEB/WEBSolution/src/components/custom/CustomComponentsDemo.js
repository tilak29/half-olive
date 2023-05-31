import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import MultipleSelectionList from "./MultipleSelectionList";
import MultipleCheckboxSelect from "./MultipleCheckboxSelect";
import StateEmployeeSelect from "./StateEmployeeSelect/StateEmployeeSelectContainer";
import StateCitySelect from "./StateCitySelect/StateCitySelectContainer";
import StateCityEmployeeSelect from "./StateCityEmployeeSelect/StateCityEmployeeSelectContainer";
import { labels } from "../../Config.json";

import Button from "../core/Button";

const statesJson = [
  {
    id: 1,
    state: "Gujarat"
  },
  {
    id: 2,
    state: "Maharashtra"
  },
  {
    id: 3,
    state: "Goa"
  },
  {
    id: 4,
    state: "MP"
  },
  {
    id: 5,
    state: "UP"
  },
  {
    id: 6,
    state: "Delhi"
  },
  {
    id: 7,
    state: "Punjab"
  },
  {
    id: 8,
    state: "kerala"
  },
  {
    id: 9,
    state: "Kashmir"
  },
  {
    id: 10,
    state: "Hariyana"
  },
  {
    id: 11,
    state: "Telangana"
  },
  {
    id: 12,
    state: "Bihar"
  },
  {
    id: 13,
    state: "Sikkim"
  }
];

const Designations = [
  {
    desId: 1,
    Name: "SL"
  },
  {
    desId: 2,
    Name: "ASL"
  },
  {
    desId: 3,
    Name: "SSL"
  },
  {
    desId: 4,
    Name: "ZSL"
  },
  {
    desId: 5,
    Name: "Admin"
  },
  {
    desId: 6,
    Name: "Manager"
  },
  {
    desId: 7,
    Name: "Executive"
  }
];

/**
 * Demo form to render all custom controls for testing
 * @author Tejal Sali
 */
export default function CustomComponentsDemo() {
  const [controlType, setControlType] = useState("MultipleSelectionList");
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedDes, setSelectedDes] = useState([1, 5]);
  const [stateCitySelectProperties, setStateCitySelectProperties] = useState(
    {}
  );
  const [
    stateEmployeeSelectProperties,
    setStateEmployeeSelectProperties
  ] = useState({});
  const [
    stateCityEmployeeSelectProperties,
    setStateCityEmployeeSelectProperties
  ] = useState({});
  const { stateValue = "", employeeValue = "" } = stateEmployeeSelectProperties;
  const {
    stateValue: stateValue1 = "",
    cityValue = ""
  } = stateEmployeeSelectProperties;
  const {
    stateValue: stateValue2 = "",
    cityValue: cityValue1 = "",
    employeeValue: employeeValue1 = ""
  } = stateCityEmployeeSelectProperties;

  const buttons = [
    {
      label: "MultipleSelectionList",
      onClick: () => {
        setControlType("MultipleSelectionList");
      }
    },
    {
      label: "MultipleCheckboxSelect",
      onClick: () => {
        setControlType("MultipleCheckboxSelect");
      }
    },
    {
      label: "State City Select",
      onClick: () => {
        setControlType("StateCitySelect");
      }
    },
    {
      label: "State Employee Select",
      onClick: () => {
        setControlType("StateEmployeeSelect");
      }
    },
    {
      label: "State City Employee Select",
      onClick: () => {
        setControlType("stateCityEmployeeSelectProperties");
      }
    }
  ];

  return (
    <div>
      <div style={{ margin: 15 }}>
        {buttons.map((btn, index) => (
          <button onClick={btn.onClick} key={index}>
            {btn.label}
          </button>
        ))}
      </div>
      {controlType === "MultipleSelectionList" && (
        <div>
          <MultipleSelectionList
            items={statesJson}
            title={"States"}
            columns={4}
            keyField={"id"}
            textField={"state"}
            width={"70%"}
            checked={selectedStates}
            setChecked={setSelectedStates}
          />
          {JSON.stringify(selectedStates)}
          <br />
          <MultipleSelectionList
            items={Designations}
            title={"Designations"}
            columns={3}
            keyField={"desId"}
            textField={"Name"}
            width={"50%"}
            checked={selectedDes}
            setChecked={setSelectedDes}
          />
          {JSON.stringify(selectedDes)}
        </div>
      )}
      {controlType === "MultipleCheckboxSelect" && (
        <div>
          <MultipleCheckboxSelect
            items={Designations}
            title={"Designations"}
            keyField={"desId"}
            textField={"Name"}
            checked={selectedDes}
            setChecked={setSelectedDes}
            width={"15%"}
          />
          {JSON.stringify(selectedDes)}
        </div>
      )}
      {controlType === "StateCitySelect" && (
        <div>
          <div className="card selection-card mb-3">
            <Grid container spacing={3}>
              <StateCitySelect
                stateCitySelectProperties={stateCitySelectProperties}
                setStateCitySelectProperties={setStateCitySelectProperties}
                isInline={true}
              />
              <Grid item xs={12} md={4} lg>
                <div className="selection-card-actions">
                  <Button
                    label={labels.filterButton}
                    onClick={() => {
                      if (stateValue !== "" && cityValue !== "") {
                        alert("Success");
                      } else {
                        setStateCitySelectProperties({
                          ...stateCitySelectProperties,
                          stateError: stateValue === "" ? true : false,
                          cityError: cityValue === "" ? true : false
                        });
                      }
                    }}
                    customClass="button button-primary mr-2"
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          {JSON.stringify(stateCitySelectProperties)}
        </div>
      )}
      {controlType === "StateEmployeeSelect" && (
        <div>
          <div className="card selection-card mb-3">
            <Grid container spacing={3}>
              <StateEmployeeSelect
                stateEmployeeSelectProperties={stateEmployeeSelectProperties}
                setStateEmployeeSelectProperties={
                  setStateEmployeeSelectProperties
                }
                isInline={true}
              />
              <Grid item xs={12} md={4} lg>
                <div className="selection-card-actions">
                  <Button
                    label={labels.filterButton}
                    onClick={() => {
                      if (stateValue1 !== "" && employeeValue !== "") {
                        alert("Success");
                      } else {
                        setStateEmployeeSelectProperties({
                          ...stateEmployeeSelectProperties,
                          stateError: stateValue1 === "" ? true : false,
                          employeeError: employeeValue === "" ? true : false
                        });
                      }
                    }}
                    customClass="button button-primary mr-2"
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          {JSON.stringify(stateEmployeeSelectProperties)}
        </div>
      )}
      {controlType === "stateCityEmployeeSelectProperties" && (
        <div>
          <div className="card selection-card mb-3">
            <Grid container spacing={3}>
              <StateCityEmployeeSelect
                stateCityEmployeeSelectProperties={
                  stateCityEmployeeSelectProperties
                }
                setStateCityEmployeeSelectProperties={
                  setStateCityEmployeeSelectProperties
                }
                isInline={true}
              />

              <Grid item xs={12} md={4} lg>
                <div className="selection-card-actions">
                  <Button
                    label={labels.filterButton}
                    onClick={() => {
                      if (
                        stateValue2 !== "" &&
                        cityValue1 !== "" &&
                        employeeValue1 !== ""
                      ) {
                        alert("Success");
                      } else {
                        setStateCityEmployeeSelectProperties({
                          ...stateCityEmployeeSelectProperties,
                          stateError: stateValue2 === "" ? true : false,
                          cityError: cityValue1 === "" ? true : false,
                          employeeError: employeeValue1 === "" ? true : false
                        });
                      }
                    }}
                    customClass="button button-primary mr-2"
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          {JSON.stringify(stateCityEmployeeSelectProperties)}
        </div>
      )}
    </div>
  );
}
