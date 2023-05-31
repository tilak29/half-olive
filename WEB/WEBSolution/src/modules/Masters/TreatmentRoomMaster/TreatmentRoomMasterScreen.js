import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Refresh, Edit, Delete, SaveAlt } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { labels } from "../../../Config.json";
import {
  actionColumnStyle,
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import MultipleCheckboxSelect from "../../../components/custom/MultipleCheckboxSelect";
import Loading from "../../../components/core/Loading";
import DisplayMessage from "../../../components/core/DisplayMessage";
import Button from "../../../components/core/Button";
import SingleCheckBox from "../../../components/core/SingleCheckBox";
import TextField from "../../../components/core/TextField";
import Select from "../../../components/core/Select";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";
import downloadExcel from "../../../Utils/DownloadExcel";
// Add, update, delete operations for TreatmentRoomMaster

export default function TreatmentRoomMasterList(props) {
  const [id, setId] = useState();
  const [disabledExport, setDisabledExport] = useState(false);
  const [TreatmentRoomMasterList, setTreatmentRoomMasterList] = useState();
  const [rowData, setRowData] = useState({});
  const [location, setLocation] = useState();
  const [treatment, setTreatment] = useState();
  const [therapistList, setTherapistList] = useState();
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
    { label: "All", value: "null" },
    { label: "Active", value: 1 },
    { label: "InActive", value: 0 },
  ];
  const columns = [
    {
      title: "Sr#",
      field: "srNo",
      editable: "never",
      cellStyle:{
        textAlign:"center"
      }
    },
    {
      title: "Room",
      field: "roomName",
    },
    {
      title: "Description",
      field: "description",
    },
    {
      title: "Location",
      field: "locationName",
    },
    {
      title: "Treatment",
      field: "treatmentName",
    },
    {
      title: "Therapist",
      field: "therapistName",
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

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const exportTreatmentRoomMaster = () => {
    const exportData = TreatmentRoomMasterList.map((item) => ({
      srNo: item.srNo,
      roomName: item.roomName,
      description: item.description,
      locationName: item.locationName,
      treatmentName: item.treatmentName,
      therapistName: item.therapistName,
      active: item.active,
    }));
    const header = [
      [
        "Sr#",
        "Room",
        "Description",
        "Location",
        "Treatment",
        "Therapist",
        "Is Active",
      ],
    ];
    downloadExcel({
      data: exportData,
      fileName: "TreatmentRoomMaster",
      header: header,
    });
  };

  const getTreatmentRoomMasterList = () => {
    setLoading(true);
    const params = {
      filterStatus,
    };
    props.getTreatmentRoomMasterList({
      params,
      onSuccess: (response) => {
        const { treatmentRoomMaster = [] } = response;
        const data = treatmentRoomMaster.map((treatmentRoomMaster, index) => ({
          ...treatmentRoomMaster,
          srNo: index + 1,
          isActive: treatmentRoomMaster.isActive === true ? "Yes" : "No",
        }));
        setTreatmentRoomMasterList(data);
        setShowGrid(true);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };
  const getAllLocation = () => {
    setLoading(true);
    const params = {
      filterStatus: 1,
    };
    props.getLocationList({
      params,
      onSuccess: (response) => {
        const { locationList = [] } = response;
        const data = locationList.map((location, index) => ({
          value: location.locationId,
          label: location.locationName,
        }));
        setLocation(data);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const getAllTherapist = () => {
    setLoading(true);
    props.getAllTherapist({
      onSuccess: (response) => {
        const { therapistList = [] } = response;
        setTherapistList(therapistList);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };
  const getAllTreatment = () => {
    props.getTreatmentMasterList({
      params: {
        Status: 1,
      },
      onSuccess: (response) => {
        setLoading(false);
        const { treatmentMasterList } = response;
        const data = treatmentMasterList.map((treatment, index) => ({
          value: treatment.TreatmentID,
          label: treatment.TreatmentName,
        }));
        let sortData= data.sort((a, b) => {
          if (a.label < b.label) {
            return -1;
          }
          else
          {
            return 1
          }
        }) 
        setTreatment(sortData);
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
    const roomName = !validateField("roomName");
    const locationId = !validateField("locationId");
    const TreatmentId = !validateField("TreatmentId");
    setValidationList({
      ...validationList,
      roomName,
      locationId,
      TreatmentId,
    });
    return !roomName && !locationId && !TreatmentId;
  };
  const FormContent = (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <TextField
          required={true}
          value={rowData.roomName}
          label="Room"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, roomName: e.target.value });
            validateField("roomName");
          }}
          error={validationList && validationList.roomName ? true : false}
          errorMessage={"Room is Required"}
          maxLength={40}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <MultipleCheckboxSelect
          items={treatment}
          keyField={"value"}
          textField={"label"}
          label={"Treatment"}
          checked={rowData.TreatmentId}
          setChecked={(e) => {
            setRowData({ ...rowData, TreatmentId: e });
          }}
          required={true}
          error={validationList && validationList.TreatmentId ? true : false}
          errorMessage={"Treatment is Required"}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <Select
          data={location}
          value={rowData.locationId}
          label={"Location"}
          onChange={(e) => {
            setRowData({ ...rowData, locationId: e.target.value });
            validateField("locationId");
          }}
          required={true}
          error={validationList && validationList.locationId ? true : false}
          errorMessage={"Location is Required"}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Select
          data={therapistList}
          value={rowData.therapistId}
          label={"Therapist"}
          onChange={(e) => {
            setRowData({ ...rowData, therapistId: e.target.value });
          }}
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
              currentOpr === "Add"
                ? addTreatmentRoom(e)
                : updateTreatmentRoom(e);
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
      const rowData = TreatmentRoomMasterList[id];
      setRowData({
        treatmentRoomId: rowData.treatmentRoomId,
        roomName: rowData.roomName,
        description: rowData.description,
        isActive: rowData.isActive === "No" ? 0 : 1,
        therapistId: rowData.therapistId,
        locationId: rowData.locationId,
        TreatmentId: JSON.parse(rowData.treatmentId),
      });
    }
  }, [editRecord]);
  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setRowData({
      roomName: "",
      description: "",
      isActive: "1",
      locationId: "",
      therapistId: "",
      TreatmentId: "",
    });
  };
  useEffect(() => {
    getAllLocation();
    getAllTreatment();
    getAllTherapist();
  }, []);
  const updateTreatmentRoom = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0"),
      };
      props.updateTreatmentRoom({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getTreatmentRoomMasterList(e);
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

  const deleteTreatmentRoom = (e) => {
    const { treatmentRoomId } = TreatmentRoomMasterList[id];
    setLoading(true);
    const params = {
      ...rowData,
      treatmentRoomId,
    };
    props.deleteTreatmentRoom({
      params,
      onSuccess: ({ message: displayMessage }) => {
        getTreatmentRoomMasterList(e);
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
  const addTreatmentRoom = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0"),
      };
      props.addTreatmentRoom({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getTreatmentRoomMasterList(e);
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
                      getTreatmentRoomMasterList();
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
                  label={"Add Treatment Room"}
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
                title={"List of Treatment Room"}
                columns={columns}
                data={TreatmentRoomMasterList}
                options={options}
                style={style}
                actions={[
                  {
                    icon: () => {
                      return (
                        <Refresh
                          onClick={() => {
                            getTreatmentRoomMasterList();
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
                            exportTreatmentRoomMaster();
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
      {deleteDialog && (
        <ConfirmationDialog
          open={deleteDialog}
          dialogTitle="Delete Treatment Room"
          dialogContentText="Are you sure want to delete this?"
          cancelButtonText="Cancel"
          okButtonText="Delete"
          onCancel={() => {
            setDeleteDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            setDeleteDialog(false);
            deleteTreatmentRoom(e);
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
