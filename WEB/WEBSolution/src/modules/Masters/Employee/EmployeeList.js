import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { Edit, Refresh, SaveAlt } from "@material-ui/icons";
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
import MultipleCheckboxSelect from "../../../components/custom/MultipleCheckboxSelect";
import StateCitySelect from "../../../components/custom/StateCitySelect/StateCitySelectContainer";
import { labels, staticDataId } from "../../../Config.json";
import {
  getDBFormateDate, getDisplayDate
} from "../../../Utils/DateTimeUtils.js";
import downloadExcel from "../../../Utils/DownloadExcel";



/**
 * Add, update operations for Employee
 * @author Nirali Maradiya
 */

export default function EmployeeList(props) {
  const { filterDesignation = {} } = props;
  const {
    EmployeeStatus_Resigned,
    EmployeeStatus_Inactive,
    EmployeeStatus_Active,
    Country_India,
  } = staticDataId;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
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
  const [currentOpr, setCurrentOpr] = useState();
  const [id, setId] = useState();
  const [rowData, setRowData] = useState({});
  const [countries, setCountries] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [allDivisionList, setAllDivisionList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [managers, setManagers] = useState([]);
  // const [isMobileRegexValid, setIsMobileRegexValid] = useState(true);
  const [isEmailRegexValid, setIsEmailRegexValid] = useState(true);
  const [disabledExport, setDisabledExport] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [selectedFilterError, setSelectedFilterError] = useState(false);
  const [selectedDays,setSelectedDays] = useState([]);
  const [stateCitySelectProperties, setStateCitySelectProperties] = useState(
    {}
  );

  const daysOption =[
    {
      value: 1,
      label: "Monday",
    },
    {
      value: 2,
      label: "Tuesday",
    },
    {
      value: 3,
      label: "Wednesday",
    },
    {
      value: 4,
      label: "Thursday",
    },
    {
      value: 5,
      label: "Friday",
    },
    {
      value: 6,
      label: "Saturday",
    },
    {
      value: 0,
      label: "Sunday",
    },
  ]
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
        textAlign: "center",
      }
    },
    {
      title: "Employee ",
      field: "employeeName",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt"
      }
    },
    {
      title: "Manager",
      field: "managerName",
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
        fontSize: "12pt"
      }
    },
    {
      title: "DOJ",
      field: "doj",
      cellStyle: {
        whiteSpace: "nowrap",
        border: "0.5px solid #659F1C",
        height: "30px",
        fontSize: "12pt"
      }
    },
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
                onClick={() => {
                  setId(id);
                  toggleEditRecord(true);
                  setCurrentOpr("Update");
                  setValidationList({});
                  setRowData({ gender: data[id].gender });
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      printable: false,
    }
  ];

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const exportEmployeeList = () => {
    const exportData = data.map((emp) => ({
      srNo: emp.srNo,
      employeName: emp.firstName + " " + emp.lastName,
      designation: emp.designationCode,
      city: emp.cityName,
      division: emp.divisionName,
      state: emp.stateName,
      managerName: emp.managerName,
      email: emp.email,
      phone: emp.mobileNumber,
      dob: emp.dob,
      doj: emp.doj,
      doa: emp.doa,
      address: emp.address,
    }));
    const header = [
      [
        "Sr. No",
        "Employee Name",
        "Designation",
        "City",
        "Division",
        "State",
        "Manager",
        "Email",
        "Phone",
        "DOB",
        "DOJ",
        "DOA",
        "Address",
      ],
    ];
    downloadExcel({
      data: exportData,
      fileName: `Employees_${selectedStateName} `,
      header: header,
    });
  };

  console.log("empStatusValue :: ",empStatusValue);
  const getEmployeeList = (e) => {
    e.preventDefault();
    setLoading(true);
    const params = {
      stateId: null,
      designationId:
        selectedDesignationId === "All" ? "" : selectedDesignationId,
      divisionId: selectedDivisionId === "All" ? "" : selectedDivisionId,
      status: empStatusValue,
    };
    props.getEmployeeList({
      params,
      onSuccess: (response) => {
        const { employeeList = [] } = response;
        console.log("employeeList ::: ",employeeList);

        setDisabledExport(employeeList.length === 0);
        const data = employeeList.map((emp, index) => ({
          ...emp,
          srNo: index + 1,
          employeeName: emp.employeeName,
          doa: emp.doa !== null ? getDisplayDate(emp.doa) : null,
          dob: emp.dob !== null ? getDisplayDate(emp.dob) : null,
          doc: emp.doc !== null ? getDisplayDate(emp.doc) : null,
          doj: emp.doj !== null ? getDisplayDate(emp.doj) : null,
          dor: emp.dor !== null ? getDisplayDate(emp.dor) : null,
          dol: emp.dol !== null ? getDisplayDate(emp.dol) : null,
          fnFDate: emp.fnFDate !== null ? getDisplayDate(emp.fnFDate) : null,
        }));
        setData(data);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

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
  const getDivisions = () => {
    props.getDivisions({
      onSuccess: (response) => {
        let allOptionObj = { label: "All", value: "All" };
        const { divisionList } = response;
        divisionList.splice(0, 0, allOptionObj);
        setDivisionList(divisionList);
        setSelectedDivisionId("All");
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };
  const getAllDivisions = () => {
    props.getAllDivisions({
      onSuccess: (response) => {
        //  let allOptionObj = { label: "All", value: "All" };
        const { allDivisionList } = response;
        // allDivisionList.splice(0, 0, allOptionObj);
        setAllDivisionList(allDivisionList);
        //setSelectedDivisionId("All");
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };
  const getEmployeeStatus = () => {
    props.getEmployeeStatus({
      params: {
        code: "EMPLOYEE_STATUS",
      },
      onSuccess: (response) => {
        const { list } = response;
        setEmpStatus(list);
        setEmpStatusValue(list[0].value);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };
  const getDesignations = () => {
    props.getDesignations({
      onSuccess: (response) => {
        let allOptionObj = { label: "All", value: "All" };
        const { designationList } = response;
        designationList.splice(0, 0, allOptionObj);
        setDesignationList(designationList);
        setSelectedDesignationId("All");
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const getManagers = () => {
    setManagers([]);
    const params = {
      designationIds: aslAndAboveDesignations,
    };
    props.getEmployees({
      params,
      onSuccess: (response) => {
        const { employeeList } = response;
        setManagers(employeeList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const sendSms = (idFromProp) => {
    const params = {
      mobileNumber: data[idFromProp].mobileNumber,
      code: "EmployeeDetail",
    };

    props.sendSms({
      params,
      onSuccess: (response) => {
        // const {} = response;
        setDisplayMessage({
          open: true,
          displayMessage: "Login details has been sent !!",
          severity: "success",
        });
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    getCountries();
    getDivisions();
    getDesignations();
    getEmployeeStatus();
    getManagers();
    getAllDivisions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setSelectedFilter(JSON.parse(data[id].divisionId));
      // setSelectedDays(JSON.parse(data[id].weeklyOff));
      setSelectedFilterError(false);
      setStateCitySelectProperties({
        cityValue: rowData.cityId,
        stateValue: rowData.stateId,
      });

      if (rowData.dor === null) {
        setIsDORDate(false);
      } else {
        setIsDORDate(true);
      }

      const managersExceptCurr = managers.filter(
        (manager) => manager.value !== rowData.employeeId
      );
      setManagers(managersExceptCurr);
      setRowData({
        ...rowData,
        employeeId: rowData.employeeId,
        email: rowData.email,
        mobileNumber: rowData.mobileNumber,
        address: rowData.address,
        dob: rowData.dob,
        doj: rowData.doj,
        firstName: rowData.firstName,
        fatherName: rowData.fatherName,
        lastName: rowData.lastName,
        doa: rowData.doa,
        dol: rowData.dol,
        divisionId: rowData.divisionId,
        weeklyOff: rowData.weeklyOff,
        divisionName: rowData.divisionName,
        designationId: rowData.designationId,
        designationCode: rowData.designationCode,
        countryId: rowData.countryId,
        countryName: rowData.countryName,
        stateName: rowData.stateName,
        cityName: rowData.cityName,
        pinCode: rowData.pinCode,
        doc: rowData.doc,
        dor: rowData.dor,
        fnFDate: rowData.fnFDate,
        status: rowData.status,
        managerId: rowData.managerId === 0 ? "" : rowData.managerId,
        resignationReason:
          rowData.resignationReason === null || rowData.resignationReason === ""
            ? ""
            : rowData.resignationReason,
        remarks: rowData.remarks,
        //refId: rowData.refId,
        updatedDate: rowData.updatedDate,
      });
      if (divisionList.length !== 0 && divisionList[0].value === "All") {
        divisionList.splice(0, 1);
        setDivisionList(divisionList);
      }
      if (designationList.length !== 0 && designationList[0].value === "All") {
        designationList.splice(0, 1);
        setDesignationList(designationList);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
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

    if (divisionList.length !== 0 && divisionList[0].value === "All") {
      divisionList.splice(0, 1);
      setDivisionList(divisionList);
    }
    if (designationList.length !== 0 && designationList[0].value === "All") {
      designationList.splice(0, 1);
      setDesignationList(designationList);
    }
    setRowData({
      firstName: "",
      lastName: "",
      fatherName: "",
      dob: null,
      doa: null,
      gender: genderOptions[0].value,
      divisionId: "",
      designationId: "",
      managerId: "",
      countryId: Country_India,
      mobileNumber: null,
      email: "",
      weeklyOff: "",
      doj: null,
      address: "",
      pinCode: null,
      doc: null,
      dor: null,
      dol: null,
      fnFDate: null,
      status: "",
      resignationReason: "",
      remarks: "",
      //refId: ""
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
    if (selectedFilter.length === 0)
      setSelectedFilterError(true);

    const firstName = !validateField("firstName");
    const lastName = !validateField("lastName");
    const fatherName = !validateField("fatherName");
    const dob = !validateField("dob");
    const doj = !validateField("doj");
    const mobileNumber = !validateField("mobileNumber");
    const designationId = !validateField("designationId");
    const divisionId = selectedFilter.length === 0 ? true : false; //!validateField("divisionId");
    // const isMobileValid = !isMobileRegexValid;
    const isEmailValid =
      rowData.email !== "" && rowData.email !== null
        ? !isEmailRegexValid
        : false;

    let isManager = false;
    if (
      rowData.designationId &&
      adminNslDesignations.includes(rowData.designationId)
    ) {
      setValidationList({ ...validationList, managerId: false });
    } else if (!rowData.managerId || rowData.managerId === 0) {
      isManager = true;
      setValidationList({ ...validationList, managerId: true });
    }

    if (stateValue === "" && cityValue === "") {
      setStateCitySelectProperties({
        ...stateCitySelectProperties,
        stateError: stateValue === "" ? true : false,
        cityError: cityValue === "" ? true : false,
      });
    }
    const stateErr = stateValue === "" ? true : false;
    const cityErr = cityValue === "" ? true : false;
    let pinCode = false;
    if (validateField.pinCode && validateField.pinCode === true) pinCode = true;

    let isResign = false;
    let isDOR = false;
    let isDOL = false;
    let status = false;
    let resignationReason = false;
    let empStatus = rowData.status;
    if (currentOpr === "Update") {
      if (isDORDate && rowData.dol === null) {
        // DOR is selected AND status is not resigned
        if (empStatus === EmployeeStatus_Active) {
          isResign = true;
          status = true;
          setValidationList({ ...validationList, status: true });
        }
        if (
          rowData.resignationReason === null ||
          rowData.resignationReason === ""
        ) {
          resignationReason = true;
          setValidationList({ ...validationList, resignationReason: true });
        }
      }
      if (empStatus === EmployeeStatus_Resigned) {
        if (rowData.dor === null) {
          isDOR = true;
          setValidationList({ ...validationList, dor: true });
        }
        if (
          rowData.resignationReason === null ||
          rowData.resignationReason === ""
        ) {
          resignationReason = true;
          setValidationList({ ...validationList, resignationReason: true });
        }
      }

      if (rowData.resignationReason !== "") {
        if (rowData.dor === null) {
          isDOR = true;
          setValidationList({ ...validationList, dor: true });
        }
        if (empStatus !== EmployeeStatus_Inactive) {
          if (empStatus !== EmployeeStatus_Resigned) {
            isResign = true;
            status = true;
            setValidationList({ ...validationList, status: true });
          }
        }
      }

      if (rowData.fnFDate !== null) {
        if (!isDORDate) {
          isDOR = true;
          setValidationList({ ...validationList, dor: true });
        } else if (empStatus === EmployeeStatus_Active) {
          isResign = true;
          status = true;
          setValidationList({ ...validationList, status: true });
        } else if (rowData.dol === null) {
          isDOL = true;
          setValidationList({ ...validationList, dol: true });
        }
      }
    }
    if (empStatus === EmployeeStatus_Inactive) {
      if (rowData.dor === null) {
        isDOR = true;
        setValidationList({ ...validationList, dor: true });
      }
      if (
        rowData.resignationReason === null ||
        rowData.resignationReason === ""
      ) {
        resignationReason = true;
        setValidationList({ ...validationList, resignationReason: true });
      }
      if (rowData.dol === null) {
        isDOL = true;
        setValidationList({ ...validationList, dol: true });
      }
    }
    if (rowData.dol !== null) {
      if (empStatus === EmployeeStatus_Active) {
        status = true;
        setValidationList({ ...validationList, status: true });
      }
    }

    setValidationList({
      ...validationList,
      firstName,
      lastName,
      fatherName,
      dob,
      mobileNumber,
      doj,
      designationId,
      resign: isResign,
      dor: isDOR,
      dol: isDOL,
      status,
      resignationReason,
      divisionId,
    });

    return (
      !firstName &&
      !lastName &&
      !fatherName &&
      !dob &&
      !doj &&
      !mobileNumber &&
      !stateErr &&
      !cityErr &&
      !isResign &&
      !isDOR &&
      !isDOL &&
      !isManager &&
      !designationId &&
      !resignationReason &&
      !pinCode &&
      !divisionId &&
      !status &&
      // !isMobileValid &&
      !isEmailValid
    );
  };

  const FormContent = (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <TextField
          required={true}
          value={rowData.firstName}
          label="First Name"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, firstName: e.target.value });
            validateField("firstName");
          }}
          error={validationList && validationList.firstName ? true : false}
          errorMessage={"First Name is Required"}
          maxLength={30}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          required={true}
          value={rowData.lastName}
          label="Last Name"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, lastName: e.target.value });
            validateField("lastName");
          }}
          error={
            validationList && validationList.lastName
              ? validationList.lastName
              : false
          }
          errorMessage={"Last Name is Required"}
          maxLength={30}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          required={true}
          value={rowData.fatherName}
          label="Father Name"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, fatherName: e.target.value });
            validateField("fatherName");
          }}
          error={
            validationList && validationList.fatherName
              ? validationList.fatherName
              : false
          }
          errorMessage={"Father Name is Required"}
          maxLength={30}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DatePicker
          disableFuture={true}
          defaultValue={rowData.dob}
          label="DOB"
          tooltipText="Date of Birth"
          onChange={(date) => {
            setRowData({ ...rowData, dob: date });
            validateField("dob");
          }}
          required={true}
          error={
            validationList && validationList.dob ? validationList.dob : false
          }
          errorMessage={"DOB is Required"}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DatePicker
          defaultValue={rowData.doa}
          label="DOA"
          tooltipText={"Date of Anniversary"}
          onChange={(date) => {
            setRowData({ ...rowData, doa: date });
            validateField("doa");
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <RadioGroup
          value={rowData.gender}
          options={genderOptions}
          isOptionAlignRow={true}
          label={"Gender"}
          labelPlacement={"end"}
          onChange={(e) => {
            setRowData({ ...rowData, gender: parseInt(e.target.value) });
            validateField("gender");
          }}
        />
      </Grid>
      {/* <Grid item xs={12} md={4}>
        <Select
          data={divisionList}
          value={rowData.divisionId}
          label={"Division"}
          onChange={(e) => {
            setRowData({ ...rowData, divisionId: e.target.value });
            validateField("divisionId");
            setValidationList({ ...validationList, divisionId: false });
          }}
          required={true}
          error={
            validationList && validationList.divisionId
              ? validationList.divisionId
              : false
          }
          errorMessage={"Primary Division is required"}
        />
      </Grid> */}
      <Grid item xs={12} md={4}>
        <MultipleCheckboxSelect
          items={allDivisionList}
          // items={divisionList}
          keyField={"value"}
          textField={"label"}
          checked={selectedFilter}
          label={"Division"}
          error={selectedFilterError}
          setChecked={(values) => {
            setSelectedFilter(values);
          }}
          required={true}
          errorMessage={"Division is required"}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Select
          data={designationList}
          value={rowData.designationId}
          label={"Designation"}
          onChange={(e) => {
            validateField("designationId");
            if (adminNslDesignations.includes(e.target.value)) {
              setValidationList({ ...validationList, managerId: false });
              setRowData({
                ...rowData,
                managerId: "",
                designationId: e.target.value,
              });
            } else {
              rowData.managerId === "" &&
                setValidationList({ ...validationList, managerId: true });
              setRowData({ ...rowData, designationId: e.target.value });
            }
          }}
          required={true}
          error={validationList && validationList.designationId ? true : false}
          errorMessage={"Designation is required"}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Select
          data={
            adminNslDesignations.includes(rowData.designationId) ? [] : managers
          }
          value={rowData.managerId}
          label={"Manager"}
          onChange={(e) => {
            setRowData({ ...rowData, managerId: e.target.value });
            validateField("managerId");
          }}
          required={
            currentOpr === "Update" &&
              !adminNslDesignations.includes(rowData.designationId)
              ? true
              : validationList.managerId
          }
          error={
            validationList && validationList.managerId
              ? validationList.managerId
              : false
          }
          errorMessage={"Manager is Required"}
        />
      </Grid>
      <Grid item xs={12} md={8}>
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
          error={validationList && validationList.Address ? true : false}
          errorMessage={"Address is Required"}
          maxLength={200}
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
        <TextField
          required={false}
          value={rowData.pinCode}
          label="Pin Code"
          numeric={true}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, pinCode: e.target.value });
          }}
          maxLength={6}
          error={validationList && validationList.pinCode ? true : false}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        {/* <TextField
          required={true}
          value={rowData.mobileNumber}
          label="Mobile Number"
          numeric={true}
          options={{
            type: "mobile",
          }}
          setIsMobileRegexValid={setIsMobileRegexValid}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, mobileNumber: e.target.value });
            validateField("mobileNumber");
          }}
          error={validationList && validationList.mobileNumber ? true : false}
          errorMessage={"Mobile Number is Required"}
          maxLength={10}
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
            // setIsMobileRegexValid={setIsMobileRegexValid}
            // numeric={true}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, mobileNumber: e.target.value });
              validateField("mobileNumber");
            }}
            error={validationList && validationList.mobileNumber ? true : false}
            errorMessage={"Mobile Number is Required"}
            maxLength={20}
          />
          {/* <Tooltip title="Check Duplicate" tabIndex="-1">
            <IconButton aria-label="delete" onClick={() => {
              if (rowData.mobileNumber && rowData.mobileNumber.length > 0 && isMobileRegexValid) getMobileOwnerName();
            }}
              class="MuiButtonBase-root MuiIconButton-root input-absolute-icon">
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="copy" class="svg-inline--fa fa-copy fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg>
            </IconButton>
          </Tooltip> */}
          {/* <Button
            // label={"Check Duplicate"}
            onClick={() => {
              getMobileOwnerName();
            }}
            customClass="button button-outline-black invoice-check-duplicate-btn"
          />  */}
        </div>
        {/* <Button
                  label={"Check Duplicate"}
                  onClick={() => {
                    getMobileOwnerName();
                  }}
                  customClass="button button-outline-black invoice-check-duplicate-btn"
                /> */}
      </Grid>

      <Grid item xs={12} md={4}>
        <DatePicker
          defaultValue={rowData.doj}
          label="DOJ"
          tooltipText={"Date of Joining"}
          onChange={(date) => {
            setRowData({ ...rowData, doj: date, doc: null });
            validateField("doj");
          }}
          required={true}
          error={
            validationList && validationList.doj ? validationList.doj : false
          }
          errorMessage={"DOJ is Required"}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <DatePicker
          defaultValue={rowData.doc}
          minDate={rowData.doj}
          label="DOC"
          tooltipText={"Date of Confirmation"}
          onChange={(date) => {
            setRowData({ ...rowData, doc: date });
            validateField("doc");
          }}
        />
      </Grid>
      {currentOpr === "Update" && (
        <Grid item xs={12} md={4}>
          <DatePicker
            defaultValue={rowData.dor}
            label="DOR"
            tooltipText={"Date of Resignation"}
            onChange={(date) => {
              setRowData({ ...rowData, dor: date });
              if (date !== null) setIsDORDate(true);
              else setIsDORDate(false);
            }}
            required={
              rowData.status === EmployeeStatus_Resigned ||
              rowData.status === EmployeeStatus_Inactive ||
              rowData.resignationReason !== ""
            }
            error={
              validationList && validationList.dor ? validationList.dor : false
            }
            errorMessage={"Resign Date required"}
          />
        </Grid>
      )}
      {currentOpr === "Update" && (
        <Grid item xs={12} md={4}>
          <DatePicker
            defaultValue={rowData.dol}
            label="DOL"
            tooltipText={"Date of Leaving"}
            onChange={(date) => {
              setRowData({ ...rowData, dol: date });
              validateField("dol");
            }}
            required={
              (rowData.fnFDate !== null && rowData.dol === null) ||
              rowData.status === EmployeeStatus_Inactive
            }
            error={
              validationList && validationList.dol ? validationList.dol : false
            }
            errorMessage={"DOL required"}
          />
        </Grid>
      )}
      {currentOpr === "Update" && (
        <Grid item xs={12} md={4}>
          <DatePicker
            defaultValue={rowData.fnFDate}
            label="FnF Date"
            tooltipText={"Full n Final Date"}
            onChange={(date) => {
              setRowData({ ...rowData, fnFDate: date });
              validateField("fnFDate");
            }}
          />
        </Grid>
      )}
      {currentOpr === "Update" && (
        <Grid item xs={12} md={4}>
          <TextField
            value={rowData.resignationReason}
            label="Resignation Reason"
            numeric={false}
            maxLength={250}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, resignationReason: e.target.value });
              validateField("resignationReason");
              if (
                rowData.resignationReason !== null ||
                rowData.resignationReason !== ""
              ) {
                if (rowData.dor === null) {
                  setValidationList({ ...validationList, dor: true });
                }
                if (rowData.dol === null) {
                  if (empStatus !== EmployeeStatus_Resigned) {
                    setValidationList({ ...validationList, status: true });
                  }
                }
              } else if (
                (rowData.resignationReason === null ||
                  rowData.resignationReason === "") &&
                rowData.dor === null &&
                empStatus !== EmployeeStatus_Resigned
              ) {
                setValidationList({
                  ...validationList,
                  status: false,
                  dor: false,
                  resignationReason: false,
                });
              }
            }}
            required={
              rowData.status === EmployeeStatus_Resigned ||
              rowData.status === EmployeeStatus_Inactive ||
              rowData.dor !== null
            }
            error={
              validationList && validationList.resignationReason
                ? validationList.resignationReason
                : false
            }
            errorMessage={"Resignation Reason required"}
            multiline={true}
            rows={2}
          />
        </Grid>
      )}
      <Grid item xs={12} md={4}>
        <TextField
          required={false}
          value={rowData.email}
          label="Email"
          numeric={false}
          options={{
            type: "email",
          }}
          setIsEmailRegexValid={setIsEmailRegexValid}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, email: e.target.value });
            validateField("email");
          }}
          error={validationList && validationList.email ? true : false}
          errorMessage={"Email is Required"}
          maxLength={90}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <MultipleCheckboxSelect
          items={daysOption}
          // items={divisionList}
          keyField={"value"}
          textField={"label"}
          checked={selectedDays}
          label={"WeeklyOff"}
          error={selectedFilterError}
          setChecked={(values) => {
            setSelectedDays(values);
          }}
          required={true}
          errorMessage={"WeeklyOff is required"}
        />
      </Grid>
      {/* <Grid item xs={12} md={4}>
        <TextField
          required={true}
          value={rowData.refId}
          label="Ref. Id"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, refId: e.target.value });
            validateField("refId");
          }}
          error={validationList && validationList.refId ? true : false}
          errorMessage={"Ref. Id is Required"}
          maxLength={30}
        />
      </Grid> */}
      <Grid item xs={12} md={4}>
        <TextField
          required={false}
          value={rowData.remarks}
          label="Remarks"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, remarks: e.target.value });
            validateField("remarks");
          }}
          error={validationList && validationList.Remarks ? true : false}
          errorMessage={"Remarks is Required"}
          multiline={true}
          rows={2}
          maxLength={200}
        />
      </Grid>


      {currentOpr === "Update" && (
        <Grid item xs={12} md={4}>
          <Select
            data={empStatus}
            value={rowData.status}
            label={"Status"}
            onChange={(e) => {
              setRowData({ ...rowData, status: e.target.value });
              if (e.target.value === EmployeeStatus_Active) {
                setRowData({
                  ...rowData,
                  status: e.target.value,
                  dol: null,
                  dor: null,
                  fnFDate: null,
                  resignationReason: "",
                });
                setValidationList({
                  ...validationList,
                  dol: false,
                  dor: false,
                  fnFDate: null,
                  resignationReason: false,
                });
                setIsDORDate(false);
              }
            }}
            required={
              (isDORDate && rowData.status !== EmployeeStatus_Resigned) ||
              (rowData.dol !== null &&
                rowData.status !== EmployeeStatus_Inactive) ||
              rowData.resignationReason !== ""
            }
            error={
              validationList && validationList.status
                ? validationList.status
                : false
            }
            errorMessage={"Status Resigned/Inactive required"}
          // setEmptyMessage={
          //   rowData.dol !== null
          //     ? rowData.status === EmployeeStatus_Inactive
          //       ? true
          //       : false
          //     : rowData.status === EmployeeStatus_Resigned
          //     ? true
          //     : false
          // }
          // conditionValueForEmptyMessage={
          //   rowData.dol !== null
          //     ? EmployeeStatus_Inactive
          //     : EmployeeStatus_Resigned
          // }
          />
        </Grid>
      )}
      <Grid item xs={12} style={{ justifyContent: "space-" }}>
        <div className="d-flex align-items-center justify-content-end">
          <Button
            autoFocus
            onClick={() => {
              toggleEditRecord(!editRecord);
              setLoading(false);
              let allOptionObj = { label: "All", value: "All" };
              divisionList.splice(0, 0, allOptionObj);
              setDivisionList(divisionList);
              designationList.splice(0, 0, allOptionObj);
              setDesignationList(designationList);
            }}
            customClass="button button-black mr-2"
            label={labels.cancelButton}
          />
          <Button
            onClick={(e) => {
              currentOpr === "Add" ? addEmployee(e) : updateEmployee(e);
            }}
            customClass="button button-primary"
            label={labels.saveButton}
          />
        </div>
      </Grid>
    </Grid>
  );

  const addEmployee = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        divisionId: JSON.stringify(selectedFilter),
        weeklyOff: JSON.stringify(selectedDays),
        stateId: stateValue,
        cityId: cityValue,
        dob: getDBFormateDate(rowData.dob),
        doa: rowData.doa ? getDBFormateDate(rowData.doa) : null,
        doj: rowData.doj ? getDBFormateDate(rowData.doj) : null,
        doc: rowData.doc ? getDBFormateDate(rowData.doc) : null,
        dor: rowData.dor ? getDBFormateDate(rowData.dor) : null,
        dol: rowData.dol ? getDBFormateDate(rowData.dol) : null,
        fnFDate: rowData.fnFDate ? getDBFormateDate(rowData.fnFDate) : null,
      };
      console.log(selectedDays)
      props.addEmployee({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getEmployeeList(e);
          setLoading(false);
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          getManagers();
          toggleEditRecord(!editRecord);
          let allOptionObj = { label: "All", value: "All" };
          divisionList.splice(0, 0, allOptionObj);
          setDivisionList(divisionList);
          designationList.splice(0, 0, allOptionObj);
          setDesignationList(designationList);
        },
        onFailure: ({ message }) => {
          setLoading(false);
          displayErrorMessage(message);
        },
      });
    }
  };

  const getMobileOwnerName = () => {
    const params = {
      mobileNumber: rowData.mobileNumber
    };
    props.getMobileOwnerName({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { messageText } = response;
        if (messageText !== null) {
          setDisplayMessage({
            open: true,
            displayMessage: messageText,
            severity: "success",
          });
        }
        else {
          setDisplayMessage({
            open: true,
            displayMessage: "No matching record found!",
            severity: "success",
          });
        }
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  }

  console.log("selectedFilter :: ",selectedFilter);
  const updateEmployee = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      delete rowData["tableData"];
      delete rowData["employeeName"];
      delete rowData["srNo"];

      const params = {
        ...rowData,
        stateId: stateValue,
        cityId: cityValue,
        divisionId: JSON.stringify(selectedFilter),
        weeklyOff: JSON.stringify(selectedDays),
        dob: getDBFormateDate(rowData.dob),
        doa: rowData.doa ? getDBFormateDate(rowData.doa) : null,
        doj: rowData.doj ? getDBFormateDate(rowData.doj) : null,
        doc: rowData.doc ? getDBFormateDate(rowData.doc) : null,
        dor: rowData.dor ? getDBFormateDate(rowData.dor) : null,
        dol: rowData.dol ? getDBFormateDate(rowData.dol) : null,
        fnFDate: rowData.fnFDate ? getDBFormateDate(rowData.fnFDate) : null,
      };
      props.updateEmployee({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getEmployeeList(e);
          setLoading(false);
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          getManagers();
          toggleEditRecord(!editRecord);
          let allOptionObj = { label: "All", value: "All" };
          divisionList.splice(0, 0, allOptionObj);
          setDivisionList(divisionList);
          designationList.splice(0, 0, allOptionObj);
          setDesignationList(designationList);
        },
        onFailure: ({ message }) => {
          setLoading(false);
          displayErrorMessage(message);
        },
      });
    }
  };

  return (
    <div className="holiday-wrapper">
      {!editRecord && (
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={4} lg={3}>
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
            </Grid> */}

            <Grid item xs={12} md={4} lg={2}>
              <Select
                data={designationList}
                value={selectedDesignationId}
                label={"Designation"}
                onChange={(e) => {
                  setSelectedDesignationId(e.target.value);
                }}
                isInline={true}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <Select
                data={divisionList}
                value={selectedDivisionId}
                label={"Division"}
                onChange={(e) => {
                  setSelectedDivisionId(e.target.value);
                }}
                isInline={true}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <Select
                data={empStatus}
                value={empStatusValue}
                label={"Status"}
                onChange={(e) => {
                  setEmpStatusValue(e.target.value);
                }}
                isInline={true}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <div className="selection-card-actions">
                <Button
                  label={labels.filterButton}
                  onClick={(e) => {
                    // if (selectedState !== "") {
                    setShowGrid(true);
                    getEmployeeList(e);
                    // } else {
                    //   setError(true);
                    // }
                  }}
                  customClass="button button-primary mr-2"
                />
                {add && (
                  <Button
                    onClick={() => {
                      addButtonClick();
                    }}
                    customClass="button button-black add-employee-button"
                    label={"Add Employee"}
                  >
                    Add
                  </Button>
                )}
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
                title={`List of Employees`}
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
                            getEmployeeList(e);
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
                            exportEmployeeList();
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
      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
