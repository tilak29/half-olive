import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Edit, AddBox, Refresh } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";

import {
  GridIcons,
  options,
  style,
  actionColumnStyle,
} from "../../../components/custom/GridConfig";
import Loading from "../../../components/core/Loading";
import DisplayMessage from "../../../components/core/DisplayMessage";
import TextField from "../../../components/core/TextField";
import DialogControl from "../../../components/core/Dialog";
import { staticDataId } from "../../../Config.json";
import RadioGroup from "../../../components/core/RadioGroup";

/**
 * Add, update operations for states
 * @author Tejal Sali
 */
export default function StateList(props) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [id, setId] = useState();
  const [rowData, setRowData] = useState({});

  const countryId = staticDataId.Country_India;

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
                  setRowData({
                    isHillyState: data[id].isHillyState,
                  });
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
      title: "State",
      field: "stateName",
    },
    {
      title: "Is Hilly State",
      field: "isHillyState",
    },
  ];

  const isHillyStateOptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getStatesList = () => {
    setLoading(true);
    const params = {
      countryId,
    };
    props.getStatesList({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { stateList = [] } = response;
        const data = stateList.map((state, index) => ({
          ...state,
          srNo: index + 1,
          isHillyState: state.isHillyState === 1 ? "Yes" : "No",
        }));
        setData(data);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    getStatesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        stateId: rowData.stateId,
        stateName: rowData.stateName,
        updatedDate: rowData.updatedDate,
        isHillyState: rowData.isHillyState && rowData.isHillyState === "Yes" ? 1 : 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  // useEffect(() => {
  //   window.onscroll = function() {
  //     myFunction();
  //   };

  //   function myFunction() {
  //     const tableElement = document.getElementsByClassName("table-wrapper")[0];
  //     const sticky = tableElement && tableElement.offsetTop + 110;

  //     const headerElement = document.getElementsByClassName(
  //       "MuiTableHead-root"
  //     )[0];

  //     if (window.pageYOffset <= sticky) {
  //       headerElement && headerElement.classList.remove("fixed-table-header");
  //     } else {
  //       headerElement && headerElement.classList.add("fixed-table-header");
  //     }
  //   }
  // }, []);

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setRowData({
      stateName: "",
      isHillyState: 0
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
    const stateName = !validateField("stateName");
    setValidationList({ stateName });
    return !stateName;
  };

  const dialogContent = (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required={true}
          value={rowData.stateName}
          label="State Name"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, stateName: e.target.value });
            validateField("stateName");
          }}
          error={validationList && validationList.stateName ? true : false}
          errorMessage={"State Name is Required"}
          maxLength={25}
        />
      </Grid>
      <Grid item xs={12}>
          <RadioGroup
            options={isHillyStateOptions}
            isOptionAlignRow={true}
            label={"Is Hilly State"}
            labelPlacement={"end"}
            value={rowData.isHillyState}
            onChange={(e) =>
              setRowData({
                ...rowData,
                isHillyState: parseInt(e.target.value),
              })
            }
          />
        </Grid>
    </Grid>
  );

  const addState = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        countryId,
        stateName: rowData.stateName,
        isHillyState: parseInt(rowData.isHillyState)
      };

      props.addState({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          getStatesList();
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

  const updateState = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        countryId,
        stateName: rowData.stateName,
        isHillyState: parseInt(rowData.isHillyState),
      };
      props.updateState({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          getStatesList();
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
          icons={GridIcons}
          title={`List of States`}
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
                            getStatesList();
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
                    tooltip: "Add State",
                    isFreeAction: true,
                  },
                ]
              : [
                  {
                    icon: () => {
                      return (
                        <Refresh
                          onClick={() => {
                            getStatesList();
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
            dialogTitleText={`${currentOpr} State`}
            dialogContent={dialogContent}
            onCancel={() => {
              toggleEditRecord(!editRecord);
              setLoading(false);
            }}
            onSubmit={(e) => {
              currentOpr === "Add" ? addState(e) : updateState(e);
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
    </div>
  );
}
