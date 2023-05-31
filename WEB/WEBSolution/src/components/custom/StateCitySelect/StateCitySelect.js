import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import Select from "../../core/Select";

/**
 * States & City selection dropdown
 * It uses data from the central storage
 * Calls API if the statesList is empty
 * Calls API if the cityList is empty
 * @author Tejal Sali
 * @param {object} props rest properties to be passed to the core select component
 */
export default function StatesSelect(props) {
  const {
    stateList = [],
    cityList = [],
    xs = 12,
    md = 4,
    lg = true,
    isInline = false,
    isAll = false,
    isAllCity = false,
    // isContainerNeeded = true
  } = props;
  const { stateCitySelectProperties = {} } = props;
  const {
    stateValue = "",
    cityValue = "",
    stateError = "",
    cityError = ""
  } = stateCitySelectProperties;
  const [isChanged, setIsChanged] = useState(false);
  debugger;
  const filteredCities = stateValue === "All" ? cityList :cityList.filter(city => city.stateId === stateValue);

  if(isAll){
    let allOptionObj = { label: "All", value: "All" };
    if(stateList.length > 1){
      if(stateList[0].value !== "All")stateList.splice(0, 0, allOptionObj);
    }
    if(stateValue != "" && filteredCities.length > 1){
      if(filteredCities[0].value !== "All")filteredCities.splice(0, 0, allOptionObj);
    }
  }
  else if (isAllCity)
  {
    let allOptionObj = { label: "All", value: "All" };
    if(stateValue != "" && filteredCities.length > 1){
      if(filteredCities[0].value !== "All")filteredCities.splice(0, 0, allOptionObj);
    }
    if (stateList.length !== 0 && stateList[0].value === "All") {
      stateList.splice(0, 1);
    }
  }
  else{
    if (stateList.length !== 0 && stateList[0].value === "All") {
      stateList.splice(0, 1);
    }
    if (filteredCities.length !== 0 && filteredCities[0].value === "All") {
      filteredCities.splice(0, 1);
    }
  }

  useEffect(() => {
    if (stateList.length === 0) {
      props.getStates();
    }
    if (cityList.length === 0) {
      props.getCities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Grid item xs={xs} md={md} lg={lg}>
        <Select
          data={stateList}
          label={"State"}
          errorMessage={"State is Required"}
          required={true}
          value={stateValue}
          onChange={e => {
            const stateValue = e.target.value || "";
            const stateName =
              stateValue === ""
                ? ""
                : stateList.filter(state => state.value === stateValue)[0]
                    .label;
            setIsChanged(false);
            props.setStateCitySelectProperties({
              ...stateCitySelectProperties,
              stateValue,
              stateName,
              stateError: false,
              cityValue: "",
              cityName: "",
              isAreaChanged: false
            });
          }}
          error={stateError}
          isInline={isInline}
        />
      </Grid>
      <Grid item xs={xs} md={md} lg={lg}>
        <Select
          data={filteredCities}
          label={"City"}
          errorMessage={"City is Required"}
          required={true}
          value={cityValue}
          onChange={e => {
            setIsChanged(true);
            const cityValue = e.target.value || "";
            const cityName =
              !cityValue || cityValue === ""
                ? ""
                : filteredCities.filter(city => city.value === cityValue)[0]
                    .label;

            props.setStateCitySelectProperties({
              ...stateCitySelectProperties,
              cityValue,
              cityName,
              cityError: false,
              isAreaChanged: false
            });
          }}
          error={cityError}
          isInline={isInline}
          isChanged={isChanged}
        />
      </Grid>
    </React.Fragment>
  );
}
