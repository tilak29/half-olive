import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import Select from "../../core/Select";

/**
 * States & Employee selection dropdown
 * It uses data from the central storage
 * Calls API if the statesList is empty
 * Calls API if the employeeList is empty
 * @author Tejal Sali
 * @param {object} setStateEmployeeSelectProperties properties to be used to manage value,label,errors
 */
export default function StateEmployeeSelect(props) {
  const { stateList = [], isInline = false } = props;
  const { stateEmployeeSelectProperties = {} } = props;
  const [employeeList, setEmployeeList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [divisionId, setdivisionId] = useState("");

  const {
    stateValue = "",
    employeeValue = "",
    stateError = "",
    employeeError = "",
  } = stateEmployeeSelectProperties;

  const filteredEmployees = employeeList.filter(
    (employee) => employee.stateId === stateValue && (divisionId == 'All' || (employee.divisionId).includes(divisionId))
  );

  useEffect(() => {
    
    getDivisions();
    if (stateList.length === 0) {
      props.getStates();
    }
    if (employeeList.length === 0) {
      getEmployees();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(divisionId !== 'All')
        getEmployees();
  }, [divisionId]);

  if (stateList.length !== 0 && stateList[0].value === "All") {
    stateList.splice(0, 1);
  }

  const getEmployees = () => {
    props.getEmployees({
      onSuccess: (response) => {
        const { employeeList } = response;
        setEmployeeList(employeeList);
      },
      onFailure: ({ message }) => {
        // displayErrorMessage(message);
      },
    });
  }

  const getDivisions = () => {
    props.getDivisions({
      onSuccess: (response) => {
        let allOptionObj = { label: "All", value: "All" };
        const { divisionList } = response;
        divisionList.splice(0, 0, allOptionObj);
        setDivisionList(divisionList);
        setdivisionId("All");
        setEmployeeList([]);
      },
      onFailure: ({ message }) => {
        //displayErrorMessage(message);
      },
    });
  };

  return (
    <React.Fragment>
      <Grid item xs={12} md={4} lg>
        <Select
          data={stateList}
          label={"State"}
          errorMessage={"State is Required"}
          required={true}
          value={stateValue}
          onChange={(e) => {
            const stateValue = e.target.value || "";
            const stateName =
              stateValue === ""
                ? ""
                : stateList.filter((state) => state.value === stateValue)[0]
                    .label;

            props.setStateEmployeeSelectProperties({
              ...stateEmployeeSelectProperties,
              stateValue,
              stateName,
              stateError: false,
              employeeValue: "",
              employeeName: "",
            });
          }}
          error={stateError}
          isInline={isInline}
        />
      </Grid>
      <Grid item xs={12} md={4} lg>
              <Select
                data={divisionList}
                value={divisionId}
                label={"Division"}
                onChange={(e) => {
                  setdivisionId(e.target.value);
                }}
                isInline={true}
              />
       </Grid>
      <Grid item xs={12} md={4} lg>
        <Select
          data={filteredEmployees}
          label={"Employee Name"}
          errorMessage={"Employee Name is Required"}
          required={true}
          value={employeeValue}
          onChange={(e) => {
            const employeeValue = e.target.value || "";
            const employeeName =
              !employeeValue || employeeValue === ""
                ? ""
                : filteredEmployees.filter(
                    (employee) => employee.value === employeeValue
                  )[0].label;

            props.setStateEmployeeSelectProperties({
              ...stateEmployeeSelectProperties,
              employeeValue,
              employeeName,
              employeeError: false,
            });
          }}
          error={employeeError}
          isInline={isInline}
        />
      </Grid>
    </React.Fragment>
  );
}
