import React, { useEffect, useState, useRef } from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import {
  Close, Delete,
} from "@material-ui/icons";
import DisplayMessage from "../../../components/core/DisplayMessage";
import Loading from "../../../components/core/Loading";
import FileUpload from "../../../components/core/FileUpload";
import TextField from "../../../components/core/TextField";
import MultipleSelectionList from "../../../components/custom/MultipleSelectionList";
import PrintMultipleSelectionList from "../../../components/custom/PrintMultipleSelectionList";
import Placeholder from "../../../Images/Placeholder.svg";
// import MultipleCheckboxSelect from "../../../components/custom/MultipleCheckboxSelect"
import {
  staticImagePath
} from "../../../Config.json";
import Button from "../../../components/core/Button";
import { labels } from "../../../Config.json";
// import Placeholder from "../../../Images/Placeholder.svg";
import PrintDialogControl from "../../../components/core/PrintDialog";



export default function HealthHistory(props) {
  const [validationList, setValidationList] = useState({});

  // const [selectedRecord, setSelectedRecord] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState([]);
  const [currentOpr, setCurrentOpr] = useState();
  const [base64, setBase64] = useState(null);
  const [baseItemImage, setBaseItemImage] = useState(null);
  const [file, setFile] = useState([]);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [isImageCanceled, setIsImageCanceled] = useState(false);
  const [isFileError, setIsFileError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([])
  const [diseaseList, setDiseaseList] = useState([])
  const [displayMessage, setDisplayMessage] = useState({});
  const [rowData, setRowData] = useState({});
  const [data, setData] = useState();
  const [editRecord, toggleEditRecord] = useState(false);


  const checkAllValidation = () => {
    const comments = !validateField("comments");
    setValidationList({
      ...validationList,
      comments,
    });

    return !comments;
  };
  const guestId = props.person

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

  const getDiseaseList = () => {
    const params = {
      filterStatus: 1,
    };
    props.getDiseaseMaster({
      params,
      onSuccess: (response) => {
        // debugger;
        const { diseaseMasterList = [] } = response;
        const data = diseaseMasterList.map((item, index) => ({
          value: item.diseaseId,
          label: item.diseaseName,
        }));
        setDiseaseList(data);
      },
      onFailure: ({ message }) => {
        setLoading(false);
      },
    });
  };

  const getDisease = () => {
    setLoading(true);
    const params = {
      guestId,
    };
    props.getHealthDisease({
      params,
      onSuccess: (response) => {
        // debugger;
        const { diseaseList = [] } = response;
        const data = diseaseList.map((item, index) => ({
          value: item.diseaseId,
          ...item,
        }));
        const answer_array = data[0].value.split(',');
        var newAr = answer_array.map(item => parseInt(item) ? parseInt(item) : item);
        setSelectedDisease(newAr);
        setRowData({ ...rowData, comments: data[0].comments })
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
      },
    });
  };


  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  useEffect(() => {
    getDiseaseList();
  }, [])

  useEffect(() => {
    if (!setSelectedDisease()) {
      getDisease();
      setLoading(false)
    }
  }, [guestId]);



  const addDisease = (e) => {
    if (checkAllValidation()) {
      setLoading(true);
      const params = {
        guestId,
        diseaseId: selectedDisease,
        comments: rowData.comments,
      };
      props.updateDiseaseList({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getDisease(e);
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


  const dialogContent = <div className="print-box">
    <div style={{ justifyContent: "space", marginTop: "100px" }} className="d-flex align-items-center mb-2">
      <div style={{ justifyContent: "space", display: "flex", alignItem: "center", width: "100%" }}>
        <div style={{ width: "30%", marginRight: "30px" }}>
          <p className="label">First Name *</p>
          <TextField
            disabled={true}
          />
        </div>
        <div style={{ width: "30%", marginRight: "30px" }}>
          <p className="label">Middle Name *</p>
          <TextField
            disabled={true}
          />
        </div>
        <div style={{ width: "30%", marginRight: "30px" }}>
          <p className="label">Last Name *</p>
          <TextField
            disabled={true}
          />
        </div>
      </div>
    </div>
    <div style={{ justifyContent: "space", marginTop: "50px" }} className="d-flex align-items-center mb-2">
      <div style={{ justifyContent: "space", display: "flex", alignItem: "center", width: "100%" }}>
        <div style={{ width: "30%", marginRight: "30px" }}>
          <p className="label">Booking ID *</p>
          <TextField
            disabled={true}
          />
        </div>
        <div style={{ width: "30%", marginRight: "30px" }}>
          <p className="label">Mobile Number *</p>
          <TextField
            disabled={true}
          />
        </div>
      </div>
    </div>
    <div style={{ justifyContent: "space", marginTop: "50px" }} className="d-flex align-items-center mb-2">
      <PrintMultipleSelectionList
        items={diseaseList &&
          diseaseList.length > 0 &&
          diseaseList[0].value === "All"
          ? diseaseList.splice(0, 1)
          : diseaseList
        }
        keyField={"value"}
        textField={"label"}
        label={"Diseases"}
        columns={3}
        width={"100%"}
        // checked={selectedDisease}
        // setChecked={setSelectedDisease}
        required={true}
      />
    </div>
    <div style={{ marginTop: "50px" }} className="comment-field">
      <p className="label">Comment *</p>
      <TextField
        multiline={true}
        rows={5}
        maxLength={300}
      />
    </div>
  </div>
  return (
    <div>
      {guestId !== "" &&
        <div style={{ display: "flex", flexDirection: "row", "margin-top": "10%" }}>
          <div style={{ display: "flex", flexDirection: "column", "width": "500px" }}>
            <div>
              <TextField
                required={true}
                value={rowData.comments}
                label={"Comment"}
                numeric={false}
                isAutoFocus={false}
                onChange={(e) => {
                  setRowData({ ...rowData, comments: e.target.value });
                  validateField("comments");
                }}
                error={validationList && validationList.comments ? true : false}
                errorMessage={"Comments is Required"}
                multiline={true}
                rows={3}
                maxLength={300}
              />
            </div>


            <Grid style={{ "padding-top": "20px" }}>
              <div style={{ overflowY: "scroll", maxHeight: "350px" }}>
                <MultipleSelectionList
                  items={diseaseList &&
                    diseaseList.length > 0 &&
                    diseaseList[0].value === "All"
                    ? diseaseList.splice(0, 1)
                    : diseaseList
                  }
                  keyField={"value"}
                  textField={"label"}
                  label={"Diseases"}
                  columns={3}
                  width={"100%"}
                  checked={selectedDisease}
                  setChecked={setSelectedDisease}
                  required={true}
                  disable={true}
                />
              </div>
              <Grid item xs={12} style={{ justifyContent: "space", marginTop: "10px" }}>
                <div className="d-flex align-items-center justify-content-end">
                  <Button
                    onClick={(e) => {
                      addDisease(e)
                    }}
                    customClass="button button-primary"
                    label={labels.saveButton}
                  />

                </div>
              </Grid>
            </Grid>
          </div>

          <div style={{ "padding-left": "100px" }}>
            {/* <img height="200" width="200" src={guestId.image} alt="new" /> */}
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

          <div className="print-button-div">
            <Button
              customClass="button mr-1"
              label={"Print Form"}
              onClick={() => { toggleEditRecord(true) }}
            />
          </div>

          {loading && <Loading />}

          <DisplayMessage
            {...displayMessage}
            onClose={() => setDisplayMessage({ open: false })}
          />
          {editRecord && (
            <PrintDialogControl
              open={editRecord}
              dialogTitleText={`Print From`}
              dialogContent={dialogContent}
              onCancel={() => {
                toggleEditRecord(!editRecord);
                setLoading(false);
              }}
              onSubmit={(e) => {
              }}
            />
          )}
        </div>
      }
    </div>
  );
}
