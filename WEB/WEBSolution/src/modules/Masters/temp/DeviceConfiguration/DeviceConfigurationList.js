import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Done } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";

import Button from "../../../components/core/Button";
import {
  GridIcons,
  options,
  style,
  actionColumnStyle,
} from "../../../components/custom/GridConfig";
import Select from "../../../components/core/Select";
import Loading from "../../../components/core/Loading";
import StatesSelect from "../../../components/custom/StatesSelect/StatesSelectContainer";
import DisplayMessage from "../../../components/core/DisplayMessage";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";

import { labels } from "../../../Config.json";
// import {getDBFormateDate, getDBFormateDateTime} from "../../../Utils/DateTimeUtils";

/**
 * Device Configuration List grid with state and Division filter
 * Update operations for Device Configuration
 * @author Nirali Maradiya
 */

export default function DeviceConfiguration(props) {
  const [showGrid, setShowGrid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [data, setData] = useState([]);
  const [rowData, setRowData] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [isStateError, setIsStateError] = useState(false);
  const [isDivisionError, setIsDivisionError] = useState(false);
  const [selectedStateName, setSelectedStateName] = useState("");
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [titleProperties, setTitleProperties] = useState({});
  const [divisionList, setDivisionList] = useState([]);
  const [selectedDivisionId, setSelectedDivisionId] = useState("");

  const { operationRights } = props;
  const { edit } = operationRights;

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getDivisions = () => {
    props.getDivisions({
      onSuccess: (response) => {
        const { divisionList } = response;
        setDivisionList(divisionList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    getDivisions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDeviceConfigurationList = () => {
    setLoading(true);
    const params = {
      stateId: selectedState,
      divisionId: selectedDivisionId,
    };

    props.getDeviceConfigurationList({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { deviceList = [] } = response;
        const data = deviceList.map((device, index) => ({
          ...device,
          srNo: index + 1,
          changeDevice: device.changeDevice === 0 ? "No" : "Yes",
          // fakeGps: device.fakeGps === 0 ? "No" : "Yes",
        }));
        setData(data);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const updateDeviceConfigurationList = (e) => {
    e.preventDefault();
    setLoading(true);
    delete rowData["tableData"];
    delete rowData["totalRecord"];
    const params = {
      changeDevice: 1,
      updatedDate: rowData.updatedDate,
      deviceConfigId: rowData.deviceConfigId,
    };
    props.updateDeviceConfigurationList({
      params,
      onSuccess: ({ message: displayMessage }) => {
        setLoading(false);
        getDeviceConfigurationList(e);
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
        setConfirmationDialog(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const columns = [
    {
      title: "Action",
      ...actionColumnStyle,
      hidden: !edit,
      render: ({ tableData: { id } }) => {
        return (
          <div className="table-edit-controls">
            {data[id].changeDevice === "No" && (
              <Tooltip title="Allow Device">
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    setConfirmationDialog(true);
                    setRowData({
                      deviceConfigId: data[id].deviceConfigId,
                      updatedDate: data[id].updatedDate,
                    });
                  }}
                >
                  <Done fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        );
      },
      printable: false,
    },
    { title: "Sr.No", field: "srNo" },
    { title: "Employee", field: "employee" },
    {
      title: "Mobile Number",
      field: "mobileNumber",
    },
    { title: "Mobile", field: "mobileModal" },
    { title: "OS Version", field: "osVersion" },
    // { title: "Fake GPS", field: "fakeGps" },
    { title: "App Version", field: "appVersion" },
    { title: "Change Device", field: "changeDevice" },
  ];

  return (
    <div>
      <div className="card selection-card selection-card-two-columns mb-3">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg>
            <StatesSelect
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setIsStateError(false);
              }}
              error={isStateError}
              setSelectedStateName={setSelectedStateName}
              isInline={true}
            />
          </Grid>
          <Grid item xs={12} md={4} lg>
            <Select
              data={divisionList}
              value={selectedDivisionId}
              label={"Division"}
              onChange={(e) => {
                setSelectedDivisionId(e.target.value);
                setIsDivisionError(false);
              }}
              required={true}
              error={isDivisionError}
              isInline={true}
            />
          </Grid>
          <Grid item xs={12} md={4} lg>
            <div className="selection-card-actions">
              <Button
                label={labels.filterButton}
                onClick={(e) => {
                  if (selectedState !== "" && selectedDivisionId !== "") {
                    setShowGrid(true);
                    setTitleProperties({
                      stateName: selectedStateName,
                    });
                    getDeviceConfigurationList(e);
                  } else {
                    if (selectedState === "" && selectedDivisionId === "") {
                      setIsStateError(true);
                      setIsDivisionError(true);
                    } else if (selectedState === "") setIsStateError(true);
                    else if (selectedDivisionId === "")
                      setIsDivisionError(true);
                  }
                }}
                customClass="button button-primary mr-2"
              />
            </div>
          </Grid>
        </Grid>
      </div>

      {showGrid && (
        <div className="card">
          <div className="table-wrapper">
            <MaterialTable
              icons={GridIcons}
              title={`Employees of ${titleProperties.stateName}`}
              columns={columns}
              data={data}
              options={options}
              style={style}
            />

            {confirmationDialog && (
              <ConfirmationDialog
                open={confirmationDialog}
                dialogContentText="Are you sure you want to allow user to change device?"
                cancelButtonText="Cancel"
                okButtonText="Allow"
                onCancel={() => {
                  setConfirmationDialog(false);
                }}
                onOk={(e) => {
                  setConfirmationDialog(false);
                  updateDeviceConfigurationList(e);
                }}
              />
            )}
          </div>
        </div>
      )}
      {loading && <Loading />}

      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
