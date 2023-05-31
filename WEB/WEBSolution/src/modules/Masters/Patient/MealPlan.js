import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import MaterialTable from "material-table";
import { labels } from "../../../Config.json";
import { Delete, AddBox } from "@material-ui/icons";
import Select from "../../../components/core/Select";
import Button from "../../../components/core/Button";
import Typography from '@material-ui/core/Typography';
import Loading from "../../../components/core/Loading";
import TextField from "../../../components/core/TextField";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import DisplayMessage from "../../../components/core/DisplayMessage";
import MultipleSelectionList from "../../../components/custom/MultipleSelectionList";
import MultipleCheckboxSelect from "../../../components/custom/MultipleCheckboxSelect";
import { GridIcons, options, style, actionColumnStyle } from "../../../components/custom/GridConfig";
import { getDCRFormatDate, getDBFormateDate, getDisplayDate } from "../../../Utils/DateTimeUtils.js";
import MealType from "../../../components/custom/MealType/MealTypeContainer";
function TabPanel(props) {
  const { children, value, index, person, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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

// Add, update operations for Treatment-Section
export default function PatientList(props) {
  const [value, setValue] = useState(0);
  const [rowData, setRowData] = useState({});
  const [dateDay, setDateDay] = useState([]);
  const [dietData, setDietData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [existingDateWiseMealData, setExistingDateWiseMealData] = useState();
  const [showMealTable,toggleShowMealTable] = useState(false);
  const [editableday, setEditableDay] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
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
    const MorningTherapy = !validateField("MorningTherapy");
    const EveningTherapy = !validateField("EveningTherapy");
    setValidationList({
      ...validationList,
      MorningTherapy,
      EveningTherapy
    });
    return !MorningTherapy && !EveningTherapy;
  };

  let GuestId = props.person;
  let BookingStatus = props.bookingStatus;
  const getDayWiseDate = () => {
    const params = {
      BookingId : props.bookingId,
      BookingStatus
    };
    props.getDayWiseDate({
      params,
      onSuccess: (response) => {
        const { dateList = [] } = response;
        const dateDay = dateList.map((date) => ({
          ...date,
          dates: getDisplayDate(date.dates),
        }));
        setDateDay(dateDay);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const getDietPlanName = () => {
    const params = {
      GuestId,
    };
    props.getDietPlanName({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { dietPlanList } = response;
        const dietData = dietPlanList.map((diet) => ({
          ...diet,
          value:parseInt(diet.value)
        }));
        setDietData(dietData);
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
        console.log(mealEditDay);
        let todayDate = new Date();
        setEditableDay(getDCRFormatDate(todayDate.setDate(todayDate.getDate() + parseInt(mealEditDay[0].mealEditDay))));
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const getExistingRecord = () => {
    const params = {
      GuestId,
      Date: getDBFormateDate(dateDay[value].dates),
      BookingId: dateDay[value].bookingId
    };
    props.getExistingRecord({
      params,
      onSuccess: (response) => {
        const { existingDataList = [] } = response;
        const mealDatas = existingDataList.map((item, index) => (
          {
            srNo: index + 1,
            mealName: item.mealType,
            comments: item.comments
          }
        ))
        if (existingDataList[0].morningTherapy == undefined) {
          setRowData({
            AvoidedItems: "",
            Remarks: ""
          })
        }
        else {
          setRowData({
            dietId: JSON.parse(existingDataList[0].dietId),
            AvoidedItems: existingDataList[0].avoidedItems,
            Remarks: existingDataList[0].remarks,
            dietName:existingDataList[0].dietName
          })
        }
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
        setLoading(false)
      },
    });
  };
  const updateDateWiseMealTemplateData = (e) => {
    setLoading(true);
    const params = {
      EffectiveDate: getDBFormateDate(dateDay[value].dates),
      dateWiseMealTemplateId: existingDateWiseMealData[0].dateWiseMealTemplateId,
      DateWiseMealTemplateData: menu.length!=0?menu:existingDateWiseMealData
    };
    props.updateDateWiseMealTemplateData({
      params,
      onSuccess: ({ message: displayMessage }) => {
        // getDateWiseMealTemplateList(e);
        setLoading(false);
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    if (props.person != null && props.person > 0 && props.bookingId !=null) {
      setLoading(true)
      getDayWiseDate();
      getDietPlanName();
      getMealEditDay();
      setValue(0);
    }
  }, [props.BookingStatus || props.person || props.bookingId]);

useEffect(() => {
    if (dateDay.length > 0) {
        getExistingRecord();
        getExistingDateWiseMealTemplateList(dateDay[value].dates);
    }
  }, [value, dateDay]);
  const getExistingDateWiseMealTemplateList = (date) => {
    setLoading(true);
    const params = {
      effectiveDate:date
    };
    props.getExistingDateWiseMealTemplateList({
      params,
      onSuccess: (response) => {
        const { existingDateWiseMealList = [] } = response;
        const existingDateWiseMealData = existingDateWiseMealList.map((meal) => ({
          ...meal,
          label: meal.mealName
        }));
        if(existingDateWiseMealData.length!=0)
        {
          toggleShowMealTable(true);
        }
        else
        {
          toggleShowMealTable(false);
          displayErrorMessage(`Meal plan not fixed for ${date} please contact admin`);
        }
        setExistingDateWiseMealData(existingDateWiseMealData);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };
  const [menu, setMenu] = useState([])
  const textChange = (event) => {
    setMenu(event)
  };
  return (
    <>
      <div className="tab-root" style={{ "paddingTop": "5px" }} >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {
            dateDay.map((e) =>
            (
              <Tab label={<div> {`${e.dates}`} <br /> {`Day${e.day}`} </div>} />
            )
            )
          }
        </Tabs>
        {
          dateDay.map((e, index) => (
            <TabPanel value={value} index={index} >
              <div className="card selection-card selection-card-two-columns mb-3" style={{ "maxHeight": "420px", "overflow": "auto" }}>
                <Grid container spacing={2} style={{ "padding-top": "25px" }}>
                  <Grid item xs={12} md={4} >
                    <div>
                        Diet Plan
                    </div>
                    <div>
                        {rowData.dietName}
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div>
                        AvoidItems
                    </div>
                    <div>
                        {rowData.AvoidedItems}
                    </div>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <div>
                        Remarks
                    </div>
                    <div>
                        {rowData.Remarks}
                    </div>
                  </Grid>
                </Grid>
              </div>
              {showMealTable &&(
                <>
                <MealType showTitle={false} toolbar={false} onChange={textChange} value={existingDateWiseMealData} />
                <Grid item xs={12} style={{ justifyContent: "space-between", paddingTop: "5px" }}>
                  <div className="d-flex align-items-center justify-content-end">
                    <Button
                      disabled={
                        (getDCRFormatDate(dateDay[value].dates) < editableday) ? true : false
                      }
                      onClick={(e) => {
                        updateDateWiseMealTemplateData(e);
                      }}
                      customClass="button button-primary"
                      label={labels.saveButton}
                    />
                  </div>
                </Grid>
                </>
              )}
            </TabPanel>
          ))
        }
      </div>
      {loading && <Loading />}
      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </>
  );
}