import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Edit, Delete, Close, Refresh, AddBox } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";

import Button from "../../../components/core/Button";
import {
  GridIcons,
  options,
  style,
  actionColumnStyle,
} from "../../../components/custom/GridConfig";
import TextField from "../../../components/core/TextField";
import DatePicker from "../../../components/core/DatePicker";
import DisplayMessage from "../../../components/core/DisplayMessage";
import DialogControl from "../../../components/core/Dialog";
import Select from "../../../components/core/Select";
import RadioGroup from "../../../components/core/RadioGroup";
import FileUpload from "../../../components/core/FileUpload";
import {
  getDisplayDate,
  getDBFormateDate,
} from "../../../Utils/DateTimeUtils.js";
import MultipleSelectionList from "../../../components/custom/MultipleSelectionList";
import Placeholder from "../../../Images/Placeholder.svg";
import AddIcon from "@material-ui/icons/Add";
import { labels, staticImagePath, staticDataId } from "../../../Config.json";
import MultipleCheckboxSelect from "../../../components/custom/MultipleCheckboxSelect";

/**
 * Add, update operations based on rights for Scheme
 * Add, Update items to scheme
 * @author Tejal Sali, Khushbu Shah(Image Upload)
 */

export default function Scheme(props) {
  const [data, setData] = useState([]);
  //const [availableItemList, setAvailableItemList] = useState([]);
  const [itemsInScheme, setItemsInScheme] = useState([]);
  const [finalItemsInScheme, setFinalItemsInScheme] = useState([]);
  const [rowData, setRowData] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [addItem, toggleAddItem] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [id, setId] = useState();
  const [base64, setBase64] = useState(null);
  const [baseItemImage, setBaseItemImage] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [selectedItems, setSelecteditems] = useState([]);
  const [uomData, setUomData] = useState([]);
  const [file, setFile] = useState(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [isImageCanceled, setIsImageCanceled] = useState(false);
  const [isFileError, setIsFileError] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { operationRights } = props;
  const { add, edit } = operationRights;

  const { Scheme_Purchase } = staticDataId;

  const [allDivisionList, setAllDivisionList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [selectedFilterError, setSelectedFilterError] = useState(false);

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  useEffect(() => {
    getSchemesList();
    getUOMValues();
    getAllDivisions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllDivisions = () => {
    props.getAllDivisions({
      onSuccess: (response) => {
        const { allDivisionList } = response;
        setAllDivisionList(allDivisionList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const getUOMValues = () => {
    props.getStaticLookup({
      params: {
        code: "SCHEME_UOM",
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

  const getAvailableItemsList = (itemsInScheme, id) => {
    props.getAvailableItemsList({
      params: {
        schemeId: data[id].schemeId,
        divisionId: JSON.parse(data[id].divisionId),
      },
      onSuccess: (response) => {
        const { availableItemList = [] } = response;
        //setAvailableItemList(availableItemList);
        const finalItems = itemsInScheme.concat(availableItemList);
        setItemsInScheme(finalItems);
        setFinalItemsInScheme(finalItems);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const getSchemesList = () => {
    const now = Date.now();
    props.getSchemesList({
      onSuccess: (response) => {
        const { schemeList = [] } = response;
        const data = schemeList.map((item, index) => ({
          ...item,
          srNo: index + 1,
          endDate: getDisplayDate(item.endDate),
          startDate: getDisplayDate(item.startDate),
          activeText: item.isActive === 1 ? "Yes" : "No",
          imageUrl:
            item.imageUrl !== null
              ? `${item.imageUrl}?${now}`
              : staticImagePath,
        }));
        setData(data);
      },
      onFailure: ({ message }) => {
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
    setSelectedFilterError(false);
    setSelectedFilter([]);
    setRowData({
      name: "",
      description: "",
      code: "",
      startDate: null,
      endDate: null,
      isActive: "1",
      imageUrl: null,
      uom: "",
      divisionId: "",
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
    if (selectedFilter.length === 0) setSelectedFilterError(true);

    const name = !validateField("name");
    const description = !validateField("description");
    const code = !validateField("code");
    const startDate = !validateField("startDate");
    const endDate = !validateField("endDate");
    const uom = !validateField("uom");
    const divisionId = selectedFilter.length === 0 ? true : false;

    if (base64) rowData.image = base64;
    rowData.isImageDeleted = isImageDeleted;
    rowData.isImageCanceled = isImageCanceled;

    setValidationList({
      name,
      description,
      code,
      startDate,
      endDate,
      uom,
      divisionId,
    });
    return (
      !name &&
      !description &&
      !code &&
      !startDate &&
      !endDate &&
      !uom &&
      !isFileError &&
      !divisionId
    );
  };

  const addScheme = () => {
    if (checkAllValidation()) {
      const params = {
        ...rowData,
        divisionId: JSON.stringify(selectedFilter),
        startDate: getDBFormateDate(rowData.startDate),
        endDate: getDBFormateDate(rowData.endDate),
        file: file,
      };
      props.addScheme({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getSchemesList();
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

  const updateScheme = () => {
    rowData.imageUrl =
      rowData.imageUrl === staticImagePath
        ? ""
        : rowData.imageUrl.split("?")[0].split("/").reverse()[0];
    if (checkAllValidation()) {
      if (file !== null) {
        setIsImageDeleted(false);
        rowData.isImageDeleted = false;
      }
      const params = {
        ...rowData,
        divisionId: JSON.stringify(selectedFilter),
        startDate: getDBFormateDate(rowData.startDate),
        endDate: getDBFormateDate(rowData.endDate),
        image:
          !rowData.image || rowData.image === staticImagePath
            ? ""
            : rowData.image,
        file: file,
      };
      props.updateScheme({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getSchemesList();
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

      rowData.divisionId != null
        ? setSelectedFilter(JSON.parse(data[id].divisionId))
        : setSelectedFilter([]);

      setSelectedFilterError(false);

      if (rowData.imageUrl !== "" && rowData.imageUrl !== null) {
        setBase64(rowData.imageUrl);
        setBaseItemImage(rowData.imageUrl);
      } else {
        setBase64(null);
        setBaseItemImage(null);
        setIsImageDeleted(false);
        setIsImageCanceled(false);
        setIsFileError(false);
      }

      setRowData({
        schemeId: rowData.schemeId,
        name: rowData.name,
        description: rowData.description,
        code: rowData.code,
        startDate: rowData.startDate,
        endDate: rowData.endDate,
        isActive: rowData.isActive === 1 ? "1" : "0",
        uom: rowData.uom,
        updatedDate: rowData.updatedDate,
        isImageDeleted,
        isImageCanceled,
        imageUrl: rowData.imageUrl,
        divisionId: rowData.divisionId,
        divisionName: rowData.divisionName,
        selectedItemCount:
          rowData.itemList !== null ? rowData.itemList.length : 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  const updateSchemeItems = () => {
    const params = {
      schemeId: data[id].schemeId,
      itemList: selectedItems,
    };
    props.updateSchemeItems({
      params,
      onSuccess: ({ message: displayMessage }) => {
        toggleAddItem(!addItem);
        getSchemesList();
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const baseColumns = [
    {
      title: "Action",
      ...actionColumnStyle,
      cellStyle: {
        whiteSpace: "nowrap",
      },
      hidden: !edit,
      render: ({ tableData: { id }, isActive, uom, itemList = "" }) => {
        return (
          <div className="">
            <Tooltip title="Edit">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setId(id);
                  setStartDate(data[id].startDate);
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
            {isActive === 1 && uom !== Scheme_Purchase && (
              <Tooltip title="Add/Update Items">
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    const itemListJson = JSON.parse(itemList);
                    const itemsInScheme =
                      itemListJson && itemListJson.itemIdList
                        ? itemListJson.itemIdList
                        : [];
                    //setItemsInScheme(itemsInScheme);
                    setSearchText("search items");
                    setId(id);
                    getAvailableItemsList(itemsInScheme, id);
                    toggleAddItem(true);
                    const selectedItemsInScheme = itemsInScheme.map(
                      ({ value }) => value
                    );
                    setSelecteditems(selectedItemsInScheme);
                    setSearchText("");
                  }}
                  size="small"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: "Sr.No",
      field: "srNo",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Code",
      field: "code",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Start Date",
      field: "startDate",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "End Date",
      field: "endDate",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Is Active",
      field: "activeText",
    },

    {
      title: "Image",
      ...actionColumnStyle,
      render: ({ imageUrl }) => {
        return (
          <div className="table-edit-controls">
            <img height="42" width="42" src={imageUrl} alt="Scheme" />
          </div>
        );
      },
    },
    {
      title: "UOM",
      field: "uomValue",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Division",
      field: "divisionName",
    },
  ];

  const dialogTitleText = currentOpr === "Add" ? "Add Scheme" : `Edit Scheme`;

  const dialogContent = (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            required={true}
            value={rowData.name}
            label="Name"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, name: e.target.value });
              validateField("name");
            }}
            error={validationList && validationList.name ? true : false}
            errorMessage={"Name is Required"}
            maxLength={50}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                required={true}
                value={rowData.code}
                label="Code"
                numeric={false}
                isAutoFocus={false}
                onChange={(e) => {
                  setRowData({ ...rowData, code: e.target.value });
                  validateField("code");
                }}
                error={validationList && validationList.code ? true : false}
                errorMessage={"Scheme Code is Required"}
                maxLength={20}
              />
            </Grid>

            <Grid item xs={6}>
              <Select
                required={true}
                data={uomData}
                label={"UOM"}
                value={rowData.uom}
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
          <MultipleCheckboxSelect
            items={allDivisionList}
            keyField={"value"}
            textField={"label"}
            checked={selectedFilter}
            disabled={
              currentOpr === "Update" && rowData.selectedItemCount !== 0
                ? true
                : false
            }
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
          <DatePicker
            required={true}
            variant="inline"
            margin="none"
            label="Start Date"
            defaultValue={rowData.startDate}
            onChange={(e) => {
              setStartDate(e);
              setRowData({ ...rowData, startDate: e, endDate: null });
              validateField("startDate");
            }}
            error={validationList && validationList.startDate ? true : false}
            errorMessage={"Start Date is Required"}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePicker
            required={true}
            variant="inline"
            margin="none"
            label="End Date"
            defaultValue={rowData.endDate}
            onChange={(e) => {
              setRowData({ ...rowData, endDate: e });
              validateField("endDate");
            }}
            error={validationList && validationList.endDate ? true : false}
            errorMessage={"End Date is Required"}
            minDate={startDate}
          />
        </Grid>

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
        <Grid item xs={12} md={8}>
          <TextField
            required={true}
            value={rowData.description}
            label="Description"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, description: e.target.value });
              validateField("description");
            }}
            error={validationList && validationList.description ? true : false}
            errorMessage={"Description is Required"}
            multiline={true}
            rows={6}
            maxLength={500}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FileUpload
            label={"Attachment"}
            setBase64={setBase64}
            file={file}
            accept={"image/*"}
            isFileCanceled={isImageCanceled}
            isFileDeleted={isImageDeleted}
            setIsImageCanceled={setIsImageCanceled}
            setFile={setFile}
            setIsFileError={setIsFileError}
            size={500}
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
      </Grid>
    </div>
  );

  return (
    <div>
      {addItem ? (
        <div className="card">
          <Grid
            container
            spacing={4}
            direction="column"
            justify="flex-start"
            alignItems="flex-end"
          >
            <Grid item xs={12} md={4}>
              <div class="position-relative clear-search-btn mb-3">
                <TextField
                  //required={true}
                  //id="searchText"
                  value={searchText}
                  placeholder="search items"
                  //numeric={false}
                  isAutoFocus={false}
                  onChange={(e) => {
                    const list = finalItemsInScheme.filter(
                      (item) =>
                        item.label
                          .toLowerCase()
                          .indexOf(e.target.value.toLowerCase()) !== -1
                    );
                    setSearchText(e.target.value);
                    setItemsInScheme(list);
                  }}
                  // error={validationList && validationList.code ? true : false}
                  // errorMessage={"Scheme Code is Required"}
                  // maxLength={20}
                />
                <Tooltip title="Clear" tabIndex="-1">
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      setSearchText("");
                      setItemsInScheme(finalItemsInScheme);
                    }}
                    class="MuiButtonBase-root MuiIconButton-root input-absolute-icon"
                  >
                    <svg
                      class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      aria-label="clear"
                    >
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                  </IconButton>
                </Tooltip>
              </div>
            </Grid>
          </Grid>
          <MultipleSelectionList
            //items={itemsInScheme.concat(availableItemList)}
            items={itemsInScheme}
            label={"Items"}
            columns={3}
            width={"100%"}
            checked={selectedItems}
            setChecked={setSelecteditems}
          />

          <Grid item xs={12} style={{ justifyContent: "space-" }}>
            <div className="d-flex align-items-center justify-content-end mt-3">
              <Button
                autoFocus
                onClick={() => {
                  toggleAddItem(!addItem);
                }}
                customClass="button button-black mr-2"
                label={labels.cancelButton}
              />
              <Button
                onClick={() => {
                  updateSchemeItems();
                }}
                customClass="button button-primary"
                label={labels.saveButton}
              />
            </div>
          </Grid>
        </div>
      ) : (
        <div className="card">
          <div className="table-wrapper editable-table-wrapper">
            <MaterialTable
              icons={GridIcons}
              title={"List of Schemes"}
              columns={baseColumns}
              data={data}
              style={style}
              options={{
                ...options,
                headerStyle: {
                  whiteSpace: "nowrap",
                },
              }}
              actions={
                add
                  ? [
                      {
                        icon: () => {
                          return (
                            <Refresh
                              onClick={() => {
                                getSchemesList();
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
                            <AddBox
                              onClick={() => {
                                addButtonClick();
                              }}
                            />
                          );
                        },
                        tooltip: "Add Scheme",
                        isFreeAction: true,
                      },
                    ]
                  : [
                      {
                        icon: () => {
                          return (
                            <Refresh
                              onClick={() => {
                                getSchemesList();
                              }}
                            />
                          );
                        },
                        tooltip: "Refresh Data",
                        isFreeAction: true,
                      },
                    ]
              }
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
            currentOpr === "Add" ? addScheme() : updateScheme();
          }}
        />
      )}

      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div>
  );
}
