import React, { useState, useEffect, useRef } from "react";
import MaterialTable from "material-table";
import {
  Edit,
  Print,
  AddBox,
  Refresh,
  Done,
  SaveAlt,
  Search,
} from "@material-ui/icons";
import {
  Grid,
  IconButton,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import {
  GridIcons,
  style,
  actionColumnStyle,
  options,
} from "../../../components/custom/GridConfig";
import Loading from "../../../components/core/Loading";
import DisplayMessage from "../../../components/core/DisplayMessage";
import TextField from "../../../components/core/TextField";
import DatePicker from "../../../components/core/DatePicker";
import Select from "../../../components/core/Select";
import MultiSelect from "../../../components/core/MultiSelect";
import MultipleCheckboxSelect from "../../../components/custom/MultipleCheckboxSelect";
import StateCitySelect from "../../../components/custom/StateCitySelect/StateCitySelectContainer";
import StatesSelect from "../../../components/custom/StatesSelect/StatesSelectContainer";
import RadioGroup from "../../../components/core/RadioGroup";
import Button from "../../../components/core/Button";
import SingleCheckbox from "../../../components/core/SingleCheckBox";
import PrintableGrid from "../../../components/custom/PrintableGrid";
import { labels } from "../../../Config.json";
import { getDBFormateDate } from "../../../Utils/DateTimeUtils.js";
import downloadFile from "../../../Utils/DownloadS3File";
import DialogControl from "../../../components/core/Dialog"; /// Search Chemist Change

/**
 * Add, update operations for Chemist
 * Server side pagination,sorting,searching
 * Filters based on designation :ADMIN (State -> City -> Area), ASL & ABOVE (State -> Employee), SL (No Filter)
 * Route Field : Not visible for admin, Non-editable (Disabled in edit mode)
 * Is Active : Only Editable
 * Add/update based on rights
 * Printing
 * @author Tejal Sali, Akshay Ambaliya
 */

/*

C1 | Brinda | 01-Jun-2021 | Chemist Master Optimization Change
C2 | Brinda | 01-Jun-2021 | Search Chemist By Name and Mobile No change

*/

export default function ChemistList(props) {
  const tableRef = useRef();
  const [showGrid, setShowGrid] = useState(false);
  const [paginationData, setPaginationData] = useState({ pageSize: 10 });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [id, setId] = useState();
  const [areaFilterList, setAreaFilterList] = useState([]);
  const [selectedFilterArea, setSelectedFilterArea] = useState([]);
  const [selectedFilterAreaError, setSelectedFilterAreaError] = useState(false);
  const [rowData, setRowData] = useState({});
  const [areaFormList, setAreaFormList] = useState([]);
  const [routesFormList, setRoutesFormList] = useState([]);
  const [saveClick, setSaveClick] = useState(0);
  const [isMobileRegexValid, setIsMobileRegexValid] = useState(true);
  const [isEmailRegexValid, setIsEmailRegexValid] = useState(true);
  // const [isDlNoValid, setIsDlNoValid] = useState(true);
  const [isGstNoRegexValid, setIsGstNoRegexValid] = useState(true);

  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [StateBasedEmployeeList, setStateBasedEmployeeList] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [stateFilterError, setStateFilterError] = useState(false);
  const [employeeFilterError, setEmployeeFilterError] = useState(false);
  const [stateCitySelectProperties, setStateCitySelectProperties] = useState(
    {}
  );
  const [list, setList] = useState([]);

  /* C2: Start - Search Chemist by name and conatct number */
  const [searchDialog, toggleSearchDialog] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTxtError, setSearchTxtError] = useState(false);
  const [isAdminOrJRAdmin, setIsAdminOrJRAdmin] = useState(false);
  const [isSearchCall, setIsSearchCall] = useState(false);
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  /* End - Search Chemist by name and conatct number */

  const {
    stateValue = "",
    cityValue = "",
    isAreaChanged = false,
  } = stateCitySelectProperties;

  const [stateCitySelectFilterProperties, setStateCitySelectFilterProperties] =
    useState({});
  const {
    stateValue: stateFilterValue = "",
    cityValue: cityFilterValue = "",
    isAreaChanged: isAreaFilterChanged,
  } = stateCitySelectFilterProperties;

  const {
    loggedInDesignationId,
    operationRights = {},
    filterDesignation = {},
  } = props;
  const { add, edit } = operationRights;

  const {
    adminDesignations = [],
    aslAndAboveDesignations = [],
    slDesignations = [],
  } = filterDesignation;

  const stateFilter =
    adminDesignations.includes(loggedInDesignationId) ||
    aslAndAboveDesignations.includes(loggedInDesignationId);
  const cityFilter = adminDesignations.includes(loggedInDesignationId);
  const areaFilter = adminDesignations.includes(loggedInDesignationId);
  const employeeFilter = aslAndAboveDesignations.includes(
    loggedInDesignationId
  );
  const noFilter = slDesignations.includes(loggedInDesignationId);

  const routeField = !adminDesignations.includes(loggedInDesignationId);

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
      sorting: false,
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
                  setRowData({
                    ...rowData,
                    isActive: data[id].isActive === 1 ? "1" : "0",
                  });
                  setValidationList({});
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>

            {data[id] && data[id].isVerified == 1 && (
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">
                      Verified By: <b>{data[id].verifiedBy}</b>{" "}
                    </Typography>
                    <Typography color="inherit">
                      Date: <b>{data[id].verifiedDate}</b>{" "}
                    </Typography>
                  </React.Fragment>
                }
              >
                <Done
                  fontSize="default"
                  style={{ color: green[500], fontWeight: "bold" }}
                />
              </HtmlTooltip>
            )}
          </div>
        );
      },
      printable: false,
    },
    {
      title: "Sr.No",
      field: "srNo",
    },
    {
      title: "Chemist Name",
      field: "chemistName",
    },
    {
      title: "Contact Person",
      field: "contactPerson",
    },
    {
      title: "Mobile Number",
      field: "mobile",
    },
    {
      title: "Route",
      field: "routeName",
      hidden: !routeField,
    },
    {
      title: "Area",
      field: "areaName",
    },
    {
      title: "City",
      field: "cityName",
    },
    {
      title: "Active",
      field: "isActiveLabel",
    },
    {
      title: "Document",
      ...actionColumnStyle,
      render: ({ tableData: { id }, fileName }) => {
        return (
          <div className="table-edit-controls">
            <Tooltip title="Download Doc  ">
              <IconButton
                aria-label="download doc"
                onClick={() => {
                  if (
                    data[id].documentName !== null &&
                    data[id].documentName !== ""
                  ) {
                    downloadFile(data[id].documentName);
                  } else {
                    setDisplayMessage({
                      open: true,
                      displayMessage: "Document not exist!",
                      severity: "info",
                    });
                  }
                }}
                size="small"
              >
                <SaveAlt size="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      printable: false,
    },
  ];

  useEffect(() => {
    setIsAdminOrJRAdmin(
      loggedInDesignationId === 1 || loggedInDesignationId === 7
    ); //C2
    getDocumentTypeValue();
    if (noFilter) {
      getAllData(false); //C2
      setShowGrid(true);
    }
    if (routeField) getRoutes();

    if (employeeList.length === 0) {
      const params = {};
      props.getSLOrManagerList({
        params,
        onSuccess: (response) => {
          const { slOrManagerList } = response;
          setEmployeeList(slOrManagerList);
        },
        onFailure: ({ message }) => {
          displayErrorMessage(message);
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDocumentTypeValue = () => {
    setRowData({ ...rowData, typeId: "" });
    props.getStaticLookup({
      params: {
        code: "DocumentTypeGroup",
      },
      onSuccess: (response) => {
        const { list = [] } = response;

        setList(list);
      },
      onFailure: ({ message }) => {
        props.displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    if (selectedState !== "") filterStateBasedEmployee();
    setSelectedEmployee("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);

  const filterStateBasedEmployee = () => {
    const empList = employeeList.filter((emp) => emp.stateId === selectedState);
    setStateBasedEmployeeList(empList);
    setSelectedEmployee("");
  };

  const getRoutes = () => {
    props.getRoutes({
      params: { isOfficialRoutesRequired: false },
      onSuccess: (response) => {
        const { routeList = [] } = response;
        setRoutesFormList(routeList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
        setRoutesFormList([]);
      },
    });
  };

  useEffect(() => {
    if (cityFilter && areaFilter) {
      setSelectedFilterArea([]);
      if (cityFilterValue === "") {
        setAreaFilterList([]);
      } else {
        props.getAreas({
          params: { cityId: cityFilterValue },
          onSuccess: (response) => {
            const { areaList = [] } = response;
            // let allOptionObj = { label: "All", value: "All" };
            // areaList.splice(0, 0, allOptionObj);
            setAreaFilterList(areaList);
          },
          onFailure: ({ message }) => {
            displayErrorMessage(message);
            setAreaFilterList([]);
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityFilterValue]);

  useEffect(() => {
    if (cityValue === "") {
      setAreaFormList([]);
      setRowData({ ...rowData, areaId: "" });
    } else {
      props.getAreas({
        params: { cityId: cityValue },
        onSuccess: (response) => {
          const { areaList = [] } = response;
          setAreaFormList(areaList);
          if (
            areaList.filter((area) => area.value === rowData.areaId).length ===
            0
          )
            setRowData({ ...rowData, areaId: "" });
        },
        onFailure: ({ message }) => {
          displayErrorMessage(message);
          setAreaFormList([]);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityValue]);

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getChemistList = ({
    page = 1,
    pageSize = 10,
    orderBy = null,
    orderDirection = null,
    search = null,
    resolve = null,
    reject = null,
  }) => {
    setLoading(true);
    let params = {
      page,
      pageSize,
      orderBy,
      orderDirection,
      search: search === "" ? null : search,
    };

    if (stateFilter && cityFilter) {
      params.stateId = stateFilterValue;
      params.cityId = cityFilterValue;
    }
    if (areaFilter) {
      params.areaId = selectedFilterArea;
    }
    if (stateFilter && employeeFilter) {
      params.stateId = selectedState;
      params.employeeId = selectedEmployee;
    }

    props.getChemistList({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { chemistList = [], totalRecords = 0 } = response;
        const data = chemistList.map((chemist) => ({
          ...chemist,
          isActiveLabel: chemist.isActive === 1 ? "Yes" : "No",
        }));

        setData(data);

        resolve &&
          resolve({
            data,
            page: page - 1,
            totalCount: totalRecords,
          });
      },
      onFailure: ({ message }) => {
        setLoading(false);
        reject && reject();
        displayErrorMessage(message);
      },
    });
  };

  const getAllData = (isSearchCalled, search = null) => {
    setLoading(true); //C1
    let params = {
      page: 0,
      pageSize: null,
      orderBy: null,
      orderDirection: null,
      search: search, //C2
      isRouteChemist: isSearchCalled, //C2
      chemistMasterCall: true, //C2
    };

    if (!isSearchCalled) {
      if (stateFilter && cityFilter) {
        params.stateId = stateFilterValue;
        params.cityId = cityFilterValue;
      }
      if (areaFilter) {
        params.areaId = selectedFilterArea;
      }
    }
    if (stateFilter && employeeFilter) {
      params.stateId = !isSearchCalled ? selectedState : null;
      params.employeeId = selectedEmployee;
    }

    props.getChemistList({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { chemistList = [] } = response;
        const data = chemistList.map((chemist) => ({
          ...chemist,
          isActiveLabel: chemist.isActive === 1 ? "Yes" : "No",
        }));
        setAllData(data);
        setData(data); //C1
        setSaveClick(saveClick + 1);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        setData([]); //C2
        setAllData([]); //C2
        displayErrorMessage(message);
      },
    });
  };

  const printClick = () => {
    var divContents = document.getElementById("printChemistDiv").innerHTML;
    var printWindow = window.open("", "", "height=200,width=400");
    printWindow.document.write(
      "<html><head><title>Print from Smart Laboratories</title>"
    );
    printWindow.document.write("</head><body >");
    printWindow.document.write(divContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
    // printWindow.close();
  };

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        ...rowData,
        chemistId: rowData.chemistId,
        stateId: rowData.stateId,
        cityId: rowData.cityId,
        chemistName: rowData.chemistName,
        contactPerson: rowData.contactPerson,
        mobile: rowData.mobile,
        email: rowData.email,
        // fax: rowData.fax,
        areaId: rowData.areaId,
        address: rowData.address,
        pinCode: rowData.pinCode,
        gstin: rowData.gstin,
        dlNumber: rowData.dlNumber,
        routeId: rowData.routeId,
        isActive: rowData.isActive === 1 ? "1" : "0",
        dob: rowData.dob,
      });

      setStateCitySelectProperties({
        ...stateCitySelectProperties,
        stateValue: rowData.stateId ? rowData.stateId : "",
        cityValue: rowData.cityId ? rowData.cityId : "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setAreaFormList([]);
    setRowData({
      chemistName: "",
      contactPerson: "",
      mobile: "",
      areaId: "",
      routeId: "",
      dob: null,
      email: null,
      dlNumber: null,
      gstin: null,
      address: null,
      pinCode: null,
      typeId: "",
    });
    setStateCitySelectProperties({
      ...stateCitySelectProperties,
      stateValue: "",
      cityValue: "",
      stateError: false,
      cityError: false,
      isAreaChanged: false,
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

  const getMobileOwnerName = () => {
    const params = {
      mobileNumber: rowData.mobile,
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
        } else {
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
  };

  const checkAllValidation = () => {
    const chemistName = !validateField("chemistName");
    const contactPerson = !validateField("contactPerson");
    const mobile = !validateField("mobile");
    const areaId = !validateField("areaId");
    const pinCode = !validateField("pinCode");
    const typeId = !validateField("typeId");
    const isMobileValid = !isMobileRegexValid;
    const isEmailValid =
      rowData.email !== "" && rowData.email !== null
        ? !isEmailRegexValid
        : false;

    const isGstNumberValid =
      rowData.gstin !== "" && rowData.gstin !== null
        ? !isGstNoRegexValid
        : false;

    const routeId =
      routeField === true && currentOpr === "Add"
        ? !validateField("routeId")
        : false;
    let stateCity = false;

    if (stateValue === "" || cityValue === "") {
      stateCity = true;
      setStateCitySelectProperties({
        ...stateCitySelectProperties,
        stateError: stateValue === "" ? true : false,
        cityError: cityValue === "" ? true : false,
        isAreaError: rowData.areaId === "" ? true : false,
      });
    } else {
      setStateCitySelectProperties({
        ...stateCitySelectProperties,
        isAreaError: rowData.areaId === "" ? true : false,
      });
    }

    setValidationList({
      chemistName,
      contactPerson,
      mobile,
      areaId,
      routeId,
      pinCode,
      typeId,
    });

    return (
      !chemistName &&
      !contactPerson &&
      !areaId &&
      !routeId &&
      !stateCity &&
      !mobile &&
      !isMobileValid &&
      !isEmailValid &&
      !isGstNumberValid &&
      !pinCode &&
      !typeId
    );
  };

  const FormContent = (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Select
          data={list}
          required={true}
          value={rowData.typeId}
          label={"Customer Type"}
          onChange={(e) => {
            setRowData({ ...rowData, typeId: e.target.value });
            validateField("typeId");
          }}
          error={validationList && validationList.typeId ? true : false}
          errorMessage={"Customer Type is Required"}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id={"chemistName"}
          required={true}
          value={rowData.chemistName}
          label="Chemist Name"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, chemistName: e.target.value });
            validateField("chemistName");
          }}
          error={validationList && validationList.chemistName ? true : false}
          errorMessage={"Chemist Name is Required"}
          maxLength={50}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id={"contactPerson"}
          required={true}
          value={rowData.contactPerson}
          label="Contact Person"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, contactPerson: e.target.value });
            validateField("contactPerson");
          }}
          error={validationList && validationList.contactPerson ? true : false}
          errorMessage={"Contact Person is Required"}
          maxLength={50}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DatePicker
          variant="inline"
          defaultValue={rowData.dob}
          margin="none"
          label="Date Of Birth"
          onChange={(dob) => {
            setRowData({ ...rowData, dob });
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <div class="position-relative">
          <TextField
            id={"mobile"}
            required={true}
            value={rowData.mobile}
            label="Mobile Number"
            options={{
              type: "mobile",
            }}
            setIsMobileRegexValid={setIsMobileRegexValid}
            numeric={true}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, mobile: e.target.value });
              validateField("mobile");
            }}
            error={validationList && validationList.mobile ? true : false}
            errorMessage={"Mobile Number is Required"}
            maxLength={10}
          />
          <Tooltip title="Check Duplicate" tabIndex="-1">
            <IconButton
              aria-label="delete"
              onClick={() => {
                if (
                  rowData.mobile &&
                  rowData.mobile.length > 0 &&
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
          {/* <Button
            // label={"Check Duplicate"}
            onClick={() => {
              getMobileOwnerName();
            }}
            customClass="button button-outline-black invoice-check-duplicate-btn"
          />  */}
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id={"email"}
          value={rowData.email}
          label="Email"
          options={{
            type: "email",
          }}
          setIsEmailRegexValid={setIsEmailRegexValid}
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, email: e.target.value });
          }}
          maxLength={90}
        />
      </Grid>
      {/* <Grid item xs={12} md={4}>
        <TextField
          id={"FAX"}
          value={rowData.fax}
          label="FAX"
          numeric={true}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, fax: e.target.value });
          }}
          maxLength={50}
        />
      </Grid> */}

      <StateCitySelect
        md={4}
        lg={false}
        spacing={3}
        stateCitySelectProperties={stateCitySelectProperties}
        setStateCitySelectProperties={setStateCitySelectProperties}
      />

      <Grid item xs={12} md={4}>
        <Select
          data={areaFormList}
          required={true}
          value={rowData.areaId}
          label={"Area"}
          onChange={(e) => {
            setRowData({ ...rowData, areaId: e.target.value });
            validateField("areaId");
            setStateCitySelectProperties({
              ...stateCitySelectProperties,
              isAreaChanged: true,
              isAreaError: false,
            });
          }}
          error={
            validationList &&
            validationList.areaId &&
            stateCitySelectProperties.isAreaError
              ? true
              : false
          }
          errorMessage={"Area is Required"}
          isChanged={isAreaChanged}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id={"Address"}
          required={false}
          value={rowData.address}
          label="Address"
          multiline={true}
          rows={2}
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, address: e.target.value });
          }}
          maxLength={200}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id={"pinCode"}
          value={rowData.pinCode}
          required={true}
          label="Pin Code"
          numeric={true}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, pinCode: e.target.value });
          }}
          error={validationList && validationList.pinCode ? true : false}
          errorMessage={"Pin Code is Required"}
          maxLength={6}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id={"gstin"}
          value={rowData.gstin}
          label="GSTIN"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, gstin: e.target.value });
          }}
          options={{
            type: "gstNo",
          }}
          setIsGstNoRegexValid={setIsGstNoRegexValid}
          maxLength={15}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id={"dlNumber"}
          value={rowData.dlNumber}
          label="DL Number"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, dlNumber: e.target.value });
          }}
          // options={{
          //   type: "dlNo",
          // }}
          // setIsDlNoValid={setIsDlNoValid}
          maxLength={50}
        />
      </Grid>

      {routeField && (
        <Grid item xs={12} md={4}>
          <Select
            required={true}
            disabled={currentOpr === "Update" ? true : false}
            data={routesFormList}
            value={rowData.routeId}
            label={"Route"}
            onChange={(e) => {
              setRowData({ ...rowData, routeId: e.target.value });
              validateField("routeId");
            }}
            error={validationList && validationList.routeId ? true : false}
            errorMessage={"Route is Required"}
          />
        </Grid>
      )}

      {currentOpr === "Update" && (
        <Grid item xs={12} md={4}>
          <RadioGroup
            required={true}
            type={"IsActive"}
            isOptionAlignRow={true}
            label={"Is Active"}
            labelPlacement={"end"}
            value={rowData.isActive}
            onChange={(e) =>
              setRowData({ ...rowData, isActive: e.target.value })
            }
          />
        </Grid>
      )}
      {currentOpr === "Update" && (
        <Grid item xs={12} md={4}>
          <SingleCheckbox
            label="Is Verified"
            onChange={(e) => {
              setRowData({ ...rowData, isVerified: e.target.checked });
            }}
            checked={rowData.isVerified === 1 ? true : false}
          />
        </Grid>
      )}

      <Grid item xs={12} style={{ justifyContent: "space-" }}>
        <div className="d-flex align-items-center justify-content-end">
          <Button
            autoFocus
            onClick={() => {
              setValidationList({});
              setAreaFormList([]);
              setRowData({
                chemistName: "",
                contactPerson: "",
                mobile: "",
                areaId: "",
                routeId: "",
                dob: null,
                email: null,
                dlNumber: null,
                gstin: null,
                address: null,
                pinCode: null,
              });
              setStateCitySelectProperties({
                ...stateCitySelectProperties,
                stateValue: "",
                cityValue: "",
                stateError: false,
                cityError: false,
                isAreaChanged: false,
              });
              toggleEditRecord(!editRecord);
              setLoading(false);
            }}
            customClass="button button-black mr-2"
            label={labels.cancelButton}
          />
          <Button
            onClick={(e) => {
              currentOpr === "Add" ? addChemist(e) : updateChemist(e);
            }}
            customClass="button button-primary"
            label={labels.saveButton}
          />
        </div>
      </Grid>
    </Grid>
  );

  const addChemist = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      //alert("Success");
      const params = {
        chemistName: rowData.chemistName,
        contactPerson: rowData.contactPerson,
        stateId: stateValue,
        cityId: cityValue,
        mobile: rowData.mobile,
        email: rowData.email,
        // fax: rowData.fax,
        areaId: rowData.areaId,
        address: rowData.address,
        pinCode: rowData.pinCode,
        gstin: rowData.gstin,
        dlNumber: rowData.dlNumber,
        isActive: rowData.isActive,
        dob: rowData.dob === null ? null : getDBFormateDate(rowData.dob),
        userType: rowData.typeId,
      };
      if (routeField) params.routeId = rowData.routeId;
      props.addChemist({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          setValidationList({});
          setAreaFormList([]);
          setRowData({
            chemistName: "",
            contactPerson: "",
            mobile: "",
            areaId: "",
            routeId: "",
            dob: null,
            email: null,
            dlNumber: null,
            gstin: null,
            address: null,
            pinCode: null,
          });
          setStateCitySelectProperties({
            ...stateCitySelectProperties,
            stateValue: "",
            cityValue: "",
            stateError: false,
            cityError: false,
            isAreaChanged: false,
          });
          if (showGrid) {
            //getChemistList({});
            isSearchCall ? getAllData(true, searchText) : getAllData(false); //C1
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

  const updateChemist = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        // ...rowData,
        chemistId: rowData.chemistId,
        chemistName: rowData.chemistName,
        contactPerson: rowData.contactPerson,
        dob: rowData.dob === null ? null : getDBFormateDate(rowData.dob),
        mobile: rowData.mobile,
        email: rowData.email,
        // fax: rowData.fax,
        stateId: stateValue,
        cityId: cityValue,
        areaId: rowData.areaId,
        address: rowData.address,
        pinCode: rowData.pinCode,
        gstin: rowData.gstin,
        dlNumber: rowData.dlNumber,
        isActive: rowData.isActive === "1" ? 1 : 0,
        isVerified: rowData.isVerified,
        userType: rowData.typeId,
      };

      props.updateChemist({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setValidationList({});
          setAreaFormList([]);
          setRowData({
            chemistName: "",
            contactPerson: "",
            mobile: "",
            areaId: "",
            routeId: "",
            dob: null,
            email: null,
            dlNumber: null,
            gstin: null,
            address: null,
            pinCode: null,
          });
          setStateCitySelectProperties({
            ...stateCitySelectProperties,
            stateValue: "",
            cityValue: "",
            stateError: false,
            cityError: false,
            isAreaChanged: false,
          });
          setLoading(false);
          if (showGrid) {
            //getChemistList({});
            isSearchCall ? getAllData(true, searchText) : getAllData(false); //C1
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

  /* C2: Start - Search Chemist by name and contact number */
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
          label="Search Chemist By Name or Mobile Number"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          error={searchTxtError}
          isInline={true}
        />
      </Grid>
    </Grid>
  );
  /* End - Search Chemist by name and contact number */

  return (
    <div>
      {!noFilter && !editRecord && (
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={3}>
            {stateFilter && cityFilter && (
              <StateCitySelect
                isContainerNeeded={false}
                stateCitySelectProperties={stateCitySelectFilterProperties}
                setStateCitySelectProperties={
                  setStateCitySelectFilterProperties
                }
                isInline={true}
              />
            )}
            {areaFilter && (
              <Grid item xs={12} md={4} lg>
                {/* <MultiSelect
                  data={areaFilterList}
                  checked={selectedFilterArea}
                  label={"Area"}
                  error={
                    selectedFilterAreaError &&
                    stateCitySelectFilterProperties.isAreaError
                  }
                  setChecked={(values) => {
                    setSelectedFilterArea(values);
                    setStateCitySelectFilterProperties({
                      ...stateCitySelectFilterProperties,
                      isAreaChanged: true,
                      isAreaError: false,
                    });
                  }}
                  required={true}
                  errorMessage={"Area is Required"}
                  isInline={true}
                  isChanged={isAreaFilterChanged}
                /> */}
                <MultipleCheckboxSelect
                  items={areaFilterList}
                  keyField={"value"}
                  textField={"label"}
                  checked={selectedFilterArea}
                  label={"Area"}
                  error={
                    selectedFilterAreaError &&
                    stateCitySelectFilterProperties.isAreaError
                  }
                  setChecked={(values) => {
                    setSelectedFilterArea(values);
                    setStateCitySelectFilterProperties({
                      ...stateCitySelectFilterProperties,
                      isAreaChanged: true,
                      isAreaError: false,
                    });
                  }}
                  required={true}
                  errorMessage={"Area is Required"}
                />
              </Grid>
            )}

            {stateFilter && employeeFilter && (
              <Grid item xs={12} md={4} lg>
                <StatesSelect
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setStateFilterError(false);
                  }}
                  error={stateFilterError}
                  isInline={true}
                  required={true}
                />
              </Grid>
            )}
            {stateFilter && employeeFilter && (
              <Grid item xs={12} md={4} lg>
                <Select
                  data={StateBasedEmployeeList}
                  value={selectedEmployee}
                  label={"Employee"}
                  onChange={(e) => {
                    setSelectedEmployee(e.target.value);
                    setEmployeeFilterError(false);
                  }}
                  required={true}
                  error={employeeFilterError}
                  isInline={true}
                />
              </Grid>
            )}

            <Grid item xs={12} md={4} lg>
              <div className="selection-card-actions">
                <Button
                  label={labels.filterButton}
                  onClick={() => {
                    let validate = true;
                    if (
                      stateFilter &&
                      cityFilter &&
                      (stateFilterValue === "" || cityFilterValue === "")
                    ) {
                      validate = false;
                      setStateCitySelectFilterProperties({
                        ...stateCitySelectFilterProperties,
                        stateError: stateFilterValue === "" ? true : false,
                        cityError: cityFilterValue === "" ? true : false,
                        isAreaError:
                          selectedFilterArea.length === 0 ? true : false,
                      });
                    } else if (
                      areaFilter &&
                      selectedFilterArea.length === 0 &&
                      stateFilter &&
                      cityFilter &&
                      stateFilterValue !== "" &&
                      cityFilterValue !== ""
                    ) {
                      validate = false;
                      setStateCitySelectFilterProperties({
                        ...stateCitySelectFilterProperties,
                        isAreaError:
                          selectedFilterArea.length === 0 ? true : false,
                      });
                    }
                    if (areaFilter && selectedFilterArea.length === 0) {
                      validate = false;
                      setSelectedFilterAreaError(true);
                    }
                    if (
                      stateFilter &&
                      employeeFilter &&
                      (selectedState === "" || selectedEmployee === "")
                    ) {
                      validate = false;
                      setStateFilterError(selectedState === "");
                      setEmployeeFilterError(selectedEmployee === "");
                    }
                    if (validate) {
                      if (showGrid) {
                        // tableRef.current &&
                        //   tableRef.current.onQueryChange({
                        //     page: 0,
                        //   });  //C1
                      } else {
                        //getChemistList({});
                        setShowGrid(true);
                      }
                      setSearchText("");
                      setTempSearchTerm("");
                      setIsSearchCall(false);
                      getAllData(false);
                    }
                  }}
                  customClass="button button-primary mr-2"
                />
                {add && (
                  <Button
                    label={"Add Chemist"}
                    onClick={() => {
                      addButtonClick();
                    }}
                    customClass="button button-black"
                  />
                )}
                {isAdminOrJRAdmin && (
                  <div className="table-edit-controls">
                    <Tooltip title="Search Chemist">
                      <IconButton
                        aria-label="Search Chemist"
                        onClick={() => {
                          searchButtonClick();
                        }}
                      >
                        <Search />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      )}
      {showGrid && !editRecord && saveClick >= 0 && (
        <div className="card">
          <div className="table-wrapper">
            {!editRecord && (
              <MaterialTable
                tableRef={tableRef}
                icons={GridIcons}
                title={`List of Chemist`}
                columns={columns}
                data={allData} //C1
                // data={(query) =>
                //   new Promise((resolve, reject) => {
                //     setPaginationData({ pageSize: query.pageSize });
                //     const params = {
                //       page: query.page + 1,
                //       pageSize: query.pageSize,
                //       search: query.search,
                //       resolve,
                //       reject,
                //     };
                //     console.log("query params>>>>",params);
                //     console.log("query>>>>",query);
                //     if (query.orderBy) {
                //       params.orderBy = query.orderBy.field;
                //       params.orderDirection = query.orderDirection;
                //     }
                //     getChemistList(params);
                //   })
                // }
                options={{
                  ...options,
                  pageSize: paginationData.pageSize,
                  pageSizeOptions: [10, 20, 50],
                }}
                style={style}
                actions={
                  add && noFilter
                    ? [
                        {
                          icon: () => {
                            return (
                              <Refresh
                                onClick={() => {
                                  isSearchCall
                                    ? getAllData(true, searchText)
                                    : getAllData(false); //C1
                                  // tableRef.current &&
                                  //   tableRef.current.onQueryChange();
                                }}
                              />
                            );
                          },
                          tooltip: "Refresh Data",
                          isFreeAction: true,
                        },
                        {
                          icon: () => {
                            return <Print onClick={printClick} />;
                          },
                          tooltip: "Print Chemist List",
                          isFreeAction: true,
                        },
                        {
                          icon: () => {
                            return <AddBox onClick={addButtonClick} />;
                          },
                          tooltip: "Add Chemist",
                          isFreeAction: true,
                        },
                      ]
                    : [
                        {
                          icon: () => {
                            return (
                              <Refresh
                                onClick={() => {
                                  isSearchCall
                                    ? getAllData(true, searchText)
                                    : getAllData(false); //C1
                                  // tableRef.current &&
                                  //   tableRef.current.onQueryChange();
                                }}
                              />
                            );
                          },
                          tooltip: "Refresh Data",
                          isFreeAction: true,
                        },
                        {
                          icon: () => {
                            return <Print onClick={printClick} />;
                          },
                          onClick: () => {
                            // getChemistList({ allData: true });
                            isSearchCall
                              ? getAllData(true, searchText)
                              : getAllData(false); //C1
                          },
                          tooltip: "Print Chemist List",
                          isFreeAction: true,
                        },
                      ]
                }
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

      {/* C2: Start - Search Chemist by name and contact number */}
      {searchDialog && (
        <DialogControl
          open={searchDialog}
          dialogTitleText={`Search Chemist`}
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
              setStateCitySelectFilterProperties({});
              setSelectedFilterArea([]);
              setSelectedFilterAreaError(false);
              toggleSearchDialog(!searchDialog);
              setShowGrid(true);
              getAllData(true, searchText);
              // getChemistList({
              //   page: null,
              //   pageSize: null,
              //   search: searchText,
              // });
            }
          }}
          maxWidth="sm"
          fullWidth="false"
        />
      )}
      {/* End - Search Chemist by name and contact number */}

      {loading && <Loading />}
      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
      <div
        style={{ display: "none", backgroundColor: "white" }}
        id={"printChemistDiv"}
      >
        <PrintableGrid
          data={allData}
          columns={columns}
          title={"Chemist List"}
        />
      </div>
    </div>
  );
}
