import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import Button from "../../../components/core/Button";
import {
  GridIcons,
  options,
  style
} from "../../../components/custom/GridConfig";



/**
 * Add, update operations for Guest
 * @author Imran Patwa
 */

export default function RoomTariffList(props) {

  const roomBookingCategory = [
    {
      livingSpace: "Deluxe Suite",
      singleOccupancy: "INR 12,000",
      doubleOccupancy: "INR 18,000"
    },
    {
      livingSpace: "Super Deluxe Suite",
      singleOccupancy: "INR 14,000",
      doubleOccupancy: "INR 22,000"
    },
    {
      livingSpace: "Premium Suite",
      singleOccupancy: "INR 20,000",
      doubleOccupancy: "INR 34,000"
    }
  ];

  const columns = [
    {
      title: "LIVING SPACE",
      field: "livingSpace",
      cellStyle: {
        whiteSpace: "nowrap",
        textAlign: "center",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    {
      title: "SINGLE OCCUPANCY",
      field: "singleOccupancy",
      cellStyle: {
        whiteSpace: "nowrap",
        textAlign: "center",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    {
      title: "DOUBLE OCCUPANCY",
      field: "doubleOccupancy",
      cellStyle: {
        whiteSpace: "nowrap",
        textAlign: "center",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    }
  ];

  const addButtonClick = () => {
  };

  return (
    <div className="holiday-wrapper">

      <div className="card selection-card selection-card-two-columns mb-3">
        <Grid container spacing={3}>

          <Grid item xs={12} md={4} lg={3}>
            <div className="selection-card-actions">
              {/* <Button
                  label={labels.filterButton}
                  onClick={(e) => {
                     if (selectedState !== "") {
                      setShowGrid(true);
                      getGuestList(e);
                     } else {
                       setError(true);
                     }
                  }}
                  customClass="button button-primary mr-2"
                /> */}

              <Button
                onClick={() => {
                  addButtonClick();
                }}
                customClass="button button-black add-employee-button"
                label={"Manage Tariff"}
              >
                Manage
              </Button>

            </div>
          </Grid>
        </Grid>
      </div>


      <div className="card">
        <div className="table-wrapper table-size-xs">
          {/* {!editRecord && ( */}
          <MaterialTable
            icons={GridIcons}
            title={`Packages & Tariff`}
            columns={columns}
            data={roomBookingCategory}
            options={{
              ...options,
              paging: false,
              search: false,
              sorting: false,
              headerStyle: {
                backgroundColor: "#F5F5F5",
                color: "#22222",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                textAlign: "center",
                height: "50px",
                border: "4px solid #659F1C",
                fontSize: "12pt"
              }
            }}
            style={style}

          />
          {/* )} */}
        </div>
      </div>
      <div style={{ "textAlign": "center", "height": "20px", "backgroundColor": "white" }} ></div>
      <div style={{ "textAlign": "center", "backgroundColor": "white" }}> The tariff is on a nightly basis and inclusive of accommodation, meals, consultations and regular treatment charges.</div>
    </div>
  );
}
