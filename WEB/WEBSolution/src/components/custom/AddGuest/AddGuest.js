import { Grid, IconButton, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Button from "../../../components/core/Button";
import DatePicker from "../../../components/core/DatePicker";
import RadioGroup from "../../../components/core/RadioGroup";
import Select from "../../../components/core/Select";
import TextField from "../../../components/core/TextField";
import StateCitySelect from "../../../components/custom/StateCitySelect/StateCitySelectContainer";
import { labels, staticDataId } from "../../../Config.json";
import FileUpload from "../../../components/core/FileUpload";
import excell from "../../../Images/excell.jpg";
import filephoto from "../../../Images/file.png";
import {
  Close, Delete, Visibility
} from "@material-ui/icons";
import {
  getDBFormateDate,
  getDisplayDate,
} from "../../../Utils/DateTimeUtils.js";
import {
  staticImagePath
} from "../../../Config.json";
import { useUtils } from "@material-ui/pickers";
import ImageCarousel from "../../../components/custom/ImageCarousel/ImageCarouselContainer";
/**
 * Add, update operations for Guest
 * @author Manish Viradiya
 */

export default function AddGuest(props) {
  const { filterDesignation = {}, onCancelClick ,onSaveClick,
  displaySuccessMessage,
  displayErrorMessage
} = props;
  const {
    EmployeeStatus_Resigned,
    EmployeeStatus_Inactive,
    EmployeeStatus_Active,
    Country_India,
  } = staticDataId;
  const [loading, setLoading] = useState(false);
  const [countryVal, setCountryVal] = useState(Country_India);
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState("Add");
  const [rowData, setRowData] = useState({ gender: 0 });
  const [countries, setCountries] = useState([]);
  const [isEmailRegexValid, setIsEmailRegexValid] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [selectedFilterError, setSelectedFilterError] = useState(false);
  const [base64, setBase64] = useState([]);
  const [baseItemImage, setBaseItemImage] = useState(null);
  const [file, setFile] = useState([]);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [isImageCanceled, setIsImageCanceled] = useState(false);
  const [isFileError, setIsFileError] = useState(false);
  const [isFileReset, setIsFileReset] = useState(false);
  const [base64File,setBase64File] = useState([])
  const [fileName,setFileName] = useState([])
  const [filemove,setFileMove] = useState();
  const [stateCitySelectProperties, setStateCitySelectProperties] = useState(
    {}
  );
  const [openslider,toggleOpenSlider] = useState(false);
  const [index,setindex]=useState();
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
  const [takeImageFromFileUploader,setTakeTmageFromFileUploader] = useState([])
  const [image,setImage] = useState([]);
  // const { operationRights } = props;
  // const { add, edit } = operationRights;
  // const { aslAndAboveDesignations, adminNslDesignations } = filterDesignation;
  // const displayErrorMessage = (message) => {
  //   setDisplayMessage({
  //     open: true,
  //     displayMessage: message,
  //     severity: "error",
  //   });
  // };
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
    if (selectedFilter.length === 0) setSelectedFilterError(true);
    const fileupload= (currentOpr!="Update" && filemove==undefined)?true:false
    if(currentOpr!="Update" && filemove==undefined)
    {
      setIsFileError(true)
    }
    const firstName = !validateField("firstName");
    const lastName = !validateField("lastName");
    const middleName = !validateField("middleName");
    const dob = !validateField("dob");
    const mobileNumber = !validateField("mobileNumber");
    // const isMobileValid = !isMobileRegexValid;
    const isEmailValid =
      rowData.email !== "" && rowData.email !== null
        ? !isEmailRegexValid
        : false;

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
    setValidationList({
      ...validationList,
      firstName,
      lastName,
      middleName,
      dob,
      mobileNumber,
    });

    return (
      !firstName &&
      !lastName &&
      !middleName &&
      !dob &&
      !mobileNumber &&
      !stateErr &&
      !cityErr &&
      !pinCode &&
      !fileupload&&
      // !isMobileValid &&
      !isEmailValid
    );
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

  useEffect(() => {
    setRowData({ ...rowData, gender: genderOptions[0].value });
    getCountries();
  }, []);

  useEffect(() => {
    if(props.data!=undefined)
    {
      if (Object.keys(props.data).length > 0) {
        setStateCitySelectProperties({
          cityValue: props.data.cityId,
          stateValue: props.data.stateId,
        });
        setRowData(props.data);
        if(props.currentOpr!=undefined)
        {
          setCurrentOpr(props.currentOpr);
        }
      }
    }
  }, [props.data]);
  useEffect(() =>{
    if(props.filedata!=undefined)
    {
      const data = (props.filedata).map((item) => (
        item.split("/")[6]
      ))
    setFile([...file,...data]);
    setBase64([...base64,...props.filedata])
    }
  },[props.filedata])
  useEffect(() => {
    if(props.image!=undefined)
    {
      setImage([...image,...props.image])
    }
  },[props.image])
  const addGuest = (e,value) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      let formDataObject = Object.fromEntries(filemove.entries());
      const formdata = new FormData();
      let b= {...rowData,...formDataObject,file:file.toString(),dob: getDBFormateDate(rowData.dob), stateId: stateValue,cityId: cityValue,}
      Object.keys(b).forEach(keys => {
        formdata.append(keys,b[keys]);
      })
      let params=formdata;
      props.addGuest({
        params,
        onSuccess: ({ message: displayMessage }) => {
          if(value == "true")
          {
            setRowData({
              firstName: "",
              lastName: "",
              middleName: "",
              dob: null,
              gender: genderOptions[0].value,
              countryId: Country_India,
              mobileNumber: "",
              email: "",
              aadharno: "",
              aadharattachment: "",
              address: "",
              pinCode: null,
              remarks: "",
              //refId: ""
            });
            setStateCitySelectProperties({});
            setBase64([]);
            setFile([]);
            setFileMove();
            setIsFileReset(true);
            setIsImageCanceled(true);
          }
          else
          {
            onSaveClick()
          }
          setLoading(false);
            displaySuccessMessage(displayMessage)
        },
        onFailure: ({ message: displayMessage}) => {
          setLoading(false);
          displayErrorMessage(displayMessage);
        },
      });
    }
  };
  const updateGuest = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      delete rowData["tableData"];
      delete rowData["guestName"];
      delete rowData["srNo"];
      let params;
      if(filemove!=undefined)
      {
        let formDataObject = Object.fromEntries(filemove.entries());
      const formdata = new FormData();
      let b= {...rowData,...formDataObject,file:file.toString(),dob: getDBFormateDate(rowData.dob), stateId: stateValue,cityId: cityValue,}
      Object.keys(b).forEach(keys => {
        formdata.append(keys,b[keys]);
      })
        params=formdata;
      }
      else
      {
        params = {
          ...rowData,
          stateId: stateValue,
          cityId: cityValue,
          dob: getDBFormateDate(rowData.dob),
          file:file.toString()
        };
      }
        props.updateGuest({
          params,
          onSuccess: ({ message: displayMessage }) => {
            setLoading(false);
            displaySuccessMessage(displayMessage)
            onSaveClick()
          },
          onFailure: ({ message: displayMessage }) => {
            setLoading(false);
            displayErrorMessage(displayMessage);
          },
        });
    }
  };
  const ageCalculate = (dateofbirth) => {
    let birthdayDate = new Date(dateofbirth)
    let month_diff = Date.now() - birthdayDate.getTime();
    
    let age_dt = new Date(month_diff); 
     
    let year = age_dt.getUTCFullYear();
    
    let age = Math.abs(year - 1970);
    return (age)
  }
  useEffect(() => {
    setBase64([...base64,...base64File])
    // setImage([...image,{value:base64File,label:fileName}])
  },[base64File])
  useEffect(() => {
    setFile([...file,...fileName])
  },[fileName])
  useEffect(() => {
    setImage([...image,...takeImageFromFileUploader])
  },[takeImageFromFileUploader])
  const fileremove = (e) =>{
    if(filemove!=undefined)
    {
      for (const pair of filemove.entries()) {
        if(pair[0] == e)
        {
          filemove.delete(`${pair[0]}`);
        }
      }
    }
  }
  const showimages = (e,index) =>{
    if(file[index]!=undefined)
    {
      let file_extension=(file[index].split('.')[1]).toLowerCase();
      if(file_extension == "jpeg" ||file_extension == "jpg" || file_extension == "png")
      {
        return(e)
      }
      else if(file_extension == "xlsx" ||file_extension == "xlsm" ||file_extension =="xlsb" ||file_extension=="xltx"
      ||file_extension=="xltm" ||file_extension=="xltm" ||file_extension=="xlt" ||file_extension=="xls"||file_extension==" xml" 
      ||file_extension=="xlam" ||file_extension=="xla" ||file_extension=="xlw" ||file_extension=="xlr" ||file_extension=="ods")
      {
        return(excell)
      }
      else
      {
        return(filephoto)
      }
    }
  }
  return (
    <div>
      {openslider && (
        <ImageCarousel
          onCancel={() =>{
            toggleOpenSlider(!openslider);
          }}
          items={image}
          index={index}
        />
      )}
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
          value={rowData.middleName}
          label="Middle Name"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, middleName: e.target.value });
            validateField("middleName");
          }}
          error={
            validationList && validationList.middleName
            ? validationList.middleName
            : false
          }
          errorMessage={"Father Name is Required"}
          maxLength={30}
          />
      </Grid>
      <Grid item xs={12} md={4}>
        <div style={{display:"flex"}}>
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
        <div style={{alignItems:"center", justifyContent:"center", marginLeft:"-80px", fontSize:"15px",  marginTop:"-4px"}}>
        {/* fontWeight:"bold", */}
          Age : {(rowData.dob==undefined)?'': ageCalculate(rowData.dob)}
        </div>
        </div>
      </Grid>
      {/* <Grid item xs={12} md={4}>
        <DatePicker
          defaultValue={rowData.doa}
          label="DOA"
          tooltipText={"Date of Anniversary"}
          onChange={(date) => {
            setRowData({ ...rowData, doa: date });
            validateField("doa");
          }}
          />
        </Grid> */}

      <Grid item xs={12} md={4}>
        <Select
          data={maritalStatusOptions}
          value={rowData.maritalStatus}
          label={"Marital Status"}
          onChange={(e) => {
            setRowData({ ...rowData, maritalStatus: e.target.value });
            validateField("maritalStatus");
            setValidationList({ ...validationList, maritalStatus: false });
          }}
          required={true}
          error={
            validationList && validationList.maritalStatus
            ? validationList.maritalStatus
            : false
          }
          errorMessage={"Marital Status is required"}
          />
      </Grid>
      <Grid item xs={12} md={4}>
        <RadioGroup
          //   value={rowData.gender}
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
            maxLength={10}
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
        <TextField
          value={rowData.profession}
          label="Profession"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, profession: e.target.value });
          }}
          maxLength={100}
          />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          value={rowData.aadharNo}
          label="Aadhar No."
          numeric={true}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, aadharNo: e.target.value });
          }}
          maxLength={16}
        />
      </Grid>

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

      <Grid item xs={12} md={6}>
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
          multiline={true}
          maxLength={200}
          rows={2}
          />
      </Grid>
      <Grid item xs={12} md={6}>
      <FileUpload
              required={true}
              label={"Kyc"}
              image={(label,value) => {
                setTakeTmageFromFileUploader([{value:value,label:label.name}])
              }}
              setBase64={(e) => {
                setBase64File([e])
              }}
              file={(e) => {
                setFileMove(e)
              }}
              multiple={true}
              // accept={"image/*"}
              isFileCanceled={isImageCanceled}
              isFileDeleted={isImageDeleted}
              setIsImageCanceled={setIsImageCanceled}
              setFile ={(e) => {
                // setFileName([{filename:e.name}])
                setFileName([e.name])
              }}
              setIsFileError={setIsFileError}
              size={1000}
              error={isFileError}
              errorMessage={"Item image is required."}
            />
            <Grid item xs={12} md={4}>
              {base64.length==0?(
                <img
                  // src={Placeholder}
                  className="img-fluid"
                  width="120"
                  height="120"
                  alt="Item"
                  style={{
                    marginTop: "15px",
                  }}
                />
              ) : (base64.map((item,index) => {
              return(
                <div>
                  <span style={{display:"flex"}}>
                  <Tooltip title="View">
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => {
                            setindex(index);
                            toggleOpenSlider(!openslider);
                          }}
                        >
                          <img
                            src={showimages(item,index)}
                            className="img-fluid"
                            width="60"
                            height="60"
                            alt="Item"
                            style={{
                              marginTop: "15px",
                            }}
                          />
                          <div style={{marginTop:"30px"}}>
                            {(file.length>0 && file[index]!= undefined)?file[index]:""}
                          </div>
                        </IconButton>
                      </Tooltip>
                  {base64 !== staticImagePath && (
                    <span>
                      <Tooltip title="Cancel">
                        <IconButton
                          aria-label="cancel"
                          onClick={(e) => {
                            setIsImageCanceled(true);
                            // setBase64(baseItemImage);
                            setBase64(base64.filter((items) => items!=item));
                            setFile(file.filter((items) => items != file[index]));
                            fileremove(file[index]);
                          }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </span>
                  )}
                  {baseItemImage !== staticImagePath && currentOpr === "Update" && (
                    <span>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => {
                            setIsImageDeleted(true);
                            setBase64(base64.filter((items) => items!=item));
                            setFile(file.filter((items) => items != file[index]));
                            fileremove(file[index]);
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </span>
                  )}
                  </span>
                </div>
              )
            })
              )}
            </Grid>
      </Grid>
      <Grid item xs={12} style={{ justifyContent: "space-" }}>
        <div className="d-flex align-items-center justify-content-end">
          <Button
            autoFocus
            onClick={() => {
              onCancelClick()
              //   toggleEditRecord(!editRecord);
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
              addGuest(e,"true")
            }}
            customClass="button button-primary mr-2"
            label={labels.addanother}
            />
            
          <Button
            onClick={(e) => {
              // addGuest(e)
              currentOpr === "Add" ? addGuest(e,"false") : updateGuest(e);
            }}
            customClass="button button-primary"
            label={labels.saveButton}
            />
        </div>
      </Grid>
    </Grid>
    </div>
  );
}
