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
  const [morningData, setMorningData] = useState([]);
  const [eveningData, setEveningData] = useState([])
  const [value, setValue] = useState(0);
  const [rowData, setRowData] = useState({});
  const [dateDay, setDateDay] = useState([]);
  const [dietData, setDietData] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveClick, setSaveClick] = useState(0);
  const [errorCheck, setErrorCheck] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [newMealData, setNewMealData] = useState([]);
  const [additionalData, setAdditionalData] = useState([]);
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const columnsNewMeal = [
    { title: "Sr#", field: "srNo" },
    {
      title: "Meal Name",
      field: "mealName",
      render: ({ tableData: { id }, mealName }) => {
        let ar =
          errorCheck.length > 0 && errorCheck[id]
            ? errorCheck[id]
            : [false, false];
        return (
          <Select
            data={mealData}
            value={mealName}
            onChange={(e) => {
              newMealData[id].mealName = e.target.value;
              setNewMealData(newMealData);
              setSaveClick(saveClick + 1);
            }}
            isInline={true}
            errorMessage={"mealName is Required"}
            required={true}
            error={ar[1] ? true : false}
          />
        );
      },
    },
    {
      title: "Comments",
      field: "comments",
      render: ({ tableData: { id }, comments = null }) => {
        let ar =
          errorCheck.length > 0 && errorCheck[id]
            ? errorCheck[id]
            : [false, false];
        return (
          <TextField
            value={comments}
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              newMealData[id].comments = e.target.value;
              setNewMealData(newMealData);
              setSaveClick(saveClick + 1);
            }}
            placeholder={"Comments"}
            isInline={true}
            id={id}
            maxLength={250}
            inputProps={{ tabIndex: `${(id + 1) * 2}` }}
            required={true}
            error={ar[1] ? true : false}
            errorMessage={"Comments is required."}
          />
        );
      },
    },
    {
      title: "Action",
      ...actionColumnStyle,
      render: ({ tableData: { id } }) => {
        return (
          <div className="table-edit-controls">
            <Tooltip title="Remove">
              <IconButton
                aria-label="Remove"
                onClick={() => {
                  let list = newMealData.filter(
                    (item) => item !== newMealData[id]
                  );
                  let data = list.map((list, index) => ({
                    ...list,
                    srNo: index + 1,
                  }));
                  setNewMealData(data);
                }}
                size="small"
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const insertNewMealRow = () => {
    const row = {
      srNo: newMealData.length + 1,
      mealName: null,
      comments: null,
    };
    const dummyData = [...newMealData];
    dummyData.push(row);
    setNewMealData(dummyData);
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

  const getMorningTherapy = () => {
    const params = {
      GuestId,
    };
    props.getMorningTherapy({
      params,
      onSuccess: (response) => {
        const { treatmentList = [] } = response;
        const data = treatmentList.map((treatment) => ({
          ...treatment,
        }));
        setMorningData(data);
        setEveningData(data)
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const [exist, setExist] = useState([]);
  const getDefaultTherapy = () => {
    const params = {
      GuestId,
    };
    props.getDefaultTherapy({
      params,
      onSuccess: (response) => {
        const { defaultTreatmentList = [] } = response;
        const defaultData = defaultTreatmentList.map((treatment) => ({
          ...treatment,
        }));
        let DefaultTherapyArray = []
        for (let i = 0; i < defaultTreatmentList.length; i++) {
          DefaultTherapyArray.push(defaultTreatmentList[i].value)
        }
        setExist(DefaultTherapyArray)
        setRowData({ ...rowData, DefaultTherapy: exist })
        setDefaultData(defaultData);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const getAdditionalTherapy = () => {
    const params = {
      GuestId,
    };
    props.getAdditionalTherapy({
      params,
      onSuccess: (response) => {
        const { additionalTreatmentList = [] } = response;
        const additionalData = additionalTreatmentList.map((treatment) => ({
          ...treatment,
        }));
        setAdditionalData(additionalData);
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
            MorningTherapy: JSON.parse(existingDataList[0].treatmentId),
            EveningTherapy: JSON.parse(existingDataList[0].treatmentId),
            DefaultTherapy: exist,
            AvoidedItems: "",
            Remarks: ""
          })
          setNewMealData([]);
        }
        else {
          setRowData({
            MorningTherapy: JSON.parse(existingDataList[0].morningTherapy),
            EveningTherapy: JSON.parse(existingDataList[0].eveningTherapy),
            DefaultTherapy: JSON.parse(existingDataList[0].defaultTherapy),
            AdditionalTherapy: JSON.parse(existingDataList[0].additionalTherapy),
            dietId: JSON.parse(existingDataList[0].dietId),
            AvoidedItems: existingDataList[0].avoidedItems,
            Remarks: existingDataList[0].remarks
          })
        }
        setNewMealData(mealDatas)
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
        setLoading(false)
      },
    });
  };

  const saveTreatmentSectionDetails = () => {
    if (checkAllValidation()) {
      setLoading(true);
      const params = {
        ...rowData,
        MealData: newMealData,
        GuestId,
        Date: getDBFormateDate(dateDay[value].dates),
        BookingId: dateDay[value].bookingId,
      };
      console.log(params)
      props.saveTreatmentSectionDetails({
        params,
        onSuccess: ({ message: displayMessage }) => {
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
    }
  };

  const getMealTypeName = () => {
    const params = {
      GuestId,
    };
    props.getMealTypeName({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { mealTypeList } = response;
        setMealData(mealTypeList);
        setLoading(false);
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
      getMorningTherapy();
      getDefaultTherapy();
      getAdditionalTherapy();
      getDietPlanName();
      getMealTypeName();
      setValue(0);
    }
  }, [props.BookingStatus || props.person || props.bookingId]);

  useEffect(() => {
    if (dateDay.length > 0) {
      getExistingRecord();
    }
  }, [value, dateDay]);

  const MorningTherapy = []
  let MorningTherapyData = morningData
  useEffect(() => {
    if (Object.keys(rowData).length > 0) {
      for (let i = 0; i < (rowData.MorningTherapy).length; i++) {
        const selectedMorningTherapy = MorningTherapyData.find((item) => item.value == (rowData.MorningTherapy)[i])
        MorningTherapy.push(selectedMorningTherapy)
        const othersMorningTherapy = MorningTherapyData.filter((item) => item.value != MorningTherapy[i].value)
        MorningTherapyData = othersMorningTherapy
      }
      setMorningData([...MorningTherapy, ...MorningTherapyData])
    }
  }, [rowData.MorningTherapy])

  const EveningTherapy = []
  let EveningTherapyData = eveningData
  useEffect(() => {
    if (Object.keys(rowData).length > 0) {
      for (let i = 0; i < (rowData.EveningTherapy).length; i++) {
        const selectedEveningTherapy = EveningTherapyData.find((item) => item.value == (rowData.EveningTherapy)[i])
        EveningTherapy.push(selectedEveningTherapy)
        const othersEveningTherapy = EveningTherapyData.filter((item) => item.value != EveningTherapy[i].value)
        EveningTherapyData = othersEveningTherapy
      }
      setEveningData([...EveningTherapy, ...EveningTherapyData])
    }
  }, [rowData.EveningTherapy])

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
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <MultipleSelectionList
                      items={morningData}
                      width={"100%"}
                      checked={rowData.MorningTherapy}
                      setChecked={(e) => {
                        setRowData({ ...rowData, MorningTherapy: e });
                        validateField("MorningTherapy");
                      }}
                      error={validationList && validationList.MorningTherapy ? true : false}
                      errorMessage={"Morning Therapy is Required"}
                      required={true}
                      keyField={"value"}
                      textField={"label"}
                      label={"Morning Therapy"}
                      columns={3}
                      style={{ overflow: "auto", maxHeight: "130px" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MultipleSelectionList
                      items={eveningData}
                      width={"100%"}
                      checked={rowData.EveningTherapy}
                      setChecked={(e) => {
                        setRowData({ ...rowData, EveningTherapy: e });
                        validateField("EveningTherapy");
                      }}
                      error={validationList && validationList.EveningTherapy ? true : false}
                      errorMessage={"Evening Therapy is Required"}
                      required={true}
                      keyField={"value"}
                      textField={"label"}
                      label={"Afternoon Therapy"}
                      columns={3}
                      style={{ overflow: "auto", maxHeight: "130px" }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} style={{ "padding-top": "35px" }} >
                  <MultipleSelectionList
                    items={defaultData}
                    width={"100%"}
                    checked={rowData.DefaultTherapy}
                    setChecked={(e) => {
                      setRowData({ ...rowData, DefaultTherapy: e });
                    }}
                    required={false}
                    keyField={"value"}
                    textField={"label"}
                    label={"Default Therapy"}
                    columns={3}
                    style={{ overflow: "auto", maxHeight: "200px" }}
                  />
                </Grid>
                <Grid item xs={12} md={12} style={{ "padding-top": "35px" }} >
                  <MultipleSelectionList
                    items={additionalData}
                    width={"100%"}
                    checked={rowData.AdditionalTherapy}
                    setChecked={(e) => {
                      setRowData({ ...rowData, AdditionalTherapy: e });
                    }}
                    required={false}
                    keyField={"value"}
                    textField={"label"}
                    label={"Additional Therapy"}
                    columns={3}
                    style={{ overflow: "auto", maxHeight: "200px" }}
                  />
                </Grid>
                <Grid container spacing={2} style={{ "padding-top": "25px" }}>
                  <Grid item xs={12} md={4} >
                    <MultipleCheckboxSelect
                      items={dietData}
                      keyField={"value"}
                      textField={"label"}
                      label={"Diet Plan"}
                      checked={rowData.dietId}
                      setChecked={(e) => {
                        setRowData({ ...rowData, dietId: e });
                      }}
                      required={false}
                      errorMessage={"Diet Plan is Required"}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      required={false}
                      value={rowData.AvoidedItems}
                      label="Avoid Items"
                      numeric={undefined}
                      isAutoFocus={false}
                      onChange={(e) => {
                        setRowData({ ...rowData, AvoidedItems: e.target.value });
                      }}
                      maxLength={500}
                      multiline={true}
                      rows={2}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      required={false}
                      value={rowData.Remarks}
                      label="Remarks"
                      numeric={undefined}
                      isAutoFocus={false}
                      onChange={(e) => {
                        setRowData({ ...rowData, Remarks: e.target.value });
                      }}
                      maxLength={500}
                      multiline={true}
                      rows={2}
                      errorMessage={"Remarks is Required"}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ "padding-top": "25px" }}>
                  <Grid item xs={12} md={6}>
                    <MaterialTable
                      icons={GridIcons}
                      title={"Add Meal"}
                      columns={columnsNewMeal}
                      data={newMealData}
                      style={style}
                      options={{
                        ...options,
                        paging: false,
                        search: false,
                        maxBodyHeight: 200,
                      }}
                      actions={[
                        {
                          icon: () => {
                            return (
                              <AddBox
                                onClick={() => {
                                  insertNewMealRow();
                                }}
                              />
                            );
                          },
                          tooltip: "Add Meal",
                          isFreeAction: true,
                        },
                      ]}
                    />
                  </Grid>
                </Grid>
              </div>
              <Grid item xs={12} style={{ justifyContent: "space-between", paddingTop: "5px" }}>
                <div className="d-flex align-items-center justify-content-end">
                  <Button
                    disabled={
                      (getDCRFormatDate(dateDay[value].dates) < getDCRFormatDate(Date())) ? true : false
                    }
                    onClick={(e) => {
                      saveTreatmentSectionDetails(e);
                    }}
                    customClass="button button-primary"
                    label={labels.saveButton}
                  />
                </div>
              </Grid>
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