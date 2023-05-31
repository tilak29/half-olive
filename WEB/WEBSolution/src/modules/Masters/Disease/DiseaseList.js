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

import { Edit , Delete} from "@material-ui/icons";
import { Grid, IconButton, Tooltip, } from "@material-ui/core";
import { actionColumnStyle } from "../../../components/custom/GridConfig";
import { labels } from "../../../Config.json";
import Button from "../../../components/core/Button";

import TextField from "../../../components/core/TextField";
import SingleCheckBox from "../../../components/core/SingleCheckBox";

import Select from "../../../components/core/Select";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";

 // Add, update, delete operations for Disease

export default function DiseaseMaster(props) {
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});

  const [showGrid, setShowGrid] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const columns = [
   
    { title: "Sr#", field: "srNo", editable: "never"},
    { title: "Disease Name", field: "diseaseName" },
    { title: "Description", field: "description" },
    { title: "Active", field: "active" },
    {
      title: "Action",
      ...actionColumnStyle,
      render: ({ tableData: { id } }) => {
        return (
          <div className="table-edit-controls">
          
            {(
            <Tooltip title="Edit">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setId(id);
                  toggleEditRecord(true);
                  setCurrentOpr("Update");
                  setValidationList({});
                  setRowData({ });
                }}
                >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            )}
               
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
    },
  ];
  const [data, setData] = useState();
 
  const [disabledExport, setDisabledExport] = useState(false);
  const exportDiseaseMaster = () => {
    const exportData = data.map((item) => ({
      srNo: item.srNo,
      diseaseName: item.diseaseName,
      description: item.description,
      active: item.active,
    }));
    const header = [["Sr.No","Disease Name","Description","Active"]];
    downloadExcel({
      data: exportData,
      fileName: "DiseaseMaster",
      header: header,
    });
  };

  // filter related variables and methods. - Start

  const [filterStatus, setFilterStatus] = useState("");
  const [filterStatusError, setFilterStatusError] = useState(false);

  const filterStatusList = [
    { label: "All", value: 'IsActive' },
    { label: "Active", value: 1 },
    { label: "InActive", value: 0 },
  ];

  // filter related variables and methods. - End
  const [rowData, setRowData] = useState({});
  const [validationList, setValidationList] = useState({});
  const [currentOpr, setCurrentOpr] = useState();
  const [id, setId] = useState();

  const checkAllValidation = (value) => {
    // AUTOCODEUTILITY - Add customized validation here.
    const diseaseName = !validateField("diseaseName");
    const description = !validateField("description")
      
    setValidationList({
      ...validationList,
      diseaseName,
      description,
    });
    return !diseaseName && !description;   
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
  
  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        ...rowData,
      });
    }
  }, [currentOpr, data, editRecord, id]);


  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setRowData({ diseaseName: "",description: "", isActive: "1" });
  };

  const addDiseaseMaster = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0"),
      };
      props.saveDiseaseMaster({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getDiseaseMaster(e);
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

  const updateDiseaseMaster = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      delete rowData["srNo"];
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0"),
      };
      props.saveDiseaseMaster({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getDiseaseMaster(e);
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

  const deleteDiseaseMaster = (e) => {    
    const { diseaseId } = data[id];
      setLoading(true); 
      const params = {
        ...rowData,
        diseaseId
      };
      props.deleteDiseaseMaster({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getDiseaseMaster(e);
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

  const FormContent = (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <TextField
          required={true}
          value={rowData.diseaseName}
          label="Disease Name"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, diseaseName: e.target.value });
            validateField("diseaseName");
          }}
          error={validationList && validationList.diseaseName ? true : false}
          errorMessage={"Disease Name is Required"}
          maxLength={100}
          multiline={false}
          rows={0}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          required={false}
          value={rowData.description}
          label="Description"
          numeric={undefined}
          isAutoFocus={true}
          onChange={(e) => {
            setRowData({ ...rowData, description: e.target.value });
            // validateField("description");
          }}
          // error={validationList && validationList.description ? true : false}
          // errorMessage={"Description is Required"}
          maxLength={1000}
          multiline={true}
          rows={5}
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
                ? addDiseaseMaster(e)
                : updateDiseaseMaster(e);
            }}
            customClass="button button-primary"
            label={labels.saveButton}
          />
        </div>
      </Grid>
    </Grid>
  );


  const getDiseaseMaster = () => {
    setLoading(true);
    const params = {
      // AUTOCODEUTILITY - Add request params here.

      filterStatus,
    };
    props.getDiseaseMaster({
      params,
      onSuccess: (response) => {
        const { diseaseMasterList = [] } = response;
        setDisabledExport(diseaseMasterList.length === 0);
        const data = diseaseMasterList.map((item, index) => ({
          ...item,
          srNo: index + 1,
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
                      getDiseaseMaster();
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
                  label={"Add Disease"}
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
          <div className="table-wrapper table-size-xs" >
            {!editRecord && (
                <MaterialTable
                icons={GridIcons}
                title={"List of Diseases"}
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
                            getDiseaseMaster();
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
                            exportDiseaseMaster();
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
      {deleteDialog && (
        <ConfirmationDialog
          open={deleteDialog}
          dialogTitle="Delete Disease"
          dialogContentText="Are you sure you want to delete this Disease ?"
          cancelButtonText="Cancel"
          okButtonText="Delete"
          onCancel={() => {
            setDeleteDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            setDeleteDialog(false);
            deleteDiseaseMaster(e);
          }}
        />
      )}


      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
