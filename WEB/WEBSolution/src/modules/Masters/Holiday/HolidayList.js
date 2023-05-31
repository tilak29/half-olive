import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import moment from "moment";
import {
  Edit,
  Delete,
  Refresh,
} from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";

import Button from "../../../components/core/Button";
import {
  GridIcons,
  options,
  style,
  actionColumnStyle,
} from "../../../components/custom/GridConfig";
import Select from "../../../components/core/Select";
import Loading from "../../../components/core/Loading";
import TextField from "../../../components/core/TextField";
import DatePicker from "../../../components/core/DatePicker";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";
import DisplayMessage from "../../../components/core/DisplayMessage";
import DialogControl from "../../../components/core/Dialog";
// import PrintableGrid from "../../../components/custom/PrintableGrid";
// import { downloadExcel } from "../../../Utils/DownloadExcel";

import {
  getDisplayDate,
  getDBFormateDate,
  getBrowserFormatDate,
} from "../../../Utils/DateTimeUtils.js";
import { labels } from "../../../Config.json";

/**
 * Holiday List grid with state and year filter
 * Add, update, delete operations based on rights for holiday
 * Allow to Download current year holiday list,Upload holidaylist from excel(Insert only)
 * @author Dileep Lohar
 */
export default function HolidayList(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [rowData, setRowData] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [validationList, setValidationList] = useState({});
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [id, setId] = useState();
  const [selectedYearError, setSelectedYearError] = useState(false);
  const [allYear, setAllYear] = useState([]);
  const { operationRights, serverDate } = props;
  const { add, edit, delete: allowDelete } = operationRights;

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getfullyear = () => {
    const dates = new Date().getFullYear()
    var getdate = []
    for (let index = 0; index < 5; index++) {
        const predate = dates-index+1
        getdate.push({label:predate.toString(),value:predate })
    }
    setAllYear(getdate)
  }

  useEffect(() => {
    getfullyear()
    getHolidayList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 


  const getHolidayList = (e) => {
    const params = {
      year: selectedYear,
    };
    // e.preventDefault();
    setLoading(true);

    props.getHolidayList({
      params,
      onSuccess: (response) => {
        setLoading(false);
        setShowGrid(true);
        const { holidayList = [] } = response;
        const data = holidayList.map((holiday, index) => ({
          ...holiday,
          srNo: index + 1,
          holidayDate: getDisplayDate(holiday.holidayDate),
          holidayName:holiday.name,
          remarks:holiday.remark

        }));
        setData(data);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setRowData({
      holidayName: "",
      stateIdList: [],
      holidayDate: null,
      remarks: "",
    });
  };

  const validateField = (field) => {
    let isValid = true;
    if (
      !rowData[field] ||
      rowData[field] === "" ||
      rowData[field] === null ||
      rowData[field] === [] ||
      (rowData[field] && rowData[field].length === 0)
    ) {
      setValidationList({ ...validationList, [field]: true });
      isValid = false;
    } else {
      setValidationList({ ...validationList, [field]: false });
    }
    return isValid;
  };

  const checkAllValidation = () => {
    const holidayName = !validateField("holidayName");
    const holidayDate = !validateField("holidayDate");
    if (currentOpr === "Update") {
      setValidationList({ holidayName, holidayDate });
      return !holidayName && !holidayDate;
    } else {
      setValidationList({ holidayName, holidayDate });
      return !holidayName && !holidayDate
    }
  };



  const addHoliday = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        holidayDate: getDBFormateDate(rowData.holidayDate),
      };
      props.addHoliday({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          toggleEditRecord(!editRecord);
        },
        onFailure: ({ message }) => {
          setLoading(false);
          displayErrorMessage(message);
        },
      });
    }
  };

  const updateHoliday = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        holidayDate: getDBFormateDate(rowData.holidayDate),
      };
      props.updateHoliday({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          getHolidayList(e);
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          toggleEditRecord(!editRecord);
        },
        onFailure: ({ message }) => {
          setLoading(false);
          displayErrorMessage(message);
        },
      });
    }
  };

  const deleteHoliday = (e) => {
    const { holidayId, updatedDate } = data[id];
    setLoading(true);

    props.deleteHoliday({
      params: {
        holidayId,
        updatedDate,
      },
      onSuccess: ({ message: displayMessage }) => {
        setLoading(false);
        getHolidayList(e);
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        holidayId: rowData.holidayId,
        holidayName: rowData.holidayName,
        holidayDate: rowData.holidayDate,
        remarks: rowData.remarks,
        updatedDate: rowData.updatedDate,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  const minDate = getBrowserFormatDate(props.serverDate);

  // const YearValue =
  //   selectedYear === ""
  //     ? ""
  //     : yearList.filter((year) => year.value === selectedYear)[0].label;

  const todayDate = moment(serverDate, "YYYY-MM-DD HH:mm:ss").format(
    "YYYY-MM-DD"
  );

  const isPastDatedHoliday = (date) => {
    const leaveStartDate = moment(date, "DD-MMM-YYYY").format("YYYY-MM-DD");
    const isPastDated = moment(leaveStartDate).isSameOrBefore(todayDate);
    return isPastDated;
  };

 

  const columns = [
    
    { title: "Sr#", field: "srNo",cellStyle: {textAlign: "center"} },
    { title: "Holiday", field: "holidayName" },
    {
      title: "Date",
      field: "holidayDate",
    },
    { title: "Remarks", field: "remarks" },
    {
      title: "Action",
      ...actionColumnStyle,
      hidden: !edit && !allowDelete,
      render: ({ tableData: { id } }) => {
        return (
          <div className="table-edit-controls">
            {edit && !isPastDatedHoliday(data[id].holidayDate) && (
              <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    setId(id);
                    toggleEditRecord(true);
                    setCurrentOpr("Update");
                    setValidationList({});
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {allowDelete && !isPastDatedHoliday(data[id].holidayDate) && (
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
            )}
          </div>
        );
      },
      printable: false,
    },
  ];

  const dialogTitleText =
    currentOpr === "Add"
      ? "Add Holiday"
      : `Update Holiday of ${selectedYear}`;

  const dialogContent = (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required={true}
            value={rowData.holidayName}
            label="Holiday Name"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, holidayName: e.target.value });
              validateField("holidayName");
            }}
            error={validationList && validationList.holidayName ? true : false}
            errorMessage={"Holiday Name is Required"}
            maxLength={50}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            variant="inline"
            defaultValue={rowData.holidayDate}
            required={true}
            margin="none"
            label="Holiday Date"
            minDate={minDate}
            onChange={(holidayDate) => {
              setRowData({ ...rowData, holidayDate });
              validateField("holidayDate");
            }}
            error={validationList && validationList.holidayDate ? true : false}
            errorMessage={"Holiday Date is Required"}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            value={rowData.remarks}
            label="Remarks"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, remarks: e.target.value });
            }}
            multiline={true}
            rows={5}
            maxLength={200}
          />
        </Grid>
      </Grid>
    </div>
  );


  return (
    <div>
      <div className="card selection-card selection-card-two-columns mb-3">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} >
            <Select
              data={allYear}
              value={selectedYear}
              label={"Holiday Year"}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedYearError(false);
                setShowGrid(false);
              }}
              required={true}
              error={selectedYearError}
              errorMessage={"Holiday Year is Required"}
              isInline={true}
            />
          </Grid>
          <Grid item xs={12} md={4} >
            <div className="selection-card-actions">
              <Button
                label={labels.filterButton}
                onClick={(e) => {
                  if (selectedYear !== "") {
                    setSelectedYearError(false);
                    getHolidayList(e);
                  } else {
                      setSelectedYearError(true);
                    }
                }}
                customClass="button button-primary mr-2"
              />
              {add && (
                <Button
                  label={"Add Holiday"}
                  onClick={() => {
                    addButtonClick();
                  }}
                  customClass="button button-black"
                />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
      {showGrid && (
        <div className="card">
          <div className="table-wrapper editable-table-wrapper">
            <MaterialTable
              icons={GridIcons}
              title={`Holidays of ${selectedYear}`}
              columns={columns}
              data={data}
              style={style}
              options={{ ...options, paging: false }}
              actions={[
                {
                  icon: () => {
                    return (
                      <Refresh
                        onClick={(e) => {
                          setLoading(true)
                          getHolidayList()
                        }}
                      />
                    );
                  },
                  tooltip: "Refresh Data",
                  isFreeAction: true,
                },
                {
                  icon: () => {
                    // return <Print onClick={printClick} />;
                  },
                  tooltip: "Print Holiday List",
                  isFreeAction: true,
                },
              ]}
            />
          </div>
        </div>
      )}
      {editRecord && (
        <DialogControl
          open={editRecord}
          dialogTitleText={dialogTitleText}
          dialogContent={dialogContent}
          onCancel={() => {
            toggleEditRecord(!editRecord);
            setLoading(false);
          }}
          onSubmit={(e) => {
            currentOpr === "Add" ? addHoliday(e) : updateHoliday(e);
          }}
          maxWidth="md"
          fullWidth="false"
        />
      )}
      {deleteDialog && (
        <ConfirmationDialog
          open={deleteDialog}
          dialogTitle="Delete Holiday"
          dialogContentText="Delete Record ?"
          cancelButtonText="Cancel"
          okButtonText="Delete"
          onCancel={() => {
            setDeleteDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            setDeleteDialog(false);
            deleteHoliday(e);
          }}
        />
      )}
      {loading && <Loading />}

      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
      <div
        style={{ display: "none", backgroundColor: "white" }}
        id={"printHolidayDiv"}
      >
      </div>
    </div>
  );
}
