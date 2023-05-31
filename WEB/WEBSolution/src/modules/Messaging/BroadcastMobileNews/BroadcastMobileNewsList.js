import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Edit, Refresh, AddBox } from "@material-ui/icons";
import { Grid, Tooltip, IconButton } from "@material-ui/core";

import {
  GridIcons,
  options,
  style,
  actionColumnStyle,
} from "../../../components/custom/GridConfig";
import Loading from "../../../components/core/Loading";
import Button from "../../../components/core/Button";
import MultipleSelectionList from "../../../components/custom/MultipleSelectionList";
import MultipleCheckboxSelect from "../../../components/custom/MultipleCheckboxSelect";
import MultiSelect from "../../../components/core/MultiSelect";
import DisplayMessage from "../../../components/core/DisplayMessage";
import DatePicker from "../../../components/core/DatePicker";
import TextField from "../../../components/core/TextField";
import RadioGroup from "../../../components/core/RadioGroup";

import {
  getDBFormateDate,
  getDisplayDate,
  getBrowserFormatDate,
} from "../../../Utils/DateTimeUtils.js";
import { labels } from "../../../Config.json";
/**
 * Screen to Display Broadcast Mobile News list and add new broadcast news.
 * Role : Admin only
 * @author Nirali Maradiya
 */
export default function BroadcastMobileNewsList(props) {
  const { stateList = [], serverDate } = props;
  const [displayMessage, setDisplayMessage] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [id, setId] = useState();
  const [rowData, setRowData] = useState({});
  const [validationList, setValidationList] = useState({});
  const [currentOpr, setCurrentOpr] = useState();
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
  const getBroadcastMobileNewsList = () => {
    setLoading(true);

    props.getBroadcastMobileNewsList({
      onSuccess: (response) => {
        setLoading(false);
        const { broadcastMobileNewsList = [] } = response;

        const data = broadcastMobileNewsList.map((newsData, index) => ({
          ...newsData,
          srNo: index + 1,
          message: newsData.message,
          startDate: getDisplayDate(newsData.startDate),
          endDate: getDisplayDate(newsData.endDate),
          stateNames: newsData.stateName.split(","),
          divisionNames: newsData.divisionName.split(","),
          designationNames: newsData.designationName.split(","),
          isActive: 1,
        }));
        setData(data);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const addBroadcastMobileNewsList = () => {
    setLoading(true);
    const params = {
      message: rowData.message,
      divisionIds: selectedDivison,
      designationIds: selectedDesignation,
      stateIds: selectedState,
      startDate: getDBFormateDate(rowData.startDate),
      endDate: getDBFormateDate(rowData.endDate),
      isActive: "1",
    };
    props.addBroadcastMobileNewsList({
      params,
      onSuccess: ({ message: displayMessage }) => {
        setLoading(false);
        getBroadcastMobileNewsList();
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

  const updateBroadcastMobileNewsList = (updateType) => {
    setLoading(true);
    const params =
      updateType === "deactivateOldOne"
        ? {
            broadcastId: data[0].broadcastId,
            isActive: 0,
            divisionIds: selectedDivison,
            stateIds: selectedState,
            designationIds: selectedDesignation,
            message: data[0].message,
            startDate: getDBFormateDate(data[0].startDate),
            endDate: getDBFormateDate(data[0].endDate),
          }
        : {
            broadcastId: rowData.broadcastId,
            isActive: rowData.isActive.toString(),
            divisionIds: selectedDivison,
            stateIds: selectedState,
            designationIds: selectedDesignation,
            message: rowData.message,
            startDate: getDBFormateDate(rowData.startDate),
            endDate: getDBFormateDate(rowData.endDate),
          };
    props.updateBroadcastMobileNewsList({
      params,
      onSuccess: ({ message: displayMessage }) => {
        setLoading(false);

        if (updateType === "updateRecord") {
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          setShowGrid(true);
          toggleEditRecord(false);
          getBroadcastMobileNewsList();
        }
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
    getBroadcastMobileNewsList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentOpr === "Update" && editRecord === true) {
      const rowData = data[id];
      setRowData({
        ...rowData,
        message: rowData.message,
        startDate: rowData.startDate,
        endDate: rowData.endDate,
      });
      let dIds = JSON.parse(rowData.divisionIds);
      setSelectedDivison([...dIds]);
      setSelectedDesignation(JSON.parse(rowData.designationIds));
      setSelectedState(JSON.parse(rowData.stateIds));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  const addButtonClick = () => {
    toggleEditRecord(true);
    setCurrentOpr("Add");
    setShowGrid(false);
    setValidationList({});
    setRowData({
      message: "",
      startDate: getBrowserFormatDate(serverDate),
      endDate: null,
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
    const endDate = !validateField("endDate");

    const index = selectedDesignation.indexOf(0);
    if (index > -1) {
      selectedDesignation.splice(index, 1);
      setSelectedDesignation(selectedDesignation);
    }
    let divisionList = selectedDivison.length === 0;
    let designationList = selectedDesignation.length === 0;
    let stateList = selectedState.length === 0;
    setValidationList({
      ...validationList,
      message,
      divisionList,
      designationList,
      stateList,
      endDate,
    });
    return (
      !message && !endDate && !divisionList && !designationList && !stateList
    );
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
            <Tooltip title="Update">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setId(id);
                  setValidationList({});
                  setCurrentOpr("Update");
                  setShowGrid(false);
                  setRowData({ isActive: data[id].isActive.toString() });
                  toggleEditRecord(true);
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      printable: false,
    },
    { title: "Message", field: "message" },
    { title: "Start Date", field: "startDate", defaultSort: "desc" },
    {
      title: "End Date",
      field: "endDate",
    },
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
            keyField={"value"}
            textField={"label"}
            items={designationList}
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
            errorMessage={"State is Required"}
          />
        </Grid>

        {currentOpr === "Add" && (
          <Grid item xs={12} md={6}>
            <DatePicker
              minDate={serverDate}
              label="Start Date"
              defaultValue={getDisplayDate(rowData.startDate)}
              onChange={(date) => {
                setRowData({ ...rowData, startDate: date, endDate: null });
                validateField("startDate");
              }}
              required={true}
              error={
                validationList && validationList.startDate
                  ? validationList.startDate
                  : false
              }
              errorMessage={"Start Date is Required"}
            />
          </Grid>
        )}

        {currentOpr === "Add" && (
          <Grid item xs={12} md={6}>
            <DatePicker
              minDate={rowData.startDate}
              defaultValue={rowData.endDate}
              label="End Date"
              onChange={(date) => {
                setRowData({ ...rowData, endDate: date });
                validateField("endDate");
              }}
              required={true}
              error={
                validationList && validationList.endDate
                  ? validationList.endDate
                  : false
              }
              errorMessage={"End Date is Required"}
            />
          </Grid>
        )}
        {currentOpr === "Update" && (
          <Grid item xs={12} md={6}>
            <DatePicker
              minDate={getDisplayDate(serverDate)}
              minDateMessage=""
              label="Start Date"
              defaultValue={rowData.startDate}
              onChange={(date) => {
                setRowData({ ...rowData, startDate: date, endDate: null });
                validateField("startDate");
              }}
              required={true}
              error={
                validationList && validationList.startDate
                  ? validationList.startDate
                  : false
              }
              errorMessage={"Start Date is Required"}
            />
          </Grid>
        )}
        {currentOpr === "Update" && (
          <Grid item xs={12} md={6}>
            <DatePicker
              minDate={rowData.startDate}
              defaultValue={rowData.endDate}
              label="End Date"
              onChange={(date) => {
                setRowData({ ...rowData, endDate: date });
                validateField("endDate");
              }}
              required={true}
              error={
                validationList && validationList.endDate
                  ? validationList.endDate
                  : false
              }
              errorMessage={"End Date is Required"}
            />
          </Grid>
        )}

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
            maxLength={110}
          />
        </Grid>
        {currentOpr === "Update" && (
          <Grid item xs={12} md={4}>
            <RadioGroup
              required={true}
              type={"IsActive"}
              isOptionAlignRow={true}
              label={"Is Active"}
              labelPlacement={"end"}
              value={rowData.isActive ? rowData.isActive.toString() : null}
              onChange={(e) => {
                setRowData({ ...rowData, isActive: e.target.value });
              }}
            />
          </Grid>
        )}
      </Grid>

      <Grid item xs={12}>
        <div className="d-flex align-items-center justify-content-end mt-3">
          <Button
            autoFocus
            onClick={() => {
              toggleEditRecord(false);
              setShowGrid(true);
            }}
            customClass="button button-black  mr-2 mt-2"
            label={labels.cancelButton}
          />
          <Button
            onClick={() => {
              if (checkAllValidation()) {
                if (currentOpr === "Add") {
                  if (data.length !== 0)
                    updateBroadcastMobileNewsList("deactivateOldOne");
                  addBroadcastMobileNewsList();
                } else {
                  updateBroadcastMobileNewsList("updateRecord");
                }
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
              title={"Broadcast Mobile News"}
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
                          getBroadcastMobileNewsList();
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
                  tooltip: "Add Broadcast Message",
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
