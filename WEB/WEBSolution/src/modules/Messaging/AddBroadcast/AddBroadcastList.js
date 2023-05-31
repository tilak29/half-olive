import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";

import {
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import Loading from "../../../components/core/Loading";
import Button from "../../../components/core/Button";
import MultipleSelectionList from "../../../components/custom/MultipleSelectionList";
import MultiSelect from "../../../components/core/MultiSelect";
import MultipleCheckboxSelect from "../../../components/custom/MultipleCheckboxSelect";
import DisplayMessage from "../../../components/core/DisplayMessage";
import TextField from "../../../components/core/TextField";
import { labels } from "../../../Config.json";
import { AddBox } from "@material-ui/icons";
/**
 * Screen to Display Broadcast Mobile News list and add new broadcast news.
 * Role : Admin only
 * @author Nirali Maradiya
 */
export default function BroadcastMobileNewsList(props) {
  const { stateList = [], userData } = props;
  const [displayMessage, setDisplayMessage] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [rowData, setRowData] = useState({});
  const [validationList, setValidationList] = useState({});
  const [divisionList, setDivisionList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [selectedDivison, setSelectedDivison] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState([]);

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getDesignations = () => {
    props.getDesignations({
      onSuccess: (response) => {
        const { designationList } = response;
        setDesignationList(designationList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
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
  const getNotifications = () => {
    setLoading(true);
    const params = {
      isAdmin: 1,
      loggedInEmployeeId: userData.authInfo.loggedInEmployeeId,
      page: null,
      pageSize: null,
      orderBy: null,
      orderDirection: null,
      search: null,
    };

    props.getNotifications({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { notificationList = [] } = response;

        const data = notificationList.map((notification, index) => ({
          ...notification,
          serialNo: index + 1,
          stateNames:
            notification.stateName !== null
              ? notification.stateName.split(",")
              : [],
          divisionNames:
            notification.divisionName !== null
              ? notification.divisionName.split(",")
              : [],
          designationNames:
            notification.designationName !== null
              ? notification.designationName.split(",")
              : [],
        }));
        setData(data);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const addNotifications = () => {
    setLoading(true);
    const params = {
      employeeId: null,
      message: rowData.message,
      divisionIds: selectedDivison,
      designationIds: selectedDesignation,
      stateIds: selectedState,
      loggedInEmployeeId: userData.authInfo.loggedInEmployeeId,
    };

    props.addNotifications({
      params,
      onSuccess: ({ message: displayMessage }) => {
        setLoading(false);
        getNotifications();
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
        toggleEditRecord(false);
        setShowGrid(true);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    getDivisions();
    getDesignations();
    if (stateList.length === 0) props.getStates();
    getNotifications();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setShowGrid(false);
    setValidationList({});
    setRowData({
      message: "",
    });
    setSelectedDesignation([]);
    setSelectedDivison([]);
    setSelectedState([]);
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
    const message = !validateField("message");

    let divisionList = selectedDivison.length === 0;
    const index = selectedDesignation.indexOf(0);
    if (index > -1) {
      selectedDesignation.splice(index, 1);
      setSelectedDesignation(selectedDesignation);
    }
    let designationList = selectedDesignation.length === 0;
    let stateList = selectedState.length === 0;
    setValidationList({
      ...validationList,
      message,
      divisionList,
      designationList,
      stateList,
    });
    return !message && !divisionList && !designationList && !stateList;
  };

  const columns = [
    { title: "Sr.No", field: "serialNo" },
    { title: "Message", field: "notificationMessage" },
    {
      title: "Division",
      render: ({ tableData: { id } }) => {
        return (
          <ul className="list-root">
            {data[id].divisionNames.map((division, idx) => (
              <li>{division}</li>
            ))}
          </ul>
        );
      },
    },
    {
      title: "State",
      render: ({ tableData: { id } }) => {
        return (
          <ul className="list-root">
            {data[id].stateNames.map((state, idx) => (
              <li>{state}</li>
            ))}
          </ul>
        );
      },
    },
    {
      title: "Designation",
      render: ({ tableData: { id } }) => {
        return (
          <ul className="list-root">
            {data[id].designationNames.map((designation, idx) => (
              <li>{designation}</li>
            ))}
          </ul>
        );
      },
    },
  ];

  const FormContent = (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <MultiSelect
            data={divisionList}
            checked={selectedDivison}
            label={"Divisions"}
            setChecked={(values) => {
              setSelectedDivison(values);
              setValidationList({ ...validationList, divisionList: false });
            }}
            required={true}
            error={
              validationList.divisionList ? validationList.divisionList : false
            }
            errorMessage={"Division is Required"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MultipleCheckboxSelect
            items={designationList}
            keyField={"value"}
            textField={"label"}
            checked={selectedDesignation}
            label={"Designation"}
            setChecked={(values) => {
              setSelectedDesignation(values);
              setValidationList({
                ...validationList,
                designationList: false,
              });
            }}
            required={true}
            error={
              validationList.designationList
                ? validationList.designationList
                : false
            }
            errorMessage={"Designation is Required"}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <MultipleSelectionList
            items={
              stateList && stateList.length > 0 && stateList[0].value === "All"
                ? stateList.splice(0, 1)
                : stateList
            }
            label={"States"}
            columns={4}
            width={"100%"}
            checked={selectedState}
            setChecked={setSelectedState}
            required={true}
            error={validationList.stateList ? validationList.stateList : false}
            errorMessage={"State  is Required"}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            value={rowData.message}
            label="Message"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, message: e.target.value });
              validateField("message");
            }}
            required={true}
            error={
              validationList && validationList.message
                ? validationList.message
                : false
            }
            errorMessage={"Message is Required"}
            multiline={true}
            rows={2}
            maxLength={140}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ justifyContent: "space-" }}>
        <div className="d-flex align-items-center justify-content-end mt-3">
          <Button
            autoFocus
            onClick={() => {
              toggleEditRecord(!editRecord);
              setShowGrid(!showGrid);
            }}
            customClass="button button-black  mr-2 mt-2"
            label={labels.cancelButton}
          />
          <Button
            onClick={() => {
              if (checkAllValidation()) {
                addNotifications();
              }
            }}
            customClass="button button-primary mt-2"
            label={labels.saveButton}
          />
        </div>
      </Grid>
    </React.Fragment>
  );

  return (
    <div>
      {showGrid && (
        <div className="card">
          <div className="table-wrapper editable-table-wrapper">
            <MaterialTable
              icons={GridIcons}
              title={"Broadcast Notifications"}
              columns={columns}
              data={data}
              style={style}
              options={{ ...options, paging: false }}
              actions={[
                {
                  icon: () => {
                    return (
                      <Refresh
                        onClick={() => {
                          getNotifications();
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
                      <AddBox
                        onClick={() => {
                          addButtonClick();
                        }}
                      />
                    );
                  },
                  tooltip: "Add Notification",
                  isFreeAction: true,
                },
              ]}
            />
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
      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
