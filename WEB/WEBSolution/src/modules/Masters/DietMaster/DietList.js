import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { labels } from "../../../Config.json";
import Select from "../../../components/core/Select";
import Button from "../../../components/core/Button";
import Loading from "../../../components/core/Loading";
import downloadExcel from "../../../Utils/DownloadExcel";
import TextField from "../../../components/core/TextField";
import DialogControl from "../../../components/core/Dialog";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import DisplayMessage from "../../../components/core/DisplayMessage";
import SingleCheckBox from "../../../components/core/SingleCheckBox";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";
import { Edit, Delete, Refresh, SaveAlt, Visibility } from "@material-ui/icons";
import MultipleCheckboxSelect from "../../../components/custom/MultipleCheckboxSelect";
import { GridIcons, options, style, actionColumnStyle } from "../../../components/custom/GridConfig";
import MealType from "../../../components/custom/MealType/MealTypeContainer";

/**
 * Add,update,delete operations for Diet
 */
export default function DietMaster(props) {
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [rowData, setRowData] = useState({});
  const [mealData, setMealData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [showGrid, setShowGrid] = useState(false);
  const [viewPopup, setViewPopup] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [dietMealData, setDietMealData] = useState([]);
  const [editRecord, toggleEditRecord] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [validationList, setValidationList] = useState({});
  const [disabledExport, setDisabledExport] = useState(false);
  const [dietCategoryList, setDietCategoryList] = useState([]);
  const [filterStatusError, setFilterStatusError] = useState(false);
  const [showtabletextfield, setShowtabletextfield] = useState(true);

  const filterStatusList = [
    { label: "All", value: 'tm.isActive' },
    { label: "Active", value: 1 },
    { label: "InActive", value: 0 },
  ];

  const columns = [
    {
      title: "Sr#",
      field: "srNo",
      editable: "never",
      cellStyle: {
        textAlign: "center"
      }
    },
    { title: "Diet Name", field: "dietName" },
    { title: "Disease Name", field: "diseaseName" },
    { title: "Description", field: "description" },
    { title: "Active", field: "active" },
    {
      title: "Action",
      ...actionColumnStyle,
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
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setId(id);
                  setDeleteDialog(true);
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="View">
              <IconButton
                aria-label="view"
                onClick={() => {
                  setId(id);
                  setViewPopup(!viewPopup);
                  setShowtabletextfield(!showtabletextfield);
                  viewMealData(id)
                }}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      printable: false,
    },
  ];

  const columnsViewMeal = [
    {
      title: "Meal Name",
      field: "mealName"
    },
    {
      title: "Menu",
      field: "menu",
    },
  ];

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getDietMaster = () => {
    setLoading(true);
    const params = {
      // AUTOCODEUTILITY - Add request params here.
      filterStatus,
      rowData
    };
    props.getDietMaster({
      params,
      onSuccess: (response) => {
        const { dietMasterList = [] } = response;
        setDisabledExport(dietMasterList.length === 0);
        const data = dietMasterList.map((item, index) => ({
          ...item,
          srNo: index + 1,
        }));
        setData(data);
        setShowGrid(true);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const exportDietMaster = () => {
    const exportData = data.map((item) => ({
      srNo: item.srNo,
      dietName: item.dietName,
      DiseaseId: item.diseaseName,
      Description: item.description,
      active: item.active,
    }));
    const header = [
      ["Sr.No", "Diet Name", "Disease Name", "Description", "Is Active"],
    ];
    downloadExcel({
      data: exportData,
      fileName: "DietMaster",
      header: header,
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
    const dietName = !validateField("dietName");
    const DiseaseId = !validateField("DiseaseId");
    setValidationList({
      ...validationList,
      dietName,
      DiseaseId
    });
    return !dietName && !DiseaseId;
  };

  const dialogContentForMealTypeList = (
    <Grid item xs={12} style={{ marginTop: "-75px" }}>
      <MaterialTable
        icons={GridIcons}
        columns={columnsViewMeal}
        data={mealData}
        options={{
          ...options,
          showTitle: false,
          paging: false,
          search: false
        }}
        style={style}
      />
    </Grid>
  );

  const [value, setValue] = useState([])
  const textChange = (event) => {
    setValue(event)
  };

  const FormContent = (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <TextField
          required={true}
          value={rowData.dietName}
          label="Diet Name"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, dietName: e.target.value });
            validateField("dietName");
          }}
          error={validationList && validationList.dietName ? true : false}
          errorMessage={"Diet Name is Required"}
          maxLength={100}
          multiline={false}
          rows={0}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <MultipleCheckboxSelect
          items={dietCategoryList}
          keyField={"value"}
          textField={"label"}
          label={"Disease Name"}
          checked={rowData.DiseaseId}
          setChecked={(e) => {
            setRowData({ ...rowData, DiseaseId: e });
            validateField("DiseaseId");
          }}
          error={validationList && validationList.DiseaseId ? true : false}
          errorMessage={"Disease Name is Required"}
          required={true}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          required={false}
          value={rowData.description}
          label="Description"
          numeric={undefined}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, description: e.target.value });
            validateField("Description");
          }}
          maxLength={350}
          multiline={true}
          rows={2}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <SingleCheckBox
          label={"Is Active"}
          checked={rowData.isActive}
          onChange={(e) => {
            setRowData({ ...rowData, isActive: e.target.checked });
          }}
          required={false}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <MealType onChange={textChange} value={mealData} />
      </Grid>

      <Grid item xs={12} style={{ justifyContent: "space-between" }}>
        <div className="d-flex align-items-center justify-content-end">
          <Button
            autoFocus
            onClick={() => {
              toggleEditRecord(!editRecord);
              setLoading(false);
            }}
            customClass="button button-black mr-2"
            label={labels.cancelButton}
          />
          <Button
            onClick={(e) => {
              currentOpr === "Add" ? addDietMaster(e) : updateDietMaster(e);
            }}
            customClass="button button-primary"
            label={labels.saveButton}
          />
        </div>
      </Grid>
    </Grid>
  );

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        ...rowData,
        dietName: rowData.dietName,
        DiseaseId: JSON.parse(rowData.diseaseId),
        description: rowData.description,
        isActive: rowData.isActive,
      });
      viewMealData(id);
    }
  }, [editRecord]);

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setRowData({
      dietName: "",
      DiseaseId: "",
      description: "",
      isActive: "1",
      dietId: ""
    });
    setDietMealData([]);
    setMealData([]);
  };

  const addDietMaster = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        dietMealData: value,
        isActive: parseInt(rowData.isActive ? "1" : "0")
      };
      props.saveDietMaster({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getDietMaster(e);
          setLoading(false);
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

  const updateDietMaster = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      delete rowData["srNo"];
      const params = {
        ...rowData,
        dietMealData,
        isActive: parseInt(rowData.isActive ? "1" : "0")
      };
      props.updateDietMaster({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getDietMaster(e);
          setLoading(false);
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

  const getDelete = (e) => {
    const { dietId } = data[id];
    setLoading(true);
    const params = {
      dietId
    };
    props.getDelete({
      params,
      onSuccess: ({ message: displayMessage }) => {
        showGrid && getDietMaster(e);
        setLoading(false);
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
        setDeleteDialog(!deleteDialog);
      },
      onFailure: ({ message }) => {
        getDietMaster(e);
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const getDietCategories = () => {
    const params = {};
    props.getDietCategories({
      params,
      onSuccess: (response) => {
        const { dietCategoryList } = response;
        setDietCategoryList(dietCategoryList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const viewMealData = (id) => {
    const params = {
      DietId: data[id].dietId
    };
    props.viewMealData({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { mealDataList = [] } = response;
        const mealData = mealDataList.map((meal) => ({
          mealName: meal.mealName,
          menu: meal.menu,
          label: meal.mealName,
          value: meal.mealTypeId
        }));
        setMealData(mealData);
        setDietMealData(mealData);
        setShowGrid(true);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    getDietCategories();
  }, []);

  return (
    <div className="holiday-wrapper">
      {!editRecord && (
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <MultipleCheckboxSelect
                items={dietCategoryList}
                keyField={"value"}
                textField={"label"}
                label={"Disease Name"}
                checked={rowData.DiseaseId}
                setChecked={(e) => {
                  setRowData({ ...rowData, DiseaseId: e });
                  validateField("DiseaseId");
                }}
                error={validationList && validationList.DiseaseId ? true : false}
                errorMessage={"Disease Name is Required"}
                required={true}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Select
                data={filterStatusList}
                value={filterStatus}
                label={"Status"}
                onChange={(e) => {
                  const filterStatus = e.target.value;
                  setFilterStatusError(false);
                  setFilterStatus(filterStatus);
                }}
                isInline={true}
                errorMessage={"Status is Required"}
                required={true}
                error={filterStatusError}
              />
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <div className="selection-card-actions">
                <Button
                  label={labels.filterButton}
                  customClass="button button-primary mr-2"
                  onClick={() => {
                    if (filterStatus !== "") {
                      getDietMaster();

                    } else {
                      filterStatus === "" && setFilterStatusError(true);
                    }
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <div className="selection-card-actions">
                <Button
                  onClick={() => {
                    addButtonClick();
                  }}
                  customClass="button button-black add-employee-button"
                  label={"Add Diet"}
                >
                  Add
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
      {showGrid && !editRecord && (
        <div className="card">
          <div className="table-wrapper table-size-xs">
            {!editRecord && (
              <MaterialTable
                icons={GridIcons}
                title={"List of Diets"}
                columns={columns}
                data={data}
                options={options}
                style={style}
                actions={[
                  {
                    icon: () => {
                      return (
                        <Refresh
                          onClick={() => {
                            getDietMaster();
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
                        <SaveAlt
                          onClick={() => {
                            exportDietMaster();
                          }}
                        />
                      );
                    },
                    tooltip: "Download",
                    isFreeAction: true,
                    disabled: disabledExport,
                  },
                ]}
              />
            )}
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
      {deleteDialog && (
        <ConfirmationDialog
          open={deleteDialog}
          dialogTitle="Delete Diet"
          dialogContentText="Are you sure you want to delete this Diet ?"
          cancelButtonText="Cancel"
          okButtonText="Delete"
          onCancel={() => {
            setDeleteDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            setDeleteDialog(false);
            getDelete(e);
          }}
        />
      )}
      {
        viewPopup && (
          <DialogControl
            open={viewPopup}
            dialogTitleText={`Meal Type List`}
            dialogContent={dialogContentForMealTypeList}
            submitAction={false}
            cancelAction={false}
            onCancel={() => {
              setShowtabletextfield(!showtabletextfield);
              setViewPopup(!viewPopup);
              setLoading(false);
            }}
          />
        )
      }
      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
