import React, { useState, useEffect } from "react";
import Loading from "../../../components/core/Loading";
import DisplayMessage from "../../../components/core/DisplayMessage";
import MaterialTable from "material-table";
import {
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import { Refresh, SaveAlt } from "@material-ui/icons";
import downloadExcel from "../../../Utils/DownloadExcel";

import { Edit } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { actionColumnStyle } from "../../../components/custom/GridConfig";
import { labels } from "../../../Config.json";
import Button from "../../../components/core/Button";

import TextField from "../../../components/core/TextField";
import DatePicker from "../../../components/core/DatePicker";
import {
  getDisplayDate,
  getDBFormateDateTime,
} from "../../../Utils/DateTimeUtils.js";
import SingleCheckBox from "../../../components/core/SingleCheckBox";
import MultipleSelectionList from "../../../components/custom/MultipleSelectionList";

export default function RoomCategory(props) {
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});

  const [showGrid, setShowGrid] = useState(false);
  const [amenityList, setAmenityList] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState([]);
  const [editRecord, toggleEditRecord] = useState(false);

  const columns = [
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
                  setValidationList({});
                  setRowData({ gender: data[id].gender });
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      printable: false,
    },
    { title: "Sr.No", field: "srNo", editable: "never" },
    { title: "Category Name", field: "categoryName" },
    { title: "Description", field: "description" },
    { title: "Effective Date", field: "effectiveDate" },
    { title: "Is Active", field: "active" },
  ];
  const [data, setData] = useState();

  const [disabledExport, setDisabledExport] = useState(false);
  const exportRoomCategory = () => {
    const exportData = data.map((item) => ({
      srNo: item.srNo,
      categoryName: item.categoryName,
      description: item.description,
      effectiveDate: item.effectiveDate,
      active: item.active,
    }));
    const header = [
      ["Sr.No", "Category Name", "Description", "Effective Date", "Is Active"],
    ];
    downloadExcel({
      data: exportData,
      fileName: "RoomCategory",
      header: header,
    });
  };

  // filter related variables and methods. - Start

  const [filterEffectiveDate, setFilterEffectiveDate] = useState(null);
  const [filterEffectiveDateError, setFilterEffectiveDateError] =
    useState(false);

  // filter related variables and methods. - End
  const [rowData, setRowData] = useState({});
  const [validationList, setValidationList] = useState({});
  const [currentOpr, setCurrentOpr] = useState();
  const [id, setId] = useState();

  const checkAllValidation = () => {    
    const categoryName = !validateField("categoryName");
    const effectiveDate = !validateField("effectiveDate");
    setValidationList({
      ...validationList,
      categoryName,
      effectiveDate,
    });

    return !categoryName && !effectiveDate;
  };

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];     
      setRowData({
        ...rowData,
        categoryName: rowData.categoryName,
        effectiveDate: rowData.effectiveDate,
        isActive: rowData.isActive ? "1" : "0",
        description: rowData.description,
      });
      setSelectedAmenity(JSON.parse(rowData.amenities));
    }
  }, [editRecord]);

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

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setRowData({
      categoryName: "",
      effectiveDate: null,
      isActive: "1",
      description: "",
    });
    setSelectedAmenity([]);
  };

  const addRoomCategory = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        // ...rowData,
        // operationType:0,
        effectiveDate: getDBFormateDateTime(rowData.effectiveDate),
        categoryName: rowData.categoryName,
        isActive: parseInt(rowData.isActive),
        description: rowData.description,
        roomCategoryId: rowData.roomCategoryId,
        amenities: selectedAmenity,
      };
      props.insertRoomCategory({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getRoomCategory(e);
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

  const updateRoomCategory = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      delete rowData["srNo"];
      const params = {
        effectiveDate: getDBFormateDateTime(rowData.effectiveDate),
        categoryName: rowData.categoryName,
        isActive: parseInt(rowData.isActive ? "1" : "0"),
        description: rowData.description,
        roomCategoryId: rowData.roomCategoryId,
        amenities: selectedAmenity,
      };
      props.insertRoomCategory({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getRoomCategory(e);
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

  const FormContent = (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <TextField
          required={true}
          value={rowData.categoryName}
          label="Category Name"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, categoryName: e.target.value });
            validateField("categoryName");
          }}
          error={validationList && validationList.categoryName ? true : false}
          errorMessage={"Category Name is Required"}
          maxLength={100}
          multiline={false}
          rows={0}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DatePicker
          defaultValue={
            rowData.effectiveDate !== null
              ? getDisplayDate(rowData.effectiveDate)
              : null
          }
          label="Effective Date"
          tooltipText={"Effective Date"}
          onChange={(date) => {
            setRowData({ ...rowData, effectiveDate: date });
            validateField("effectiveDate");
          }}
          format={"dd-MMM-yyyy"}
          placeholder={"dd-MMM-yyyy"}
          required={true}
          error={validationList && validationList.effectiveDate ? true : false}
          errorMessage={"Effective Date is Required"}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SingleCheckBox
          label={"Is Active"}
          checked={rowData.isActive}
          onChange={(e) => {
            setRowData({ ...rowData, isActive: e.target.checked });
          }}
          required={false}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          required={false}
          value={rowData.description}
          label="Description"
          numeric={undefined}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, description: e.target.value });
            validateField("description");
          }}
          error={validationList && validationList.description ? true : false}
          errorMessage={"Description is Required"}
          maxLength={1000}
          multiline={true}
          rows={1}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <MultipleSelectionList
          items={
            amenityList &&
            amenityList.length > 0 &&
            amenityList[0].value === "All"
              ? amenityList.splice(0, 1)
              : amenityList
          }
          label={"Amenities"}
          columns={3}
          width={"100%"}
          checked={selectedAmenity}
          setChecked={setSelectedAmenity}
          required={true}
        />
      </Grid>

      <Grid item xs={12} style={{ justifyContent: "space-" }}>
        <div className="d-flex align-items-center justify-content-end">
          <Button
            autoFocus
            onClick={() => {
              toggleEditRecord(!editRecord);
              setLoading(false);
            }}
            customClass="button button-black mr-2"
            label={labels.cancelButton}
          />
          <Button
            onClick={(e) => {
              currentOpr === "Add" ? addRoomCategory(e) : updateRoomCategory(e);
            }}
            customClass="button button-primary"
            label={labels.saveButton}
          />
        </div>
      </Grid>
    </Grid>
  );

  useEffect(() => {
    getAmenityMaster();
  }, []);

  const getAmenityMaster = () => {
    setLoading(true);
    const params = {
      filterStatus: 1,
    };
    props.getAmenityMaster({
      params,
      onSuccess: (response) => {
        debugger;
        const { amenityMasterList = [] } = response;
        const data = amenityMasterList.map((item, index) => ({
          value: item.amenityId,
          label: item.name,
        }));
        setAmenityList(data);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const getRoomCategory = () => {
    setLoading(true);
    const params = {
      effectiveDate: filterEffectiveDate,
    };
    props.getRoomCategory({
      params,
      onSuccess: (response) => {
        const { roomCategoryList = [] } = response;
        setDisabledExport(roomCategoryList.length === 0);
        const data = roomCategoryList.map((item, index) => ({
          ...item,
          srNo: index + 1,
          effectiveDate: getDisplayDate(item.effectiveDate),
        }));
        setData(data);
        setShowGrid(true);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  return (
    <div className="holiday-wrapper">
      {!editRecord && (
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <DatePicker
                minDateMessage={"Please select a valid date!"}
                variant="inline"
                margin="none"
                label="Effective Date"
                onChange={(date) => {
                  setFilterEffectiveDate(date);
                  setFilterEffectiveDateError(false);
                }}
                defaultValue={filterEffectiveDate}
                required={true}
                error={filterEffectiveDateError}
                isInline={true}
              />
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <div className="selection-card-actions">
                <Button
                  label={labels.filterButton}
                  customClass="button button-primary mr-2"
                  onClick={() => {
                    if (filterEffectiveDate != null) {
                      getRoomCategory();
                    } else {
                      filterEffectiveDate === null &&
                        setFilterEffectiveDateError(true);
                    }
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <div className="selection-card-actions">
                <Button
                  onClick={() => {
                    addButtonClick();
                  }}
                  customClass="button button-black add-employee-button"
                  label={"Add Room Category"}
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
                title={"List of Room Category"}
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
                            getRoomCategory();
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
                            exportRoomCategory();
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
              <Grid>{FormContent}</Grid>
            </div>
          </div>
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
