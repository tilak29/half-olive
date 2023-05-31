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
import {
  getDisplayDate,
  getDBFormateDate,
} from "../../../Utils/DateTimeUtils.js";
import { staticDataId } from "../../../Config.json";

/**
 * Unlock DCR Requests List List grid for Admin
 * edit ( Reject, Approve) operations for admin
 * @author Nirali Maradiya
 */
export default function UnlockDCRRequestList(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [adminRemarks, setAdminRemarks] = useState("");
  const [adminRemarksError, setAdminRemarksError] = useState("");
  const [currentOpr, setCurrentOpr] = useState();
  const [displayMessage, setDisplayMessage] = useState({});
  const [id, setId] = useState();
  const [isVisible, setIsVisible] = useState(true);

  const {
    UnlockDCR_Approved,
    UnlockDCR_Rejected,
    UnlockDCR_Request,
  } = staticDataId;

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };
  const getUnlockDCRData = () => {
    const params = {
      employeeId: null,
      month: null,
      year: null,
      orderBy: "unlockDate",
      orderDirection: "Desc",
    };

    setLoading(true);
    props.getUnlockDCRData({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { unlockDcrList = [] } = response;
        const data = unlockDcrList.map((d, index) => ({
          ...d,
          srNo: index + 1,
          unlockDate: getDisplayDate(d.unlockDate),
        }));
        const requests = data.filter((d) => d.status === UnlockDCR_Request);
        setData(requests);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        //displayErrorMessage(message);
        setIsVisible(false);
      },
    });
  };

  useEffect(() => {
    getUnlockDCRData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUnlockDCRRequest = () => {
    const rowData = data[id];
    const params = {
      unlockDate: getDBFormateDate(rowData.unlockDate),
      statusId:
        currentOpr === "Reject" ? UnlockDCR_Rejected : UnlockDCR_Approved,
      employeeId: rowData.employeeId,
      updatedDate: rowData.updatedDate,
      adminRemarks: adminRemarks,
      unlockDcrId: rowData.unlockDcrId,
    };
    props.updateUnlockDCRData({
      params,
      onSuccess: ({ message: displayMessage }) => {
        getUnlockDCRData();
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
  };

  const columns = [
    { title: "Sr.No", field: "srNo" },
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
                  setAdminRemarks("");
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
                  setAdminRemarks("");
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
    { title: "Date", field: "unlockDate" },
    {
      title: "Reason",
      field: "reason",
    },
  ];

  const dialogTitleText = currentOpr === "Approve" ? "Unlock DCR" : "Reject";

  const dialogContent = (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            value={adminRemarks}
            label={currentOpr === "Reject" ? "Reject Reason" : "Approve Reason"}
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setAdminRemarks(e.target.value);
              setAdminRemarksError(false);
            }}
            multiline={true}
            rows={2}
            required={true}
            error={adminRemarksError}
            errorMessage={"Reason is Required"}
            maxLength={300}
          />
        </Grid>
      </Grid>
    </div>
  );

  return ( 
    <div className="mb-3">
      {isVisible && (
      <div className="card">
        <div className="table-wrapper editable-table-wrapper">
          <MaterialTable
            icons={GridIcons}
            title={`Unlock DCR`}
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
      )}

      {editRecord && (
        <DialogControl
          open={editRecord}
          dialogTitleText={dialogTitleText}
          dialogContent={dialogContent}
          onCancel={() => {
            toggleEditRecord(!editRecord);
          }}
          onSubmit={() => {
            if (adminRemarks === "") setAdminRemarksError(true);
            else updateUnlockDCRRequest();
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
