import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Edit, Refresh, Close } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";

import Button from "../../../components/core/Button";
import {
  GridIcons,
  options,
  style,
  actionColumnStyle,
} from "../../../components/custom/GridConfig";
import DialogControl from "../../../components/core/Dialog";
import Loading from "../../../components/core/Loading";
import Select from "../../../components/core/Select";
import TextField from "../../../components/core/TextField";
import RadioGroup from "../../../components/core/RadioGroup";
import DisplayMessage from "../../../components/core/DisplayMessage";
import FileUpload from "../../../components/core/FileUpload";
import Placeholder from "../../../Images/Placeholder.svg";
import { labels, staticDataId, staticImagePath } from "../../../Config.json";

/**
 * Reward List grid with Scheme and Status filter
 * Add, update operations for Reward
 * @author Tejal Sali
 */

export default function RewardList(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [schemeList, setSchemeList] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState("");
  const [schemeError, setSchemeError] = useState(false);
  const [isActiveStatus, setIsActiveStatus] = useState(1);
  const [rowData, setRowData] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [id, setId] = useState();
  const [selectedSchemeDetails, setSelectedSchemeDetails] = useState("");
  const [base64, setBase64] = useState(null);
  const [baseItemImage, setBaseItemImage] = useState(null);
  const [file, setFile] = useState(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [isImageCanceled, setIsImageCanceled] = useState(false);
  // const [fileUploadError, setFileUploadError] = useState(false);
  const [isFileError, setIsFileError] = useState(false);

  const { Scheme_Quantity } = staticDataId;

  const { operationRights = {} } = props;
  const { add = true, edit = true } = operationRights;

  const StatusOptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getSchemes = () => {
    props.getSchemes({
      onSuccess: (response) => {
        const { schemeList = [] } = response;
        setSchemeList(schemeList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    getSchemes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRewardList = () => {
    setLoading(true);
    const params = {
      schemeId: selectedScheme,
      isActive: isActiveStatus,
    };

    props.getRewardList({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { rewardList = [] } = response;
        const now = Date.now();
        const data = rewardList.map((record, index) => ({
          ...record,
          srNo: index + 1,
          rewardImage:
            record.rewardImage !== null
              ? `${record.rewardImage}?${now}`
              : staticImagePath,
          isActive: record.isActive.toString(),
        }));
        setData(data);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setBase64(null);
    setBaseItemImage(null);
    setIsImageDeleted(false);
    setIsImageCanceled(false);
    setIsFileError(false);
    setRowData({
      schemeId: "",
      uom: null,
      rewardName: null,
      rewardDescription: null,
      points: null,
      rewardImage: null,
      isActive: "1",
      rewardValue:null
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

  const checkZero = (field, fieldName) => {
    if (parseInt(rowData[field]) === 0) {
      displayErrorMessage(`Please Enter a Valid ${fieldName} value.`);
      return false;
    } else {
      return true;
    }
  };

  const checkAllValidation = () => {
    const schemeId = !validateField("schemeId");
    const rewardName = !validateField("rewardName");
    const rewardDescription = !validateField("rewardDescription");
    const points = !validateField("points");

    let fileErr = false;
    if (base64) {
      rowData.image = base64;
    } else {
      fileErr = true;
      setIsFileError(true);
    }
    rowData.isImageDeleted = isImageDeleted;
    rowData.isImageCanceled = isImageCanceled;
    setValidationList({
      schemeId,
      rewardName,
      rewardDescription,
      points,
    });

    //if(rowData.uom && rowData.uom !== Scheme_Quantity){
      const pointZero = checkZero("points", "Point");

      return (
        !schemeId &&
        !rewardName &&
        !rewardDescription &&
        !points &&
        !fileErr &&
        pointZero
      );
    // }else{
    //   return (
    //     !schemeId &&
    //     !rewardName &&
    //     !rewardDescription &&
    //     !fileErr
    //   );
    // }

  };

  const addReward = () => {
    console.log(rowData)
    if (checkAllValidation()) {
      props.addReward({
        params: { ...rowData, file: file },
        onSuccess: ({ message: displayMessage }) => {
          if(selectedScheme !== null && selectedScheme !== '')getRewardList();
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          toggleEditRecord(!editRecord);
        },
        onFailure: ({ message }) => {
          displayErrorMessage(message);
        },
      });
    }
  };

  const updateReward = () => {
    if (checkAllValidation()) {
      const params = {
        ...rowData,
        // rewardId: rowData.rewardId,
        // rewardName: rowData.rewardName,
        // rewardDescription: rowData.rewardDescription,
        // points: rowData.points,
        // schemeId: rowData.schemeId,
        // schemeCode: rowData.schemeCode,
        // uom: rowData.uom,
        // isActive: rowData.isActive,
        // updatedDate: rowData.updatedDate,
        rewardImage:
          rowData.rewardImage === staticImagePath
            ? ""
            : rowData.rewardImage.split("?")[0].split("/").reverse()[0],
        image:
          !rowData.image || rowData.image === staticImagePath
            ? ""
            : rowData.image,
        file: file,
      };

      delete params.tableData;

      props.updateReward({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getRewardList();
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          toggleEditRecord(!editRecord);
        },
        onFailure: ({ message }) => {
          displayErrorMessage(message);
        },
      });
    }
  };

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];

      if (rowData.rewardImage !== "" && rowData.rewardImage !== null) {
        setBase64(rowData.rewardImage);
        setBaseItemImage(rowData.rewardImage);
      } else {
        setBase64(null);
        setBaseItemImage(null);
        setIsImageDeleted(false);
        setIsImageCanceled(false);
        setIsFileError(false);
      }

      setRowData({
        ...rowData,
        rewardImage: rowData.rewardImage,
        isImageDeleted,
        isImageCanceled,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

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
                    setId(id);
                    toggleEditRecord(true);
                    setCurrentOpr("Update");
                    setValidationList({});
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
      title: "Reward Image",
      ...actionColumnStyle,
      render: ({ rewardImage }) => {
        return (
          <div className="table-edit-controls">
            <img height="42" width="42" src={rewardImage} alt="Reward" />
          </div>
        );
      },
    },
    { title: "Reward Name", field: "rewardName" },
    {
      title: "Reward Description",
      field: "rewardDescription",
    },
    { title: "Scheme Name", field: "schemeName" },
    {
      title: "UOM",
      field: "uomName",
    },
    { title: "Points/Qty", field: "points" },
  ];

  const dialogTitleText = currentOpr === "Add" ? "Add Reward" : `Edit Reward`;

  const dialogContent = (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Select
            required={true}
            data={schemeList}
            value={rowData.schemeId}
            label={"Scheme"}
            onChange={(e) => {
              validateField("schemeId");

              const uom = schemeList.filter(
                (record) => record.value === e.target.value
              )[0].uom;

              setRowData({
                ...rowData,
                schemeId: e.target.value,
                uom,
                points: null,
              });

              //validateField("points");
            }}
            error={validationList && validationList.schemeId ? true : false}
            errorMessage={"Scheme is Required"}
            disabled={currentOpr === "Update"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required={true}
            value={rowData.rewardName}
            label="Reward Name"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, rewardName: e.target.value });
              validateField("rewardName");
            }}
            error={validationList && validationList.rewardName ? true : false}
            errorMessage={"Reward Name is Required"}
            maxLength={50}
            disabled={currentOpr === "Update"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required={true}
            value={rowData.rewardDescription}
            label="Reward Description"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, rewardDescription: e.target.value });
              validateField("rewardDescription");
            }}
            error={
              validationList && validationList.rewardDescription ? true : false
            }
            errorMessage={"Reward Description is Required"}
            multiline={true}
            rows={5}
            maxLength={200}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUpload
            required={true}
            label={"Reward Image"}
            setBase64={setBase64}
            file={file}
            accept={"image/*"}
            isFileCanceled={isImageCanceled}
            isFileDeleted={isImageDeleted}
            setIsImageCanceled={setIsImageCanceled}
            setFile={setFile}
            setIsFileError={setIsFileError}
            size={500}
            error={isFileError}
            errorMessage={"Reward Image is required."}
          />
          {base64 == null ? (
            <img
              src={Placeholder}
              className="img-fluid"
              width="120"
              height="120"
              alt="Scheme"
              style={{
                marginTop: "18px",
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
                  alt="Scheme"
                  style={{
                    marginTop: "18px",
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
                        setIsFileError(true);
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </span>
              )}
            </div>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            value={rowData.points}
            label="Points/Qty"
            numeric={true}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, points: e.target.value });
              validateField("points");
            }}
            // required={rowData.uom && rowData.uom !== Scheme_Quantity}
            required={true}
            error={validationList && validationList.points ? true : false}
            errorMessage={"Point is Required"}
            maxLength={10}
            disabled={currentOpr === "Update"}
          />
        </Grid>

        {rowData.uom === 97 && 
                <Grid item xs={12} md={6}>
                <TextField
                  value={rowData.rewardValue}
                  label="Reward Value"
                  numeric={true}
                  isAutoFocus={false}
                  onChange={(e) => {
                    setRowData({ ...rowData, rewardValue: e.target.value });
                    validateField("rewardValue");
                  }}
                  // required={rowData.uom && rowData.uom !== Scheme_Quantity}
                  required={true}
                  error={validationList && validationList.rewardValue ? true : false}
                  errorMessage={"Reward Value is Required"}
                  maxLength={10}
                />
              </Grid>      
        }


        {currentOpr === "Update" && (
          <Grid item xs={12} md={6}>
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
      </Grid>
    </div>
  );

  return (
    <div>
      <div className="card selection-card selection-card-two-columns mb-3">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg>
            <Select
              label={"Scheme"}
              data={schemeList}
              value={selectedScheme}
              onChange={(e) => {
                setSelectedScheme(e.target.value);
                setSchemeError(false);
              }}
              required={true}
              error={schemeError}
              isInline={true}
            />
          </Grid>
          <Grid item xs={12} md={4} lg>
            <Select
              data={StatusOptions}
              value={isActiveStatus}
              label={"Is Active"}
              onChange={(e) => {
                setIsActiveStatus(e.target.value);
              }}
              isInline={true}
            />
          </Grid>
          <Grid item xs={12} md={4} lg>
            <div className="selection-card-actions">
              <Button
                label={labels.filterButton}
                onClick={(e) => {
                  if (selectedScheme !== "") {
                    setShowGrid(true);

                    const selectedSchemeDetails =
                      selectedScheme === ""
                        ? {}
                        : schemeList.filter(
                            (record) => record.value === selectedScheme
                          )[0];

                    setSelectedSchemeDetails(selectedSchemeDetails);
                    getRewardList();
                  } else {
                    setSchemeError(true);
                  }
                }}
                customClass="button button-primary mr-2"
              />
              {add && (
                <Button
                  label={"Add Reward"}
                  onClick={() => {
                    addButtonClick();
                  }}
                  customClass="button button-black"
                />
              )}
            </div>
          </Grid>
        </Grid>
      </div>

      {showGrid && (
        <div className="card">
          <div className="table-wrapper">
            <MaterialTable
              icons={GridIcons}
              title={`Rewards of ${
                selectedSchemeDetails.label ? selectedSchemeDetails.label : ""
              }`}
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
                          getRewardList();
                        }}
                      />
                    );
                  },
                  tooltip: "Refresh Data",
                  isFreeAction: true,
                },
              ]}
            />
          </div>
        </div>
      )}

      {editRecord && (
        <DialogControl
          maxWidth={"md"}
          open={editRecord}
          dialogTitleText={dialogTitleText}
          dialogContent={dialogContent}
          onCancel={() => {
            toggleEditRecord(!editRecord);
          }}
          onSubmit={() => {
            currentOpr === "Add" ? addReward() : updateReward();
          }}
        />
      )}
      {loading && <Loading />}

      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
