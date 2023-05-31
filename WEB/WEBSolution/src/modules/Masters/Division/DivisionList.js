import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { AddBox, Clear, Edit, Refresh } from "@material-ui/icons";
import MaterialTable from "material-table";
import React, { forwardRef, useEffect, useState } from "react";
import DatePicker from "../../../components/core/DatePicker";
import DialogControl from "../../../components/core/Dialog";
import DisplayMessage from "../../../components/core/DisplayMessage";
import Loading from "../../../components/core/Loading";
import RadioGroup from "../../../components/core/RadioGroup";
import TextField from "../../../components/core/TextField";
import {
  actionColumnStyle, GridIcons,
  options,
  style
} from "../../../components/custom/GridConfig";
import { isActiveOptions } from "../../../Config.json";
import {
  getDBFormateDateTime, getDisplayDate
} from "../../../Utils/DateTimeUtils.js";


/**
 * Add, update operations for Division
 * @author Tejal Sali
 */
export default function DivisionList(props) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [id, setId] = useState();
  const [rowData, setRowData] = useState({});

  const { operationRights } = props;
  const { add, edit } = operationRights;

  const columns = [
    {
      title: "Action",
      ...actionColumnStyle,
      hidden: !edit,
      render: ({ tableData: { id } }) => {
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
    {
      title: "Sr.No",
      field: "srNo",
      editable: "never",
    },
    {
      title: "Division Code",
      field: "divisionName",
    },
    {
      title: "Date Formed",
      field: "formedDate",
    },
    {
      title: "Is Active",
      field: "isActive",
    },
    {
      title: "Description",
      field: "description",
    },
  ];

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getDivisionList = () => {
    setLoading(true);
    props.getDivisionList({
      onSuccess: (response) => {
        setLoading(false);
        const { divisionList = [] } = response;
        const data = divisionList.map((division, index) => ({
          ...division,
          srNo: index + 1,
          isActive: division.isActive === true ? "Yes" : "No",
          formedDate: getDisplayDate(division.formedDate),
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
    const divisionName = !validateField("divisionName");
    const formedDate = !validateField("formedDate");
    const description = !validateField("description");

    setValidationList({ divisionName, formedDate, description });
    return !divisionName && !formedDate && !description;
  };

  const dialogContent = (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required={true}
          value={rowData.divisionName}
          label="Division Code"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, divisionName: e.target.value });
            validateField("divisionName");
          }}
          error={validationList && validationList.divisionName ? true : false}
          errorMessage={"Division Name is Required"}
          maxLength={40}
        />
      </Grid>
      <Grid item xs={12}>
        <DatePicker
          variant="inline"
          defaultValue={rowData.formedDate}
          required={true}
          margin="none"
          label="Formed Date"
          onChange={(formedDate) => {
            setRowData({ ...rowData, formedDate });
            validateField("formedDate");
          }}
          error={
            validationList && validationList.formedDate
              ? validationList.formedDate
              : false
          }
          errorMessage={"Formed Date is Required"}
        />
      </Grid>
      <Grid item xs={12}>
        {/* <SingleCheckbox
          label="Is Active"
          onChange={e => {
            setRowData({ ...rowData, isActive: e.target.checked });
          }}
          checked={rowData.isActive === "Yes" ? true : false}
        /> */}
        <RadioGroup
          options={isActiveOptions}
          isOptionAlignRow={true}
          label={"Is Active"}
          labelPlacement={"end"}
          value={rowData.isActive}
          onChange={(e) => setRowData({ ...rowData, isActive: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required={true}
          value={rowData.description}
          label="Description"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, description: e.target.value });
            validateField("description");
          }}
          error={validationList && validationList.description ? true : false}
          errorMessage={"Description is Required"}
          multiline={true}
          rows={4}
          maxLength={100}
        />
      </Grid>
    </Grid>
  );

  useEffect(() => {
    getDivisionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        divisionId: rowData.divisionId,
        divisionName: rowData.divisionName,
        formedDate: rowData.formedDate,
        isActive: rowData.isActive === "Yes" ? "1" : "0",
        updatedDate: rowData.updatedDate,
        description: rowData.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setRowData({
      divisionName: "",
      formedDate: null,
      isActive: "1",
      description: ""
    });
  };

  const addDivision = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        divisionName: rowData.divisionName,
        formedDate: getDBFormateDateTime(rowData.formedDate),
        isActive: parseInt(rowData.isActive),
        description: rowData.description,
      };

      props.addDivision({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          getDivisionList();
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

  const updateDivision = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive),
        formedDate: getDBFormateDateTime(rowData.formedDate),
      };
      props.updateDivision({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          getDivisionList();
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


  return (
    <div className="card">
      <div className="table-wrapper">
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
          title={`List of Divisions`}
          columns={columns}
          data={data}
          options={options}
          style={style}
          actions={
            add === true
              ? [
                {
                  icon: () => {
                    return (
                      <Refresh
                        onClick={() => {
                          getDivisionList();
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
                  tooltip: "Add Division",
                  isFreeAction: true,
                },
              ]
              : [
                {
                  icon: () => {
                    return (
                      <Refresh
                        onClick={() => {
                          getDivisionList();
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
        {editRecord && (
          <DialogControl
            open={editRecord}
            dialogTitleText={`${currentOpr} Division`}
            dialogContent={dialogContent}
            onCancel={() => {
              toggleEditRecord(!editRecord);
              setLoading(false);
            }}
            onSubmit={(e) => {
              currentOpr === "Add" ? addDivision(e) : updateDivision(e);
            }}
          />
        )}
        {loading && <Loading />}
        <DisplayMessage
          {...displayMessage}
          onClose={() => setDisplayMessage({ open: false })}
        />
      </div>
    </div>
  );
}
