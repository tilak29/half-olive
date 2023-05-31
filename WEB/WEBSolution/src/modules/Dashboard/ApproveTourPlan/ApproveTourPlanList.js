import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Visibility as View } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";

import {
  GridIcons,
  options,
  style,
  actionColumnStyle,
} from "../../../components/custom/GridConfig";
import Loading from "../../../components/core/Loading";
import TextField from "../../../components/core/TextField";
import DisplayMessage from "../../../components/core/DisplayMessage";
import DialogControl from "../../../components/core/Dialog";
import { getDisplayDate } from "../../../Utils/DateTimeUtils.js";
import SLTourPlanList from "./SLTourPlanList";
import ManagerTourPlanList from "./ManagerTourPlanList";
import { staticDataId } from "../../../Config.json";

/**
 * Subordinates Tour Plan List grid for manager
 * View/Edit( Reject, Approve) operations based on rights
 * @author Tejal Sali
 */
export default function ApproveTourPlanList(props) {
  const [data, setData] = useState([]);
  const [isApproveTourPlanVisible, setIsApproveTourPlanVisible] = useState(false); //U166328
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [id, setId] = useState();

  const { filterDesignation = {} } = props;

  const {
    aslAndAboveDesignations = [],
    slDesignations = [],
  } = filterDesignation;

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  useEffect(() => {
    getTourPlanApprovalList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTourPlanApprovalList = () => {
    setLoading(true);
    props.getTPApprovalList({
      onSuccess: (response) => {
        setIsApproveTourPlanVisible(true); //U166328
        setLoading(false);
        const { tpApprovalList = [] } = response;
        const data = tpApprovalList.map((record) => ({
          ...record,
          submittedOn: getDisplayDate(record.submittedOn),
        }));
        setData(data);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
        setIsApproveTourPlanVisible(false); //U166328
      },
    });
  };

  const updateTpStatus = (opr) => {
    const { TourPlan_Approved, TourPlan_Rejected } = staticDataId;
    if (opr === "reject" && rowData.remarks === "") {
      displayErrorMessage("Please provide remarks for Rejection.");
      return;
    } else {
      const params = {
        tourPlanId: rowData.tourPlanId,
        status: opr === "reject" ? TourPlan_Rejected : TourPlan_Approved,
        managerRemarks: rowData.remarks,
        updatedDate: rowData.updatedDate,
      };
      props.updateTPStatus({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          toggleEditRecord(!editRecord);
          getTourPlanApprovalList();
        },
        onFailure: ({ message }) => {
          displayErrorMessage(message);
        },
      });
    }
  };

  useEffect(() => {
    if (editRecord) {
      const rowData = data[id];
      setRowData({
        ...rowData,
        remarks: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  const columns = [
    { title: "Employee", field: "employeeName" },
    { title: "Month", field: "monthYearLabel" },
    { title: "Submitted On", field: "submittedOn" },
    {
      title: "View TP",
      ...actionColumnStyle,
      hidden: false,
      render: ({ tableData: { id } }) => {
        return (
          <div className="table-edit-controls">
            <Tooltip title="View">
              <IconButton
                aria-label="view"
                onClick={() => {
                  setId(id);
                  toggleEditRecord(true);
                }}
              >
                <View fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      printable: false,
    },
  ];

  const dialogContent = (
    <div>
      {slDesignations.includes(rowData.designationId) && (
        <SLTourPlanList
          rowData={rowData}
          displayErrorMessage={displayErrorMessage}
          getSLTourPlan={props.getSLTourPlan}
          title={`Tour Plan of ${rowData.employeeName} for ${rowData.monthYearLabel}`}
        />
      )}
      {aslAndAboveDesignations.includes(rowData.designationId) && (
        <ManagerTourPlanList
          rowData={rowData}
          displayErrorMessage={displayErrorMessage}
          getManagerTourPlan={props.getManagerTourPlan}
          title={`Tour Plan of ${rowData.employeeName} for ${rowData.monthYearLabel}`}
        />
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} className="mt-3">
          <TextField
            value={rowData.remarks}
            label="Remarks"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, remarks: e.target.value });
            }}
            multiline={true}
            rows={2}
            maxLength={250}
          />
        </Grid>
      </Grid>
    </div>
  );
 //U166328
  return isApproveTourPlanVisible && (
    <div className="mb-3">
      <div className="card">
        <div className="table-wrapper editable-table-wrapper">
          <MaterialTable
            icons={GridIcons}
            title={`Tour Plan Approvals`}
            columns={columns}
            data={data}
            style={style}
            options={{
              ...options,
              paging: false,
              search: false,
              maxBodyHeight: 255,
            }}
          />
        </div>
      </div>

      {editRecord && (
        <DialogControl
          open={editRecord}
          fullWidth
          dialogTitleText={"View Tour Plan"}
          dialogContent={dialogContent}
          cancelButtonText="Reject"
          submitButtonText="Approve"
          onCancel={(opr) => {
            if (opr === "cancel") toggleEditRecord(!editRecord);
            else updateTpStatus("reject");
          }}
          onSubmit={() => {
            updateTpStatus("approve");
          }}
          maxWidth="xl"
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
