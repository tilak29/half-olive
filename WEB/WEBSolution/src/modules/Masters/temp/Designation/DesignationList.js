import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Edit, Refresh, AddBox } from "@material-ui/icons";
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

/**
 * Add, update operations for Designation
 * @author Tejal Sali
 */

export default function DesignationList(props) {
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
      title: "Designation Code",
      field: "designationCode",
    },
    {
      title: "Designation Description",
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

  const getDesignationList = () => {
    setLoading(true);
    props.getDesignationList({
      onSuccess: (response) => {
        setLoading(false);
        const { designationList = [] } = response;
        const data = designationList.map((designation, index) => ({
          srNo: index + 1,
          ...designation,
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
    getDesignationList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        designationId: rowData.designationId,
        designationCode: rowData.designationCode,
        description: rowData.description,
        updatedDate: rowData.updatedDate,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setRowData({
      designationCode: "",
      description: "",
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
    const designationCode = !validateField("designationCode");
    const description = !validateField("description");
    setValidationList({
      designationCode,
      description,
    });
    return !designationCode && !description;
  };

  const dialogContent = (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required={true}
          id={"designationCode"}
          value={rowData.designationCode}
          label="Designation Code"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, designationCode: e.target.value });
            validateField("designationCode");
          }}
          error={
            validationList && validationList.designationCode ? true : false
          }
          errorMessage={"Designation Code is Required"}
          maxLength={20}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required={true}
          value={rowData.description}
          id={"description"}
          label="Designation Description"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, description: e.target.value });
            validateField("description");
          }}
          error={validationList && validationList.description ? true : false}
          errorMessage={"Designation Description is Required"}
          maxLength={200}
        />
      </Grid>
    </Grid>
  );

  const addDesignation = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        designationCode: rowData.designationCode,
        description: rowData.description,
      };

      props.addDesignation({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          getDesignationList();
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

  const updateDesignation = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
      };
      props.updateDesignation({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          getDesignationList();
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
          title={`List of Designations`}
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
                            getDesignationList();
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
                    tooltip: "Add Designation",
                    isFreeAction: true,
                  },
                ]
              : [
                  {
                    icon: () => {
                      return (
                        <Refresh
                          onClick={() => {
                            getDesignationList();
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
            dialogTitleText={`${currentOpr} Designation`}
            dialogContent={dialogContent}
            onCancel={() => {
              toggleEditRecord(!editRecord);
              setLoading(false);
            }}
            onSubmit={(e) => {
              currentOpr === "Add" ? addDesignation(e) : updateDesignation(e);
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
