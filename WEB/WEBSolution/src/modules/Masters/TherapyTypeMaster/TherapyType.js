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
import DatePicker from "../../../components/core/DatePicker";
import { getDisplayDate } from "../../../Utils/DateTimeUtils.js";

import Select from "../../../components/core/Select";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";

 // Add, update, delete operations for TherapyType

export default function TherapyTypeMaster(props) {
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});

  const [showGrid, setShowGrid] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const columns = [
   
    { title: "Sr#", field: "srNo", editable: "never"},
    { title: "Types Of Therapy", field: "typeName" },
    { title: "Amount", field: "amount", render : rowData => (<div style={{textAlign :"right"}}>{rowData.amount}</div>)},
    { title: "Date", field: "effectiveDate" },
    { title: "Defualt", field: "default" },
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
  const exportTherapyType = () => {
    const exportData = data.map((item) => ({
      srNo: item.srNo,
      typeName: item.therapyType,
      description: item.description,
      active: item.active,
    }));
    const header = [["Sr.No","Type Name","Amount","EffectiveDate","Default","Active"]];
    downloadExcel({
      data: exportData,
      fileName: "TherapyType",
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
    const typeName = !validateField("typeName");
    // const amount = !validateField("amount");
    const effectiveDate = !validateField("effectiveDate")
    setValidationList({
      ...validationList,
      typeName,
      // amount,
      effectiveDate

    });
    return !typeName &&
          //  !amount &&
           !effectiveDate;   
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
    setRowData({ typeName: "",amount: "",effectiveDate:null ,default:"1", isActive: "1" });
  };

  const addTherapyType = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0"),
        default: parseInt(rowData.default ? "1" : "0"),
      };
      props.saveTherapyType({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getTherapyType(e);
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

  const updateTherapyType = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      delete rowData["srNo"];
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0"),
        default: parseInt(rowData.default ? "1" : "0"),
      };
      props.saveTherapyType({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getTherapyType(e);
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

  const deleteTherapyType = (e) => {    
    const { therapyId } = data[id];
      setLoading(true); 
      const params = {
        ...rowData,
        therapyId
      };
      props.deleteTherapyType({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getTherapyType(e);
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
          value={rowData.typeName}
          label="Type Name"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, typeName: e.target.value });
            validateField("typeName");
          }}
          error={validationList && validationList.typeName ? true : false}
          errorMessage={"Type Name is Required"}
          maxLength={100}
          multiline={false}
          rows={0}
        />
      </Grid>
      <Grid item xs={12} md={4}>
      <TextField
          required={false}
          value={rowData.amount}
          label="Amount"
          numeric={true}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, amount: e.target.value });
            // validateField("amount");
          }}
          // error={validationList && validationList.amount ? true : false}
          // errorMessage={"Amount Name is Required"}
          maxLength={100}
          multiline={false}
          rows={0}
        />
      </Grid>
      <Grid item xs={12} md={4}>
      <DatePicker
        variant="inline"
          defaultValue={rowData.effectiveDate}
          disablePast={true}
          label="Effective Date"
          tooltipText={"Effective Date"}
          onChange={(date) => {
            setRowData({ ...rowData, effectiveDate: date });
            validateField("effectiveDate");
          }}
          required={false}
          error={validationList && validationList.effectiveDate ? true : false}
          errorMessage={"Effective Date is Required"}
        />
        </Grid>
      <Grid item xs={12} md={1}>
        <SingleCheckBox
          label={"Default"}
          checked={rowData.default}
          onChange={(e) => {
            setRowData({ ...rowData, default: e.target.checked });
          }}
          required={false}
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
                ? addTherapyType(e)
                : updateTherapyType(e);
            }}
            customClass="button button-primary"
            label={labels.saveButton}
          />
        </div>
      </Grid>
    </Grid>
  );


  const getTherapyType = () => {
    setLoading(true);
    const params = {
      // AUTOCODEUTILITY - Add request params here.

      filterStatus,
    };
    props.getTherapyType({
      params,
      onSuccess: (response) => {
        const { therapyType = [] } = response;
        setDisabledExport(therapyType.length === 0);
        const data = therapyType.map((item, index) => ({
          ...item,
          srNo: index + 1,
          effectiveDate:getDisplayDate(item.effectiveDate),
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
            <Grid item xs={12} md={2} sm={3}>
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
                      getTherapyType();
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
                  label={"Add Therapy Type"}
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
                title={"List of Therapy Types"}
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
                            getTherapyType();
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
                            exportTherapyType();
                          }}
                        />
                      );
                    },
                    tooltip: "Download",
                    isFreeAction: true,
                    disabled: disabledExport,
                  },
                ]}
                // detailPanel={[
                //   {
                //     tooltip: 'Show Name',
                //     render: rowData => {
                //       return (
                //         <div
                //           style={{
                //             fontSize: 100,
                //             textAlign: 'center',
                //             color: 'white',
                //             backgroundColor: '#43A047',
                //           }}
                //         >
                //           {rowData.amount}
                //         </div>
                //       )
                //     },
                //   },
                // ]}
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
          dialogTitle="Delete Therapy Type"
          dialogContentText="Are you sure you want to delete this Therapy Type ?"
          cancelButtonText="Cancel"
          okButtonText="Delete"
          onCancel={() => {
            setDeleteDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            setDeleteDialog(false);
            deleteTherapyType(e);
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
