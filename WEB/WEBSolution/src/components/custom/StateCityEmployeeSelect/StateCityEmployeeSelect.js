import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import Select from "../../core/Select";

/**
 * States, City & Employee selection dropdown
 * It uses data from the central storage
 * Calls API if the statesList is empty
 * Calls API if the cityList is empty
 * Calls API if the employeeList is empty
 * @author Tejal Sali
 * @param {object} setStateCityEmployeeSelectProperties properties to be used to manage value,label,errors
 */
export default function StateCityEmployeeSelect(props) {
  const [employeeList, setEmployeeList] = useState([]);
  const { stateList = [], cityList = [], isInline = false } = props;
  const { stateCityEmployeeSelectProperties = {} } = props;
  const {
    stateValue = "",
    cityValue = "",
    employeeValue = "",
    stateError = "",
    cityError = "",
    employeeError = "",
  } = stateCityEmployeeSelectProperties;

  const filteredCities = cityList.filter((city) => city.stateId === stateValue);

  useEffect(() => {
    if (stateList.length === 0) {
      props.getStates();
    }
    if (cityList.length === 0) {
      props.getCities();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cityValue !== "") {
      const params = {
        cityIds: [cityValue],
      };
      props.getEmployees({
        params,
        onSuccess: (response) => {
          const { employeeList } = response;
          setEmployeeList(employeeList);
        },
        onFailure: ({ message }) => {
          // displayErrorMessage(message);
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityValue]);


  if (stateList.length !== 0 && stateList[0].value === "All") {
    stateList.splice(0, 1);
  }
  if (filteredCities.length !== 0 && filteredCities[0].value === "All") {
    filteredCities.splice(0, 1);
  }

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

            props.setStateCityEmployeeSelectProperties({
              ...stateCityEmployeeSelectProperties,
              stateValue,
              stateName,
              stateError: false,
              cityValue: "",
              cityName: "",
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
          data={filteredCities}
          label={"City"}
          errorMessage={"City is Required"}
          required={true}
          value={cityValue}
          onChange={(e) => {
            const cityValue = e.target.value || "";
            const cityName =
              !cityValue || cityValue === ""
                ? ""
                : filteredCities.filter((city) => city.value === cityValue)[0]
                    .label;

            props.setStateCityEmployeeSelectProperties({
              ...stateCityEmployeeSelectProperties,
              cityValue,
              cityName,
              cityError: false,
            });
          }}
          error={cityError}
          isInline={isInline}
        />
      </Grid>
      <Grid item xs={12} md={4} lg>
        <Select
          data={employeeList}
          label={"Employee Name"}
          errorMessage={"Employee Name is Required"}
          required={true}
          value={employeeValue}
          onChange={(e) => {
            const employeeValue = e.target.value || "";
            const employeeName =
              !employeeValue || employeeValue === ""
                ? ""
                : employeeList.filter(
                    (employee) => employee.value === employeeValue
                  )[0].label;

            props.setStateCityEmployeeSelectProperties({
              ...stateCityEmployeeSelectProperties,
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
