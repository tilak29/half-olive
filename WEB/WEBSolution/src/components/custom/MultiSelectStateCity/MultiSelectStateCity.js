import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Select from "../../core/Select";
import MultipleCheckboxSelect from "../../custom/MultipleCheckboxSelect";

/**
 * Multiple Select States with All option & Single select City dropdown as per the business requirement
 * It uses data from the central storage
 * Calls API if the statesList is empty
 * Calls API if the cityList is empty
 * @author Brinda Patel
 * @param {object} props rest properties to be passed to the core select component for city & custom MultipleCheckboxSelect component for state dropdown.
 */

export default function MultiSelectStateCity(props) {
  const {
    stateList = [],
    cityList = [],
    xs = 12,
    md = 4,
    lg = true,
    isInline = false,
    isAllCity = false,
  } = props;
  const { multiStateCitySelectProperties = {} } = props;
  const {
    stateValue = [],
    allStates = false,
    cityValue = "",
    stateError = "",
    cityError = "",
  } = multiStateCitySelectProperties;
  const [isChanged, setIsChanged] = useState(false);

  const filteredCities = allStates
    ? cityList
    : cityList.filter((city) => stateValue.includes(city.stateId));

  if (isAllCity) {
    let allOptionObj = { label: "All", value: "All" };
    if (stateList.length !== 0 && filteredCities.length > 1) {
      if (filteredCities[0].value !== "All")
        filteredCities.splice(0, 0, allOptionObj);
    }
    if (stateList.length !== 0 && stateList[0].value === "All") {
      stateList.splice(0, 1);
    }
  } else {
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
        <MultipleCheckboxSelect
          items={stateList}
          label={"State"}
          keyField={"value"}
          textField={"label"}
          checked={stateValue}
          setChecked={(stateIdList) => {
            const stateValue = stateIdList;
            const stateNames =
              stateValue.length === 0
                ? []
                : stateList
                    .filter((state) => stateValue.includes(state.value))
                    .map((item) => item.label);

            if (stateList.length === stateIdList.length)
              props.setMultiStateCitySelectProperties({
                ...multiStateCitySelectProperties,
                stateValue,
                stateNames,
                allStates: true,
                stateError: false,
                cityValue: "",
                cityName: "",
              });
            else {
              props.setMultiStateCitySelectProperties({
                ...multiStateCitySelectProperties,
                stateValue,
                stateNames,
                allStates: false,
                stateError: false,
                cityValue: "",
                cityName: "",
              });
            }
          }}
          error={stateError}
          required={true}
          errorMessage={"State is Required."}
        />
      </Grid>
      <Grid item xs={xs} md={md} lg={lg}>
        <Select
          data={filteredCities}
          label={"City"}
          errorMessage={"City is Required"}
          required={true}
          value={cityValue}
          onChange={(e) => {
            setIsChanged(true);
            const cityValue = e.target.value || "";
            const cityName =
              !cityValue || cityValue === ""
                ? ""
                : filteredCities.filter((city) => city.value === cityValue)[0]
                    .label;

            props.setMultiStateCitySelectProperties({
              ...multiStateCitySelectProperties,
              cityValue,
              cityName,
              cityError: false,
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
