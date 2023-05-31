import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { Edit, Refresh, SaveAlt, Image, View } from "@material-ui/icons";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import Button from "../../../components/core/Button";
import DatePicker from "../../../components/core/DatePicker";
import DisplayMessage from "../../../components/core/DisplayMessage";
import Loading from "../../../components/core/Loading";
import RadioGroup from "../../../components/core/RadioGroup";
import Select from "../../../components/core/Select";
import TextField from "../../../components/core/TextField";
import {
  actionColumnStyle, GridIcons,
  options,
  style
} from "../../../components/custom/GridConfig";
import StateCitySelect from "../../../components/custom/StateCitySelect/StateCitySelectContainer";
import { labels, staticDataId } from "../../../Config.json";
import {
  getDBFormateDate, getDisplayDate
} from "../../../Utils/DateTimeUtils.js";
import downloadExcel from "../../../Utils/DownloadExcel";
import AddGuest from "../../../components/custom/AddGuest/AddGuestContainer"
import ImageCarousel from "../../../components/custom/ImageCarousel/ImageCarouselContainer";
/**
 * Add, update operations for Guest
 * @author Imran Patwa
 */

export default function GuestList(props) {
const [image,setImage] = useState([{value:"",label:""}]);
  const { filterDesignation = {} } = props;
  const {
    EmployeeStatus_Resigned,
    EmployeeStatus_Inactive,
    EmployeeStatus_Active,
    Country_India,
  } = staticDataId;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDesignationId, setSelectedDesignationId] = useState("");
  const [selectedDivisionId, setSelectedDivisionId] = useState("");
  const [empStatus, setEmpStatus] = useState([]);
  const [countryVal, setCountryVal] = useState(Country_India);
  const [empStatusValue, setEmpStatusValue] = useState("");
  const [selectedStateName, setSelectedStateName] = useState("");
  const [isDORDate, setIsDORDate] = useState(false);
  const [error, setError] = useState(false);
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [editBookingRecord, toggleBookingEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [id, setId] = useState();
  const [rowData, setRowData] = useState({});
  const [countries, setCountries] = useState([]);
  const [guestData, setGuestData] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [allDivisionList, setAllDivisionList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [managers, setManagers] = useState([]);
  // const [isMobileRegexValid, setIsMobileRegexValid] = useState(true);
  const [isEmailRegexValid, setIsEmailRegexValid] = useState(true);
  const [disabledExport, setDisabledExport] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [selectedFilterError, setSelectedFilterError] = useState(false);
  const [stateCitySelectProperties, setStateCitySelectProperties] = useState(
    {}
  );
  const [openslider,toggleOpenSlider] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(0);
  const [selectedGuest1, setSelectedGuest1] = useState(0);
  const [selectedGuest2, setSelectedGuest2] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const roomBookingType = [
    {
      label: "Deluxe Suite",
      value: 1,
    },
    {
      label: "Super Deluxe Suite",
      value: 2,
    },
    {
      label: "Premium Suite",
      value: 3,
    }
  ];

  const {
    stateValue = "",
    cityValue = "",
    // stateError = false,
    // cityError = false,
  } = stateCitySelectProperties;
  const genderOptions = [
    {
      label: "Male",
      value: 1,
    },
    {
      label: "Female",
      value: 2,
    },
  ];

  const maritalStatusOptions = [
    {
      label: "Married",
      value: 1,
    },
    {
      label: "UnMarried",
      value: 2,
    },
  ];

  const { operationRights } = props;
  const { add, edit } = operationRights;
  const { aslAndAboveDesignations, adminNslDesignations } = filterDesignation;

  const columns = [
    {
      title: "Sr#",
      field: "srNo",
      editable: "never",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt",
        textAlign:"center"
      }
    },
    {
      title: "Guest",
      field: "guestName",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt"
      }
    },
    {
      title: "Gender",
      field: "genderName",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt"
      }
    },
    {
      title: "E-mail",
      field: "email",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt"
      }
    },
    {
      title: "Phone",
      field: "mobileNumber",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt"
      }
    },
    {
      title: "DOB",
      field: "dob",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt",
        textAlign:"center"
      }
    },
    // {
    //   title: "Age",
    //   field: "age",
    //   cellStyle: {
    //     whiteSpace: "nowrap",
    //     border: "0.5px solid #659F1C",
    //     height: "30px",
    //     fontSize: "12pt"
    //   }
    // },
    {
      title: "Action",
      ...actionColumnStyle,
      hidden: !edit,
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px"
      },
      render: ({ tableData: { id } }) => {
        return (
          <div className="table-edit-controls">
            <Tooltip title="Edit">
              <IconButton
                aria-label="edit"
                onClick={(e) => {
                  setId(id);
                  toggleEditRecord(true);
                  setCurrentOpr("Update");
                  setValidationList({});
                  // setRowData({ gender: data[id].gender });
                }}
              >
                
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="image">
              <IconButton
                aria-label="Image"
                onClick={(e) => {
                setId(id);
                toggleOpenSlider(!openslider)
                guestUploadFilegetData(id)
                }}
              >
                
                <Image fontSize="small" />
              </IconButton>
            </Tooltip>

          </div>
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
  const displaySuccessMessage = (message) =>{
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "Success",
    });
  }

  const exportGuestList = () => {
    const exportData = data.map((emp) => ({
      srNo: emp.srNo,
      guestName: emp.firstName + " " + emp.lastName,
      address: emp.address,
      city: emp.cityName,
      state: emp.stateName,
      email: emp.email,
      phone: emp.mobileNumber,
      dob: emp.dob,
      age: emp.age,
      aadharno: emp.aadharno,
    }));
    const header = [
      [
        "Sr. No",
        "Guest Name",
        "Address",
        "City",
        "State",
        "Email",
        "Phone",
        "DOB",
        "Aadhar No.",
      ],
    ];
    downloadExcel({
      data: exportData,
      fileName: `Guests_${selectedStateName} `,
      header: header,
    });
  };

  const getGuestList = (e) => {
    if (e != null)
      e.preventDefault();
    setLoading(true);
    const params = {
      stateId: null//selectedState,
      // designationId:
      //   selectedDesignationId === "All" ? "" : selectedDesignationId,
      // divisionId: selectedDivisionId === "All" ? "" : selectedDivisionId,
      // status: empStatusValue,
    };
    props.getGuestList({
      params,
      onSuccess: (response) => {
        const { guestList = [] } = response;

        setDisabledExport(guestList.length === 0);
        const data = guestList.map((emp, index) => ({
          ...emp,
          srNo: index + 1,
          guestName: emp.guestName,
          dob: emp.dob !== null ? getDisplayDate(emp.dob) : null,
        }));
        setData(data);
        setGuestData(guestList.map((emp, index) => ({
          value: emp.guestId,
          label: emp.guestName
        })));
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };
  // const getDivisions = () => {
  //   props.getDivisions({
  //     onSuccess: (response) => {
  //       let allOptionObj = { label: "All", value: "All" };
  //       const { divisionList } = response;
  //       divisionList.splice(0, 0, allOptionObj);
  //       setDivisionList(divisionList);
  //       setSelectedDivisionId("All");
  //     },
  //     onFailure: ({ message }) => {
  //       displayErrorMessage(message);
  //     },
  //   });
  // };
  // const getAllDivisions = () => {
  //   props.getAllDivisions({
  //     onSuccess: (response) => {
  //     //  let allOptionObj = { label: "All", value: "All" };
  //       const { allDivisionList } = response;
  //     // allDivisionList.splice(0, 0, allOptionObj);
  //       setAllDivisionList(allDivisionList);
  //       //setSelectedDivisionId("All");
  //     },
  //     onFailure: ({ message }) => {
  //       displayErrorMessage(message);
  //     },
  //   });
  // };
  // const getEmployeeStatus = () => {
  //   debugger;
  //   props.getEmployeeStatus({
  //     params: {
  //       code: "EMPLOYEE_STATUS",
  //     },
  //     onSuccess: (response) => {
  //       const { list } = response;
  //       setEmpStatus(list);
  //       setEmpStatusValue(list[0].value);
  //     },
  //     onFailure: ({ message }) => {
  //       displayErrorMessage(message);
  //     },
  //   });
  // };
  // const getDesignations = () => {
  //   props.getDesignations({
  //     onSuccess: (response) => {
  //       let allOptionObj = { label: "All", value: "All" };
  //       const { designationList } = response;
  //       designationList.splice(0, 0, allOptionObj);
  //       setDesignationList(designationList);
  //       setSelectedDesignationId("All");
  //     },
  //     onFailure: ({ message }) => {
  //       displayErrorMessage(message);
  //     },
  //   });
  // };

  // const getManagers = () => {
  //   setManagers([]);
  //   const params = {
  //     designationIds: aslAndAboveDesignations,
  //   };
  //   props.getEmployees({
  //     params,
  //     onSuccess: (response) => {
  //       const { employeeList } = response;
  //       setManagers(employeeList);
  //     },
  //     onFailure: ({ message }) => {
  //       displayErrorMessage(message);
  //     },
  //   });
  // };

  // const sendSms = (idFromProp) => {
  //   const params = {
  //     mobileNumber: data[idFromProp].mobileNumber,
  //     code: "EmployeeDetail",
  //   };

  //   props.sendSms({
  //     params,
  //     onSuccess: (response) => {
  //       // const {} = response;
  //       setDisplayMessage({
  //         open: true,
  //         displayMessage: "Login details has been sent !!",
  //         severity: "success",
  //       });
  //     },
  //     onFailure: ({ message }) => {
  //       displayErrorMessage(message);
  //     },
  //   });
  // };
  let [file,uploadfile] =useState();
  const guestUploadFilegetData = (id) => {
    const { guestId } = data[id];
    // console.log(data[id])
  setLoading(true);
  const params = {
    guestId:guestId
  };
  props.guestUploadFilegetData({
    params,
    onSuccess: (response) => {
      setLoading(false);
      const { uploadedFiles } = response
      const files = uploadedFiles.map((item) => ((item.data).split(',')))
      uploadfile(files[0])
      let image = files[0].map((item) => ({value:item,label:item.split("/")[6]}))
      setImage(image)
    },
    onFailure: ({ message }) => {
      setLoading(false);
      displayErrorMessage(message);
    },
  });
};

// console.log(fileData,preview)
  useEffect(() => {
    getGuestList(null);
    // getDivisions();
    // getDesignations();
    // getEmployeeStatus();
    // getManagers();
    // getAllDivisions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      guestUploadFilegetData(id)
      // setSelectedFilter(JSON.parse(data[id].divisionId));
      setSelectedFilterError(false);
      setStateCitySelectProperties({
        cityValue: rowData.cityId,
        stateValue: rowData.stateId,
      });
      setRowData({
        ...rowData,
        guestId: rowData.guestId,
        email: rowData.email,
        mobileNumber: rowData.mobileNumber,
        address: rowData.address,
        dob: rowData.dob,
        firstName: rowData.firstName,
        fatherName: rowData.fatherName,
        lastName: rowData.lastName,
        countryId: rowData.countryId,
        countryName: rowData.countryName,
        stateName: rowData.stateName,
        cityName: rowData.cityName,
        pinCode: rowData.pinCode,
        remarks: rowData.remarks,
        //refId: rowData.refId,
        updatedDate: rowData.updatedDate,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);
  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setSelectedFilterError(false);
    setSelectedFilter([]);
    setCurrentOpr("Add");
    // setValidationList({});
    // setStateCitySelectProperties({
    //   stateValue: "",
    //   cityValue: "",
    //   stateError: false,
    //   cityError: false,
    // });

    // setRowData({
    //   firstName: "",
    //   lastName: "",
    //   fatherName: "",
    //   dob: null,
    //   gender: genderOptions[0].value,
    //   countryId: Country_India,
    //   mobileNumber: null,
    //   email: "",
    //   aadharno: "",
    //   aadharattachment: "",
    //   address: "",
    //   pinCode: null,
    //   remarks: "",
    //   //refId: ""
    // });
  };

  const addBookingClick = () => {
    toggleBookingEditRecord(!editBookingRecord);
    setSelectedFilterError(false);
    setSelectedFilter([]);
    setCurrentOpr("Add");
    setValidationList({});
    setStateCitySelectProperties({
      stateValue: "",
      cityValue: "",
      stateError: false,
      cityError: false,
    });

    // setRowData({
    //   firstName: "",
    //   lastName: "",
    //   fatherName: "",
    //   dob: null,
    //   gender: genderOptions[0].value,
    //   countryId: Country_India,
    //   mobileNumber: null,
    //   email: "",
    //   aadharno:"",
    //   aadharattachment:"",
    //   age:"",
    //   address: "",
    //   pinCode: null,
    //   remarks: "",
    //   //refId: ""
    // });
    setSelectedRoomType(0);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectedGuest1(0);
    setSelectedGuest2(0);
  };

  // const validateField = (field) => {
  //   let isValid = true;
  //   if (
  //     !rowData[field] ||
  //     rowData[field] === "" ||
  //     rowData[field] === null ||
  //     rowData[field] === [] ||
  //     (rowData[field] && rowData[field].length === 0)
  //   ) {
  //     setValidationList({ ...validationList, [field]: true });
  //     isValid = false;
  //   } else {
  //     setValidationList({ ...validationList, [field]: false });
  //   }
  //   return isValid;
  // };

  // const checkAllValidation = () => {
  //   if (selectedFilter.length === 0)
  //     setSelectedFilterError(true);

  //   const firstName = !validateField("firstName");
  //   const lastName = !validateField("lastName");
  //   const fatherName = !validateField("fatherName");
  //   const dob = !validateField("dob");
  //   const mobileNumber = !validateField("mobileNumber");
  //   // const isMobileValid = !isMobileRegexValid;
  //   const isEmailValid =
  //     rowData.email !== "" && rowData.email !== null
  //       ? !isEmailRegexValid
  //       : false;

  //   if (stateValue === "" && cityValue === "") {
  //     setStateCitySelectProperties({
  //       ...stateCitySelectProperties,
  //       stateError: stateValue === "" ? true : false,
  //       cityError: cityValue === "" ? true : false,
  //     });
  //   }
  //   const stateErr = stateValue === "" ? true : false;
  //   const cityErr = cityValue === "" ? true : false;
  //   let pinCode = false;
  //   if (validateField.pinCode && validateField.pinCode === true) pinCode = true;



  //   setValidationList({
  //     ...validationList,
  //     firstName,
  //     lastName,
  //     fatherName,
  //     dob,
  //     mobileNumber,
  //   });

  //   return (
  //     !firstName &&
  //     !lastName &&
  //     !fatherName &&
  //     !dob &&
  //     !mobileNumber &&
  //     !stateErr &&
  //     !cityErr &&
  //     !pinCode &&
  //     // !isMobileValid &&
  //     !isEmailValid
  //   );
  // };

  const checkBookingValidation = () => {
    if (selectedStartDate == '' || selectedEndDate == '' || selectedRoomType == 0)
      return false;
    else
      return true;
  };

  // const FormContent = (
  //   <Grid container spacing={3}>
  //     <Grid item xs={12} md={4}>
  //       <TextField
  //         required={true}
  //         value={rowData.firstName}
  //         label="First Name"
  //         numeric={false}
  //         isAutoFocus={false}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, firstName: e.target.value });
  //           validateField("firstName");
  //         }}
  //         error={validationList && validationList.firstName ? true : false}
  //         errorMessage={"First Name is Required"}
  //         maxLength={30}
  //       />
  //     </Grid>
  //     <Grid item xs={12} md={4}>
  //       <TextField
  //         required={true}
  //         value={rowData.lastName}
  //         label="Last Name"
  //         numeric={false}
  //         isAutoFocus={false}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, lastName: e.target.value });
  //           validateField("lastName");
  //         }}
  //         error={
  //           validationList && validationList.lastName
  //             ? validationList.lastName
  //             : false
  //         }
  //         errorMessage={"Last Name is Required"}
  //         maxLength={30}
  //       />
  //     </Grid>
  //     <Grid item xs={12} md={4}>
  //       <TextField
  //         required={true}
  //         value={rowData.fatherName}
  //         label="Father Name"
  //         numeric={false}
  //         isAutoFocus={false}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, fatherName: e.target.value });
  //           validateField("fatherName");
  //         }}
  //         error={
  //           validationList && validationList.fatherName
  //             ? validationList.fatherName
  //             : false
  //         }
  //         errorMessage={"Father Name is Required"}
  //         maxLength={30}
  //       />
  //     </Grid>
  //     <Grid item xs={12} md={4}>
  //       <DatePicker
  //         disableFuture={true}
  //         defaultValue={rowData.dob}
  //         label="DOB"
  //         tooltipText="Date of Birth"
  //         onChange={(date) => {
  //           setRowData({ ...rowData, dob: date });
  //           validateField("dob");
  //         }}
  //         required={true}
  //         error={
  //           validationList && validationList.dob ? validationList.dob : false
  //         }
  //         errorMessage={"DOB is Required"}
  //       />
  //     </Grid>
  //     {/* <Grid item xs={12} md={4}>
  //       <DatePicker
  //         defaultValue={rowData.doa}
  //         label="DOA"
  //         tooltipText={"Date of Anniversary"}
  //         onChange={(date) => {
  //           setRowData({ ...rowData, doa: date });
  //           validateField("doa");
  //         }}
  //       />
  //     </Grid> */}

  //     <Grid item xs={12} md={4}>
  //       <Select
  //         data={maritalStatusOptions}
  //         value={rowData.maritalStatus}
  //         label={"Marital Status"}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, maritalStatus: e.target.value });
  //           validateField("maritalStatus");
  //           setValidationList({ ...validationList, maritalStatus: false });
  //         }}
  //         required={true}
  //         error={
  //           validationList && validationList.maritalStatus
  //             ? validationList.maritalStatus
  //             : false
  //         }
  //         errorMessage={"Marital Status is required"}
  //       />
  //     </Grid>
  //     <Grid item xs={12} md={4}>
  //       <RadioGroup
  //         value={rowData.gender}
  //         options={genderOptions}
  //         isOptionAlignRow={true}
  //         label={"Gender"}
  //         labelPlacement={"end"}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, gender: parseInt(e.target.value) });
  //           validateField("gender");
  //         }}
  //       />
  //     </Grid>

  //     <Grid item xs={12} md={4}>
  //       <TextField
  //         value={rowData.profession}
  //         label="Profession"
  //         numeric={false}
  //         isAutoFocus={false}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, profession: e.target.value });
  //         }}
  //         maxLength={100}
  //       />
  //     </Grid>
  //     <Grid item xs={12} md={4}>
  //       <TextField
  //         required={true}
  //         value={rowData.age}
  //         label="Age"
  //         numeric={true}
  //         isAutoFocus={false}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, age: e.target.value });
  //           validateField("age");
  //         }}
  //         error={
  //           validationList && validationList.age
  //             ? validationList.age
  //             : false
  //         }
  //         errorMessage={"Age is Required"}
  //         maxLength={3}
  //       />
  //     </Grid>
  //     <Grid item xs={12} md={4}>
  //       <TextField
  //         value={rowData.aadharNo}
  //         label="Aadhar No."
  //         numeric={true}
  //         isAutoFocus={false}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, aadharNo: e.target.value });
  //         }}
  //         maxLength={16}
  //       />
  //     </Grid>

  //     <Grid item xs={12} md={8}>
  //       <TextField
  //         required={false}
  //         value={rowData.address}
  //         label="Address"
  //         numeric={false}
  //         isAutoFocus={false}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, address: e.target.value });
  //           validateField("address");
  //         }}
  //         error={validationList && validationList.Address ? true : false}
  //         errorMessage={"Address is Required"}
  //         maxLength={200}
  //       />
  //     </Grid>
  //     <Grid item xs={12} md={4}>
  //       <Select
  //         data={countries}
  //         value={countryVal}
  //         label={"Country"}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, countryId: e.target.value });
  //           validateField("countryId");
  //           setCountryVal(e.target.value);
  //         }}
  //       />
  //     </Grid>
  //     <StateCitySelect
  //       xs={12}
  //       md={4}
  //       lg={false}
  //       stateCitySelectProperties={stateCitySelectProperties}
  //       setStateCitySelectProperties={setStateCitySelectProperties}
  //     />

  //     <Grid item xs={12} md={4}>
  //       <TextField
  //         required={false}
  //         value={rowData.pinCode}
  //         label="Pin Code"
  //         numeric={true}
  //         isAutoFocus={false}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, pinCode: e.target.value });
  //         }}
  //         maxLength={6}
  //         error={validationList && validationList.pinCode ? true : false}
  //       />
  //     </Grid>
  //     <Grid item xs={12} md={4}>
  //       {/* <TextField
  //         required={true}
  //         value={rowData.mobileNumber}
  //         label="Mobile Number"
  //         numeric={true}
  //         options={{
  //           type: "mobile",
  //         }}
  //         setIsMobileRegexValid={setIsMobileRegexValid}
  //         isAutoFocus={false}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, mobileNumber: e.target.value });
  //           validateField("mobileNumber");
  //         }}
  //         error={validationList && validationList.mobileNumber ? true : false}
  //         errorMessage={"Mobile Number is Required"}
  //         maxLength={10}
  //       /> */}
  //       <div class="position-relative">
  //         <TextField
  //           id={"mobile"}
  //           required={true}
  //           value={rowData.mobileNumber}
  //           label="Mobile Number"
  //           options={{
  //             type: "mobile",
  //           }}
  //           // setIsMobileRegexValid={setIsMobileRegexValid}
  //           // numeric={true}
  //           isAutoFocus={false}
  //           onChange={(e) => {
  //             setRowData({ ...rowData, mobileNumber: e.target.value });
  //             validateField("mobileNumber");
  //           }}
  //           error={validationList && validationList.mobileNumber ? true : false}
  //           errorMessage={"Mobile Number is Required"}
  //           maxLength={10}
  //         />
  //         {/* <Tooltip title="Check Duplicate" tabIndex="-1">
  //           <IconButton aria-label="delete" onClick={() => {
  //             if (rowData.mobileNumber && rowData.mobileNumber.length > 0 && isMobileRegexValid) getMobileOwnerName();
  //           }}
  //             class="MuiButtonBase-root MuiIconButton-root input-absolute-icon">
  //             <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="copy" class="svg-inline--fa fa-copy fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg>
  //           </IconButton>
  //         </Tooltip> */}
  //         {/* <Button
  //           // label={"Check Duplicate"}
  //           onClick={() => {
  //             getMobileOwnerName();
  //           }}
  //           customClass="button button-outline-black invoice-check-duplicate-btn"
  //         />  */}
  //       </div>
  //       {/* <Button
  //                 label={"Check Duplicate"}
  //                 onClick={() => {
  //                   getMobileOwnerName();
  //                 }}
  //                 customClass="button button-outline-black invoice-check-duplicate-btn"
  //               /> */}
  //     </Grid>


  //     <Grid item xs={12} md={4}>
  //       <TextField
  //         required={false}
  //         value={rowData.email}
  //         label="Email"
  //         numeric={false}
  //         options={{
  //           type: "email",
  //         }}
  //         setIsEmailRegexValid={setIsEmailRegexValid}
  //         isAutoFocus={false}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, email: e.target.value });
  //           validateField("email");
  //         }}
  //         error={validationList && validationList.email ? true : false}
  //         errorMessage={"Email is Required"}
  //         maxLength={90}
  //       />
  //     </Grid>

  //     <Grid item xs={12} md={4}>
  //       <TextField
  //         required={false}
  //         value={rowData.remarks}
  //         label="Remarks"
  //         numeric={false}
  //         isAutoFocus={false}
  //         onChange={(e) => {
  //           setRowData({ ...rowData, remarks: e.target.value });
  //           validateField("remarks");
  //         }}
  //         error={validationList && validationList.Remarks ? true : false}
  //         errorMessage={"Remarks is Required"}
  //         multiline={true}
  //         rows={2}
  //         maxLength={200}
  //       />
  //     </Grid>



  //     <Grid item xs={12} style={{ justifyContent: "space-" }}>
  //       <div className="d-flex align-items-center justify-content-end">
  //         <Button
  //           autoFocus
  //           onClick={() => {
  //             toggleEditRecord(!editRecord);
  //             setLoading(false);
  //             // let allOptionObj = { label: "All", value: "All" };
  //             // divisionList.splice(0, 0, allOptionObj);
  //             // setDivisionList(divisionList);
  //             // designationList.splice(0, 0, allOptionObj);
  //             // setDesignationList(designationList);
  //           }}
  //           customClass="button button-black mr-2"
  //           label={labels.cancelButton}
  //         />
  //         <Button
  //           onClick={(e) => {
  //             currentOpr === "Add" ? addGuest(e) : updateGuest(e);
  //           }}
  //           customClass="button button-primary"
  //           label={labels.saveButton}
  //         />
  //       </div>
  //     </Grid>
  //   </Grid>
  // );

  const BookingForm = (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Select
          data={roomBookingType}
          value={selectedRoomType}
          label={"Room"}
          onChange={(e) => {
            setSelectedRoomType(e.target.value);
          }}
          required={true}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <DatePicker
          disableFuture={true}
          defaultValue={selectedStartDate}
          label="Start Date"
          tooltipText="Start Date"
          onChange={(date) => {
            setSelectedStartDate(date);
            // validateField("dob");
          }}
          required={true}
          error={
            selectedStartDate ? selectedStartDate : false
          }
          errorMessage={"Start Date is Required"}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <DatePicker
          disableFuture={true}
          defaultValue={selectedEndDate}
          label="End Date"
          tooltipText="End Date"
          onChange={(date) => {
            setSelectedEndDate(date);
            // validateField("dob");
          }}
          required={true}
          error={
            selectedEndDate ? selectedEndDate : false
          }
          errorMessage={"End Date is Required"}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <Select
          data={guestData}
          value={selectedGuest1}
          label={"Guest 1"}
          onChange={(e) => {
            setSelectedGuest1(e.target.value);
          }}
          required={true}
          error={
            selectedGuest1
              ? selectedGuest1
              : false
          }
          errorMessage={"Guest 1 is required"}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <Select
          data={guestData}
          value={selectedGuest2}
          label={"Guest 2"}
          onChange={(e) => {
            setSelectedGuest2(e.target.value);
          }}
          required={false}
        />
      </Grid>





      <Grid item xs={12} style={{ justifyContent: "space-" }}>
        <div className="d-flex align-items-center justify-content-end">
          <Button
            autoFocus
            onClick={() => {
              toggleBookingEditRecord(!editBookingRecord);
              setLoading(false);
              // let allOptionObj = { label: "All", value: "All" };
              // divisionList.splice(0, 0, allOptionObj);
              // setDivisionList(divisionList);
              // designationList.splice(0, 0, allOptionObj);
              // setDesignationList(designationList);
            }}
            customClass="button button-black mr-2"
            label={labels.cancelButton}
          />
          <Button
            onClick={(e) => {
              currentOpr === "Add" ? addBooking(e) : addBooking(e);
            }}
            customClass="button button-primary"
            label={labels.saveButton}
          />
        </div>
      </Grid>
    </Grid>
  );

  const addBooking = (e) => {
    if (checkBookingValidation()) {
      e.preventDefault();
      setLoading(true);
      // const params = {
      //   ...rowData,
      //   stateId: stateValue,
      //   cityId: cityValue,
      //   dob: getDBFormateDate(rowData.dob),
      // };
      // props.addGuest({
      //   params,
      //   onSuccess: ({ message: displayMessage }) => {
      //     showGrid && getGuestList(e);
      //     setLoading(false);
      //     setDisplayMessage({
      //       open: true,
      //       displayMessage,
      //       severity: "success",
      //     });
      //     toggleEditRecord(!editRecord);
      //     // let allOptionObj = { label: "All", value: "All" };
      //     // divisionList.splice(0, 0, allOptionObj);
      //     // setDivisionList(divisionList);
      //     // designationList.splice(0, 0, allOptionObj);
      //     // setDesignationList(designationList);
      //   },
      //   onFailure: ({ message }) => {
      //     setLoading(false);
      //     displayErrorMessage(message);
      //   },
      // });
      setLoading(false);
      setDisplayMessage({
        open: true,
        displayMessage: "Booking saved successfully",
        severity: "success",
      });
      toggleBookingEditRecord(!editBookingRecord);
    }
  };
  // const addGuest = (e) => {
  //   if (checkAllValidation()) {
  //     e.preventDefault();
  //     setLoading(true);
  //     const params = {
  //       ...rowData,
  //       stateId: stateValue,
  //       cityId: cityValue,
  //       dob: getDBFormateDate(rowData.dob),
  //     };
      // props.addGuest({
      //   params,
      //   onSuccess: ({ message: displayMessage }) => {
      //     showGrid && getGuestList(e);
      //     setLoading(false);
      //     setDisplayMessage({
      //       open: true,
      //       displayMessage,
      //       severity: "success",
      //     });
      //     toggleEditRecord(!editRecord);
      //     // let allOptionObj = { label: "All", value: "All" };
      //     // divisionList.splice(0, 0, allOptionObj);
      //     // setDivisionList(divisionList);
      //     // designationList.splice(0, 0, allOptionObj);
      //     // setDesignationList(designationList);
      //   },
      //   onFailure: ({ message }) => {
      //     setLoading(false);
      //     displayErrorMessage(message);
      //   },
      // });
  //   }
  // };



  // const updateGuest = (e) => {
  //   if (checkAllValidation()) {
  //     e.preventDefault();
  //     setLoading(true);
  //     delete rowData["tableData"];
  //     delete rowData["guestName"];
  //     delete rowData["srNo"];

  //     const params = {
  //       ...rowData,
  //       stateId: stateValue,
  //       cityId: cityValue,
  //       dob: getDBFormateDate(rowData.dob),
  //     };
  //     props.updateGuest({
  //       params,
  //       onSuccess: ({ message: displayMessage }) => {
  //         getGuestList(e);
  //         setLoading(false);
  //         setDisplayMessage({
  //           open: true,
  //           displayMessage,
  //           severity: "success",
  //         });
  //         toggleEditRecord(!editRecord);
  //         // let allOptionObj = { label: "All", value: "All" };
  //         // divisionList.splice(0, 0, allOptionObj);
  //         // setDivisionList(divisionList);
  //         // designationList.splice(0, 0, allOptionObj);
  //         // setDesignationList(designationList);
  //       },
  //       onFailure: ({ message }) => {
  //         setLoading(false);
  //         displayErrorMessage(message);
  //       },
  //     });
  //   }
  // };
const handleCancle = () => {
  toggleEditRecord(!editRecord);
}
const handleSave = (e) => {
  showGrid && getGuestList(e);
  toggleEditRecord(!editRecord);
}
  return (
    <div className="holiday-wrapper">
      {!editRecord && !editBookingRecord && (
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={3}>

            <Grid item xs={12} md={4} lg={3}>
              <div className="selection-card-actions">
                {/* <Button
                  label={labels.filterButton}
                  onClick={(e) => {
                     if (selectedState !== "") {
                      setShowGrid(true);
                      getGuestList(e);
                     } else {
                       setError(true);
                     }
                  }}
                  customClass="button button-primary mr-2"
                /> */}
                {add && (
                  <Button
                    onClick={() => {
                      addButtonClick();
                    }}
                    customClass="button button-black add-employee-button"
                    label={"Add Guest"}
                  >
                    Add
                  </Button>
                )}
                <div style={{ "margin-left": "10px" }}></div>
                {/* {add && (
                  <Button
                    onClick={() => {
                      addBookingClick();
                    }}
                    customClass="button button-black add-employee-button"
                    label={"Add Booking"}
                  >
                    Add
                  </Button>
                )} */}
              </div>
            </Grid>
          </Grid>
        </div>
      )}
      {showGrid && !editRecord && !editBookingRecord && (
        <div className="card">
          <div className="table-wrapper table-size-xs">
            {!editRecord && (
              <MaterialTable
                icons={GridIcons}
                title={`List of Guests`}
                columns={columns}
                data={data}
                options={{
                  ...options,
                  headerStyle: {
                    backgroundColor: "#F5F5F5",
                    color: "#22222",
                    whiteSpace: "nowrap",
                    fontWeight: "bold",
                    textAlign: "center",
                    height: "50px",
                    border: "1px solid #659F1C",
                    fontSize: "12pt"
                  }
                }}
                style={style}
                actions={[
                  {
                    icon: () => {
                      return (
                        <Refresh
                          onClick={(e) => {
                            getGuestList(e);
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
                            exportGuestList();
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
              <Grid>
                <AddGuest data={rowData} 
                onCancelClick={handleCancle}
                onSaveClick={handleSave}
                currentOpr={currentOpr}
                filedata={file}
                image={image}
                displaySuccessMessage={displaySuccessMessage}
                displayErrorMessage={displayErrorMessage}
                />
                {/* {FormContent} */}
                </Grid>
            </div>
          </div>
        </div>
      )}
      {openslider && !loading && (
        <ImageCarousel onCancel={() => {toggleOpenSlider(!openslider)}} items={image}/>
      )}
      {editBookingRecord && (
        <div className="card">
          <div className="table-wrapper">
            <div>
              <Grid>{BookingForm}</Grid>
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
