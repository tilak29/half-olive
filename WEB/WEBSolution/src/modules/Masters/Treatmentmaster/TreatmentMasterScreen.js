import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { AddBox, Clear, Edit, Delete, Refresh } from "@material-ui/icons";
import React, { forwardRef, useEffect, useState } from "react";
import MaterialTable from "material-table";
import Button from "../../../components/core/Button";
import Loading from "../../../components/core/Loading";
import {
  actionColumnStyle,
  GridIcons,
  options,
  style
} from "../../../components/custom/GridConfig";
import MultipleCheckboxSelect from "../../../components/custom/MultipleCheckboxSelect";
import Select from "../../../components/core/Select";
import { makeStyles } from '@material-ui/core/styles'
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";
import DisplayMessage from "../../../components/core/DisplayMessage";
import TextField from "../../../components/core/TextField";
import SingleCheckBox from "../../../components/core/SingleCheckBox";


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '0px'
  },
  textField: {
    width: "100%",
    marginTop: '0px',
  },
}));



export default function TreatmentMasterScreen(props) {
  const classes = useStyles();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [id, setId] = useState();
  const [deleteId, setDeleteId] = useState();
  const [rowData, setRowData] = useState({});
  const [emloyeeListData, setEmloyeeListData] = useState([]);

  const [edit, setEdit] = useState()
  const [showAddList, setShowAddList] = useState(false)
  const [displayList, setDisplayList] = useState(false)
  const [singleTreatment, setSingleTreatment] = useState(false)
  const [refersh, setRefersh] = useState(false)

  const [AllEmployee, setAllEmployee] = useState([])
  const [selectedFilter, setSelectedFilter] = useState([])
  const [selectDisease, setSelectDisease] = useState([])
  const [allDisease, setAllDisease] = useState([])
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [treatmentValue, setTreatmentValue] = useState("All")

  const [customError, setCustomError] = useState()



  const [gettreatmentMasterList, setGetTreatmentMasterList] = useState([]);

  const formaTime = (dateString) => {
    const gettime = new Date(dateString).toLocaleTimeString('en-US',
      { timeZone: 'UTC', hour12: false, hour: 'numeric', minute: 'numeric' }
    )
    const time = gettime == "24:00" ? "00:00" : gettime
    return time
  }

  const getdata = gettreatmentMasterList.map((data, i) => (
    {
      therapistname: data.FullName ? data.FullName : '-',
      timeslot: formaTime(data.StartTime) == "00:00" && formaTime(data.EndTime) == "00:00" ? '-' : formaTime(data.StartTime) + ' - ' + formaTime(data.EndTime),
      isactive: data.IsActive === true ? "Yes" : "No",
      id: data.TreatmentID,
      diseasename: data.DiseaseName ? data.DiseaseName : "-",
      treatmentname: data.TreatmentName,
      srNo: i + 1
    }
  ))

  const deleteButtonClick = () => {
    setDeleteDialog(true);
  }

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const columns = [

    {
      title: "Sr#",
      field: "srNo",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt",
        textAlign: "center",
      }
    },
    {
      title: "Treatment",
      field: "treatmentname",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    {
      title: "Disease",
      field: "diseasename",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    {
      title: "Therapist",
      field: "therapistname",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    {
      title: "Time Slot",
      field: "timeslot",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    {
      title: "Active",
      field: "isactive",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    {
      title: "Action",
      ...actionColumnStyle,
      hidden: edit,
      render: ({ id }) => {
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
                  editbuttonClick()
                  setLoading(true)
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setDeleteId(id);
                  deleteButtonClick()
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      printable: false,
    }
  ];

  useEffect(() => {
    setDeleteId()
    setLoading(true)
    AllTreatmentFunction()
  }, [showAddList])


  const AllTreatmentFunction = () => {
    props.getTreatmentMasterList({
      params: {
        Status: treatmentValue == "All" ? '0,1' : treatmentValue
      },
      onSuccess: (response) => {
        setLoading(false)
        const { treatmentMasterList } = response;
        setLoading(false)
        setGetTreatmentMasterList(treatmentMasterList);
      },
      onFailure: ({ message }) => {
        setLoading(false)
        displayErrorMessage(message);
      },
    })

    props.getEmployeeList({
      params: {
        stateId: null,
        designationId: "5",
        divisionId: "1",
        status: "8",
      },
      onSuccess: (response) => {
        const { employeeList } = response;
        setEmloyeeListData(employeeList)
        setLoading(false)
      },
      onFailure: ({ message }) => {
        setLoading(false)
        displayErrorMessage(message);
      },
    })
  }


  useEffect(() => {
    const data = emloyeeListData && emloyeeListData.map((data) => ({ value: data.employeeId, label: `${data.firstName} ${data.middleName} ${data.lastName}` }))
    setAllEmployee(data)
  }, [emloyeeListData])

  useEffect(() => {
    props.getAllDisease({
      onSuccess: (response) => {
        const { getAllDiseaseList } = response;
        setAllDisease(getAllDiseaseList)
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    })
  }, [])

  useEffect(() => {
    if (id) {
      const Data = gettreatmentMasterList.filter((data) => data.TreatmentID == id)
      setSingleTreatment(Data)
      const starttimeformat = formaTime(Data[0].StartTime)
      const endtimeformat = formaTime(Data[0].EndTime)


      const employeeid = Data[0].EmployeeId.split(',')
      // var getemployeeId = []
      // if(Data[0].EmployeeId){
      //   for (var i = 0; i < employeeid.length; i++) {
      //     var getId = parseInt(employeeid[i]);
      //     getemployeeId.push(getId)
      //   }
      // }

      const DiseaseId = Data[0].DiseaseId.split(',')
      // var getDiseaseId = []
      // if(Data[0].DiseaseId){
      //   for (var i = 0; i < DiseaseId.length; i++) {
      //     var getDId = parseInt(DiseaseId[i]);
      //     getDiseaseId.push(getDId)
      //   }
      // }
       const activeOrNot = Data[0].IsActive

      // if (getemployeeId) {
        setRowData({
          treatmentname: Data[0].TreatmentName,
          disease: Data[0].DiseaseId,
          isActive: activeOrNot,
          starttime: starttimeformat,
          endtime: endtimeformat
        })
        setSelectedFilter(JSON.parse(employeeid))
        setSelectDisease(JSON.parse(DiseaseId))
      // }

      setLoading(false)

    }
  }, [id])


  const addButtonClick = () => {
    setShowAddList(true)
    setValidationList({})
    setRowData({
      isActive: "1"
    });
  }
  const cancelButtonClick = () => {
    setSelectedFilter([])
    setShowAddList(false)
    setRowData({})
    setValidationList({})
    setSelectDisease([])
  }



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
    const treatmentname = !validateField("treatmentname");
    var starttime = false;
    var endtime = false;
    var timeslot = false;


    if (rowData?.starttime == "00:00" && rowData?.endtime == "00:00") {
      endtime = false
      timeslot = false
      starttime = false
    } else {
      if (rowData?.starttime && !rowData?.endtime) {
        setCustomError('End Time is Required')
        endtime = true
        timeslot = false
      } else {
        endtime = false
      }
      if (!rowData?.starttime && rowData?.endtime) {
        setCustomError('Start Time is Required')
        starttime = true
        timeslot = false
      } else {
        starttime = false
      }
      if (!starttime && !endtime) {
        if (rowData.starttime && rowData.starttime) {
          if (rowData.starttime >= rowData.endtime) {
            timeslot = true
          }
        } else {
          timeslot = false
        }
      }
    }

    setValidationList({
      ...validationList,
      timeslot,
      treatmentname,
      starttime,
      endtime
    });

    return (
      !starttime &&
      !endtime &&
      !treatmentname &&
      !timeslot
    );
  };

  useEffect(() => {
    setRowData({ ...rowData, starttime: "00:00", endtime: "00:00" })
  }, [showAddList])

  const FormContent = (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            required={true}
            value={rowData.treatmentname}
            label="Treatment"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, treatmentname: e.target.value });
              validateField("treatmentname");
            }}
            error={validationList && validationList.treatmentname ? true : false}
            errorMessage={"Treatment is Required"}
          />
        </Grid>
        <Grid item xs={12} md={4}>

          <MultipleCheckboxSelect
            items={allDisease}
            keyField={"value"}
            textField={"label"}
            label={"Disease"}
            checked={selectDisease}
            setChecked={(values) => {
              setSelectDisease(values);
            }}
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

        <Grid item xs={12} md={4}>
          <MultipleCheckboxSelect
            items={AllEmployee}
            keyField={"value"}
            textField={"label"}
            label={"Therapist Name"}
            checked={selectedFilter}
            setChecked={(values) => {
              setSelectedFilter(values);
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="time"
            label="Start Time"
            type="time"
            className={`${classes.textField} input_field`}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            value={rowData.starttime}
            onChange={(e) => {
              setRowData({ ...rowData, starttime: e.target.value });
              validateField("starttime");
            }}
          />
          {(validationList && validationList.timeslot) ? <p className="error_message">Start Time must be less than End Time </p> : validationList && validationList.starttime ? <p className="error_message">{customError}</p> : <></>}

        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="time"
            label="End Time"
            type="time"
            className={`${classes.textField} input_field`}
            // InputLabelProps={{
            //   shrink: true,
            // }}
            // inputProps={{
            //   step: 300, // 5 min
            // }}
            defaultValue="07:30"
            value={rowData.endtime}
            onChange={(e) => {
              setRowData({ ...rowData, endtime: e.target.value });
              validateField("endtime");
            }}
            disabled={rowData.starttime != null ? false : true}

          // error={validationList && validationList.Starttime ? true : false}
          />
          {validationList && validationList.endtime ? <p className="error_message">{customError}</p> : <></>}

        </Grid>
      </Grid>
    </>
  );

  const EditFormContent = (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            value={rowData.treatmentname}
            label="Treatment"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, treatmentname: e.target.value });
              validateField("treatmentname");
            }}
            error={validationList && validationList.treatmentname ? true : false}
            errorMessage={"Treatment Name is Required"}
            maxLength={30}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MultipleCheckboxSelect
            items={allDisease}
            keyField={"value"}
            textField={"label"}
            label={"Disease"}
            checked={selectDisease}
            setChecked={(values) => {
              setSelectDisease(values);
            }}
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

        <Grid item xs={12} md={4}>
          <MultipleCheckboxSelect
            items={AllEmployee}
            keyField={"value"}
            textField={"label"}
            label={"Therapist Name"}
            checked={selectedFilter}
            setChecked={(values) => {
              setSelectedFilter(values);
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="time"
            label="Start Time"
            type="time"
            className={`${classes.textField} input_field`}
            defaultValue={rowData.starttime}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            value={rowData.starttime}
            onChange={(e) => {
              setRowData({ ...rowData, starttime: e.target.value });
              validateField("Starttime");
            }}
          />
          {(validationList && validationList.timeslot) ? <p className="error_message">Start Time must be less than End Time </p> : validationList && validationList.starttime ? <p className="error_message">{customError}</p> : <></>}
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="time"
            label="End Time"
            type="time"
            className={`${classes.textField} input_field`}
            defaultValue={rowData.endtime}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            value={rowData.endtime}
            onChange={(e) => {
              setRowData({ ...rowData, endtime: e.target.value });
            }}
            disabled={rowData.starttime ? false : true}
          />
          {validationList && validationList.endtime ? <p className="error_message">{customError}</p> : <></>}
        </Grid>
      </Grid>
    </>
  );

  const cancelEditButtonClick = () => {
    setId()
    toggleEditRecord(false)
    setSelectedFilter([])
    setSelectDisease([])
    setRowData({})
  }

  const editbuttonClick = () => {
  }

  const editFormSubmitButtonClick = () => {
    if (checkAllValidation()) {
      props.editTreatmentMaster({
        params: {
          Status: parseInt(rowData.isActive ? "1" : "0"),
          Disease: selectDisease.toString(),
          EmployeeId: selectedFilter.toString(),
          StartTime: rowData && rowData.starttime ? rowData.starttime : null,
          EndTime: rowData && rowData.endtime ? rowData.endtime : null,
          treatmentid: id,
          TreatmentName: rowData.treatmentname
        },
        onSuccess: ({ message: displayMessage }) => {
          toggleEditRecord(false)
          setSelectedFilter([])
          setShowAddList(false)
          setLoading(false);
          setRowData({});
          setId()
          setValidationList({})
          setSelectDisease([])
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          AllTreatmentFunction()
        },
        onFailure: ({ message }) => {
          setLoading(false);
          setId()
          displayErrorMessage(message);
        },
      })
    }

  }
  const formSubmitButtonClick = () => {
    const starttime = rowData.starttime == "00:00" && rowData.endtime == "00:00" ? '' : rowData && rowData.starttime ? rowData.starttime : ''
    const endtime = rowData.starttime == "00:00" && rowData.endtime == "00:00" ? '' : rowData && rowData.starttime ? rowData.endtime : ''
    if (checkAllValidation()) {
      props.saveTreatmentMaster({
        params: {
          Status: parseInt(rowData.isActive ? "1" : "0"),
          Disease: selectDisease.toString(),
          EmployeeId: selectedFilter.toString(),
          StartTime: starttime,
          EndTime: endtime,
          TreatmentName: rowData.treatmentname
        },
        onSuccess: ({ message: displayMessage }) => {
          setSelectedFilter([])
          setShowAddList(false)
          setLoading(false);
          setRowData({});
          setValidationList({})
          setSelectDisease([])
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          AllTreatmentFunction()
        },
        onFailure: ({ message }) => {

          setLoading(false);
          displayErrorMessage(message);
        },
      })
    }
  }

  const add = true


  const deleteTreatment = (e) => {
    setLoading(true);
    props.deleteTreatmentMaster({
      params: {
        treatmentid: deleteId
      },
      onSuccess: ({ message: displayMessage }) => {
        setRefersh(true)
        setLoading(false);
        setDeleteId()
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
        AllTreatmentFunction()
      },
      onFailure: ({ message }) => {
        setLoading(false);
        setDeleteId()
        displayErrorMessage(message);
      },
    })
  }

  const filterStatusList = [
    { label: "All", value: "All" },
    { label: "Active", value: 1 },
    { label: "InActive", value: 0 },
  ];

  return (
    <div className="holiday-wrapper">
      {editRecord || showAddList ?
        <></>
        :
        <div className="card mb-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={2}>
              <Select
                data={filterStatusList}
                value={treatmentValue}
                label={"Status"}
                onChange={(e) => {
                  setTreatmentValue(e.target.value);
                }}
                isInline={true}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={1}>
              <div className="selection-card-actions">
                <Button
                  label={"Go"}
                  customClass="button button-primary mr-2"
                  onClick={() => { AllTreatmentFunction(); setDisplayList(true) }}
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
                  label={"Add Treatment"}
                >
                  Add
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      }

      {showAddList ?
        <>
          <div className="card">
            <div className="table-wrapper table-size-xs">
              <div className="table-wrapper mt-3">
                <div>
                  <Grid>{FormContent}</Grid>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <Button
                    onClick={() => {
                      cancelButtonClick();
                    }}
                    customClass="button button-black mr-2"
                    label={"Cancel"}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      formSubmitButtonClick();
                    }}
                    customClass="button button-primary"
                    label={"Save"}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        editRecord ?
          <>
            <div className="card">
              <div className="table-wrapper table-size-xs">
                {EditFormContent}
                <div className="d-flex justify-content-end mt-3">
                  <Button

                    onClick={() => {
                      cancelEditButtonClick();
                    }}
                    customClass="button button-black mr-2"
                    label={"Cancel"}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      editFormSubmitButtonClick();
                    }}
                    customClass="button button-primary "
                    label={"Save"}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </>
          :
          displayList ?
            <>
              <div className="card treatment-mastter-table">
                <div className="table-wrapper table-size-xs">
                  <MaterialTable
                    icons={{
                      ...GridIcons,
                      Edit: forwardRef((props, ref) => (
                        <Edit
                          {...props}
                          ref={ref}
                          onClick={() => setValidationList({})}
                        />
                      )),
                      Clear: forwardRef((props, ref) => (
                        <Clear
                          {...props}
                          ref={ref}
                          onClick={() => setValidationList({})}
                        />
                      )),
                    }}
                    title={`Treatment list`}
                    columns={columns}
                    data={getdata}
                    options={options}
                    // style={style}
                    actions={
                      add === true
                        ? [
                          {
                            icon: () => {
                              return (
                                <Refresh
                                  onClick={() => {
                                    setLoading(true)
                                    AllTreatmentFunction()
                                  }}
                                />
                              );
                            },
                            tooltip: "Refresh Data",
                            isFreeAction: true,
                          },
                        ]
                        : [
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
                        ]
                    }

                  />
                </div>
              </div>
            </>
            :
            <></>
      }


      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
      {loading && <Loading />}
      {deleteDialog && (
        <ConfirmationDialog
          open={deleteDialog}
          dialogTitle="Delete Treatment"
          dialogContentText="Delete Record ?"
          cancelButtonText="Cancel"
          okButtonText="Delete"
          onCancel={() => {
            setDeleteDialog(false);
            setLoading(false);
            setDeleteId()
          }}
          onOk={(e) => {
            setDeleteDialog(false);
            deleteTreatment(e);
          }}
        />
      )}
    </div>
  );
}
