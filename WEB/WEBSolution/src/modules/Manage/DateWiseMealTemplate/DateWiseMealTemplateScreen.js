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

export default function DateWiseMealTemplateScreen(props) {
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [showGrid, setShowGrid] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [editRecord, toggleEditRecord] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [validationList, setValidationList] = useState({});
  const [existingDateWiseMealData, setExistingDateWiseMealData] = useState();
  const [existingMealDataForAdd, setExistingMealDataForAdd] = useState();
  const [filterStatusError, setFilterStatusError] = useState(false);
  const [effectiveDateListData, setEffectiveDateListData] = useState([]);
  const [editableday, setEditableDay] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const columns = [
    {
      title: "Sr#",
      field: "srNo",
      editable: "never",
      cellStyle: {
        textAlign: "center"
      }
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
      // hidden: (data != undefined && data.length > 0 && getDCRFormatDate(data[0].effectiveDate) < getDCRFormatDate(Date())) ? true : false,
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

  const getDateWiseMealTemplateList = () => {
    setLoading(true);
    const params = {
      effectiveDate: filterStatus
    };
    props.getDateWiseMealTemplateList({
      params,
      onSuccess: (response) => {
        const { dateWiseMealTemplateList = [] } = response;
        const data = dateWiseMealTemplateList.map((meal, index) => ({
          ...meal,
          srNo: index + 1,
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

  const getExistingDateWiseMealTemplateList = () => {
    const { effectiveDate } = data[id];
    setLoading(true);
    const params = {
      effectiveDate
    };
    props.getExistingDateWiseMealTemplateList({
      params,
      onSuccess: (response) => {
        const { existingDateWiseMealList = [] } = response;
        const existingDateWiseMealData = existingDateWiseMealList.map((meal) => ({
          ...meal,
          label: meal.mealName
        }));
        setExistingDateWiseMealData(existingDateWiseMealData);
        setShowGrid(true);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const dayindex = value + 1;
  const getDateWiseMealTemplateExistingData = (date) => {
    setLoading(true);
    const params = {
      dayindex,
      effectiveDate: getDCRFormatDate(date)
    };
    props.getDateWiseMealTemplateExistingData({
      params,
      onSuccess: (response) => {
        const { existingMealDataList = [] } = response;
        const existingMealDataForAdd = existingMealDataList.map((meal) => ({
          ...meal,
          label: meal.mealName
        }));
        setExistingMealDataForAdd(existingMealDataForAdd);
        if(existingMealDataForAdd.length>0)
        {
          setMenu(existingMealDataForAdd);
        }
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    getDateWiseMealTemplateExistingData(dates[value]);
  }, [value])

  const [menu, setMenu] = useState([])
  const textChange = (event) => {
    setMenu(event)
  };

  const dates = [];
  let curr = new Date
  for (let i = 0; i < 7; i++) {
    let first = curr.getDate() - curr.getDay() + i
    let date = new Date(curr.setDate(first)).toISOString().slice(0, 10)
    dates.push(getDisplayDate(date))
  }

  const FormContent = (
    <>
      <div style={{ display: "flex" }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'grey' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {
                dates.map((e) =>
                (
                  <Tab style={{ minWidth: "140px" }} label={e} />
                )
                )
              }
            </Tabs>
            {
              dates.map((e, index) => (
                <TabPanel value={value} index={index} >
                  <div style={{ marginLeft: "10px", marginTop: "10px" }}>
                    <MealType showTitle={false} toolbar={false} onChange={textChange} value={(currentOpr == "Update") ? existingDateWiseMealData : existingMealDataForAdd} />
                  </div>
                  <div className="d-flex align-items-center justify-content-end" style={{ marginTop: "5px" }}>
                    <Button
                      autoFocus
                      onClick={() => {
                        toggleEditRecord(!editRecord);
                        setLoading(false);
                        if (filterStatus != "") {
                          getDateWiseMealTemplateList();
                        }
                      }}
                      customClass="button button-black mr-2"
                      label={labels.cancelButton}
                    />
                    <Button
                      onClick={(e) => {
                        currentOpr === "Add" ? saveDateWiseMealTemplateData(e) : updateDateWiseMealTemplateData(e);
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
      getExistingDateWiseMealTemplateList();
    }
  }, [editRecord]);

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setValue(0);
    setExistingDateWiseMealData();
  };

  const getEffectiveDate = () => {
    const params = {
      // AUTOCODEUTILITY - Add request params here.
    };
    props.getEffectiveDate({
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
    getEffectiveDate();
    getMealEditDay();
  }, [])

  const saveDateWiseMealTemplateData = (e) => {
    setLoading(true);
    const params = {
      EffectiveDate: getDBFormateDate(dates[value]),
      DateWiseMealTemplateData: menu
    };
    props.saveDateWiseMealTemplateData({
      params,
      onSuccess: ({ message: displayMessage }) => {
        getEffectiveDate();
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
  };

  const updateDateWiseMealTemplateData = (e) => {
    const { dateWiseMealTemplateId } = data[id];
    setLoading(true);
    const params = {
      EffectiveDate: getDBFormateDate(dates[value]),
      dateWiseMealTemplateId,
      DateWiseMealTemplateData: menu
    };
    props.updateDateWiseMealTemplateData({
      params,
      onSuccess: ({ message: displayMessage }) => {
        getDateWiseMealTemplateList(e);
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
  };

  const deleteDateWiseMealTemplateData = (e) => {
    const { dateWiseMealTemplateId } = data[id];
    setLoading(true);
    const params = {
      dateWiseMealTemplateId
    };
    props.deleteDateWiseMealTemplateData({
      params,
      onSuccess: ({ message: displayMessage }) => {
        getDateWiseMealTemplateList(e) && getEffectiveDate();
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
                      getDateWiseMealTemplateList();
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
                title={"List of Date Wise Meal"}
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
                            getDateWiseMealTemplateList();
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
            deleteDateWiseMealTemplateData(e);
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