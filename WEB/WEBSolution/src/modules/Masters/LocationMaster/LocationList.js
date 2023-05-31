import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Refresh, Edit, Delete } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { labels } from "../../../Config.json";
import {
  actionColumnStyle,
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import Loading from "../../../components/core/Loading";
import DisplayMessage from "../../../components/core/DisplayMessage";
import Button from "../../../components/core/Button";
import SingleCheckBox from "../../../components/core/SingleCheckBox";
import TextField from "../../../components/core/TextField";
import Select from "../../../components/core/Select";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";

// Add, update, delete operations for Location

export default function LocationList(props) {
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [rowData, setRowData] = useState({});
  const [currentOpr, setCurrentOpr] = useState();
  const [filterStatus, setFilterStatus] = useState("");
  const [displayMessage, setDisplayMessage] = useState({});
  const [validationList, setValidationList] = useState({});
  const [loading, setLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [filterStatusError, setFilterStatusError] = useState(false);

  const filterStatusList = [
    { label: "All", value: 'null' },
    { label: "Active", value: 1 },
    { label: "InActive", value: 0 },
  ];

  const columns = [
    {
      title: "Sr#",
      field: "srNo",
      editable: "never",
      cellStyle: {
        textAlign: "center"
      }
    },
    {
      title: "Location",
      field: "locationName",
    },
    {
      title: "Description",
      field: "description",
    },
    {
      title: "Active",
      field: "active",
    },
    {
      title: "Action",
      ...actionColumnStyle,
      render: ({ tableData: { id } }) => {
        return (
          <div className="table-edit-controls">
            <Tooltip title="Edit">
              <IconButton
                aria-label="edit" onClick={() => {
                  setId(id);
                  toggleEditRecord(true);
                  setCurrentOpr("Update");
                  setValidationList({});
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            {(
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
    }
  ];

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getLocationList = () => {
    setLoading(true);
    const params = {
      filterStatus,
    };
    props.getLocationList({
      params,
      onSuccess: (response) => {
        const { locationList = [] } = response;
        const data = locationList.map((location, index) => ({
          ...location,
          srNo: index + 1,
          isActive: location.isActive === true ? "Yes" : "No",
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
    const locationName = !validateField("locationName");
    setValidationList({
      ...validationList,
      locationName,
    });
    return !locationName;
  };

  const FormContent = (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <TextField
          required={true}
          value={rowData.locationName}
          label="Location Name"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, locationName: e.target.value });
            validateField("locationName");
          }}
          error={validationList && validationList.locationName ? true : false}
          errorMessage={"Location Name is Required"}
          maxLength={40}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          required={false}
          value={rowData.description}
          label="Description"
          numeric={undefined}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, description: e.target.value });
          }}
          maxLength={500}
          multiline={true}
          rows={2}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SingleCheckBox
          label={"Is Active"}
          checked={rowData.isActive}
          onChange={(e) => {
            setRowData({ ...rowData, isActive: e.target.checked });
          }}
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
              currentOpr === "Add" ? addLocation(e) : updateLocation(e);
            }}
            customClass="button button-primary"
            label={labels.saveButton}
          />
        </div>
      </Grid>
    </Grid>
  );

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        locationId: rowData.locationId,
        locationName: rowData.locationName,
        description: rowData.description,
        isActive: rowData.isActive === "No" ? 0 : 1,
      });
    }
  }, [editRecord]);

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setRowData({
      locationName: "",
      description: "",
      isActive: "1",
    });
  };

  const addLocation = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0"),
      };
      props.addLocation({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getLocationList(e);
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

  const updateLocation = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0"),
      };
      props.updateLocation({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getLocationList(e);
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

  const deleteLocation = (e) => {
    const { locationId } = data[id];
    setLoading(true);
    const params = {
      locationId
    };
    props.deleteLocation({
      params,
      onSuccess: ({ message: displayMessage }) => {
        getLocationList(e);
        setLoading(false);
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
        setDeleteDialog(!deleteDialog)
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  return (
    <div className="table-wrapper">
      {!editRecord && (
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <Select
                data={filterStatusList}
                value={filterStatus}
                label={"Status"}
                onChange={(e) => {
                  const filterStatus = e.target.value;
                  setFilterStatusError(false);
                  setFilterStatus(filterStatus);
                }}
                isInline={true}
                errorMessage={"filterStatus is Required"}
                required={true}
                error={filterStatusError}
              />
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <div className="selection-card-actions">
                <Button
                  label={labels.filterButton}
                  customClass="button button-primary mr-2"
                  onClick={() => {
                    if (filterStatus !== "") {
                      getLocationList();
                    } else {
                      filterStatus === "" && setFilterStatusError(true);
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
                  label={"Add Location"}
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
                title={"List of Locations"}
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
                            getLocationList();
                          }}
                        />
                      );
                    },
                    tooltip: "Refresh Data",
                    isFreeAction: true,
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
      {deleteDialog && (
        <ConfirmationDialog
          open={deleteDialog}
          dialogTitle="Delete Location"
          dialogContentText="Are you sure want to delete this?"
          cancelButtonText="Cancel"
          okButtonText="Delete"
          onCancel={() => {
            setDeleteDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            setDeleteDialog(false);
            deleteLocation(e);
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