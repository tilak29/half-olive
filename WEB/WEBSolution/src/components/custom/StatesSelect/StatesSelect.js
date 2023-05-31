import React, { useEffect } from "react";

import Select from "../../core/Select";

/**
 * States selection dropdown
 * It uses data from the central storage
 * Calls API if the statesList is empty
 * @author Tejal Sali
 * @param {object} props rest properties to be passed to the core select component
 */
export default function StatesSelect(props) {
  const { stateList = [], isAll = false } = props;

useEffect(() => {
    if (stateList.length === 0) {
      props.getStates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

useEffect(() => {
    if (props.setSelectedStateName) {
      const stateName =
        props.value === ""
          ? ""
          : stateList.filter(state => state.value === props.value)[0].label;
      props.setSelectedStateName && props.setSelectedStateName(stateName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  if (!isAll && (stateList.length !== 0 && stateList[0].value === "All")) {
    stateList.splice(0, 1);
  }
  else if(isAll && stateList.length > 1)
  {
    let allOptionObj = { label: "All", value: "All" };
    if(stateList[0].value !== "All")
      stateList.splice(0, 0, allOptionObj);
  }

  return (
    <div>
      <Select
        data={stateList}
        label={"State"}
        errorMessage={"State is Required"}
        required={true}
        {...props}
      />
    </div>
  );
}
