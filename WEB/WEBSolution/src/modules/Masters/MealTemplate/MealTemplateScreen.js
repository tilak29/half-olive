import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Refresh, Edit, Delete } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { labels } from "../../../Config.json";
import {
  actionColumnStyle,
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import Loading from "../../../components/core/Loading";
import DisplayMessage from "../../../components/core/DisplayMessage";
import Button from "../../../components/core/Button";
import Select from "../../../components/core/Select";
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import DatePicker from "../../../components/core/DatePicker";
import { getDisplayDate, getDBFormateDate, getDCRFormatDate } from "../../../Utils/DateTimeUtils.js";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";
import MealType from "../../../components/custom/MealType/MealTypeContainer";

function TabPanel(props) {
  const { children, value, index, person, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Add, update, delete operations for Meal Template

export default function MealTemplateScreen(props) {
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [value, setValue] = useState(0);
  const [rowData, setRowData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [showGrid, setShowGrid] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [editRecord, toggleEditRecord] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [validationList, setValidationList] = useState({});
  const [existingMealData, setExistingMealData] = useState();
  const [existingMealDataForAdd, setExistingMealDataForAdd] = useState();
  const [filterStatusError, setFilterStatusError] = useState(false);
  const [effectiveDateListData, setEffectiveDateListData] = useState([]);
  const [editableday, setEditableDay] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const columns = [
    {
      title: "Days",
      field: "dayId",
    },
    {
      title: "Herbal Juice",
      field: "herbalJuice",
    },
    {
      title: "Breakfast",
      field: "breakfast",
    },
    {
      title: "Post Breakfast",
      field: "postBreakfast",
    },
    {
      title: "Lunch",
      field: "lunch",
    },
    {
      title: "Post Lunch",
      field: "postLunch",
    },
    {
      title: "Dinner",
      field: "dinner",
    },
    {
      title: "Health / Post Dinner",
      field: "healthPostDinner",
    },
    {
      title: "Action",
      ...actionColumnStyle,
      //hidden: (data != undefined && data.length > 0 && getDCRFormatDate(data[0].effectiveDate) < getDCRFormatDate(Date())) ? true : false,
      hidden: (data != undefined && data.length > 0 && data[0].effectiveDate < editableday) ? true : false,
      render: ({ tableData: { id } }) => {
        return (
          <div className="table-edit-controls">
            <Tooltip title="Edit">
              <IconButton
                //disabled={(data[id].effectiveDate < editableday) ? true : false}
                aria-label="edit" onClick={() => {
                  setId(id);
                  toggleEditRecord(true);
                  setCurrentOpr("Update");
                  setValidationList({});
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            {
              (
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
              )
            }
          </div >
        );
      },
      printable: false,
    },
  ];

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getMealTemplateList = () => {
    setLoading(true);
    const params = {
      effectiveDate: filterStatus
    };
    props.getMealTemplateList({
      params,
      onSuccess: (response) => {
        const { mealTemplateList = [] } = response;
        const data = mealTemplateList.map((meal) => ({
          ...meal,
          effectiveDate: getDCRFormatDate(params.effectiveDate)
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

  const getExistingMealData = () => {
    const { mealTemplateId } = data[id];
    setLoading(true);
    const params = {
      mealTemplateId
    };
    props.getExistingMealData({
      params,
      onSuccess: (response) => {
        const { existingMealList = [] } = response;
        const existingMealData = existingMealList.map((meal) => ({
          ...meal,
          label: meal.mealName
        }));
        setValue(existingMealData[0].dayId - 1);
        setRowData({ ...rowData, effectiveDate: existingMealData[0].effectiveDate })
        setExistingMealData(existingMealData);
        setShowGrid(true);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const getExistingDataOnEffeDateWise = (date) => {
    setLoading(true);
    const params = {
      dayindex,
      effectiveDate: getDCRFormatDate(date)
    };
    props.getExistingDataOnEffeDateWise({
      params,
      onSuccess: (response) => {
        const { existingMealDataList = [] } = response;
        const existingMealDataForAdd = existingMealDataList.map((meal) => ({
          ...meal,
          label: meal.mealName
        }));
        setExistingMealDataForAdd(existingMealDataForAdd);
        setShowGrid(false);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    getExistingDataOnEffeDateWise(rowData.effectiveDate);
  }, [value])

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
    const effectiveDate = !validateField("effectiveDate");
    setValidationList({
      ...validationList,
      effectiveDate
    });
    return !effectiveDate;
  };

  const [menu, setMenu] = useState([])
  const textChange = (event) => {
    setMenu(event)
  };

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const FormContent = (
    <>
      <Grid md={4} style={{ margin: "5px" }}>
        <DatePicker
          required={true}
          defaultValue={
            rowData.effectiveDate !== null
              ? getDisplayDate(rowData.effectiveDate)
              : null
          }
          label="Effective Date"
          tooltipText={"Effective Date"}
          onChange={(date) => {
            getExistingDataOnEffeDateWise(date)
            setRowData({ ...rowData, effectiveDate: date });
            validateField("effectiveDate");
          }}
          error={validationList && validationList.effectiveDate ? true : false}
          errorMessage={"Effective Date is Required"}
        />
      </Grid>
      <div style={{ display: "flex" }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'grey' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {
                days.map((e) =>
                (
                  <Tab style={{ minWidth: "140px" }} label={e} />
                )
                )
              }
            </Tabs>
            {
              days.map((e, index) => (
                <TabPanel value={value} index={index} >
                  <div style={{ marginLeft: "10px" }}>
                    <MealType showTitle={false} toolbar={false} onChange={textChange} value={(currentOpr == "Update") ? existingMealData : existingMealDataForAdd} />
                  </div>
                  <div className="d-flex align-items-center justify-content-end" style={{ marginTop: "5px" }}>
                    <Button
                      autoFocus
                      onClick={() => {
                        toggleEditRecord(!editRecord);
                        setLoading(false);
                        if (filterStatus != "") {
                          getMealTemplateList();
                        }
                      }}
                      customClass="button button-black mr-2"
                      label={labels.cancelButton}
                    />
                    <Button
                      onClick={(e) => {
                        currentOpr === "Add" ? saveMealTemplateData(e) : updateMealTemplateData(e);
                      }}
                      customClass="button button-primary"
                      label={labels.saveButton}
                    />
                  </div>
                </TabPanel>
              ))
            }
          </Box>
        </Box>
      </div>
    </>
  );

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      getExistingMealData();
    }
  }, [editRecord]);

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setValue(0);
    setRowData({
      effectiveDate: Date()
    });
    setExistingMealData();
    getExistingDataOnEffeDateWise(Date());
  };

  const getEffectiveDateFilter = () => {
    const params = {
      // AUTOCODEUTILITY - Add request params here.
    };
    props.getEffectiveDateFilter({
      params,
      onSuccess: (response) => {
        const { effectiveDateList = [] } = response;
        const data = effectiveDateList.map((item) => ({
          value: item.effectiveDate,
          label: getDisplayDate(item.effectiveDate)
        }));
        setEffectiveDateListData(data);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const getMealEditDay = () => {
    const params = {};
    props.getMealEditDay({
      params,
      onSuccess: (response) => {
        const { mealEditDay } = response;
        let todayDate = new Date();
        setEditableDay(getDCRFormatDate(todayDate.setDate(todayDate.getDate() + parseInt(mealEditDay[0].mealEditDay))));
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    getEffectiveDateFilter();
    getMealEditDay();
  }, []);

  const dayindex = value + 1
  const saveMealTemplateData = (e) => {
    if (checkAllValidation()) {
      setLoading(true);
      const params = {
        Day: days[value],
        EffectiveDate: getDBFormateDate(rowData.effectiveDate),
        TemplateMealData: menu,
        dayindex
      };
      props.saveMealTemplateData({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getMealTemplateList(e);
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

  const updateMealTemplateData = (e) => {
    const { mealTemplateId } = data[id];
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        EffectiveDate: rowData.effectiveDate,
        mealTemplateId,
        TemplateMealData: menu
      };
      props.updateMealTemplateData({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getMealTemplateList(e);
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

  const deleteMealTemplateData = (e) => {
    const { mealTemplateId } = data[id];
    setLoading(true);
    const params = {
      mealTemplateId
    };
    props.deleteMealTemplateData({
      params,
      onSuccess: ({ message: displayMessage }) => {
        getMealTemplateList(e);
        setLoading(false);
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
        setDeleteDialog(!deleteDialog)
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  return (
    <div className="table-wrapper">
      {!editRecord && (
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <Select
                data={effectiveDateListData}
                value={filterStatus}
                label={"Effective Date"}
                onChange={(e) => {
                  const filterStatus = e.target.value;
                  setFilterStatusError(false);
                  setFilterStatus(filterStatus);
                }}
                isInline={true}
                required={true}
                error={filterStatusError}
                errorMessage={"Effective Date is Required"}
              />
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <div className="selection-card-actions">
                <Button
                  label={labels.filterButton}
                  customClass="button button-primary mr-2"
                  onClick={() => {
                    if (filterStatus != "") {
                      getMealTemplateList();
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
                  label={"Add Meal Template"}
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
                title={"List of Day Wise Meal"}
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
                            getMealTemplateList();
                          }}
                        />
                      );
                    },
                    tooltip: "Refresh Data",
                    isFreeAction: true,
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
      {deleteDialog && (
        <ConfirmationDialog
          open={deleteDialog}
          dialogTitle="Delete Meal"
          dialogContentText="Are you sure want to delete this?"
          cancelButtonText="Cancel"
          okButtonText="Delete"
          onCancel={() => {
            setDeleteDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            setDeleteDialog(false);
            deleteMealTemplateData(e);
          }}
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