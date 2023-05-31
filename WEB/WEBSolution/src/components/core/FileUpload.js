import React, { useState, useEffect } from "react";
import { InputLabel, FormControl } from "@material-ui/core";
import colors from "../../Colors/colors";

// will use in future
// import Button from "@material-ui/core/Button";
// import PhotoCamera from "@material-ui/icons/PhotoCamera";
// import { fil } from "date-fns/locale";

/**
 * File upload control
 * @author Nirali Maradiya,Khushbu Shah
 *
 */
const UploadButtons = (props) => {
  const {
    id = "",
    multiple = false,
    label = "File",
    required = false,
    accept = "pif/*",
    isFileDeleted = false,
    isFileCanceled = false,
    size = 500,
    error: isError = false,
    errorMessage: errorMessageFromProps = "This Field is Required",
    isFileReset: isFileResetFromProps = false,
  } = props;
  const [selectedFile, setSelectedFile] = useState("");
  const [errorMessage, setErrorMessage] = useState(errorMessageFromProps);
  const [error, setError] = useState(isError);
  const [isChanged, setIsChanged] = useState(isFileResetFromProps);
  const restrictedFileType = [
    "EXE",
    "PIF",
    "APPLICATION",
    "GADGET",
    "MSI",
    "MSP",
    "COM",
    "SCR",
    "HTA",
    "CPL",
    "MSC",
    "JAR",
    "BAT",
    "CMD",
    "VB",
    "VBS",
    "VBE",
    "JS",
    "JSE",
    "WS",
    "WSF",
    "WSC",
    "WSH",
    "PS1",
    "PS1XML",
    "PS2",
    "PS2XML",
    "PSC1",
    "PSC2",
    "MSH",
    "MSH1",
    "MSH2",
    "MSHXML",
    "MSH1XML",
    "MSH2XML",
    "SCF",
    "LNK",
    "INF",
    "REG",
  ];

  useEffect(() => {
    if (
      isFileDeleted === true ||
      isFileCanceled === true ||
      (isFileResetFromProps === true && isChanged === false)
    ) {
      document.getElementById(`icon-button-file${id}`).value = null;
      setError(isError);
      setErrorMessage(errorMessageFromProps);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFileDeleted, isFileCanceled, isFileResetFromProps, isChanged]);

  useEffect(() => {
    setErrorMessage(errorMessageFromProps);
  }, [errorMessageFromProps]);

  const checkFiletype = (file) => {
    let isValid = true;
    if (file) {
      let fileName = file.name;
      let typeString = fileName.split(".");
      const extension = typeString[typeString.length - 1];
      restrictedFileType.forEach((invalidType) => {
        if (extension.toUpperCase() === invalidType) {
          isValid = false;
          setErrorMessage("Invalid file type.");
          props.setIsFileError(true);
          return isValid;
        }
      });

      let fileSize = file.size / 1 / 1024; //In kb
      if (fileSize >= size) {
        isValid = false;
        setErrorMessage("File size exceed.");
        props.setIsFileError(true);
        setError(true);
        return isValid;
      }
    }
    return isValid;
  };
  const formdata = new FormData();
  // on file select event
  const onChange = (event, isFromProps = false) => {
    let isValid;
    if (isFromProps) {
      setSelectedFile(null);
    } else {
      setSelectedFile(selectedFile);
      // console.log(selectedFile);
      setIsChanged(true);
      let data = event.target.files
      Object.keys(data).forEach(keys => {
        let file = data[keys];
        if (file) {
          isValid = checkFiletype(file);
          if (isValid) {
            formdata.append(data[keys].name,data[keys])
            props.setIsFileError(false);
            setSelectedFile(file.name);
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            
            fileReader.onload = (e) => {
              const fileData = e.target.result;
              var dur = new Audio(fileReader.result);
              dur.onloadedmetadata = function(){
                props.setDuration(dur.duration);
              };
  
              //API call to check file type (fileData as req param)
              if (
                fileData.split(",")[1] !== "" &&
                fileData.split(",")[1] !== undefined
              ) {
                props.setBase64(fileData);
                props.setIsImageCanceled(false);
                props.setFile(file);
                props.image(file,fileData)
                props.file(formdata)
                setError(false);
              } else {
                setErrorMessage("Invalid file type.");
                setError(true);
                props.setIsFileError(true);
                setIsChanged(false);
                return;
              }
            };
          } else {
            setIsChanged(false);
            setError(true);
            return;
          }
        } else {
          setIsChanged(false);
          setError(true);
          setErrorMessage(errorMessageFromProps);
          return;
        }
      })
    }
  };
  // console.log(selectedFile);
  return (
    <FormControl className="form-group" required={required}>
      <InputLabel shrink htmlFor="bootstrap-input" required={required}>
        {label}
        <span style={{ color: colors.defaultRed, fontSize: 10 }}>
          {" "}
          Max {size/1024 > 1 ? size/1024 : size} {size/1024 > 1 ? 'MB' : 'KB'}
        </span>
      </InputLabel>
      <span
        style={{
          border: "1px solid #AFAFAF",
          width: "100%",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <input
          accept={accept}
          id={`icon-button-file${id}`}
          type="file"
          multiple={multiple}
          onChange={onChange}
        />
      </span>

      {((isError && !isChanged) || error) && (
        <span style={{ color: colors.defaultRed }}>{errorMessage}</span>
      )}
    </FormControl>
  );
};
export default UploadButtons;
