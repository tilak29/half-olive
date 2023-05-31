import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import Select from "../../core/Select";

/**
 * States, City, Division & Employee selection dropdown
 * It uses data from the central storage
 * Calls API if the statesList is empty
 * Calls API if the cityList is empty
 * DivisionList is to be passed as props.
 * Calls API if the employeeList is empty
 * This component is copied from StateCityEmployeeSelect component and added division to it.
 * @author Imran Patwa
 * @param {object} setStateCityDivisionEmployeeSelectProperties properties to be used to manage value,label,errors
 */
export default function StateCityDivisionEmployeeSelect(props) {
  const [employeeList, setEmployeeList] = useState([]);    
  const { stateList = [], cityList = [], divisionList = [],  isInline = false } = props; 
  const { stateCityDivisionEmployeeSelectProperties = {} } = props;
  const {
    stateValue = "",
    cityValue = "",   
    employeeValue = "",     
    stateError = "",
    cityError = "",   
    employeeError = "",
    divisionValue = "",
    divisionError = "",
    employeeName = ""   
  } = stateCityDivisionEmployeeSelectProperties;

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

 
  // useEffect(() => {
  //   console.log("get employee");
  //   if (cityValue !== "" && divisionValue !== "") {
  //     const params = {
  //       cityIds: [cityValue],
  //       divisionIds: [divisionValue],
  //     };
  //     console.log(params);
      
  //     props.getEmployees({
  //       params,
  //       onSuccess: (response) => {
  //         console.log(response);
  //         const { employeeList } = response;
  //         setEmployeeList(employeeList);
  //       },
  //       onFailure: ({ message }) => {
  //         // displayErrorMessage(message);
  //       },
  //     });
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[divisionValue], [cityValue]);

  const getEmployeesData = (divid) => {    
  if (cityValue !== "" && divid !== "") {
    const params = {
      cityIds: [cityValue],
      divisionIds: [divid],
    };
    props.getEmployees({
      params,
      onSuccess: (response) => {
        const { employeeList  } = response;
        setEmployeeList(employeeList);
      },
      onFailure: ({ message }) => {
         //displayErrorMessage(message);
      },
    });
    props.setStateCityDivisionEmployeeSelectProperties({
      ...stateCityDivisionEmployeeSelectProperties,
      divisionValue:divid,           
      divisionError: false,              
    });
  }
};

  if (stateList.length !== 0 && stateList[0].value === "All") {
    stateList.splice(0, 1);
  }
  if (filteredCities.length !== 0 && filteredCities[0].value === "All") {
    filteredCities.splice(0, 1);
  }

  return (
    <React.Fragment>
      <Grid item xs={12} md={4} lg={3}>
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
                // setEmployeeList([]);                    
            props.setStateCityDivisionEmployeeSelectProperties({
              ...stateCityDivisionEmployeeSelectProperties,
              stateValue,
              stateName,
              stateError: false,
              cityValue: "",
              cityName: "",
              employeeValue: "",
              employeeName: "",               
              divisionValue:"",
            });
          }}
          error={stateError}
          isInline={isInline}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
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
                    // setEmployeeList([]);
            props.setStateCityDivisionEmployeeSelectProperties({
              ...stateCityDivisionEmployeeSelectProperties,
              cityValue,
              cityName,
              cityError: false,              
              divisionValue:"",
            });
          }}
          error={cityError}
          isInline={isInline}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Select
          data={divisionList}
          label={"Divison"}
          errorMessage={"Division is Required"}
          required={true}
          value={divisionValue}
          onChange={(e) => {
            const divisionValue = e.target.value || "";
            const divisionName =
              !divisionValue || divisionValue === ""
                ? ""
                : divisionList.filter((division) => division.value === divisionValue)[0]
                    .label;                    
             getEmployeesData(e.target.value);           
          }}
          error={divisionError}
          isInline={isInline}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
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

            props.setStateCityDivisionEmployeeSelectProperties({
              ...stateCityDivisionEmployeeSelectProperties,
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
