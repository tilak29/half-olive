import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Done, HighlightOff } from "@material-ui/icons";
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
import { staticDataId } from "../../../Config.json";

/**
 * leave Requests List List grid for manager
 * edit ( Reject, Approve) operations based on rights
 * @author Nirali Maradiya
 */
export default function LeaveRequestList(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [id, setId] = useState();

  const {
    Leave_Status_Reject,
    Leave_Status_Request,
    Leave_Status_Approved,
  } = staticDataId;

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  useEffect(() => {
    getLeaveList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, []);

  const getLeaveList = () => {
    const params = {
      employeeId: null,
      orderBy: "appliedOn",
      orderDirection: "Desc",
    };
    setLoading(true);
    props.getLeaveList({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { leaveList = [] } = response;
        const RequestedLeaves = leaveList.filter(
          (leave) => leave.status === Leave_Status_Request
        );
        const data = RequestedLeaves.map((leave, index) => ({
          ...leave,
          serialNo: index + 1,
          status: leave.statusValue,
          statusId: leave.status,
          startDate: leave.startDate,
          endDate: leave.endDate,
          appliedOn: leave.appliedOn,
          totalDays: leave.totalDays,
        }));

        setData(data);
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
    let rejectedReason = !validateField("rejectedReason");
    rejectedReason = currentOpr === "Reject" ? rejectedReason : false;

    setValidationList({
      rejectedReason,
    });
    return !rejectedReason;
  };

  const updateLeave = () => {
    if (checkAllValidation()) {
      const params = {
        ...rowData,
      };
      props.updateLeave({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getLeaveList();
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          toggleEditRecord(!editRecord);
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
      const status =
        currentOpr === "Reject" ? Leave_Status_Reject : Leave_Status_Approved;
      setRowData({
        leaveMasterId: rowData.leaveMasterId,
        status: status,
        rejectedReason: null,
        approveReason: null,
        updatedDate: rowData.updatedDate,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  const columns = [
    { title: "Sr.No", field: "serialNo" },
    {
      title: "Action",
      ...actionColumnStyle,
      hidden: false,
      render: ({ tableData: { id } }) => {
        return (
          <div className="table-edit-controls">
            <Tooltip title="Approve">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setId(id);
                  setValidationList({});
                  setCurrentOpr("Approve");
                  toggleEditRecord(true);
                }}
              >
                <Done fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reject">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setId(id);
                  setValidationList({});
                  setCurrentOpr("Reject");
                  toggleEditRecord(true);
                }}
              >
                <HighlightOff fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      printable: false,
    },
    { title: "Employee", field: "employeeName", hidden: false },
    { title: "Applied On", field: "appliedOn" },
    {
      title: "Type",
      field: "leaveType",
    },
    { title: "Category", field: "leaveCategory" },
    { title: "Leave From", field: "startDate" },
    { title: "Leave To", field: "endDate" },
    { title: "Days", field: "totalDays" },
    { title: "Status", field: "status" },
    { title: "Reason", field: "reason" },
  ];

  const dialogTitleText =
    currentOpr === "Approve" ? "Approve Leave" : "Cancel Leave";

  const dialogContent = (
    <div>
      {currentOpr === "Reject" && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField
              value={rowData.rejectedReason}
              label="Reject Reason"
              numeric={false}
              isAutoFocus={false}
              onChange={(e) => {
                setRowData({ ...rowData, rejectedReason: e.target.value });
                validateField("rejectedReason");
              }}
              multiline={true}
              rows={2}
              required={true}
              error={
                validationList && validationList.rejectedReason ? true : false
              }
              errorMessage={"Reject Reason is Required"}
              maxLength={300}
            />
          </Grid>
        </Grid>
      )}
      {currentOpr === "Approve" && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField
              value={rowData.approveReason}
              label="Approve Reason"
              numeric={false}
              isAutoFocus={false}
              onChange={(e) => {
                setRowData({ ...rowData, rejectedReason: e.target.value });
              }}
              multiline={true}
              rows={2}
              maxLength={300}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );

  return (
    <div className="mb-3">
      <div className="card">
        <div className="table-wrapper editable-table-wrapper">
          <MaterialTable
            icons={GridIcons}
            title={`Leave Requests`}
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
          dialogTitleText={dialogTitleText}
          dialogContent={dialogContent}
          onCancel={() => {
            toggleEditRecord(!editRecord);
          }}
          onSubmit={() => {
            updateLeave();
          }}
          maxWidth="sm"
          fullWidth="false"
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
