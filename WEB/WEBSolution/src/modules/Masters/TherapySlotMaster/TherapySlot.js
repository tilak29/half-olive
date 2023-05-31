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
import { getFormatTime} from "../../../Utils/DateTimeUtils.js";

import Select from "../../../components/core/Select";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";

 // Add, update, delete operations for TherapySlot

export default function TherapySlotMaster(props) {
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});

  const [showGrid, setShowGrid] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const columns = [
   
    { title: "Sr#", field: "srNo", editable: "never"},
    { title: "Types Of Therapy", field: "typeName" },
    { title: "Start Time", field: "startTime" },
    { title: "End Time", field: "endTime" },
    { title: "No Of People", field: "capacity" ,  render : rowData => (<div style={{textAlign :"right"}}>{rowData.capacity}</div>)},
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
  const exportTherapySlot = () => {
    const exportData = data.map((item) => ({
      srNo: item.srNo,
      typeName: item.therapySlot,
      description: item.description,
      active: item.active,
    }));
    const header = [["Sr.No","Types Of Therapy","Start Time","End Time","No Of People","Active"]];
    downloadExcel({
      data: exportData,
      fileName: "TherapySlot",
      header: header,
    });
  };
  

  // filter related variables and methods. - Start

  const [filterStatus, setFilterStatus] = useState("");
  const [filterStatusError, setFilterStatusError] = useState(false);
  const [filterTherapy , setFilterTherapy] = useState("") 
  const [filterTherapyError , setFilterTherapyError] = useState(false) 

  const filterStatusList = [
    { label: "All", value: "tsm.IsActive" },
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
    const startTime = !validateField("startTime")
    const endTime = !validateField("endTime")
    setValidationList({
      ...validationList,
      typeName,
      startTime,
      endTime

    });
    return !typeName &&
           !startTime &&
           !endTime ;   
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
    if (rowData.startTime === rowData.endTime && rowData.startTime > rowData.endTime) {
      setValidationList({...validationList, startTime:true})
      isValid= false
    } else{
      setValidationList({ ...validationList, startTime: false });
    }
    if (rowData.startTime > rowData.endTime) {
      setValidationList({...validationList, endTime:true})
      isValid= false
    } else{
      setValidationList({ ...validationList, endTime: false });
    }
    return isValid;
  };
  
  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        ...rowData,
        typeName: JSON.parse(rowData.type),
      });
    }
  }, [currentOpr, data, editRecord, id]);


  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setRowData({ typeName:'',capacity: "",startTime:"" ,endTime:"", isActive: "1" });
  };

  const [therapyType,setTherapyType] = useState([])

  // const getTherapyType = () => {
  //   const params = {
  //   };
  //   props.getTherapyType({
  //     params,
  //     onSuccess: (response) => {
  //       // const { therapyType = [] } = response;
  //       // const therapy = therapyType.map((item, index) => ({
  //       //   value: item.therapyId,
  //       //   label: item.typeName,
  //       // }));
  //       let allOptionObj = { label: "All", value: "rm.DeletedBy" };
  //      const { therapyType } = response;
  //      therapyType.splice(0, 0, allOptionObj);
  //      setTherapyType(therapyType);
  //      console.log(therapyType)
  //       // setTherapy(therapy);
  //     },
  //     onFailure: ({ message }) => {
  //       setLoading(false);
  //     },
  //   });
  // };

  const [therapyCategory , setTherapyCategory] = useState([])

  const getTherapyCategory = () => {
    const params = {
    };
    props.getTherapyCategory({
      params,
      onSuccess: (response) => {
        // const { therapyType = [] } = response;
        // const therapy = therapyType.map((item, index) => ({
        //   value: item.therapyId,
        //   label: item.typeName,
        // }));
        let allOptionObj = { label: "All", value: "tsm.Type" };
       const { therapyCategory } = response;
       therapyCategory.splice(0, 0, allOptionObj);
       setTherapyCategory(therapyCategory);
       console.log(therapyCategory)
        // setTherapy(therapy);
      },
      onFailure: ({ message }) => {
        setLoading(false);
      },
    });
  };


useEffect(()=>{
  // getTherapyType();
  getTherapyCategory();
},[])


  const addTherapySlot = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0")
      };
      props.saveTherapySlot({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getTherapySlot(e);
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

  const updateTherapySlot = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      delete rowData["srNo"];
      debugger;
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0")
      };
      props.saveTherapySlot({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getTherapySlot(e);
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

  const deleteTherapySlot = (e) => {    
    const { therapySlotId } = data[id];
      setLoading(true); 
      const params = {
        ...rowData,
        therapySlotId
      };
      props.deleteTherapySlot({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getTherapySlot(e);
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
        <Select
        data={therapyCategory}
        value={rowData.typeName}
        label={"Type Name"}
        onChange={(e) => {
          setRowData({ ...rowData, typeName: e.target.value });
          validateField("typeName");
        }}
        required={true}
        error={validationList && validationList.typeName ? true : false}
        errorMessage={"Type Name is Required"}
      />
      </Grid>
      <Grid item xs={12} md={4}>
      <TextField
          required={true}
          value={rowData.capacity}
          label="No Of People"
          numeric={true}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, capacity: e.target.value });
            validateField("capacity");
          }}
          error={validationList && validationList.capacity ? true : false}
          errorMessage={"No Of People is Required"}
          maxLength={100}
          multiline={false}
          rows={0}
        />
      </Grid>
      <Grid item xs={12} md={4}>
      <TextField
          required={true}
          id={"time"}
          label={"Start Time"}
          type={"time"}
          value={rowData.startTime}
          onChange={(e) => {
            setRowData({ ...rowData, startTime: e.target.value });
          }}
          error={validationList && validationList.startTime ? true : false}
          errorMessage={"Start Time is Required"} 
          InputLabelProps={{
            shrink: true,
          }}
        />
        {(validationList.startTime && rowData.startTime === rowData.endTime ? <p style={{color:"red",fontSize:"12px"}}>{"Start Time is equal to End Time"}</p> : '')}
        </Grid>
      <Grid item xs={12} md={4}>
      <TextField
          required={true}
          id={"time"}
          label={"End Time"}
          type={"time"}
          value={rowData.endTime}
          onChange={(e) => {
            setRowData({ ...rowData, endTime: e.target.value });
          }}
          error={validationList && validationList.endTime ? true : false }
          errorMessage={"End Time is Required"}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {(validationList.endTime && rowData.endTime < rowData.startTime ? <p style={{color:"red",fontSize:"12px"}}>{"Start Time is Less Than End Time"}</p> : '')}
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
                ? addTherapySlot(e)
                : updateTherapySlot(e);
            }}
            customClass="button button-primary"
            label={labels.saveButton}
          />
        </div>
      </Grid>
    </Grid>
  );


  const getTherapySlot = () => {
    setLoading(true);
    const params = {
      // AUTOCODEUTILITY - Add request params here.
      filterTherapy,
      filterStatus,
      therapyId : setTherapyCategory === "All" ? "" : setTherapyCategory,
    };
    props.getTherapySlot({
      params,
      onSuccess: (response) => {
        const { therapySlot = [] } = response;
        setDisabledExport(therapySlot.length === 0);
        const data = therapySlot.map((item, index) => ({
          ...item,
          srNo: index + 1,
          startTime:getFormatTime(item.startTime),
          endTime:getFormatTime(item.endTime),
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
                data={therapyCategory}
                value={filterTherapy}
                label={"Therapy Type"}
                onChange={(e) => {
                  const filterTherapy = e.target.value || "";
                  setFilterTherapyError(false);
                  setFilterTherapy(filterTherapy);
                }}
                isInline={true}
                errorMessage={"Therapy is Required"}
                required={true}
                error={filterTherapyError}
              />
            </Grid>
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
                    if (filterTherapy !== "") {
                      getTherapySlot();
                    } else {
                      filterStatus === "" && setFilterStatusError(true);
                      filterTherapy === "" && setFilterTherapyError(true);
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
                  label={"Add Therapy Slot"}
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
                title={"List of Therapy Slot"}
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
                            getTherapySlot();
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
                            exportTherapySlot();
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
          dialogTitle="Delete Therapy Slot"
          dialogContentText="Are you sure you want to delete this Therapy Slot ?"
          cancelButtonText="Cancel"
          okButtonText="Delete"
          onCancel={() => {
            setDeleteDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            setDeleteDialog(false);
            deleteTherapySlot(e);
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
