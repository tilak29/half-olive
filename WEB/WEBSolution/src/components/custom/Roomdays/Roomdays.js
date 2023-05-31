import React from "react";
import { Grid } from "@material-ui/core";
import Occupancy from "../Occupancy/OccupancyContainer";
import { useState } from "react";

/**
 *  @author Vishal Thakkar
 */

export default function Roomdays(props) {
  const [flag, setFlag] = useState(true);
  const [showDays, setShowDays] = useState(false);
  useState(() => {
    if (props.roomIndex == 0) {
      setShowDays(!showDays);
    }
    setFlag(props.showDays);
  }, []);

  return (
    <>
      <Grid container className="roomratescroll">
        {props.days
          .filter((filterData, filterIndex) => filterIndex < props.filterIndex)
          .map((item, daysindex) => {
            return (
              <div
                style={{
                  borderLeft: `${
                    daysindex == 0
                      ? "0px solid lightgrey"
                      : "1px solid lightgrey"
                  }`,
                  padding: "10px",
                }}
              >
                <div
                  className="days"
                  key={daysindex}
                  style={{ marginRight: "15px" }}
                >
                  <div style={{ marginBottom: "15px" }}>
                    {flag && showDays && `${item.value} Days`}
                  </div>
                  <Occupancy
                    {...props}
                    occupancy={props.occupancy}
                    daysIndex={item.value}
                  />
                </div>
              </div>
            );
          })}
      </Grid>
    </>
  );
}
