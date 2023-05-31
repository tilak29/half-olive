import { Grid, IconButton, Tooltip } from "@material-ui/core";
import {
  Close, Delete
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import FileUpload from "../../../components/core/FileUpload";
import TextField from "../../../components/core/TextField";
import MultipleSelectionList from "../../../components/custom/MultipleSelectionList";
import {
  staticImagePath
} from "../../../Config.json";
import Placeholder from "../../../Images/Placeholder.svg";

export default function ESI(props) {
  const [selectedRecord, setSelectedRecord] = useState({ id: 0, patientName: "", dob: "" });
  const [selectedDisease, setSelectedDisease] = useState([]);
  const [currentOpr, setCurrentOpr] = useState();
  const [base64, setBase64] = useState(null);
  const [baseItemImage, setBaseItemImage] = useState(null);
  const [file, setFile] = useState([]);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [isImageCanceled, setIsImageCanceled] = useState(false);
  const [isFileError, setIsFileError] = useState(false);

  const diseaseList = [
    {
      value: 1,
      label: "Fever"
    },
    {
      value: 2,
      label: "High Blood Pressure"
    },
    {
      value: 3,
      label: "Low Blood Pressure"
    },
    {
      value: 4,
      label: "Diabetes"
    },
    {
      value: 5,
      label: "Asthama"
    },
    {
      value: 6,
      label: "Headache"
    }
  ];
  const personalData = [
    {
      id: 1,
      comments: "comment from doctor for patient.",
      diseaseIds: "[1,3,4]"
    },
    {
      id: 2,
      comments: "comment from doctor for patient.",
      diseaseIds: "[6,2]"
    }
  ];

  useEffect(() => {
    if (props.person != null && props.person > 0) {
      setSelectedRecord(personalData.filter(function (o) { return o.id == props.person; })[0]);//;personalData[props.person]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.person]);


  // useEffect(() => {
  //   console.log(file);
  //    // eslint-disable-next-line react-hooks/exhaustive-deps
  //  }, [file]);


  // useEffect(() => {
  //   console.log(selectedDisease);
  //    // eslint-disable-next-line react-hooks/exhaustive-deps
  //  }, [selectedDisease]);

  useEffect(() => {
    if (selectedRecord != null && selectedRecord.diseaseIds) {
      debugger;
      setSelectedDisease(JSON.parse(selectedRecord.diseaseIds));//;personalData[props.person]);
    }
    else
      setSelectedDisease([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRecord]);

  return (
    <div>
      {selectedRecord.id !== "" &&
        <div style={{ display: "flex", flexDirection: "row", "margin-top": "10%" }}>


          <div style={{ display: "flex", flexDirection: "column", "width": "500px" }}>
            <div>
              <TextField
                required={true}
                value={selectedRecord.comments}
                label="Comments"
                numeric={false}
                isAutoFocus={false}
                // onChange={(e) => {
                //   // setRowData({ ...selectedRecord, composition: e.target.value });
                //   validateField("composition");
                // }}
                // error={validationList && validationList.composition ? true : false}
                errorMessage={"Comments is Required"}
                multiline={true}
                rows={3}
                maxLength={300}
              />
            </div>


            <Grid style={{ "padding-top": "20px" }}>
              {/* <MultipleCheckboxSelect
            keyField={"value"}
            textField={"label"}
            items={diseaseList}
            checked={selectedDisease}
            label={"Designation"}
            setChecked={(values) => {
              setSelectedDisease(values);             
            }}
            required={true}
            // error={
            //   validationList.designationList
            //     ? validationList.designationList
            //     : false
            // }
            // errorMessage={"Designation is Required"}
          /> */}

              <MultipleSelectionList
                items={
                  diseaseList && diseaseList.length > 0 && diseaseList[0].value === "All"
                    ? diseaseList.splice(0, 1)
                    : diseaseList
                }
                label={"Disease"}
                columns={3}
                width={"100%"}
                checked={selectedDisease}
                setChecked={setSelectedDisease}
                required={true}
              // error={validationList.stateList ? validationList.stateList : false}
              // errorMessage={"State is Required"}
              />
            </Grid>


          </div>
          <div style={{ "padding-left": "100px" }}>
            {/* <img height="200" width="200" src={selectedRecord.image} alt="new" /> */}
            <FileUpload
              required={true}
              setBase64={setBase64}
              file={file}
              multiple={true}
              // accept={"image/*"}
              isFileCanceled={isImageCanceled}
              isFileDeleted={isImageDeleted}
              setIsImageCanceled={setIsImageCanceled}
              setFile={setFile}
              setIsFileError={setIsFileError}
              size={1000}
              error={isFileError}
              errorMessage={"Item image is required."}
            />

            <Grid item xs={12} md={4}>
              {base64 == null ? (
                <img
                  src={Placeholder}
                  className="img-fluid"
                  width="120"
                  height="120"
                  alt="Item"
                  style={{
                    marginTop: "15px",
                  }}
                />
              ) : (
                <div>
                  <span>
                    <img
                      src={base64}
                      className="img-fluid"
                      width="120"
                      height="120"
                      alt="Item"
                      style={{
                        marginTop: "15px",
                      }}
                    />
                  </span>
                  <span />
                  {base64 !== staticImagePath && (
                    <span>
                      <Tooltip title="Cancel">
                        <IconButton
                          aria-label="cancel"
                          onClick={() => {
                            setIsImageCanceled(true);
                            setBase64(baseItemImage);
                            setFile(null);
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
                          onClick={() => {
                            setIsImageDeleted(true);
                            setBase64(null);
                            setFile(null);
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </span>
                  )}
                </div>
              )}
            </Grid>
          </div>


        </div>
      }
    </div>
  );
}
