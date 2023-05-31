import React from "react";
import TextField from "../../core/TextField";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { useEffect } from "react";

/**
 * @author Vishal Thakkar
 * @param {boolean} view
 */

function Occupancy(props) {
  const [flag, setFlag] = useState(false);
  const [rowData, setRowData] = useState([]);

  const { view, value, update = false } = props;

  function ChangeBox(value, roomid, occupancyid, dayId) {
    props.getData(value, roomid, occupancyid, dayId);
  }
  function ChangeBoxs(amount, roomid, occupancyid, dayId) {
    props.UpdateData(amount, roomid, occupancyid, dayId);
  }
  useEffect(() => {
    if (props.roomIndex == 0) {
      setFlag(!flag);
    }
  }, []);

  useEffect(() => {
    if (value != null && value != undefined) {
      setRowData(value);
    }
  }, [value]);
  
  return (
    <div style={{ display: "flex", marginBottom: "15px" }}>
      <Grid container className="scroll-main">
        {props.occupancy.map((item, occuupancyindex) => {
          let temp
          if(props.showDays)
          {
            temp = rowData.filter(
              (items) =>
                items.roomid == props.categoryindex &&
                items.occupancyid == item.value && items.DayId == props.daysIndex
                );
          }
          else
          {
              temp = rowData.filter(
              (items) =>
                items.roomid == props.categoryindex &&
                items.occupancyid == item.value 
                );
          }
          let amountVal =
            temp.length > 0 && temp[0].amount
              ? temp.length > 0 && temp[0].amount
              : "";
          return (
            <Grid item key={occuupancyindex}>
              <div className="occupancy" style={{ texAlign: "center" }}>
                {flag && item.label}
                {update == true ? (
                  <TextField
                    id={occuupancyindex}
                    value={amountVal}
                    numeric={true}
                    onChange={(e) => {
                      ChangeBoxs(
                        e.target.value,
                        props.categoryindex,
                        item.value,
                        props.daysIndex
                      );
                    }}
                  />
                ) : (
                  <></>
                )}
                {view == false ? (
                  <TextField
                    id={occuupancyindex}
                    value={rowData}
                    numeric={true}
                    onChange={(e) => {
                      ChangeBox(
                        e.target.value,
                        props.categoryindex,
                        item.value,
                        props.daysIndex
                      );
                    }}
                  />
                ) : (
                  <></>
                )}

                {view == true ? (
                  <h6>
                    {rowData.map((items) => {
                      if(props.showDays)
                      {
                        if (
                          items.roomid == props.categoryindex &&
                          items.occupancyid == item.value && items.DayId == props.daysIndex
                        ) {
                          return items.amount;
                        }
                      }
                      else
                      {
                        if (
                          items.roomid == props.categoryindex &&
                          items.occupancyid == item.value
                        ) {
                          return items.amount;
                        }
                      }
                    })}
                  </h6>
                ) : (
                  <></>
                )}
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
export default Occupancy;
