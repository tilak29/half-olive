import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import moment from "moment";
import {
  Edit,
  Delete,
  SaveAlt,
  Publish,
  Print,
  Refresh,
} from "@material-ui/icons";
import { Grid, IconButton, Tooltip, FormHelperText } from "@material-ui/core";

import Button from "../../../components/core/Button";
import colors from "../../../Colors/colors";
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
import MultipleCheckboxSelect from "../../../components/custom/MultipleCheckboxSelect";
import StatesSelect from "../../../components/custom/StatesSelect/StatesSelectContainer";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";
import DisplayMessage from "../../../components/core/DisplayMessage";
import DialogControl from "../../../components/core/Dialog";
import PrintableGrid from "../../../components/custom/PrintableGrid";
import downloadExcel from "../../../Utils/DownloadExcel";

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
 * @author Tejal Sali,Khushbu Shah
 */
export default function HolidayList(props) {
  const [yearList, setYearList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [rowData, setRowData] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [validationList, setValidationList] = useState({});
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [id, setId] = useState();
  const [selectedStateError, setSelectedStateError] = useState(false);
  const [selectedStateName, setSelectedStateName] = useState("");
  const [titleProperties, setTitleProperties] = useState({});
  const [selectedYearError, setSelectedYearError] = useState(false);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(false);

  const { stateList = [] } = props;

  const { operationRights, serverDate } = props;
  const { add, edit, delete: allowDelete } = operationRights;

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  useEffect(() => {
    if (stateList.length === 0) {
      props.getStates();
    }

    props.getHolidayYearList({
      onSuccess: (response) => {
        const { yearList = [] } = response;
        setYearList(yearList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportHolidayList = () => {
    props.exportHolidayList({
      onSuccess: (response) => {
        const header = [
          ["State Id", "State Name", "Holiday Date", "Holiday Name", "Remarks"],
        ];
        const stateHeader = [["State Id", "State Name"]];
        const currentYear = props.serverDate.slice(0, 4);
        downloadExcel({
          data: response.holidayList,
          fileName: `Holiday_${currentYear}`,
          header: header,
          data1: response.stateList,
          header1: stateHeader,
        });
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const importHolidayList = () => {
    if (file) {
      props.importHolidayList({
        params: { file: file },
        onSuccess: ({ message: displayMessage }) => {
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          setUploadDialog(false);
        },
        onFailure: ({ message }) => {
          displayErrorMessage(message);
        },
      });
    } else {
      setFileUploadError(true);
    }
  };

  const getHolidayList = (e) => {
    const params = {
      stateId: selectedState,
      year: selectedYear,
    };
    e.preventDefault();
    setLoading(true);

    props.getHolidayList({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { holidayList = [] } = response;
        const data = holidayList.map((holiday, index) => ({
          ...holiday,
          srNo: index + 1,
          holidayDate: getDisplayDate(holiday.holidayDate),
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
      let stateIds = rowData.stateIdList;
      const index = stateIds.indexOf(0);
      if (index > -1) {
        stateIds.splice(index, 1);
        setRowData({ ...rowData, stateIdList: stateIds });
      }
      const stateIdList = stateIds.length === 0;
      setValidationList({ holidayName, holidayDate, stateIdList });
      return !holidayName && !holidayDate && !stateIdList;
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
          if (showGrid) {
            getHolidayList(e);
          }
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
        stateIdList: selectedState,
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

  const YearValue =
    selectedYear === ""
      ? ""
      : yearList.filter((year) => year.value === selectedYear)[0].label;

  const todayDate = moment(serverDate, "YYYY-MM-DD HH:mm:ss").format(
    "YYYY-MM-DD"
  );

  const isPastDatedHoliday = (date) => {
    const leaveStartDate = moment(date, "DD-MMM-YYYY").format("YYYY-MM-DD");
    const isPastDated = moment(leaveStartDate).isSameOrBefore(todayDate);
    return isPastDated;
  };

  const printClick = () => {
    var divContents = document.getElementById("printHolidayDiv").innerHTML;
    var printWindow = window.open("", "", "height=200,width=400");
    printWindow.document.write(
      "<html><head><title>Print from Smart Laboratories</title>"
    );
    printWindow.document.write("</head><body >");
    printWindow.document.write(divContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
    // printWindow.close();
  };

  const columns = [
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
    { title: "Sr.No", field: "srNo" },
    { title: "Holiday", field: "holidayName" },
    {
      title: "Date",
      field: "holidayDate",
    },
    { title: "Remarks", field: "remarks" },
  ];

  const dialogTitleText =
    currentOpr === "Add"
      ? "Add Holiday"
      : `Update Holiday for ${titleProperties.stateName} | ${titleProperties.year}`;

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

        {currentOpr === "Add" && (
          <Grid item xs={12}>
            <MultipleCheckboxSelect
              items={ 
                stateList && stateList.length > 0 && stateList[0].value === "All"
                  ? stateList.splice(0, 1)
                  : stateList
              }
              label={"States"}
              keyField={"value"}
              textField={"label"}
              checked={rowData.stateIdList}
              setChecked={(stateIdList) => {
                if (stateIdList.length === 1 && stateIdList[0] === 0)
                  setRowData({ ...rowData, stateIdList: [] });
                else setRowData({ ...rowData, stateIdList });
                setValidationList({
                  ...validationList,
                  stateIdList: false,
                });
              }}
              width={"100%"}
              error={
                validationList && validationList.stateIdList
                  ? validationList.stateIdList
                  : false
              }
              required={true}
              errorMessage={"Please select at least 1 state"}
            />
          </Grid>
        )}
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

  const uploadDialogContent = (
    <Grid item xs={12} md={4} lg>
      <input
        type="file"
        name="filename"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setFileUploadError(false);
        }}
        accept="application/vnd.ms-excel"
      />
      {fileUploadError && (
        <FormHelperText id="component-error-text">
          Select a file to upload
        </FormHelperText>
      )}
    </Grid>
  );

  return (
    <div>
      <div className="card selection-card selection-card-two-columns mb-3">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg>
            <StatesSelect
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedStateError(false);
              }}
              error={selectedStateError}
              setSelectedStateName={setSelectedStateName}
              isInline={true}
            />
          </Grid>
          <Grid item xs={12} md={4} lg>
            <Select
              data={yearList}
              value={selectedYear}
              label={"Holiday Year"}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedYearError(false);
              }}
              required={true}
              error={selectedYearError}
              errorMessage={"Holiday Year is Required"}
              isInline={true}
            />
          </Grid>
          <Grid item xs={12} md={4} lg>
            <div className="selection-card-actions">
              <Button
                label={labels.filterButton}
                onClick={(e) => {
                  if (selectedYear !== "" && selectedState !== "") {
                    setShowGrid(true);
                    setTitleProperties({
                      stateName: selectedStateName,
                      year: YearValue,
                    });
                    getHolidayList(e);
                  } else {
                    if (selectedYear === "" || selectedYear === null) {
                      setSelectedYearError(true);
                    }
                    if (selectedState === "") {
                      setSelectedStateError(true);
                    }
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
              <Tooltip title="Export">
                <IconButton
                  aria-label="export"
                  onClick={() => {
                    exportHolidayList();
                  }}
                  size="small"
                >
                  <SaveAlt style={{ color: colors.defaultRed }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Upload">
                <IconButton
                  aria-label="upload"
                  onClick={() => {
                    setUploadDialog(true);
                    setFileUploadError(false);
                    setFile(null);
                  }}
                  size="small"
                >
                  <Publish style={{ color: colors.defaultRed }} />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      </div>
      {showGrid && (
        <div className="card">
          <div className="table-wrapper editable-table-wrapper">
            <MaterialTable
              icons={GridIcons}
              title={`Holidays of ${titleProperties.stateName} for ${titleProperties.year}`}
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
                          getHolidayList(e);
                        }}
                      />
                    );
                  },
                  tooltip: "Refresh Data",
                  isFreeAction: true,
                },
                {
                  icon: () => {
                    return <Print onClick={printClick} />;
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
      {uploadDialog && (
        <DialogControl
          open={uploadDialog}
          dialogTitleText={"Upload Excel file"}
          dialogContent={uploadDialogContent}
          onCancel={() => {
            setFileUploadError(false);
            setUploadDialog(false);
          }}
          onSubmit={() => {
            importHolidayList();
          }}
          maxWidth="sm"
          fullWidth="false"
        />
      )}

      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
      <div
        style={{ display: "none", backgroundColor: "white" }}
        id={"printHolidayDiv"}
      >
        <PrintableGrid
          data={data}
          columns={columns}
          title={`Holidays of ${titleProperties.stateName} for ${titleProperties.year}`}
        />
      </div>
    </div>
  );
}
