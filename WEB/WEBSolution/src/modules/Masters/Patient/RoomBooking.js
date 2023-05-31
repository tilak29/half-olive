import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import {
  GridIcons,
  options,
  style
} from "../../../components/custom/GridConfig";
import {
  getDBFormateDate,
  getBrowserFormatDate,
  getDisplayDate,
  getDCRFormatDate,
} from "../../../Utils/DateTimeUtils.js";
import { labels } from "../../../Config.json";
import AddBooking from "../../../components/custom/AddBooking/AddBookingContainer";
import Button from "../../../components/core/Button";
import Loading from "../../../components/core/Loading";
import DisplayMessage from "../../../components/core/DisplayMessage";
import { Visibility } from "@material-ui/icons";
import { actionColumnStyle } from "../../../components/custom/GridConfig";
import { Grid, IconButton, Tooltip, InputLabel } from "@material-ui/core";
export default function ESI(props) {
  const [checkedInRecord,toggleCheckedInRecord] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [rowData,setRowData] = useState({});
  const [showGrid, setShowGrid] = useState(false);
  const [cancelButton,SetCancelBultton] = useState(false);
  const [confirmBooking,SetConfirmBooking] = useState(true);
  const [showViewOtherBookingButton,toggleShowViewOtherBookingButton] = useState(true);
  useEffect(() => {
    if (props.person != null && props.person > 0 && props.bookingId != null) {
      if(props.bookingStatus == 129)
      {
        toggleCheckedInRecord(true);
        manageBooking_GetbookingData(props.bookingStatus,props.bookingId);
        SetCancelBultton(false);
        SetConfirmBooking(true);
        toggleShowViewOtherBookingButton(true);
      }
      else
      {
        toggleCheckedInRecord(false);
        SetCancelBultton(true);
        SetConfirmBooking(true);
        toggleShowViewOtherBookingButton(false);
        manageBooking_GetbookingData("null",props.bookingId);
      }
    }
  }, [props.BookingStatus || props.person || props.personName || props.bookingId]);

  const CountNoOfDays = (startDate,endDate) =>{
    let StartDate = new Date(startDate);
    let EndDate = new Date(endDate);
    let TimeDifference = EndDate.getTime() - StartDate.getTime();
    let DaysDifference = TimeDifference / (24 * 60 * 60 * 1000);
    return DaysDifference
  }

  const manageBooking_GetbookingData = (bookingStatus,bookingId) => {
    setLoading(true)
    const params = {
      bookingId:bookingId,
      bookingStatus:bookingStatus
    };
    props.manageBooking_GetbookingData({
      params,
      onSuccess: (response) => {
        const { bookingList = [] } =response;
        let bookingdata = bookingList.map((item,index) =>({
          ...item,
          SrNo:index + 1,
          guestId:item,
          startDate:getDisplayDate(item.startDate),
          endDate:getDisplayDate(item.endDate),
          days:CountNoOfDays(getDCRFormatDate(item.startDate),getDCRFormatDate(item.endDate)),
        }));
        setRowData(bookingdata);
        setLoading(false);
        setShowGrid(true);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  }
  const columns = [
    {
      title:"Sr#",
      field:"SrNo",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt",
        textAlign: "center"
      }
    },
    {
      title: "Refrence Code",
      field: "bookingReferenceCode",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt"
      }
    },
    {
      title: "Start Date",
      field: "startDate",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt",
        textAlign: "center"
      }
    },
    {
      title: "End Date",
      field: "endDate",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt",
        textAlign: "center"
      }
    },
    {
      title: "No. of Days",
      field: "days",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt"
      }
    },
    {
      title: "Booking Status",
      field: "staticName",
      // bookingStatus
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt"
      }
    },{
      title: "Action",
      ...actionColumnStyle,
      render: ({ tableData: { id } }) => {
        return (
          <div className="table-View-controls">
            <Tooltip title="View">
              <IconButton
                aria-label="View"
                onClick={() => {
                  if(rowData[id].bookingStatus == 128)
                  {
                    SetCancelBultton(true);
                    SetConfirmBooking(true);
                  }
                  else
                  {
                    SetConfirmBooking(false);
                    SetCancelBultton(true);
                  }
                  // manageBooking_GetbookingData(rowData[id].bookingStatusId,rowData[id].guestId.guestId)
                  manageBooking_GetbookingData(rowData[id].bookingStatus,rowData[id].bookingId)
                  toggleCheckedInRecord(true);
                }}
                size="small"
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const handleSave = () => {
    if(showViewOtherBookingButton)
    {
      manageBooking_GetbookingData("show all booking",props.bookingId);
    }
    else
    {
      if(rowData[0].bookingStatus == 128)
      {
        toggleCheckedInRecord(false);
        manageBooking_GetbookingData("null",rowData[0].bookingId);
      }
      else
      {
        manageBooking_GetbookingData(rowData[0].bookingStatus,rowData[0].bookingId);
      }
    }
    props.getPatientName();
  }
  const handleCancle = () => {
    toggleCheckedInRecord(false);
    if(showViewOtherBookingButton)
    {
      manageBooking_GetbookingData("show all booking",props.bookingId);
    }
    else
    {
      manageBooking_GetbookingData("null",rowData[0].bookingId);
    }
  }
  const displayErrorMessage = (message) =>{
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  }
  const displaySuccessMessage = (message) =>{
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "Success",
    });
  }
  return (
    <div style={{ display: "flex", flexDirection: "row", "margin-top": "7%" }}>
      {showGrid && !checkedInRecord && (
      <div className="card">
        <div className="table-wrapper table-size-xs">
          <MaterialTable
            icons={GridIcons}
            title={`Booking History of ${props.personName}`}
            columns={columns}
            data={rowData}
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
                border: "1px solid #659F1C",
                fontSize: "12pt"
              }
            }}
            style={style}

          />
        </div>
      </div>
      )}
      {showGrid && checkedInRecord && (
        <div>
          {showViewOtherBookingButton && (
            <div style={{display:"flex",justifyContent:"flex-end",alignItem:"flex-end"}}>
              <Button
                onClick={(e) => {
                    toggleCheckedInRecord(false);
                    manageBooking_GetbookingData("show all booking",props.bookingId);
                  }}
                customClass="button button-primary"
                label={labels.viewotherbooking}
              />
              </div>
            )}
          <AddBooking 
            data={rowData[0]} 
            currentOpr={"Update"}
            onCancelClick={handleCancle} 
            onSaveClick ={handleSave}
            displaySuccessMessage={displaySuccessMessage}
            displayErrorMessage={displayErrorMessage}
            search={false}
            CancelButton={cancelButton}
            ConfirmButton={confirmBooking}
          /> 
        </div>
       
      )}
      {loading && <Loading />}
      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
