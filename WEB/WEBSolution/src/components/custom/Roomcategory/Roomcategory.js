import React, { useEffect } from "react";
import Roomdays from "../Roomdays/RoomdaysContainer";
import { Grid } from "@material-ui/core";

/**
 * @author Vishal Thakkar
 */
function Roomcategory(props) {
  return (
    <div style={{ display: "flex" }}>
      <Grid>
        {props.name.map((data, categoryindex) => {
          return (
            <Grid
              item
              key={categoryindex}
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                maxWidth: "100%",
                flexBasis: "100%",
              }}
            >
              <div
                style={{
                  lineHeight: "1.5em",
                  height: "5em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "40%",
                  alignItems: "center",
                  justifyContent: "left",
                  display: "flex",
                  whiteSpace: "nowrap",
                }}
              >
                {data.categoryName || `${categoryindex}`}
              </div>

              <Roomdays
                {...props}
                days={props.days}
                occupancy={props.occupancy}
                categoryindex={data.roomCategoryId}
                filterIndex={props.filterIndex}
                roomIndex={categoryindex}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Roomcategory;
