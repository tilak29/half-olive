import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Edit, Refresh, SaveAlt, Done, KeyboardBackspace as BackIcon } from "@material-ui/icons";
//import imgfemale from '../../Images/femalegreen.png';
import {
  GridIcons,
  options,
  style,
  actionColumnStyle,
} from "../../components/custom/GridConfig";
import downloadExcel from "../../Utils/DownloadExcel";
import { IconButton, Tooltip, Typography, Grid } from "@material-ui/core";

// import Form from "../../components/core/Form";
import DisplayMessage from "../../components/core/DisplayMessage";
import DashboardSummaryInfo from "./DashboardSummaryInfo";
import DashboardChemistBirthdayList from "./DashboardChemistBirthdayList";
import LeaveRequestList from "./LeaveRequests/LeaveRequestListContainer";
import ApproveTourPlan from "./ApproveTourPlan/ApproveTourPlanListContainer";
import UnlockDCRRequestList from "./UnlockDCRRequests/UnlockDCRRequestListContainer";
import BroadcastMobileNewsNotification from "./BroadCastMobileNewsNotification/BroadcastMobileNewsNotificationContainer";
// import CustomComponentsDemo from "../../components/custom/CustomComponentsDemo";
import DialogControl from "../../components/core/Dialog";
import CustomLegend from "../../components/custom/CustomLegend/CustomLegend";
import Loading from "../../components/core/Loading";
import Button from "../../components/core/Button";
import LeaveSummary from "../../components/custom/LeaveSummary";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DayComponent from "../../components/custom/DayComponent";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";

// // import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";


/**
 * Dashboard component to redirect after login with various details
 * Designation Based
 * @author Tejal Sali
 */
export default function Dashboard(props) {
  const [displayMessage, setDisplayMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [chemistCount, setChemistCount] = useState("");
  const [stateWisechemist, setStateWisechemist] = useState({});
  const [chemistAppCount, setChemistAppCount] = useState("");
  const [stateWiseChemistApp, setStateWiseChemistApp] = useState({});
  const [stockistAppCount, setStockistAppCount] = useState("");
  const [stateWiseStockistApp, setStateWiseStockistApp] = useState({});
  const [chemistFirstInvoiceCount, setChemistFirstInvoiceCount] = useState("");
  const [stateWiseChemistFirstInvoice, setStateWiseChemistFirstInvoice] = useState({});
  const [chemistScannedPoint, setChemistScannedPoint] = useState("");
  const [stateWisechemistScannedPoint, setStateWiseChemistScannedPoint] = useState({});

  const [dayWiseInvoiceAmount, setDayWiseInvoiceAmount] = useState("");
  const [dayWiseInvoiceAmountList, setDayWiseInvoiceAmountList] = useState({});
  const [dayWiseInvoiceCount, setDayWiseInvoiceCount] = useState("");
  const [dayWiseInvoiceCountList, setDayWiseInvoiceCountList] = useState({});

  const [monthWiseInvoiceAmount, setMonthWiseInvoiceAmount] = useState("");
  const [monthWiseInvoiceAmountList, setMonthWiseInvoiceAmountList] = useState({});
  const [monthWiseInvoiceCount, setMonthWiseInvoiceCount] = useState("");
  const [monthWiseInvoiceCountList, setMonthWiseInvoiceCountList] = useState({});

  // const [dayWisePendingOrderCount, setDayWisePendingOrderCount] = useState("");
  // const [dayWisePendingOrderList, setDayWisePendingOrderList] = useState({});
  const [monthWisePendingOrderCount, setMonthWisePendingOrderCount] = useState("");
  const [monthWisePendingOrderList, setMonthWisePendingOrderList] = useState({});
  const [isDashboardCountVisible, setIsDashboardCountVisible] = useState(false);

  const [newRegCount, setNewRegCount] = useState("");
  const [totalUploadedInvoice, setTotalUploadedInvoice] = useState("");
  const [totalRedeemReq, setTotalRedeemReq] = useState("");
  const [featureEndDateNotification, setFeatureEndDateNotification] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const [dialogData, setDialogData] = useState();
  const [dialogTitle, setDialogTitle] = useState();
  const [columnName, setColumnName] = useState();

  const [showListDialog, setShowListDialog] = useState(false);
  const [newDialogTitle, setNewDialogTitle] = useState();
  const [newDialogData, setnewDialogData] = useState();
  const [newFlag, setNewFlag] = useState();
  const [newColumnName, setNewColumnName] = useState();
  const [shownewColumnDialog, setShownewColumnDialog] = useState(false);

  const [monthlySummary, setMonthlySummary] = useState(false);
  const [singleEmployeeData, setSingleEmployeeData] = useState([]);
  const [holidayListData, setHolidayListData] = useState([]);

  const [value, onChange] = useState(new Date());
  // const events = [{ title: "today's event", date: new Date() }];


  const { loggedInDesignationId, filterDesignation = {} } = props;

  const {
    adminDesignations = [],
    aslAndAboveDesignations = [],
    // slDesignations = [],
  } = filterDesignation;

  const isAdmin = adminDesignations.includes(loggedInDesignationId);
  const isManager = aslAndAboveDesignations.includes(loggedInDesignationId);
  // const isSL = slDesignations.includes(designationId);

  useEffect(() => {
    if (isAdmin) getDashboardCountData(1);
  }, []);

  const columns = [
    {
      title: "Sr. No",
      field: "srNo",
    },
    {
      title: "State",
      field: "stateName",
    },
    {
      title: columnName,
      field: "stateWiseCnt",
      render: ({ tableData: { id } }) => {
        return (
          <div>
            {dialogData[id].stateWiseCnt > 0 &&
              <div
                className="cursor-pointer text-primary"
                onClick={() => {
                  if (newFlag === 1 || newFlag === 2 || newFlag === 3 || newFlag === 4 || newFlag === 5 || newFlag === 10)
                    setAndDisplayNewDialog(dialogData[id].stateId, newFlag, dialogData[id].stateName);
                }}
              >
                {dialogData[id].stateWiseCnt}
              </div>
            }
            {dialogData[id].stateWiseCnt === 0 &&
              <div> {dialogData[id].stateWiseCnt}  </div>
            }
          </div>


        );
      }

    }
  ];

  const newColumns = [
    {
      title: "Sr. No",
      field: "srNo",
    },
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Mobile Number",
      field: "mobile",
    },
    {
      title: "City Name",
      field: "cityName",
    },
    {
      title: "Area Name",
      field: "areaName",
    },
    {
      title: newColumnName,
      hidden: !shownewColumnDialog,
      field: "data",
    }
  ];

  const setAndDisplayNewDialog = (stateId, flag, stateName) => {
    const params = {
      stateId: stateId,
      flag: flag
    };
    setLoading(true);
    props.getDashboardStateWiseData({
      params,
      onSuccess: (response) => {
        let { statewiseCount = [] } = response;
        if (statewiseCount.length > 0) {
          statewiseCount = statewiseCount.map((record, index) => {
            return {
              ...record,
              srNo: index + 1,
            };
          });
        }

        if (flag === 1) {
          setShownewColumnDialog(false);
        }
        else if (flag === 2) {
          setShownewColumnDialog(false);
        }
        else if (flag === 3) {
          setShownewColumnDialog(false);
        }
        else if (flag === 4) {
          setShownewColumnDialog(true);
          setNewColumnName("No of Invoice")
        }
        else if (flag === 5) {
          setShownewColumnDialog(true);
          setNewColumnName("Scanned Points")
        }
        else if (flag === 6) {
          setShownewColumnDialog(true);
          setNewColumnName("Amount")
        }
        else if (flag === 7) {
          setShownewColumnDialog(true);
          setNewColumnName("Amount")
        }
        else if (flag === 8) {
          setShownewColumnDialog(true);
          setNewColumnName("Amount")
        }
        else if (flag === 9) {
          setShownewColumnDialog(true);
          setNewColumnName("Amount")
        }
        else if (flag === 10) {
          setShownewColumnDialog(true);
          setNewColumnName("Order Amount")
        }

        setNewDialogTitle(dialogTitle + " of " + stateName);
        setnewDialogData(statewiseCount);
        setShowListDialog(true);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });

  }

  const setAndDisplayDialog = (flag, title) => {
    setNewFlag(flag);
    const params = {
      flag: flag
    };
    setLoading(true);
    props.getDashboardStateWiseCountData({
      params,
      onSuccess: (response) => {
        let { statewiseCount = [] } = response;
        if (statewiseCount.length > 0) {
          statewiseCount = statewiseCount.map((record, index) => {
            return {
              ...record,
              srNo: index + 1,
            };
          });
        }
        setLoading(false);

        if (flag === 1) {
          setDialogData(statewiseCount);
          setColumnName("Chemist Count")
        }
        else if (flag === 2) {
          setDialogData(statewiseCount);
          setColumnName("Count")
        }
        else if (flag === 3) {
          setDialogData(statewiseCount);
          setColumnName("Count")
        }
        else if (flag === 4) {
          setDialogData(statewiseCount);
          setColumnName("Count")
        }
        else if (flag === 5) {
          setDialogData(statewiseCount);
          setColumnName("Point")
        }
        else if (flag === 6) {
          setDialogData(statewiseCount);
          setColumnName("Amount")
        }
        else if (flag === 7) {
          setDialogData(statewiseCount);
          setColumnName("Count")
        }
        else if (flag === 8) {
          setDialogData(statewiseCount);
          setColumnName("Invoice Amount")
        }
        else if (flag === 9) {
          setDialogData(statewiseCount);
          setColumnName("Count")
        }
        else if (flag === 10) {
          setDialogData(statewiseCount);
          setColumnName("No of Orders")
        }
        setDialogTitle(title)
        setShowDialog(true)

      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  }

  const exportDialogData = () => {
    const header = [
      [
        "Sr. No",
        "State Name",
        columnName
      ],
    ];

    let exportData = dialogData
      .map((x) => {
        x = {
          SrNo: parseInt(x.tableData.id) + 1,
          stateName: x.stateName,
          stateWiseCnt: x.stateWiseCnt
        };
        return x;
      });

    downloadExcel({
      data: exportData,
      fileName: dialogTitle,
      header: header,
    });
  };

  const exportNewDialogData = () => {
    const header = [
      [
        "Sr. No",
        "Name",
        "Mobile Number",
        "City Name",
        "Area Name",
      ],
    ];

    let exportData = newDialogData
      .map((x) => {
        x = {
          SrNo: parseInt(x.tableData.id) + 1,
          name: x.name,
          mobile: x.mobile,
          cityName: x.cityName,
          stareaNameteName: x.areaName,
        };
        return x;
      });

    downloadExcel({
      data: exportData,
      fileName: dialogTitle,
      header: header,
    });
  };

  const getDashboardCountData = (flag) => {
    setLoading(true);
    const params = {
      flag: flag
    };
    props.getDashboardCountData({
      params,
      onSuccess: (response) => {
        const { countData = [] } = response;
        if (countData != null && countData.length > 0) {
          setChemistCount(countData[0][0].totalChemist);
          setChemistAppCount(countData[1][0].appInstalledByChemist);
          setStockistAppCount(countData[2][0].appInstalledByStockist);
          setChemistFirstInvoiceCount(countData[3][0].firstTimeInvoiceScannedCount);
          setChemistScannedPoint(countData[4][0].scannedPoints);
          setDayWiseInvoiceAmount(countData[5][0].totalInvoiceAmountForDay);
          setDayWiseInvoiceCount(countData[6][0].totalInvoiceCountForDay);
          setMonthWiseInvoiceAmount(countData[7][0].totalInvoiceAmountForMonth);
          setMonthWiseInvoiceCount(countData[8][0].totalInvoiceCountForMonth);
          setMonthWisePendingOrderCount(countData[9][0].pendingOrdersForMonth);

          setNewRegCount(countData[10][0].pendingRegApprovalCount);
          setTotalUploadedInvoice(countData[11][0].pendingInvVerificationCount);
          setTotalRedeemReq(countData[12][0].pendingRedmApprovalCount);
          setFeatureEndDateNotification(countData[13][0].featureEndingCount);

        }
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        setIsDashboardCountVisible(false);
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


  
  const getmonth = new Date().getMonth() + 1;

  // get monthly summary data
  useEffect(()=>{
  const params = {
    month: getmonth
  }
  props.getMonthlyExpenseSummaryReportList({
    params,
    onSuccess: (response) => {
      const {monthlyLeaveExpenseList}  = response;
      // setMonthlySummary(monthlyLeaveExpenseList[0])
      setLoading(false)
    },
    onFailure: ({ message }) => {
      setLoading(false)
      displayErrorMessage(message);
    },
  });
  },[])

  const allmonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const todayDate = new Date();
  const getCurrentmonth = new Date().getMonth() + 1;
  const getMonth = allmonth[todayDate.getMonth()]
  const getYear = todayDate.getFullYear()

  useEffect(() => {
    props.getSingleEmyloyeeData({
      params : {
        userloginId: 28
      },
      onSuccess: (response) => {
      const {singleemployee} = response
        setSingleEmployeeData(singleemployee)
        // setMonthlySummary(monthlyLeaveExpenseList[0])
        setLoading(false)
      },
      onFailure: ({ message }) => {
        setLoading(false)
        displayErrorMessage(message);
      },
    });
    props.getHolidayList({
      params : {
        year: new Date().getFullYear()
      },
      onSuccess: (response) => {
        const {holidayList} = response 
        setHolidayListData(holidayList)
        console.log("response :L: ",holidayList);
        setLoading(false)
      },
      onFailure: ({ message }) => {
        setLoading(false)
        displayErrorMessage(message);
      },
    });
  },[])

  return (
    <div>
      <BroadcastMobileNewsNotification />
      {!isAdmin && (
        <DashboardSummaryInfo
          getDashboardSummaryData={props.getDashboardSummaryData}
          getOrderMonthlyCountData={props.getOrderMonthlyCountData}
          setDisplayMessage={setDisplayMessage}
        />
      )}
      {showDialog && (
        <DialogControl
          open={showDialog}
          isDialogTitle={false}
          fullWidth={true}
          dialogContent={
            <div className="table-wrapper">
              <MaterialTable
                title={dialogTitle}
                columns={columns}
                data={dialogData}
                style={style}
                options={{
                  ...options,
                  rowStyle: (rowData) => ({
                    backgroundColor:
                      rowData.isDeleted === 1
                        ? "#BDBCB7"
                        : "",
                  })
                }}
                actions={[
                  {
                    icon: () => {
                      return (
                        <SaveAlt
                          onClick={() => {
                            exportDialogData();
                          }}
                        />
                      );
                    },
                    tooltip: "Download",
                    isFreeAction: true,
                    disabled: dialogData.length === 0
                  },
                ]}
              />
            </div>
          }
          cancelAction={false}
          submitButtonText={"Ok"}
          onSubmit={(e) => {
            setShowDialog(false)
          }}
        />
      )}
      {showListDialog && (
        <DialogControl
          open={showListDialog}
          isDialogTitle={false}
          fullWidth={true}
          dialogContent={
            <div className="table-wrapper">
              <MaterialTable
                // title={dialogTitle}
                title={
                  <React.Fragment>
                    <Tooltip title="Back">
                      <IconButton
                        size="small"
                        className="mr-2"
                        onClick={() => {
                          setShowListDialog(false);
                        }}
                      >
                        <BackIcon size="small" />
                      </IconButton>
                    </Tooltip>
                    {newDialogTitle}
                    {/* {dialogTitle} */}
                  </React.Fragment>
                }
                columns={newColumns}
                data={newDialogData}
                style={style}
                options={{
                  ...options,
                  rowStyle: (rowData) => ({
                    backgroundColor:
                      rowData.isDeleted === 1
                        ? "#BDBCB7"
                        : "",
                  })
                }}
                actions={[
                  {
                    icon: () => {
                      return (
                        <SaveAlt
                          onClick={() => {
                            exportNewDialogData();
                          }}
                        />
                      );
                    },
                    tooltip: "Download",
                    isFreeAction: true,
                    disabled: dialogData.length === 0
                  },
                ]}
              />
            </div>
          }
          submitButtonText={"Back"}
          onSubmit={(e) => {
            setShowListDialog(false);
          }}
          onCancel={() => {
            setShowListDialog(false);
            setShowDialog(false);
          }}
        />

      )}

      {isAdmin && (
        <div >

          <div style={{"display":"flex",flexWrap:"nowrap"}} >
            <div className="col mb-3 highlighted-card-wrap" onClick={(e) => setAndDisplayDialog(1, "Chemists in System")}>
              <div className="card highlighted-card">
                <div class="media">
                  <div class="media-body align-self-center" style={{"fontSize":"12pt"}}>
                    <h4 class="mt-0 mb-1" >7</h4>
                    Male Guest
                  </div>
                  <div class="ml-3 align-self-center" >
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" class="svg-inline--fa fa-users fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="col mb-3 highlighted-card-wrap" onClick={(e) => setAndDisplayDialog(1, "Chemists in System")}>
              <div className="card highlighted-card">
                <div class="media">
                  <div class="media-body align-self-center" style={{"fontSize":"12pt"}}>
                    <h4 class="mt-0 mb-1" >3</h4>
                    Female Guest
                  </div>
                  <div class="ml-3 align-self-center" >
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" class="svg-inline--fa fa-users fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="col mb-3 highlighted-card-wrap" onClick={(e) => setAndDisplayDialog(1, "Chemists in System")}>
              <div className="card highlighted-card">
                <div class="media">
                  <div class="media-body align-self-center" style={{"fontSize":"12pt"}}>
                    <h4 class="mt-0 mb-1" >10</h4>
                    Total Guest
                  </div>
                  <div class="ml-3 align-self-center" >
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" class="svg-inline--fa fa-users fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{"display":"flex",flexWrap:"nowrap"}}>
            <div className="col mb-3 highlighted-card-wrap" onClick={(e) => setAndDisplayDialog(1, "Chemists in System")}>
              <div className="card highlighted-card">
                <div class="media">
                  <div class="media-body align-self-center" style={{"fontSize":"12pt"}}>
                    <h4 class="mt-0 mb-1" >3</h4>
                    Male Therapist
                  </div>
                  <div class="ml-3 align-self-center" >
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" class="svg-inline--fa fa-users fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                    {/* <image height="200" width="200" src="../../Images/femalegreen.png"></image> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="col mb-3 highlighted-card-wrap" onClick={(e) => setAndDisplayDialog(1, "Chemists in System")}>
              <div className="card highlighted-card">
                <div class="media">
                  <div class="media-body align-self-center" style={{"fontSize":"12pt"}}>
                    <h4 class="mt-0 mb-1" >3</h4>
                    Female Therapist
                  </div>
                  <div class="ml-3 align-self-center" >
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" class="svg-inline--fa fa-users fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="col mb-3 highlighted-card-wrap" onClick={(e) => setAndDisplayDialog(1, "Chemists in System")}>
              <div className="card highlighted-card">
                <div class="media">
                  <div class="media-body align-self-center" style={{"fontSize":"12pt"}}>
                    <h4 class="mt-0 mb-1" >6</h4>
                    Total Therapist
                  </div>
                  <div class="ml-3 align-self-center" >
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" class="svg-inline--fa fa-users fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{"display":"flex",flexWrap:"nowrap"}}>
            <div className="col mb-3 highlighted-card-wrap" onClick={(e) => setAndDisplayDialog(4, "Invoices Scanned")}>
              <div className="card highlighted-card">
                <div class="media">
                  <div class="media-body align-self-center" style={{"fontSize":"12pt"}}>
                    <h4 class="mt-0 mb-1">15</h4>
                    Occupied
                  </div>
                  <div class="ml-3 align-self-center" >

                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-invoice" class="svg-inline--fa fa-file-invoice fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M288 256H96v64h192v-64zm89-151L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm256 304c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16zm0-200v96c0 8.84-7.16 16-16 16H80c-8.84 0-16-7.16-16-16v-96c0-8.84 7.16-16 16-16h224c8.84 0 16 7.16 16 16z"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="col mb-3 highlighted-card-wrap" onClick={(e) => setAndDisplayDialog(4, "Invoices Scanned")}>
              <div className="card highlighted-card">
                <div class="media">
                  <div class="media-body align-self-center" style={{"fontSize":"12pt"}}>
                    <h4 class="mt-0 mb-1">21</h4>
                    Booked
                  </div>
                  <div class="ml-3 align-self-center" >

                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-invoice" class="svg-inline--fa fa-file-invoice fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M288 256H96v64h192v-64zm89-151L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm256 304c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16zm0-200v96c0 8.84-7.16 16-16 16H80c-8.84 0-16-7.16-16-16v-96c0-8.84 7.16-16 16-16h224c8.84 0 16 7.16 16 16z"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="col mb-3 highlighted-card-wrap" onClick={(e) => setAndDisplayDialog(4, "Invoices Scanned")}>
              <div className="card highlighted-card">
                <div class="media">
                  <div class="media-body align-self-center" style={{"fontSize":"12pt"}}>
                    <h4 class="mt-0 mb-1">12</h4>
                    Checked-Out
                  </div>
                  <div class="ml-3 align-self-center" >

                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-invoice" class="svg-inline--fa fa-file-invoice fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M288 256H96v64h192v-64zm89-151L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm256 304c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16zm0-200v96c0 8.84-7.16 16-16 16H80c-8.84 0-16-7.16-16-16v-96c0-8.84 7.16-16 16-16h224c8.84 0 16 7.16 16 16z"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="col mb-3 highlighted-card-wrap" onClick={(e) => setAndDisplayDialog(4, "Invoices Scanned")}>
              <div className="card highlighted-card">
                <div class="media">
                  <div class="media-body align-self-center" style={{"fontSize":"12pt"}}>
                    <h4 class="mt-0 mb-1">30</h4>
                    Available
                  </div>
                  <div class="ml-3 align-self-center" >

                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-invoice" class="svg-inline--fa fa-file-invoice fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M288 256H96v64h192v-64zm89-151L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm256 304c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16zm0-200v96c0 8.84-7.16 16-16 16H80c-8.84 0-16-7.16-16-16v-96c0-8.84 7.16-16 16-16h224c8.84 0 16 7.16 16 16z"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{"display":"flex",flexWrap:"nowrap"}}>
            {/* <div className="col mb-3 highlighted-card-wrap">
              
            </div>

            <div className="col mb-3 highlighted-card-wrap">
             
            </div> */}

            <div className="col mb-9 highlighted-card-wrap">
              <Calendar 
                onChange={onChange} 
                value={value} 
                tileContent={({ activeStartDate, date, view }) => view === 'month' && date ? <DayComponent date={date} data={singleEmployeeData} holidaylist={holidayListData} /> : null}
              />
            </div>

            <div className="col mb-3 highlighted-card-wrap">
              <LeaveSummary getMonth={getMonth} getYear={getYear} monthlySummary={monthlySummary} />
            </div>
          </div>


          {/* <div className="col-12 col-sm-6 col-md-3 mb-3 highlighted-card-wrap" onClick={(e) => setAndDisplayDialog(7,"Daywise Pending Orders")}>
          <div className="card highlighted-card">
            <div class="media">
              <div class="media-body align-self-center">
                <h4 class="mt-0 mb-1">{`${dayWisePendingOrderCount}`}</h4>
                Daywise Pending Orders
             </div>
              <div class="ml-3 align-self-center" >

                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="box-open" class="svg-inline--fa fa-box-open fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z"></path></svg>
              </div>
            </div>
          </div>
        </div> */}


        </div>
      )}
      {isAdmin && isDashboardCountVisible && (
        <div class="row dash-todolist-wrap">
          {/* <div className="col-12 col-sm-6 mb-3">
          <DashboardChemistBirthdayList
            getDashboardChemistBirthdayList={props.getDashboardChemistBirthdayList}
            setDisplayMessage={setDisplayMessage}
            sendSms={props.sendSms}
            isAdmin={isAdmin}
          />
        </div> */}
          <div className="col-12 col-sm-6 mb-3">
            <div class="card"><h6 class="MuiTypography-root MuiTypography-h6" element="h6">My To Do</h6>
              <ul class="dash-todolist">
                {/* <li><a href=""><span class="badge badge-success">{`${newRegCount}`}</span> <span class="todo-text">New registration</span></a></li>
              <li><a href=""><span class="badge badge-success">{`${totalUploadedInvoice}`}</span> <span class="todo-text">Total invoice upload </span></a></li>
              <li><a href=""><span class="badge badge-success">{`${totalRedeemReq}`}</span> <span class="todo-text">Total Redemption Request</span></a></li> */}
                <li><span class="badge badge-success">{`${newRegCount}`}</span> <span class="todo-text">Pending registration approval</span></li>
                <li><span class="badge badge-success">{`${totalUploadedInvoice}`}</span> <span class="todo-text">Pending invoice verification </span></li>
                <li><span class="badge badge-success">{`${totalRedeemReq}`}</span> <span class="todo-text">Pending Redemption approval</span></li>
                {featureEndDateNotification != "" && (<li><span class="badge badge-fail">{`${featureEndDateNotification}`}</span> <span class="todo-text">Feature needs to be disabled.</span></li>)}
                {/* <li><span class="badge badge-fail">{`${featureEndDateNotification}`}</span> <span class="todo-text">Feature End date is near, Do the needful.</span></li> */}
              </ul>
            </div>
          </div>
        </div>
      )}

      {isManager && <LeaveRequestList />}
      {isManager && <ApproveTourPlan />}
      {/* {isAdmin && <UnlockDCRRequestList />} */}

      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
      {loading && <Loading />}
      {/* <hr />
      <h4>Core Controls</h4>
      <Form />
      <hr />
      <h4>Custom Controls</h4>
      <CustomComponentsDemo />
      <hr /> */}
    </div>
  );
}
