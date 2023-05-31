import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import {
  Edit,
  Publish,
  SaveAlt,
  Delete,
  Close,
  Refresh,
} from "@material-ui/icons";
import { Grid, IconButton, Tooltip, FormHelperText } from "@material-ui/core";

import colors from "../../../Colors/colors";
import Button from "../../../components/core/Button";
import {
  GridIcons,
  options,
  style,
  actionColumnStyle,
} from "../../../components/custom/GridConfig";
import {
  isActiveOptions,
  staticImagePath,
  labels,
} from "../../../../src/Config.json";
import TextField from "../../../components/core/TextField";
import DisplayMessage from "../../../components/core/DisplayMessage";
import RadioGroup from "../../../components/core/RadioGroup";
import Loading from "../../../components/core/Loading";
import DialogControl from "../../../components/core/Dialog";
import Select from "../../../components/core/Select";
import FileUpload from "../../../components/core/FileUpload";
import Placeholder from "../../../Images/Placeholder.svg";
import downloadExcel from "../../../Utils/DownloadExcel";

/**
 * Add, update operations for Item
 * @author Tejal Sali, Akshay Ambaliya, Khushbu Shah(Image Upload)
 */

export default function ItemList(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [divisionError, setDivisionError] = useState(false);
  const [isActive, setIsActive] = useState("1");
  const [rowData, setRowData] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [id, setId] = useState();
  const [base64, setBase64] = useState(null);
  const [baseItemImage, setBaseItemImage] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [uomData, setUomData] = useState([]);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [file, setFile] = useState(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [isImageCanceled, setIsImageCanceled] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [isFileError, setIsFileError] = useState(false);

  const { operationRights } = props;
  const { add, edit } = operationRights;

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getDivisions = () => {
    props.getDivisions({
      onSuccess: (response) => {
        const { divisionList } = response;
        setDivisions(divisionList);
      },
      onFailure: ({ message = "Unable to get divisions list!" }) => {
        displayErrorMessage(message);
      },
    });
  };

  const exportItemList = () => {
    const params = {
      divisionId: selectedDivision
    };
    props.exportItemList({
      params,
      onSuccess: (response) => {
        const header = [
          [
            "DivisionName",
            "Id",
            "Brand",
            "Pack",
            "Box Size",
            "Composition",
            "SCH",
            "Category",
            "MRP",
            "PTR",
            "Sequence",
            "PTS" //L166176
          ],
        ];
        downloadExcel({
          data: response.itemList,
          fileName: "ActiveItem",
          header: header,
        });
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const importItemList = () => {
    if (file) {
      props.importItemList({
        params: { file: file },
        onSuccess: ({ message: displayMessage }) => {
          if (showGrid) {
            getItemList();
          }
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          setUploadDialog(false);
        },
        onFailure: ({ message }) => {
          displayErrorMessage(message);
        },
      });
    } else {
      setFileUploadError(true);
    }
  };

  const getUOMValues = () => {
    props.getStaticLookup({
      params: {
        code: "UOM_VALUES",
      },
      onSuccess: (response) => {
        const { list = [] } = response;
        setUomData(list);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const getCategories = () => {
    props.getCategories({
      onSuccess: (response) => {
        const { categoryList = [] } = response;
        setCategoryList(categoryList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    getDivisions();
    getUOMValues();
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getItemList = () => {
    setLoading(true);
    const params = {
      divisionId: selectedDivision,
      isActive: isActive === "1" ? 1 : 0,
    };
    const now = Date.now();
    props.getItemList({
      params,
      onSuccess: (response) => {
        const { itemList = [] } = response;
        const data = itemList.map((item) => ({
          ...item,
          packDisplay: item.pack + " " + item.uomValue,
          itemImage:
            item.itemImage !== ""
              ? `${item.itemImage}?${now}`
              : staticImagePath,
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
      brand: "",
      pack: null,
      divisionId: "",
      categoryId: "",
      mrp: null,
      ptr: null,
      pts: null,  //L166176
      boxSize: null,
      sch: null,
      composition: null,
      itemImage: "",
      image: "",
      uom: "",
      sequence: null,
    });
  };

  const validateField = (field,value=null) => {
    let isValid = true;   
    if (
      (!rowData[field] && (value==null || value!=0)) ||
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

  const checkSCH = () => {
    if (rowData.sch === null || rowData.sch.length === 0) {
      return false;
    } else {
      const regex = new RegExp(/^(?:[\d]*.[+].[\d]*)$/);
      if (!regex.test(rowData.sch)) {
        displayErrorMessage("Please Enter a Valid SCH value.");
        return true;
      } else {
        return false;
      }
    }
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
    const brand = !validateField("brand");
    const pack = !validateField("pack");
    const boxSize = !validateField("boxSize");
    const composition = !validateField("composition");
    const categoryId = !validateField("categoryId");
    const mrp = !validateField("mrp",rowData["mrp"]);
    const divisionId = !validateField("divisionId");
    const uom = !validateField("uom");
    const ptr = !validateField("ptr",rowData["ptr"]);
    const pts = !validateField("pts",rowData["pts"]);  //L166176    
    const sequence =
      currentOpr === "Update" ? !validateField("sequence") : false;
    const sch = checkSCH();

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
      brand,
      pack,
      boxSize,
      composition,
      categoryId,
      mrp,
      divisionId,
      sequence,
      ptr,
      pts,  //L166176
      uom,
    });

    const boxPointZero = checkZero("boxSize", "Box Size");
    // const mrpZero = checkZero("mrp", "MRP");
    // const ptrZero = checkZero("ptr", "PTR");
    // const ptsZero = checkZero("pts", "PTS");  //L166176
    const packZero = checkZero("pack", "Pack");

    return (
      !brand &&
      !pack &&
      !boxSize &&
      !composition &&
      !categoryId &&
      !mrp &&
      !divisionId &&
      !ptr &&
      !pts &&  //L166176
      !sequence &&
      !uom &&
      !sch &&
      !fileErr &&
      packZero &&
      boxPointZero 
      // &&
      // mrpZero &&
      // ptrZero &&
      // ptsZero  //L166176
    );
  };

  const getUploadFileURL = (type) => {
    return new Promise((resolve, reject) => {
      props.getAWSFileUploadURL({
        params: { type, screen: "itemFolderName" },
        onSuccess: (response) => {         
          resolve(response);         
        },
        onFailure: ({ message }) => {
          displayErrorMessage(message);
        },
      });
    });
  }

  const addItem = async () => {
    if (checkAllValidation()) {

      if (file !== null) {
        setLoading(true);
        const type = file.name.split(".")[1];
        const { url, key } = await getUploadFileURL(type);
        const fileUploadResult = await fetch(url, {
          method: 'PUT',
          body: file
        });
        const { ok = false, status = null } = fileUploadResult;
        if (ok && status == "200") {
          delete rowData.image;
          rowData.itemImage = key;
          props.addItem({
            params: { ...rowData },
            onSuccess: ({ message: displayMessage }) => {
              if (showGrid) {
                getItemList();
              }
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
        setLoading(false);
      }

    }
  };

  const updateItem = async () => {
    if (checkAllValidation()) {
      if (file !== null) {
        setLoading(true);
        const type = file.name.split(".")[1];
        const { url, key } = await getUploadFileURL(type);
        const fileUploadResult = await fetch(url, {
          method: 'PUT',
          body: file
        });
        const { ok = false, status = null } = fileUploadResult;
        if (ok && status == "200") {
          delete rowData.image;
          rowData.itemImage = key;
          props.updateItem({
            params: { ...rowData },
            onSuccess: ({ message: displayMessage }) => {
              getItemList();
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
      }
      else {
        setLoading(true);
        rowData.itemImage =
          rowData.itemImage === staticImagePath
            ? ""
            : rowData.itemImage.split("?")[0].split("/").reverse()[0];
        rowData.image = rowData.image === staticImagePath ? "" : rowData.image;
        props.updateItem({
          params: { ...rowData },
          onSuccess: ({ message: displayMessage }) => {
            getItemList();
            setDisplayMessage({
              open: true,
              displayMessage,
              severity: "success",
            });
            toggleEditRecord(!editRecord);
            setLoading(false);
          },
          onFailure: ({ message }) => {
            displayErrorMessage(message);
            setLoading(false);
          },
        });
      }

    }
  };

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setFile(null);
      if (rowData.itemImage !== "") {
        setBase64(rowData.itemImage);
        setBaseItemImage(rowData.itemImage);
      }
      setRowData({
        itemId: rowData.itemId,
        brand: rowData.brand,
        pack: rowData.pack,
        boxSize: rowData.boxSize,
        composition: rowData.composition,
        mrp: rowData.mrp,
        sch: rowData.sch,
        ptr: rowData.ptr,
        pts: rowData.pts, //L166176
        divisionId: rowData.divisionId,
        categoryId: rowData.categoryId,
        itemImage: rowData.itemImage,
        uom: rowData.uom,
        sequence: rowData.sequence,
        updatedDate: rowData.updatedDate,
        isActive: rowData.isActive === 1 ? "1" : "0",
        itemPriceId: rowData.itemPriceId,
        isImageDeleted,
        isImageCanceled,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  const baseColumns = [
    {
      title: "Action",
      ...actionColumnStyle,
      hidden: !edit,
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
                  setIsImageDeleted(false);
                  setIsImageCanceled(false);
                  setValidationList({});
                }}
                size="small"
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      printable: false,
    },
    {
      title: "Sr.No",
      field: "srNo",
      sorting: false,
    },
    {
      title: "Brand",
      field: "brand",
    },
    {
      title: "Pack",
      field: "packDisplay",
    },
    {
      title: "Box Size",
      field: "boxSize",
    },
    {
      title: "Composition",
      field: "composition",
    },
    {
      title: "SCH",
      field: "sch",
    },
    {
      title: "Category",
      field: "categoryName",
    },
    {
      title: "MRP",
      field: "mrp",
    },
    {
      title: "PTR",
      field: "ptr",
    },
//L166176
    {
      title: "PTS",
      field: "pts",
    },
    {
      title: "Sequence",
      field: "sequence",
    },
    {
      title: "Image",
      sorting: false,
      ...actionColumnStyle,
      render: ({ itemImage = "" }) => {
        return (
          <div className="table-edit-controls">
            <img height="42" width="42" src={itemImage} alt="new" />
          </div>
        );
      },
    },
  ];

  const dialogTitleText = currentOpr === "Add" ? "Add item" : `Edit item`;

  const dialogContent = (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            required={true}
            value={rowData.brand}
            label="Brand"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, brand: e.target.value });
              validateField("brand");
            }}
            error={validationList && validationList.brand ? true : false}
            errorMessage={"Brand is Required"}
            maxLength={50}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Select
            required={true}
            data={categoryList}
            label={"Category"}
            value={rowData.categoryId}
            onChange={(e) => {
              setRowData({ ...rowData, categoryId: e.target.value });

              validateField("categoryId");
            }}
            error={validationList && validationList.categoryId ? true : false}
            errorMessage={"Category is Required"}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                required={true}
                value={rowData.pack}
                label="Pack"
                numeric={true}
                isAutoFocus={false}
                onChange={(e) => {
                  setRowData({ ...rowData, pack: e.target.value });
                  validateField("pack");
                }}
                error={validationList && validationList.pack ? true : false}
                errorMessage={"Pack is Required"}
                maxLength={10}
              />
            </Grid>

            <Grid item xs={6}>
              <Select
                required={true}
                data={uomData}
                value={rowData.uom}
                label={"UOM"}
                onChange={(e) => {
                  setRowData({ ...rowData, uom: e.target.value });
                  validateField("uom");
                }}
                error={validationList && validationList.uom ? true : false}
                errorMessage={"UOM is Required"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Select
            required={true}
            data={divisions}
            value={rowData.divisionId}
            label={"Division"}
            onChange={(e) => {
              setRowData({ ...rowData, divisionId: e.target.value });
              validateField("divisionId");
            }}
            error={validationList && validationList.divisionId ? true : false}
            errorMessage={"Division is Required"}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            required={true}
            value={rowData.boxSize}
            label="Box Size"
            numeric={true}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, boxSize: e.target.value });
              validateField("boxSize");
            }}
            error={validationList && validationList.boxSize ? true : false}
            errorMessage={"Box Size is Required"}
            maxLength={10}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required={false}
            type={"sch"}
            value={rowData.sch}
            label="SCH"
            placeholder={"10+2"}
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, sch: e.target.value });
            }}
            maxLength={30}
          />
        </Grid>      

        <Grid item xs={12} md={4}>
{/* //L166176 */}
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                required={true}
                value={rowData.mrp}
                label="MRP"
                type={"decimal"}
                isAutoFocus={false}
                onChange={(e) => {
                  setRowData({ ...rowData, mrp: e.target.value });
                  validateField("mrp",e.target.value);
                }}
                error={validationList && validationList.mrp ? true : false}
                errorMessage={"MRP is Required"}
                maxLength={10}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required={true}
                value={rowData.ptr}
                label="PTR"
                type={"decimal"}
                isAutoFocus={false}
                onChange={(e) => {
                  setRowData({ ...rowData, ptr: e.target.value });
                  validateField("ptr",e.target.value);
                }}
                error={validationList && validationList.ptr ? true : false}
                errorMessage={"PTR is Required"}
                maxLength={10}
              />
            </Grid>
          </Grid>
        </Grid>
{/* //L166176 */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={currentOpr === "Update" ? 6 : 12}>
              <TextField
                required={true}
                value={rowData.pts}
                label="PTS"
                type={"decimal"}
                isAutoFocus={false}
                onChange={(e) => {
                  setRowData({ ...rowData, pts: e.target.value });
                  validateField("pts",e.target.value);
                }}
                error={validationList && validationList.pts ? true : false}
                errorMessage={"PTS is Required"}
                maxLength={10}
              />
            </Grid>
            {currentOpr === "Update" && (
              <Grid item xs={6}>
                <TextField
                  required={true}
                  value={rowData.sequence}
                  label="Sequence"
                  numeric={true}
                  isAutoFocus={false}
                  onChange={(e) => {
                    setRowData({ ...rowData, sequence: e.target.value });
                    validateField("sequence");
                  }}
                  error={
                    validationList && validationList.sequence ? true : false
                  }
                  errorMessage={"Sequence is Required"}
                  maxLength={10}
                />
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <FileUpload
            required={true}
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
            errorMessage={"Item image is required."}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            required={true}
            value={rowData.composition}
            label="Composition"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, composition: e.target.value });
              validateField("composition");
            }}
            error={validationList && validationList.composition ? true : false}
            errorMessage={"Composition is Required"}
            multiline={true}
            rows={3}
            maxLength={300}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          {base64 == null ? (
            <img
              src={Placeholder}
              className="img-fluid"
              width="120"
              height="120"
              alt="Item"
              style={{
                marginTop: "-18px",
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
                    marginTop: "-18px",
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
      </Grid>
    </div>
  );

  const uploadDialogContent = (
    <Grid item xs={12} md={4} lg>
      <input
        type="file"
        name="filename"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setFileUploadError(false);
        }}
        accept="application/vnd.ms-excel"
      />
      {fileUploadError && (
        <FormHelperText id="component-error-text">
          Select a file to upload
        </FormHelperText>
      )}
    </Grid>
  );

  return (
    <div>
      <div className="card selection-card selection-card-two-columns mb-3">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg>
            <Select
              required={true}
              data={divisions}
              value={selectedDivision}
              label={"Division"}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setDivisionError(false);
              }}
              error={divisionError}
              errorMessage={"Division is Required"}
              isInline={true}
            />
          </Grid>
          <Grid item xs={12} md={4} lg>
            <Select
              required={true}
              data={isActiveOptions}
              value={isActive}
              label={"Is Active"}
              onChange={(e) => {
                setIsActive(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} lg>
            <div className="selection-card-actions">
              <Button
                label={labels.filterButton}
                onClick={() => {
                  if (selectedDivision !== "") {
                    getItemList();
                    setShowGrid(true);
                  } else {
                    setDivisionError(true);
                  }
                }}
                customClass="button button-primary mr-2"
              />
              {add && (
                <Button
                  label={"Add Item"}
                  onClick={() => {
                    addButtonClick();
                  }}
                  customClass="button button-black"
                />
              )}
              <Tooltip title="Export">
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    if (selectedDivision !== "") {
                      exportItemList();
                    } else {
                      setDivisionError(true);
                    }
                  }}
                  size="small"
                >
                  <SaveAlt style={{ color: colors.defaultRed }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Upload">
                <IconButton
                  aria-label="upload"
                  onClick={() => {
                    setUploadDialog(true);
                    setFileUploadError(false);
                    setFile(null);
                  }}
                  size="small"
                >
                  <Publish style={{ color: colors.defaultRed }} />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      </div>
      {showGrid && (
        <div className="card">
          <div className="table-wrapper editable-table-wrapper table-smaller">
            <MaterialTable
              icons={GridIcons}
              title={"List of items"}
              columns={baseColumns}
              style={style}
              options={{ ...options, paging: false }}
              actions={[
                {
                  icon: () => {
                    return (
                      <Refresh
                        onClick={() => {
                          getItemList();
                        }}
                      />
                    );
                  },
                  tooltip: "Refresh Data",
                  isFreeAction: true,
                },
              ]}
              data={data}
            ></MaterialTable>
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
            currentOpr === "Add" ? addItem() : updateItem();
          }}
        />
      )}
      {uploadDialog && (
        <DialogControl
          open={uploadDialog}
          dialogTitleText={"Upload Excel file"}
          dialogContent={uploadDialogContent}
          onCancel={() => {
            setFileUploadError(false);
            setUploadDialog(false);
          }}
          onSubmit={() => {
            importItemList();
          }}
          maxWidth="sm"
          fullWidth="false"
        />
      )}
      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
      {loading && <Loading />}
    </div>
  );
}
