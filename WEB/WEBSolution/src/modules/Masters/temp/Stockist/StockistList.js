import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Edit, Refresh, SaveAlt,Search } from "@material-ui/icons";
import { Grid, IconButton, Tooltip,withStyles,Typography, } from "@material-ui/core";

import Button from "../../../components/core/Button";
import {
  GridIcons,
  options,
  style,
  actionColumnStyle,
} from "../../../components/custom/GridConfig";
import Loading from "../../../components/core/Loading";
import Select from "../../../components/core/Select";
import TextField from "../../../components/core/TextField";
import DatePicker from "../../../components/core/DatePicker";
import RadioGroup from "../../../components/core/RadioGroup";
import StatesSelect from "../../../components/custom/StatesSelect/StatesSelectContainer";
import DisplayMessage from "../../../components/core/DisplayMessage";
import StateCitySelect from "../../../components/custom/StateCitySelect/StateCitySelectContainer";
import {
  getDisplayDate,
  getDBFormateDate,
} from "../../../Utils/DateTimeUtils.js";
import { labels, staticDataId } from "../../../Config.json";
import downloadExcel from "../../../Utils/DownloadExcel";
import MultipleCheckboxSelect from "../../../components/custom/MultipleCheckboxSelect";
import DialogControl from "../../../components/core/Dialog"; // C1

/**
 * Stockist List grid with state and status filter
 * Add, update operations for stokist
 * @author Nirali Maradiya
 * 
 * C1 | Brinda | 02-July-2021 | Search Stockist By Name and Mobile No change
 */

export default function StockistList(props) {
  const { Country_India } = staticDataId;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [isActiveStatus, setIsActiveStatus] = useState(1);
  const [rowData, setRowData] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [id, setId] = useState();
  const [error, setError] = useState(false);
  const [selectedStateName, setSelectedStateName] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryVal, setCountryVal] = useState(Country_India);
  const [titleProperties, setTitleProperties] = useState({});
  const [isMobileRegexValid, setIsMobileRegexValid] = useState(true);
  const [isEmailRegexValid, setIsEmailRegexValid] = useState(true);
  const [isGstNoRegexValid, setIsGstNoRegexValid] = useState(true);
  const [superStockistList, setSuperStockistList] = useState([]);
  const [stateCitySelectProperties, setStateCitySelectProperties] = useState(
    {}
  );
  const [areaFilterList, setAreaFilterList] = useState([]);
  const [selectedFilterArea, setSelectedFilterArea] = useState([]);
  const [selectedFilterAreaError, setSelectedFilterAreaError] = useState(false);
  const [disabledExport, setDisabledExport] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState([]);
  const [selectedFilterError, setSelectedFilterError] = useState(false);

  const [selectedDFilter, setSelectedDFilter] = useState([]);
  const [selectedDFilterError, setSelectedDFilterError] = useState(false);

  const [selectedMCFilter, setSelectedMCFilter] = useState([]);
  const [selectedMCFilterError, setSelectedMCFilterError] = useState(false);

  const [divisionList, setDivisionList] = useState([]);
  const [selectedDivisionId, setSelectedDivisionId] = useState("");

  const [selectedMappingCity, setSelectedMappingCity] = useState(false);

  const {
    stateValue = "",
    cityValue = "",
    // stateError = false,
    // cityError = false,
  } = stateCitySelectProperties;

  const { operationRights, cityList = [],loggedInDesignationId } = props;
  const { add, edit } = operationRights;
  let filteredCities =
    stateValue === ""
      ? []
      : cityList.filter((city) => city.stateId === stateValue);
  const workingDropDownData = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  const isSuperStockistOptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  const smsSubscriptionOptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  /* C1: Start - Search Stockist by name and mobile number */
  const [searchDialog, toggleSearchDialog] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTxtError, setSearchTxtError] = useState(false);
  const [isAdminOrJRAdmin, setIsAdminOrJRAdmin] = useState(false);
  const [isSearchCall, setIsSearchCall] = useState(false);
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [isActiveStatusError,setIsActiveStatusError]=useState(false);
  /* End - Search Stockist by name and mobile number */

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  useEffect(() => {
    setIsAdminOrJRAdmin(
      loggedInDesignationId === 1 || loggedInDesignationId === 7
    ); //C1
    if (cityList.length === 0) {
      props.getCities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCountries = () => {
    props.getCountries({
      onSuccess: (response) => {
        const { countryList } = response;
        setCountries(countryList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const getAllDivisions = () => {
    props.getAllDivisions({
      onSuccess: (response) => {
        // let allOptionObj = { label: "All", value: "All" };
        const { allDivisionList } = response;
       // divisionList.splice(0, 0, allOptionObj);
        setDivisionList(allDivisionList);
        setSelectedDivisionId("All");
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

const getSuperStockistList = () => {
  props.getSuperStockists({
    //params,
    onSuccess: (response) => {
      const { superStockistList } = response;
        setSuperStockistList(superStockistList);
    },
    onFailure: ({ message }) => {
      displayErrorMessage(message);
    },
  });
};

  useEffect(() => {
    getCountries();
    getSuperStockistList();
    getAllDivisions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCountries();
    getSuperStockistList();

    if(rowData.isSuperStockist === 1) rowData.superStockistId = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowData.isSuperStockist]);

  const getStockistList = (e,isSearchCalled, search = null) => {
    e.preventDefault();
    setLoading(true);
    const params = {
      stateId: !isSearchCalled?selectedState:null,
      isActive: !isSearchCalled?isActiveStatus:null,
      isStockistSearch: isSearchCalled, //C1
      search: search //C1
    };

    props.getStockistList({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { stockistList = [] } = response;
        setDisabledExport(stockistList.length === 0);
        const data = stockistList.map((stockist, index) => ({
          ...stockist,
          srNo: index + 1,
          dob: stockist.dob !== null ? getDisplayDate(stockist.dob) : null,
          expiryDate:
            stockist.expiryDate !== null
              ? getDisplayDate(stockist.expiryDate)
              : null,
        }));
        setData(data);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const exportReport = () => {
    const header = [
      [
        "Sr.No",
        "Stockist Name",
        "Contact Person",
        "Mobile Number",
        "Phone Number",
        "Email",
        "DOB",
        "Sate",
        "City",
        "Area",
        "Address",
        "Pin Code",
        "GST Number",
        "DL Number",
        "Expiry Date",
      ],
    ];
    const exportData = data.map((x) => {
      x = {
        srNo: parseInt(x.tableData.id) + 1,
        stockistName: x.stockistName,
        contactPerson: x.contactPerson,
        mobileNumber: x.mobileNumber,
        phoneNumber:x.phoneNumber,
        email: x.email,
        dob: x.dob,
        stateName: x.stateName,
        cityName: x.cityName,
        areaName: x.areaName,
        address: x.address,
        pinCode: x.pinCode,
        gstNumber:x.gstNumber,
        dlNo: x.dlNo,
        expiryDate: x.expiryDate,
      };
      return x;
    });

  //const name = selectedStateName;// monthYearList.filter((record) => record.value === selectedMonthYear)[0].label;
  const fileName = selectedStateName; //(name).split('-')[0] + '' + (name).split('-')[1];
  downloadExcel({
    data: exportData,
    fileName: `StocklistList_for_${fileName}`,
    header: header,
  });
  };

  const addButtonClick = () => {
    //getSuperStockistList();
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setSelectedFilterArea([]);
    setSelectedFilter([]);
    setSelectedDFilter([]);
    setSelectedMCFilter([]);
    setSelectedMappingCity(false);
    setStateCitySelectProperties({
      stateValue: "",
      cityValue: "",
      stateError: false,
      cityError: false,
    });
    setRowData({
      stockistName: "",
      countryId: Country_India,
      dob: null,
      contactPerson: "",
      isSuperStockist: 0,
      isActive: "1",
      address: "",
      mobileNumber: "",
      email: "",
      phoneNumber: "",
      pinCode: "",
      gstNumber: "",
      dlNo: "",
      expiryDate: null,
      smsSubscription:1,
      areaId:null,
      userPassword:'11',
      stockistRefCode:null
    });
  };

  const validateField = (field) => {
    let isValid = true;   
    let validTrimValue =
      typeof rowData[field] != "string" ? false : rowData[field].trim() == "";
    if (
      !rowData[field] ||
      rowData[field] === "" ||
      validTrimValue ||
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
    const stockistName = !validateField("stockistName");
    const countryId = !validateField("countryId");
    const contactPerson = !validateField("contactPerson");
    const mobileNumber = !validateField("mobileNumber");
    const gstNumber = !validateField("gstNumber");
    const dlNo = !validateField("dlNo");
    const expiryDate = !validateField("expiryDate");
    const isMobileValid = !isMobileRegexValid;
    const areaId = !validateField("areaId");
    var stockistRefCode = false;
    if (rowData.isSuperStockist === 0) {
      stockistRefCode = !validateField("stockistRefCode");
    }
    const isEmailValid =
      rowData.email !== "" && rowData.email !== null
        ? !isEmailRegexValid
        : false;
    const isGstNumberValid = !isGstNoRegexValid;

    var superStockistId = true;
    var divisionId = true;
    var MappingCity = true;

    if (rowData.isSuperStockist === 0) {
      setSelectedFilterError(selectedFilter.length === 0 ? true : false);
      superStockistId = selectedFilter.length === 0 ? true : false;

      setSelectedMappingCity(selectedMCFilter.length === 0 ? true : false);
      MappingCity = selectedMCFilter.length === 0 ? false : true;
    } else {
      setSelectedDFilterError(selectedDFilter.length === 0 ? true : false);
      divisionId = selectedDFilter.length === 0 ? true : false;
    }

    setStateCitySelectProperties({
      ...stateCitySelectProperties,
      stateError: stateValue === "" ? true : false,
      cityError: cityValue === "" ? true : false,
    });
    const stateErr = stateValue === "" ? true : false;
    const cityErr = cityValue === "" ? true : false;

    setValidationList({
      stockistName,
      countryId,
      contactPerson,
      mobileNumber,
      gstNumber,
      dlNo,
      expiryDate,
      superStockistId,
      areaId,
      stockistRefCode,
    });

    return (
      !stockistName &&
      !countryId &&
      !stateErr &&
      !cityErr &&
      !contactPerson &&
      !mobileNumber &&
      !gstNumber &&
      !dlNo &&
      !expiryDate &&
      !isMobileValid &&
      !isEmailValid &&
      !isGstNumberValid &&
      !areaId &&
      !stockistRefCode &&
      ((!superStockistId && rowData.isSuperStockist === 0 && MappingCity) ||
        (superStockistId && rowData.isSuperStockist === 1 && !divisionId))
    );
  };

  const addStockist = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        divisionId:
          rowData.isSuperStockist === 1
            ? selectedDFilter.length === 0
              ? null
              : JSON.stringify(selectedDFilter)
            : null,
        superStockistId:
          rowData.isSuperStockist === 0
            ? selectedFilter.length === 0
              ? null
              : JSON.stringify(selectedFilter)
            : null,
        dob: rowData.dob !== null ? getDBFormateDate(rowData.dob) : null,
        stateId: stateValue,
        cityId: cityValue,
        isActive: 1,
        expiryDate:
          rowData.expiryDate !== null
            ? getDBFormateDate(rowData.expiryDate)
            : null,
        documentName: null,
        mappingCity:
          rowData.isSuperStockist === 0
            ? selectedMCFilter.length === 0
              ? null
              : JSON.stringify(selectedMCFilter)
            : null,
      };
      props.addStockist({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          if (showGrid) {
            //getStockistList(e);
            isSearchCall?getStockistList(e,true,searchText):getStockistList(e,false); //C1
          }
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

  const updateStockist = (e) => {
    if (checkAllValidation()) {      
      e.preventDefault();
      setLoading(true);
      delete rowData["tableData"];
      delete rowData["totalRecord"];
      const params = {
        ...rowData,
        divisionId:
          rowData.isSuperStockist === 1
            ? selectedDFilter.length === 0
              ? null
              : JSON.stringify(selectedDFilter)
            : null,
        superStockistId:
          rowData.isSuperStockist === 0
            ? selectedFilter.length === 0
              ? null
              : JSON.stringify(selectedFilter)
            : null,
        stateId: stateValue,
        cityId: cityValue,
        isActive: parseInt(rowData.isActive),
        stateIdList: selectedState,
        dob: rowData.dob !== null ? getDBFormateDate(rowData.dob) : null,
        expiryDate:
          rowData.expiryDate !== null
            ? getDBFormateDate(rowData.expiryDate)
            : null,
        documentName: null,
        stockistRefCode: rowData.stockistRefCode,
        mappingCity:
          rowData.isSuperStockist === 0
            ? selectedMCFilter.length === 0
              ? null
              : JSON.stringify(selectedMCFilter)
            : null,
      };
      props.updateStockist({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          //getStockistList(e);
          isSearchCall?getStockistList(e,true,searchText):getStockistList(e,false); //C1
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

  const getMobileOwnerName = () =>{
    const params = {
      mobileNumber: rowData.mobileNumber,
    };
    props.getMobileOwnerName({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { messageText } = response;
        if(messageText !== null){
        setDisplayMessage({
          open: true,
          displayMessage : messageText,
          severity: "success",
        });
        } else {
          setDisplayMessage({
            open: true,
            displayMessage : "No matching record found!",
            severity: "success",
          });
        }
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setStateCitySelectProperties({
        cityValue: rowData.cityId,
        stateValue: rowData.stateId,
      });

      setSelectedFilterArea([rowData.areaId]);

      setSelectedFilter(
        rowData.superStockistId === null
          ? []
          : JSON.parse(rowData.superStockistId)
      );
      setSelectedDFilter(
        rowData.divisionId === null ? [] : JSON.parse(rowData.divisionId)
      );
      setSelectedMCFilter(
        rowData.mappingCity === null ? [] : JSON.parse(rowData.mappingCity)
      );

      setRowData({
        ...rowData,
        dob: rowData.dob,
        stockistName: rowData.stockistName,
        contactPerson: rowData.contactPerson,
        mobileNumber: rowData.mobileNumber,
        email: rowData.email,
        phoneNumber: rowData.phoneNumber,
        pinCode: rowData.pinCode,
        gstNumber: rowData.gstNumber,
        updatedDate: rowData.updatedDate,
        areaId: rowData.areaId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  useEffect(() => {
    if (cityValue !== "") {
      if (selectedFilterArea[0] === undefined) setSelectedFilterArea([]);
      props.getAreas({
        params: { cityId: cityValue },
        onSuccess: (response) => {
          const { areaList = [] } = response;
          setAreaFilterList(areaList);
        },
        onFailure: ({ message }) => {
          displayErrorMessage(message);
          setAreaFilterList([]);
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityValue]);  

  useEffect(() => {
    return () => {
      setSelectedMappingCity(
        rowData.isSuperStockist === 0 && selectedMCFilter.length == 0
          ? true
          : false
      );
    };
  }, [selectedMCFilter]);

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }))(Tooltip);

  const columns = [
    {
      title: "Action",
      ...actionColumnStyle,
      hidden: !edit,
      render: ({ tableData: { id } }) => {
        return (
          <div className="table-edit-controls">
            {edit && (
              <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    //getSuperStockistList();
                    setId(id);
                    toggleEditRecord(true);
                    setCurrentOpr("Update");
                    setValidationList({});
                    setRowData({
                      isActive: data[id].isActive.toString(),
                      isSuperStockist: data[id].isSuperStockist,
                      smsSubscription: data[id].smsSubscription,
                    });
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        );
      },
      printable: false,
    },
    { title: "Sr.No", field: "srNo" },
    {
      title: "Stockist Name",
      field: "stockistName",
      render: ({ tableData: { id } }) => {
        return (
          <div>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    Updated By: <b>{data[id].updatedBy}</b>{" "}
                  </Typography>
                </React.Fragment>
              }
              arrow
            >
              <Typography
                style={{
                  fontFamily: "inherit",
                  fontWeight: "inherit",
                  fontSize: "inherit",
                }}
              >
                {data[id].stockistName}{" "}
              </Typography>
            </HtmlTooltip>
          </div>
        );
      },
    },
    {
      title: "Contact Person",
      field: "contactPerson",
    },
    { title: "Mobile Number", field: "mobileNumber" },
    { title: "City", field: "cityName" },
    { title: "DL Number", field: "dlNo" },
    { title: "Expiry Date", field: "expiryDate" },
  ];

  const FormContent = (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            required={true}
            value={rowData.stockistName}
            label="Stockist Name"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, stockistName: e.target.value });
              validateField("stockistName");
            }}
            error={validationList && validationList.stockistName ? true : false}
            errorMessage={"Stockist Name is Required"}
            maxLength={50}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            value={rowData.contactPerson}
            label="Contact Person"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, contactPerson: e.target.value });
              validateField("contactPerson");
            }}
            required={true}
            error={
              validationList && validationList.contactPerson ? true : false
            }
            errorMessage={"Contact Person is Required"}
            maxLength={50}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          {/* <TextField
            value={rowData.mobileNumber}
            label="Mobile Number"
            numeric={true}
            isAutoFocus={false}
            options={{
              type: "mobile",
            }}
            setIsMobileRegexValid={setIsMobileRegexValid}
            onChange={(e) => {
              setRowData({ ...rowData, mobileNumber: e.target.value });
              validateField("mobileNumber");
            }}
            required={true}
            error={validationList && validationList.mobileNumber ? true : false}
            errorMessage={"Mobile Number is Required"}
            maxLength={10}
          />
        </Grid>
        <Button
                  label={"Check Duplicate"}
                  onClick={() => {
                    getMobileOwnerName();
                  }}
                  customClass="button button-outline-black invoice-check-duplicate-btn"
                /> */}
          <div class="position-relative">
          <TextField
            id={"mobile"}
            required={true}
            value={rowData.mobileNumber}
            label="Mobile Number"
            options={{
              type: "mobile",
            }}
            setIsMobileRegexValid={setIsMobileRegexValid}
            numeric={true}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, mobileNumber: e.target.value });
              validateField("mobileNumber");
            }}
              error={
                validationList && validationList.mobileNumber ? true : false
              }
            errorMessage={"Mobile Number is Required"}
            maxLength={10}
          />
          <Tooltip title="Check Duplicate" tabIndex="-1">
              <IconButton
                aria-label="delete"
                onClick={() => {
                  if (
                    rowData.mobileNumber &&
                    rowData.mobileNumber.length > 0 &&
                    isMobileRegexValid
                  )
                    getMobileOwnerName();
            }}
                class="MuiButtonBase-root MuiIconButton-root input-absolute-icon"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="copy"
                  class="svg-inline--fa fa-copy fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"
                  ></path>
                </svg>
            </IconButton>
          </Tooltip>
        </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            value={rowData.phoneNumber}
            label="Phone Number"
            numeric={true}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, phoneNumber: e.target.value });
              validateField("phoneNumber");
            }}
            required={false}
            error={validationList && validationList.phoneNumber ? true : false}
            errorMessage={"Phone Number is Required"}
            maxLength={10}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            value={rowData.email}
            label="Email"
            numeric={false}
            isAutoFocus={false}
            options={{
              type: "email",
            }}
            setIsEmailRegexValid={setIsEmailRegexValid}
            onChange={(e) => {
              setRowData({ ...rowData, email: e.target.value });
              validateField("email");
            }}
            required={false}
            error={validationList && validationList.email ? true : false}
            errorMessage={"email is Required"}
            maxLength={90}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePicker
            defaultValue={rowData.dob}
            label="DOB"
            onChange={(date) => {
              setRowData({ ...rowData, dob: date });
              validateField("dob");
            }}
            required={false}
            error={
              validationList && validationList.dob ? validationList.dob : false
            }
            errorMessage={"DOB is Required"}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Select
            data={countries}
            value={countryVal}
            label={"Country"}
            onChange={(e) => {
              setRowData({ ...rowData, countryId: e.target.value });
              validateField("countryId");
              setCountryVal(e.target.value);
            }}
            required={true}
            error={
              validationList && validationList.countryId
                ? validationList.countryId
                : false
            }
            errorMessage={"Country required"}
          />
        </Grid>
        <StateCitySelect
          xs={12}
          md={4}
          lg={false}
          stateCitySelectProperties={stateCitySelectProperties}
          setStateCitySelectProperties={setStateCitySelectProperties}
        />
        <Grid item xs={12} md={4}>
          <Select
            data={areaFilterList}
            value={selectedFilterArea}
            label={"Area"}
            onChange={(e) => {
              setSelectedMCFilter([]);
              setSelectedMappingCity(false);
              setRowData({ ...rowData, areaId: e.target.value });
              validateField("areaId");
              setSelectedFilterArea(e.target.value);
            }}
            required={true}
            errorMessage={"Area is Required"}
            error={
              validationList && validationList.areaId
                ? validationList.areaId
                : false
            }          
            />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required={false}
            value={rowData.address}
            label="Address"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, address: e.target.value });
              validateField("address");
            }}
            error={validationList && validationList.address ? true : false}
            errorMessage={"Address is Required"}
            multiline={true}
            rows={2}
            maxLength={200}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            value={rowData.pinCode}
            label="Pin Code"
            numeric={true}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, pinCode: e.target.value });
              validateField("pinCode");
            }}
            required={false}
            error={validationList && validationList.pinCode ? true : false}
            errorMessage={"Pin Code is Required"}
            maxLength={6}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            value={rowData.gstNumber}
            label="GST Number"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, gstNumber: e.target.value });
              validateField("gstNumber");
            }}
            options={{
              type: "gstNo",
            }}
            setIsGstNoRegexValid={setIsGstNoRegexValid}
            required={true}
            error={validationList && validationList.gstNumber ? true : false}
            errorMessage={"GST Number is Required"}
            maxLength={15}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required={true}
            value={rowData.dlNo}
            label="DL Number"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, dlNo: e.target.value });
              validateField("dlNo");
            }}
            // options={{
            //   type: "dlNo",
            // }}
            // setIsDlNoValid={setIsDlNoValid}
            error={validationList && validationList.dlNo ? true : false}
            errorMessage={"DL Number is Required"}
            maxLength={50}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePicker
            defaultValue={rowData.expiryDate}
            label="Expiry Date"
            onChange={(date) => {
              setRowData({ ...rowData, expiryDate: date });
              validateField("expiryDate");
            }}
            required={true}
            error={
              validationList && validationList.expiryDate
                ? validationList.expiryDate
                : false
            }
            errorMessage={"Expiry Date is Required"}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <RadioGroup
            options={isSuperStockistOptions}
            isOptionAlignRow={true}
            label={"Is Super Stockist"}
            labelPlacement={"end"}
            value={rowData.isSuperStockist}
            onChange={(e) =>{
              setRowData({
                ...rowData,
                isSuperStockist: parseInt(e.target.value),
              });
              setSelectedFilterError(false);
              setSelectedDFilterError(false);
              setSelectedMappingCity(false);
            }}
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
              value={rowData.isActive.toString()}
              onChange={(e) =>
                setRowData({ ...rowData, isActive: e.target.value })
              }
            />
          </Grid>
        )}
        <Grid item xs={12} md={4}>
          <RadioGroup
            options={smsSubscriptionOptions}
            isOptionAlignRow={true}
            label={"Subscribe for SMS"}
            labelPlacement={"end"}
            value={rowData.smsSubscription}
            onChange={(e) =>
              setRowData({
                ...rowData,
                smsSubscription: parseInt(e.target.value),
              })
            }
          />
        </Grid>
        {rowData.isSuperStockist === 0 && (
              <Grid item xs={12} md={4}>
              <MultipleCheckboxSelect
                items={superStockistList}
                keyField={"value"}
                textField={"label"}
                checked={selectedFilter}
                label={"Super Stockist"}
                error={selectedFilterError}
                setChecked={(values) => {
                  setSelectedFilter(values);
                }}
                required={true}
                errorMessage={"Super Stockist is required"}
              />
            </Grid>
        )}
        {rowData.isSuperStockist === 1 && (
       <Grid item xs={12} md={4}>
       <MultipleCheckboxSelect
         items={divisionList}
         keyField={"value"}
         textField={"label"}
         checked={selectedDFilter}
         label={"Division"}
         error={selectedDFilterError}
         setChecked={(values) => {
           setSelectedDFilter(values);
         }}
         required={true}
         errorMessage={"Division is required"}
       />
     </Grid>
        )}
     
        {rowData.isSuperStockist === 0 && (
       <Grid item xs={12} md={4}>
       <MultipleCheckboxSelect
         items={filteredCities}
         keyField={"value"}
         textField={"label"}
         checked={selectedMCFilter}
         label={"Mapping City"}
         setChecked={(values) => {
           setSelectedMCFilter(values);
                setSelectedMappingCity(
                  rowData.isSuperStockist === 0 && selectedMCFilter.length == 0
                    ? true
                    : false
                );
         }}
         required={true}
              error={selectedMappingCity}
         errorMessage={"Mapping city is required"}
       />
     </Grid>
        )}
        {rowData.isSuperStockist === 0 && (
        <Grid item xs={12} md={4}>
        <TextField
          required={true}
          value={rowData.stockistRefCode}
          label="Reference Code"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
                if (rowData.isSuperStockist === 0) {
            setRowData({ ...rowData, stockistRefCode: e.target.value });
            validateField("stockistRefCode");
                }
          }}
              error={
                rowData.isSuperStockist === 0 &&
                validationList &&
                validationList.stockistRefCode
                  ? validationList.stockistRefCode
                  : false
              }
          errorMessage={"Reference Code is Required"}
          maxLength={30}
        />
      </Grid>
        )}
      <Grid item xs={12} md={4}>
          <TextField
            required={false}
            value={rowData.userPassword}
            label="Password"
            disabled={true}
          />
        </Grid>

        {/* Buttons */}
        <Grid item xs={12} style={{ justifyContent: "space-" }}>
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
                currentOpr === "Add" ? addStockist(e) : updateStockist(e);
              }}
              customClass="button button-primary"
              label={labels.saveButton}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );

/* C1: Start - Search Stockist by name and mobile number */
const searchButtonClick = () => {
  toggleSearchDialog(!searchDialog);
  setSearchTxtError(false);
  //setSearchText("");
};

const dialogContent = (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <TextField
        required={true}
        value={searchText}
        label="Search Stockist By Name or Mobile Number"
        numeric={false}
        isAutoFocus={false}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        error={searchTxtError}
        isInline={true}
        maxLength={50}
      />
    </Grid>
  </Grid>
);
/* End - Search Stockist by name and mobile number */

  return (
    <div>
      {!editRecord && (
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg>
              <StatesSelect
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setError(false);
                }}
                error={error}
                setSelectedStateName={setSelectedStateName}
                isInline={true}
              />
            </Grid>
            <Grid item xs={12} md={4} lg>
              <Select
                data={workingDropDownData}
                value={isActiveStatus}
                label={"Is Active"}
                onChange={(e) => {
                  setIsActiveStatus(e.target.value);
                  setIsActiveStatusError(false);  //C1
                }}
                isInline={true}
                error={isActiveStatusError}  //C1
              />
            </Grid>
            <Grid item xs={12} md={4} lg>
              <div className="selection-card-actions">
                <Button
                  label={labels.filterButton}
                  onClick={(e) => {
                    if (selectedState !== "" && isActiveStatus!=="") {  //C1
                      setShowGrid(true);
                      setTitleProperties({
                        stateName: selectedStateName,
                      });
                      setSearchText(""); //C1
                      setTempSearchTerm(""); //C1
                      setIsSearchCall(false); //C1
                      getStockistList(e,false); //C1
                    } else {
                      if(selectedState==="")setError(true);
                      if(isActiveStatus==="")setIsActiveStatusError(true); //C1
                    }
                  }}
                  customClass="button button-primary mr-2"
                />
                {add && (
                  <Button
                    label={"Add Stockist"}
                    onClick={() => {
                      addButtonClick();
                    }}
                    customClass="button button-black"
                  />
                )}
                {/* C1 - Start */}
                {isAdminOrJRAdmin && (
                <div className="table-edit-controls">
                    <Tooltip title="Search Stockist">
                      <IconButton
                        aria-label="Search Stockist"
                        onClick={() => {
                          searchButtonClick();
                        }}
                      >
                        <Search />
                      </IconButton>
                    </Tooltip>
                </div>
                )}
                {/* C1 - End */}
              </div>
            </Grid>
          </Grid>
        </div>
      )}

      {showGrid && !editRecord && (
        <div className="card">
          <div className="table-wrapper">
            {!editRecord && (
              <MaterialTable
                icons={GridIcons}
                title={isSearchCall?'List of Stockist':`Stockists of ${titleProperties.stateName}`}  //C1
                columns={columns}
                data={data}
                options={options}
                style={style}
                actions={[
                  {
                    icon: () => {
                      return (
                        <Refresh
                          onClick={(e) => {
                            //getStockistList(e);
                            isSearchCall?getStockistList(e,true,searchText):getStockistList(e,false); //C1
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
                            exportReport();
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

    {/* C1: Start - Search Stockist by name and mobile number */}
    {searchDialog && (
        <DialogControl
          open={searchDialog}
          dialogTitleText={`Search Stockist`}
          dialogContent={dialogContent}
          submitButtonText={"Search"}
          onCancel={() => {
            toggleSearchDialog(!searchDialog);
            setSearchTxtError(false);
            //setSearchText("");
            tempSearchTerm !== ""
              ? setSearchText(tempSearchTerm)
              : setSearchText("");
            setLoading(false);
          }}
          onSubmit={(e) => {
            if (searchText === "") setSearchTxtError(true);
            else {
              setIsSearchCall(true);
              setTempSearchTerm(searchText);
              setSelectedState("");
              setIsActiveStatus("");
              setError(false);
              setIsActiveStatusError(false);
              toggleSearchDialog(!searchDialog);
              setShowGrid(true);
              getStockistList(e,true,searchText);
            }
          }}
          maxWidth="sm"
          fullWidth="false"
        />
      )}
      {/* End - Search Stockist by name and mobile number */}

      {loading && <Loading />}

      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
