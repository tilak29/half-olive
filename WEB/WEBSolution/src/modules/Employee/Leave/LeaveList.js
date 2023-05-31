import { Grid, IconButton, Tooltip, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { AddBox, Clear, Edit, Delete, Refresh } from "@material-ui/icons";
import React, { forwardRef, useEffect, useState } from "react";
import MaterialTable from "material-table";
import Button from "../../../components/core/Button";
import moment from "moment";
import Loading from "../../../components/core/Loading";
import {
  actionColumnStyle,
  GridIcons,
  options,
  style
} from "../../../components/custom/GridConfig";
import Select from "../../../components/core/Select";
import { makeStyles } from '@material-ui/core/styles'
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";
import DisplayMessage from "../../../components/core/DisplayMessage";
import TextField from "../../../components/core/TextField";
import DatePicker from "../../../components/core/DatePicker";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  getDisplayDate,
  getDBFormateDateTime,
} from "../../../Utils/DateTimeUtils.js";


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

const useStylesForSummary = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
}));


export default function LeaveList(props) {
  const classes = useStyles();
  const classesSummary = useStylesForSummary();

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
  const [refersh, setRefersh] = useState(false)

  const [AllEmployee, setAllEmployee] = useState([])
  const [selectedFilter, setSelectedFilter] = useState([])
  const [allDisease, setAllDisease] = useState([])
  const [deleteDialog, setDeleteDialog] = useState(false)

  const [monthlySummary, setMonthlySummary] = useState()

  const [GetLeaveMasterList, setGetLeaveMasterList] = useState([]);

  const formatDate = (dateString) => {
    const gettime = new Date(dateString).toLocaleDateString().split("/")
    const splitdate = gettime[0] + '-' + gettime[1] + '-' + gettime[2]
    return splitdate
  }
  const checkDate = (dateString) => {
    const gettime = new Date(dateString).toLocaleDateString().split("/")
    const splitdate = gettime[2] + '-' + gettime[1] + '-' + gettime[0]
    return splitdate
  }

  const getdata = GetLeaveMasterList.map((data, i) => (
    {
      employeename: data.FirstName && data.LastName ? data.FirstName + ' ' + data.LastName : '-',
      startdate: data.StartDate ? formatDate(data.StartDate) : ' - ',
      enddate:  data.EndDate ? formatDate(data.EndDate) : ' - ',
      reason: data.Reason,
      srNo: i + 1,
      id: data.LeaveId,
      category: data.Category,
      leavetype: data.LeaveType,
      days: data.Day,
      status: data.LeaveStatus == 28 ? "Requested" : data.LeaveStatus == 29 ? "Approved" : data.LeaveStatus == 30 ? "Rejected" : "Cancelled",
      StartDate: checkDate(data.StartDate)
    }
  ))

  const allmonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const todayDate = new Date();
  const getmonth = new Date().getMonth() + 1;
  const getMonth = allmonth[todayDate.getMonth()]
  const getYear = todayDate.getFullYear()

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

  var today = new Date().toLocaleDateString().split("/")
  const date = today[2] + '-' + today[1] + '-' + today[0]

  const columns = [
    
    {
      title: "Sr#",
      field: "srNo",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
        textAlign: "center",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt"
      }
    },
    {
      title: "Action",
      ...actionColumnStyle,
      hidden: edit,
      render: ({ id, StartDate, status }) => {
        return (
          StartDate >= date ?
            status == "Requested" ?
              <div className="table-edit-controls">
                <>
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="edit"
                      onClick={(e) => {
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
                        deleteButtonClick("check-button")
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </>
              </div>
              :
              <div className="table-edit-controls">
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      setDeleteId(id);
                      deleteButtonClick("check-button")
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            :
            <></>
        );
      },
      printable: false,
    },
    {
      title: "Employee",
      field: "employeename",
      cellStyle: {
        whiteSpace: "nowrap",
        // textAlign: "center",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    {
      title: "Category",
      field: "category",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    
    
    {
      title: "Start Date",
      field: "startdate",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    {
      title: "End Date",
      field: "enddate",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    {
      title: "Type",
      field: "leavetype",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    {
      title: "Reason",
      field: "reason",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    {
      title: "Status",
      field: "status",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    },
    {
      title: "Days",
      field: "days",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "4px solid #659F1C",
        height: "50px",
        fontSize: "12pt"
      }
    }
  ];



  useEffect(() => {
    setDeleteId()
    // setLoading(true)
    // AllEmployeeLeaveList()
  }, [showAddList])


  const AllEmployeeLeaveList = () => {
    if (checkAllValidation("checkEmployee")) {
      setDisplayList(true)
      setLoading(true)
      props.getLeaveList({
        params: {
          EmployeeId: selectedFilter
        },
        onSuccess: (response) => {
          const { LeaveMasterList } = response;
          setGetLeaveMasterList(LeaveMasterList)
          setLoading(false)
        },
        onFailure: ({ message }) => {
          displayErrorMessage(message);
          setLoading(false)
        },
      },
      props.getMonthlyExpenseSummaryReportList({
        params: {
          EmployeeId: selectedFilter,
          month: getmonth
        },
        onSuccess: (response) => {
          const {monthlyLeaveExpenseList}  = response;
          setMonthlySummary(monthlyLeaveExpenseList[0])
          setLoading(false)
        },
        onFailure: ({ message }) => {
          setLoading(false)
          displayErrorMessage(message);
        },
      })
      )
    }
  }


  useEffect(() => {
    const data = emloyeeListData && emloyeeListData.map((data) => ({ value: data.employeeId, label: `${data.firstName} ${data.middleName} ${data.lastName}` }))
    setAllEmployee(data)
  }, [emloyeeListData])

  useEffect(() => {
    props.getEmployeeList({
      params: {
        stateId: null,
        designationId: "",
        divisionId: "",
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
  }, [])

  const Editformadate = (dateString) => {
    const gettime = new Date(dateString).toUTCString()
    return gettime
  }

  useEffect(() => {
    if (id) {
      const Data = GetLeaveMasterList.filter((data) => data.LeaveId == id)
      const startdateformat = Editformadate(Data[0].StartDate)
      const enddateformat = Editformadate(Data[0].EndDate)


      if (startdateformat && enddateformat && Data[0].Day) {
        setRowData({
          category: Data[0].Category,
          startdate: startdateformat,
          enddate: enddateformat,
          leavetype: Data[0].LeaveType,
          reason: Data[0].Reason,
          Days: Data[0].Day
        })
      }
      setLoading(false)
    }
  }, [id])


  const addButtonClick = () => {
    setShowAddList(true)
    setValidationList({})
    // setDisplayList(false)
  }
  const cancelButtonClick = () => {
    // setSelectedFilter([])
    setShowAddList(false)
    setRowData({})
    setValidationList({})
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


  const checkAllValidation = (e) => {
    if (e === "checkEmployee") {
      let Employee
      if (selectedFilter.length != 0) {
        Employee = false
      } else {
        Employee = true
      }
      setValidationList({ ...validationList, Employee });
      return (
        !Employee
      );
    } else {
      const category = !validateField("category");
      const startdate = !validateField("startdate");
      const enddate = !validateField("enddate");
      const leavetype = !validateField("leavetype");
      const reason = !validateField("reason");

      setValidationList({
        ...validationList,
        category,
        startdate,
        enddate,
        leavetype,
        reason
      });

      return (
        !category &&
        !startdate &&
        !enddate &&
        !leavetype &&
        !reason
      );
    }
  };


  const CategoryList = [
    { label: "Privilege Leave", value: "Privilege Leave" },
    { label: "Casual Leave", value: "Casual Leave" },
    { label: "Sick Leave", value: "Sick Leave" },
  ];

  const LeaveTypeList = [
    { label: "Full Day", value: "Full Day" },
    { label: "Half Day", value: "Half Day" }
  ];
  function dateformat(value) {
    const date = new Date(value).toLocaleDateString().split("/")
    const getdate = date[2] + '-' + date[1] + '-' + date[0]
    return getdate
  }

  useEffect(() => {
    if (rowData.startdate && rowData.enddate) {
      const diffDate = Math.abs(new Date(rowData.startdate) - new Date(rowData.enddate));
      var Days = Math.ceil(diffDate / (1000 * 60 * 60 * 24)) + 1;
      if(rowData.leavetype == "Half Day"){
        Days = Days/2
        setRowData({ ...rowData, Days })
      }else{
        setRowData({ ...rowData, Days })
      }
      
    }else{
      const Days = 0
      setRowData({ ...rowData, Days })
    }
  }, [rowData.startdate, rowData.enddate,rowData.leavetype])

  const FormContent = (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Select
            required={true}
            data={CategoryList}
            value={rowData.category}
            label={"Category"}
            onChange={(e) => {
              setRowData({ ...rowData, category: e.target.value });
              validateField("category");
            }}
            error={validationList && validationList.category ? true : false}
            errorMessage={"Category is Required"}
          >
          </Select>
        </Grid>

        <Grid item xs={12} md={4}>
          <DatePicker
            defaultValue={rowData.startdate ? rowData.startdate : null}
            required={true}
            margin="none"
            label="Start Date"
            onChange={(startdate) => {
              setRowData({ ...rowData, startdate });
              validateField("startdate");
            }}
            disablePast={true}
            maxDate={rowData.enddate ? rowData.enddate : undefined}
            error={
              validationList && validationList.startdate
                ? validationList.startdate
                : false
            }
            errorMessage={"Start Date is Required"}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DatePicker
            defaultValue={rowData.enddate ? rowData.enddate : null}
            required={true}
            margin="none"
            label="End Date"
            disablePast={true}
            minDate={rowData.startdate ? rowData.startdate : undefined}
            onChange={(enddate) => {
              setRowData({ ...rowData, enddate });
              validateField("enddate");
            }}
            error={
              validationList && validationList.enddate
                ? validationList.enddate
                : false
            }
            errorMessage={"End Date is Required"}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Select
            required={true}
            data={LeaveTypeList}
            value={rowData.leavetype}
            label={"Type"}
            onChange={(e) => {
              setRowData({ ...rowData, leavetype: e.target.value });
              validateField("leavetype");
            }}
            error={validationList && validationList.leavetype ? true : false}
            errorMessage={"Type is Required"}
          >
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required={true}
            value={rowData.reason}
            label="Reason"
            numeric={undefined}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, reason: e.target.value });
              validateField("reason");
            }}
            maxLength={50}
            multiline={true}
            rows={2}
            error={validationList && validationList.reason ? true : false}
            errorMessage={"Reason is Required"}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            disabled={true}
            value={rowData.Days}
            label="Days"
            numeric={false}
            isAutoFocus={false}
          />
        </Grid>

      </Grid>
    </>
  );

  const EditFormContent = (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Select
            required={true}
            data={CategoryList}
            value={rowData.category}
            label={"Category"}
            onChange={(e) => {
              setRowData({ ...rowData, category: e.target.value });
              validateField("category");
            }}
            error={validationList && validationList.category ? true : false}
            errorMessage={"Category is Required"}
          >
          </Select>
        </Grid>

        <Grid item xs={12} md={4}>
          <DatePicker
            defaultValue={rowData.startdate}
            required={true}
            margin="none"
            label="Start Date"
            disablePast={true}
            onChange={(startdate) => {
              setRowData({ ...rowData, startdate });
              validateField("startdate");
            }}
            error={
              validationList && validationList.startdate
                ? validationList.startdate
                : false
            }
            errorMessage={"Start Date is Required"}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DatePicker
            defaultValue={rowData.enddate}
            required={true}
            margin="none"
            label="End Date"
            disablePast={true}
            onChange={(enddate) => {
              setRowData({ ...rowData, enddate });
              validateField("enddate");
            }}
            error={
              validationList && validationList.enddate
                ? validationList.enddate
                : false
            }
            errorMessage={"End Date is Required"}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Select
            required={true}
            data={LeaveTypeList}
            value={rowData.leavetype}
            label={"Type"}
            onChange={(e) => {
              setRowData({ ...rowData, leavetype: e.target.value });
              validateField("leavetype");
            }}
            error={validationList && validationList.leavetype ? true : false}
            errorMessage={"Type is Required"}
          >
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required={true}
            value={rowData.reason}
            label="Reason"
            numeric={undefined}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, reason: e.target.value });
              validateField("reason");
            }}
            maxLength={50}
            multiline={true}
            rows={2}
            error={validationList && validationList.reason ? true : false}
            errorMessage={"Reason is Required"}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            disabled={true}
            value={rowData.Days}
            label="Days"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, Days: e.target.value });
            }}
          />
        </Grid>

      </Grid>
    </>
  );

  const cancelEditButtonClick = () => {
    setId()
    toggleEditRecord(false)
    // setSelectedFilter([])
    setRowData({})
  }

  const editbuttonClick = () => {
  }



  const editFormSubmitButtonClick = () => {
    const startdate = dateformat(rowData.startdate)
    const enddate = dateformat(rowData.enddate)
    if (checkAllValidation()) {
      props.updateLeave({
        params: {
          Category: rowData.category,
          LeaveType: rowData.leavetype,
          Reason: rowData.reason,
          StartDate: startdate,
          EndDate: enddate,
          Day: rowData.Days,
          LeaveId: id
        },
        onSuccess: ({ message: displayMessage }) => {
          toggleEditRecord(false)
          setSelectedFilter([])
          // setShowAddList(false)
          setLoading(false);
          setRowData({});
          setId()
          setValidationList({})
          setDisplayList(false)
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
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
    const startdate = dateformat(rowData.startdate)
    const enddate = dateformat(rowData.enddate)

    if (checkAllValidation()) {

      props.addLeave({
        params: {
          Category: rowData.category,
          LeaveType: rowData.leavetype,
          Reason: rowData.reason,
          StartDate: startdate,
          EndDate: enddate,
          Day: rowData.Days,
          Status: 28
        },
        onSuccess: ({ message: displayMessage }) => {
          setSelectedFilter([])
          setShowAddList(false)
          setLoading(false);
          setRowData({});
          setValidationList({})
          setDisplayList(false)
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
      })
    }
  }

  const add = true


  const deleteLeave = (e) => {
    setLoading(true);
    props.deleteLeave({
      params: {
        LeaveId: deleteId
      },
      onSuccess: ({ message: displayMessage }) => {
        setRefersh(true)
        setLoading(false);
        setDeleteId()
        setDisplayList(false)
        setSelectedFilter([])
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
      },
      onFailure: ({ message }) => {
        setLoading(false);
        setDeleteId()
        displayErrorMessage(message);
      },
    })
  }

  return (
    <div className="holiday-wrapper">
      {editRecord || showAddList ?
        <></>
        :
        <div className="card mb-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <Select
                label={"Employee"}
                data={AllEmployee}
                required={true}
                value={selectedFilter}
                onChange={(e) => {
                  setSelectedFilter(e.target.value);
                  validateField("disease");
                }}
                error={validationList && validationList.Employee ? true : false}
                errorMessage={"Employee is Required"}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={1}>
              <div className="selection-card-actions">
                <Button
                  label={"Go"}
                  customClass="button button-primary mr-2"
                  onClick={() => { AllEmployeeLeaveList() }}
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
                  label={"Add Leave"}
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
                      // setDisplayList(false)
                    }}
                    customClass="button button-black mr-2"
                    label={"Cancel"}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      formSubmitButtonClick();
                      // setDisplayList(false)
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
                      // setDisplayList(false)
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
              <div className={`${classesSummary.root} current-leave-summary mb-3`}>
                <p className="mb-0">Current Leave Summary - PL : {monthlySummary && monthlySummary.PL ? monthlySummary.PL : 0} | CL : {monthlySummary && monthlySummary.CL ? monthlySummary.CL : 0} | SL : {monthlySummary && monthlySummary.SL ? monthlySummary.SL : 0} </p>
              </div>
              <div className="card">
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
                    title={`Leave list`}
                    columns={columns}
                    data={getdata}
                    options={options}
                    style={style}
                    actions={ [
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
          dialogTitle="Delete Leave"
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
            deleteLeave(e);
          }}
        />
      )}
    </div>
  );
}
