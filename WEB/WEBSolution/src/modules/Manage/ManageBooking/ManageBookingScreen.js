import React, { useState, useEffect } from "react";
import Loading from "../../../components/core/Loading";
import DisplayMessage from "../../../components/core/DisplayMessage";
import MaterialTable from "material-table";
import {
  getDBFormateDate,
  getBrowserFormatDate,
  getDisplayDate,
  getDCRFormatDate,
} from "../../../Utils/DateTimeUtils.js";
import {
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import { ContactSupportOutlined, Refresh, SaveAlt, Search } from "@material-ui/icons";
import downloadExcel from "../../../Utils/DownloadExcel";

import { Delete, Edit, AddBox } from "@material-ui/icons";
import { Grid, IconButton, Tooltip, InputLabel } from "@material-ui/core";
import { actionColumnStyle } from "../../../components/custom/GridConfig";
import { labels } from "../../../Config.json";
import Button from "../../../components/core/Button";

import RadioGroup from "../../../components/core/RadioGroup";

import AddBooking from "../../../components/custom/AddBooking/AddBookingContainer";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";
import { staticDataId } from "../../../Config.json";
export default function ManageBooking(props) {
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [statusList, setStatusList] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [filterStatus, setFilterStatus] = useState(1);
  const [filterStatusError, setFilterStatusError] = useState(false);
  const [data, setData] = useState([]);
  const [disabledExport, setDisabledExport] = useState(false);
  const [rowData, setRowData] = useState({});

  const [currentOpr, setCurrentOpr] = useState();
  const [Id, setId] = useState();
  const [deleteDialog, setDeleteDialog] = useState(false);
  const columns = [
    { title: "Sr#", field: "srNo", editable: "never",cellStyle:{
      textAlign:"center"
    } },
    { title: "Guest Name", field: "guestName" },
    { title: "Mobile No.", field: "mobileNo" },
    { title: "Start Date", field: "startDate", cellStyle:{textAlign:"center"}},
    { title: "End Date", field: "endDate", cellStyle:{textAlign:"center"} },
    { title: "BookingStatus", field: "staticName" },
    { title: "Refrence Code", field: "bookingReferenceCode"},
    // { title: "Booking Refrence Code", field: "bookingReferenceCode"},
    {
      title: "Action",
      ...actionColumnStyle,
      render: ({ tableData: { id } }) => {
        return (
          <div className="table-edit-controls">
            <Tooltip title="Edit">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setId(id);
                  toggleEditRecord(true);
                  setCurrentOpr("Update");
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            {
              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setId(id);
                    setDeleteDialog(true);
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            }
          </div>
        );
      },
      printable: false,
    },
  ];

  const manageBooking_GetbookingData = () => {
    setLoading(true)
    const params = {
      filterStatus
    };
    props.manageBooking_GetbookingData({
      params,
      onSuccess: (response) => {
        const { bookingList = [] } =response
        let bookingdata = bookingList.map((item,index) =>({
          ...item,
          srNo:index + 1,
          startDate:getDisplayDate(item.startDate),
          endDate:getDisplayDate(item.endDate)
        }))
        setData(bookingdata)
        setLoading(false)
        setShowGrid(true)
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  }
  const exportManageBooking = () => {
    const exportData = data.map((item) => ({
      srNo: item.srNo,
      bookingId: item.bookingId,
      guestName: item.guestName,
      phone: item.mobileNo,
      startDate: item.startDate,
      endDate: item.endDate,
      bookingStatus: item.StaticName,
      bookingReferenceCode: item.bookingReferenceCode
    }));
    const header = [
      [
        "Sr.No",
        "Booking Id",
        "Guest Name",
        "Mobile No.",
        "Start Date",
        "End Date",
        "Booking Status",
        "Booking Refrence Code"
      ],
    ];
    downloadExcel({
      data: exportData,
      fileName: "ManageBooking",
      header: header,
    });
  };
 
  const getStatusFilter = () => {
    const params = {
      // AUTOCODEUTILITY - Add request params here.
    };
    props.getStatusFilter({
      params,
      onSuccess: (response) => {
        const { statusList } = response;
        setStatusList(statusList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[Id];
      setRowData({
        ...rowData,
        guestId: rowData,
        mobile: rowData.mobileNo,
        startDate: rowData.startDate,
        endDate: rowData.endDate,
        bookingStatus : rowData.bookingStatus,
      });
    }
  }, [editRecord]);
  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setRowData({
      ...rowData,
      guestId: [],
      mobile: "",
      startDate: null,
      endDate: null,
      bookingStatus: "",
      bookingReferenceCode: "",
    });
  };

  const deleteManageBooking = (e) => {
    const { bookingId } = data[Id];
    setLoading(true);
    const params = {
      ...rowData,
      bookingId
    };
    props.deleteManageBooking({
      params,
      onSuccess: ({ message: displayMessage }) => {
        manageBooking_GetbookingData(e);
        setLoading(false);
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
        setDeleteDialog(!deleteDialog);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };
  const displaySuccessMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "Success",
    });
  };

  useEffect(() => {
    getStatusFilter();
  }, []);

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };
  
  const handleCancle = () => {
    toggleEditRecord(!editRecord);
  }
  const handleSave = (e) => {
    showGrid && manageBooking_GetbookingData(e);;
    toggleEditRecord(!editRecord);
  }
  return (
    <div className="holiday-wrapper">
      {!editRecord && (
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={1}>
            <Grid item>
              <RadioGroup
                value={filterStatus}
                options={statusList}
                isOptionAlignRow={true}
                label={""}
                labelPlacement={"end"}
                onChange={(e) => {
                  setFilterStatus(parseInt(e.target.value));
                }}
              />
            </Grid>
            <Grid item>
              <div className="selection-card-actions">
                <Button
                  label={labels.filterButton}
                  customClass="button button-primary mr-2"
                  onClick={() => {
                    if (filterStatus != "") {
                      manageBooking_GetbookingData();
                    } else {
                      filterStatus === "" && setFilterStatusError(true);
                    }
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={12} md={4} lg>
              <div className="selection-card-actions">
                <Button
                  onClick={() => {
                    addButtonClick();
                  }}
                  customClass="button button-black add-employee-button"
                  label={"Add Booking"}
                >
                  Add
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
      {showGrid && !editRecord && (
        <div className="card">
          <div className="table-wrapper table-size-xs">
            {!editRecord && (
              <MaterialTable
                icons={GridIcons}
                title={"List of Manage Booking"}
                columns={columns}
                data={data}
                options={options}
                style={style}
                actions={[
                  {
                    icon: () => {
                      return (
                        <Refresh
                          onClick={() => {
                          }}
                        />
                      );
                    },
                    tooltip: "Refresh Data",
                    isFreeAction: true,
                  },
                  {
                    icon: () => {
                      return (
                        <SaveAlt
                          onClick={() => {
                            exportManageBooking();
                          }}
                        />
                      );
                    },
                    tooltip: "Download",
                    isFreeAction: true,
                    disabled: disabledExport,
                  },
                ]}
              />
            )}
          </div>
        </div>
      )}

      {editRecord && (
        <div className="card">
          <div className="table-wrapper">
            <div>
              <Grid>
                <AddBooking currentOpr={currentOpr} data={rowData} onCancelClick={handleCancle} onSaveClick ={handleSave}
                 displaySuccessMessage={displaySuccessMessage}
                 displayErrorMessage={displayErrorMessage}/>
              </Grid>
            </div>
          </div>
        </div>
      )}
      {deleteDialog && (
        <ConfirmationDialog
          open={deleteDialog}
          dialogTitle="Delete Booking"
          dialogContentText="Are you sure want to delete this?"
          cancelButtonText="Cancel"
          okButtonText="Delete"
          onCancel={() => {
            setDeleteDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            setDeleteDialog(false);
            if(data[Id].bookingStatus == staticDataId.Book_Status_Booked && getDCRFormatDate(data[Id].startDate)>=getDCRFormatDate(Date()))
            {
              deleteManageBooking(e)
            }
            else
            {
              displayErrorMessage("You cannot delete back date and booking status checked in or checked out")
            }

          }}
        />
      )}
      {loading && <Loading />}
      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
