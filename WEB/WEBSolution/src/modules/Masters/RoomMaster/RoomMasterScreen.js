import React, { useState, useEffect } from "react";
import Loading from "../../../components/core/Loading";
import DisplayMessage from "../../../components/core/DisplayMessage";
import MaterialTable from "material-table";
import {
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import { Refresh, SaveAlt } from "@material-ui/icons";
import downloadExcel from "../../../Utils/DownloadExcel";

import { Edit } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { actionColumnStyle } from "../../../components/custom/GridConfig";
import { labels } from "../../../Config.json";
import Button from "../../../components/core/Button";

import TextField from "../../../components/core/TextField";
import Select from "../../../components/core/Select";
import SingleCheckBox from "../../../components/core/SingleCheckBox";
import MultipleSelectionList from "../../../components/custom/MultipleSelectionList";

export default function RoomMaster(props) {
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});

  const [showGrid, setShowGrid] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [amenityList, setAmenityList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState([]);
  const [roomStatusList, setRoomStatusList] = useState([]);

  const columns = [
    {
      title: "Action",
      ...actionColumnStyle,
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
    },
    { title: "Sr.No", field: "srNo", editable: "never" },
    { title: "Room Name", field: "roomName" },
    { title: "Room Key", field: "roomKey" },
    { title: "Category", field: "categoryName" },
    { title: "Room Status", field: "staticName" },
    { title: "Is Active", field: "active" }
    
  ];
  const [data, setData] = useState();

  const [disabledExport, setDisabledExport] = useState(false);
  const exportRoomMaster = () => {
    const exportData = data.map((item) => ({
      srNo: item.srNo,
      roomName: item.roomName,
      roomKey: item.roomKey,
      categoryName: item.categoryName,
      staticName: item.staticName,
      active: item.active,
    }));
    const header = [
      ["Sr.No", "Room Name", "Room Key", "Category","Room Status", "Is Active",],
    ];
    downloadExcel({
      data: exportData,
      fileName: "RoomMaster",
      header: header,
    });
  };

  // filter related variables and methods. - Start

  const [filterCategory, setFilterCategory] = useState("");
  const [filterCategoryError, setFilterCategoryError] = useState(false);

  const [filterRoomStatus, setFilterRoomStatus] = useState("");
  const [filterRoomStatusError, setFilterRoomStatusError] = useState(false);

  const [filterStatus, setFilterStatus] = useState("");
  const [filterStatusError, setFilterStatusError] = useState(false);

  const filterStatusList = [
    { label: "Active", value: 1 },
    { label: "InActive", value: 0 },
  ];

  // filter related variables and methods. - End
  const [rowData, setRowData] = useState({});
  const [validationList, setValidationList] = useState({});
  const [currentOpr, setCurrentOpr] = useState();
  const [id, setId] = useState();

  const [keyList, setkeyList] = useState([]);
  const getKeyList = () => {
    const params = {
      // AUTOCODEUTILITY - Add request params here.
    };
    props.getKeyList({
      params,
      onSuccess: (response) => {
        const { keyList } = response;
        setkeyList(keyList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const [roomCategoryList, setRoomCategoryList] = useState([]);
  const getRoomCategories = () => {
    const params = {      
    };
    props.getRoomCategories({
      params,
      onSuccess: (response) => {        
        const { roomCategoryList } = response;
        setRoomCategoryList(roomCategoryList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const checkAllValidation = () => {
    const roomName = !validateField("roomName");
    const categoryId = !validateField("categoryId");
    const roomStatus = !validateField("roomStatus");
    setValidationList({
      ...validationList,
      roomName,
      categoryId,
      roomStatus
    });

    return !roomName && !categoryId && !roomStatus;
  };

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        ...rowData,
        roomName: rowData.roomName,
        keyId: JSON.parse(rowData.keyId),
        categoryId: JSON.parse(rowData.roomCategoryId),
        description: rowData.description,
        isActive: rowData.isActive,        
        roomStatus: rowData.roomStatusId,        
      });
      setSelectedAmenity(JSON.parse(rowData.amenities));
    }
  }, [editRecord]);

  useEffect(() => {
    if (rowData != null && (rowData.roomId == null || rowData.roomId == 0) && rowData.categoryId
        && roomCategoryList.filter(function (o) { return o.value == rowData.categoryId; })[0].amenities) {
      setSelectedAmenity(JSON.parse(roomCategoryList.filter(function (o) { return o.value == rowData.categoryId; })[0].amenities));
    };
  }, [rowData.categoryId]);

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

  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setRowData({
      roomName: "",
      keyId: 0,
      categoryId: 0,
      description: "",
      isActive: "1",
      roomId : 0
    });   
    setSelectedAmenity([]);
  };


  const addRoomMaster = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0"),
        roomStatus: parseInt(rowData.roomStatus),
        amenities: selectedAmenity,
        
      };
      props.saveRoomMaster({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getRoomMaster(e);
          setLoading(false);
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

  const updateRoomMaster = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      delete rowData["srNo"];
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0"),
        amenities: selectedAmenity,
      };
      props.saveRoomMaster({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getRoomMaster(e);
          setLoading(false);
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

  const FormContent = (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <TextField
          required={true}
          value={rowData.roomName}
          label="Room Name"
          numeric={false}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, roomName: e.target.value });
            validateField("roomName");
          }}
          error={validationList && validationList.roomName ? true : false}
          errorMessage={"Room Name is Required"}
          maxLength={100}
          multiline={false}
          rows={0}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Select
          data={keyList}
          value={rowData.keyId}
          label={"Key"}
          onChange={(e) => {
            setRowData({ ...rowData, keyId: e.target.value });
            validateField("keyId");
          }}
          required={false}
          error={validationList && validationList.keyId ? true : false}
          errorMessage={"Key is Required"}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Select
          data={roomCategoryList}
          value={rowData.categoryId}
          label={"Category"}
          onChange={(e) => {
            setRowData({ ...rowData, categoryId: e.target.value });
            validateField("categoryId");
          }}
          required={true}
          error={validationList && validationList.categoryId ? true : false}
          errorMessage={"Category is Required"}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Select
          data={roomStatusList}
          value={rowData.roomStatus}
          label={"Room Status"}
          onChange={(e) => {
            setRowData({ ...rowData, roomStatus: e.target.value });
            validateField("roomStatus");
          }}
          required={true}
          error={validationList && validationList.roomStatus ? true : false}
          errorMessage={"Room Status is Required"}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          required={false}
          value={rowData.description}
          label="Description"
          numeric={undefined}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, description: e.target.value });
            validateField("description");
          }}
          error={validationList && validationList.description ? true : false}
          errorMessage={"Description is Required"}
          maxLength={1000}
          multiline={true}
          rows={2}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SingleCheckBox
          label={"Is Active"}
          checked={rowData.isActive}
          onChange={(e) => {
            setRowData({ ...rowData, isActive: e.target.checked });
          }}
          required={false}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <MultipleSelectionList
          items={
            amenityList &&
            amenityList.length > 0 &&
            amenityList[0].value === "All"
              ? amenityList.splice(0, 1)
              : amenityList
          }
          label={"Amenities"}
          columns={3}
          width={"100%"}
          checked={selectedAmenity}
          setChecked={setSelectedAmenity}
          required={true}
        />
      </Grid>

      <Grid item xs={12} style={{ justifyContent: "space-" }}>
        <div className="d-flex align-items-center justify-content-end">
          <Button
            autoFocus
            onClick={() => {
              toggleEditRecord(!editRecord);
              setLoading(false);
            }}
            customClass="button button-black mr-2"
            label={labels.cancelButton}
          />
          <Button
            onClick={(e) => {
              currentOpr === "Add" ? addRoomMaster(e) : updateRoomMaster(e);
            }}
            customClass="button button-primary"
            label={labels.saveButton}
          />
        </div>
      </Grid>
    </Grid>
  );

  useEffect(() => {
    getKeyList();
    getRoomCategories();
    getAmenityMaster();
  }, []);

  const getAmenityMaster = () => {
    setLoading(true);
    const params = {
      filterStatus: 1,
    };
    props.getAmenityMaster({
      params,
      onSuccess: (response) => {        
        const { amenityMasterList = [] } = response;
        const data = amenityMasterList.map((item, index) => ({
          value: item.amenityId,
          label: item.name,
        }));
        setAmenityList(data);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  console.log("filterRoomStatus ::: ",filterRoomStatus);
  const getRoomMaster = () => {
    setLoading(true);
    const params = {
      // AUTOCODEUTILITY - Add request params here.
      filterRoomStatus,
      filterCategory,
      filterStatus,
    };
    props.getRoomMaster({
      params,
      onSuccess: (response) => {
        const { roomMasterList = [] } = response;
        setDisabledExport(roomMasterList.length === 0);
        const data = roomMasterList.map((item, index) => ({
          ...item,
          srNo: index + 1,
        }));
        setData(data);
        setShowGrid(true);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
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

  const getRoomStatus = () => {
    props.getRoomStatus({
      params: {
        code: "ROOM_STATUS",
      },
      onSuccess: (response) => {
        const {list}  = response;
        setRoomStatusList(list)
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };
  

useEffect(()=> {
  getRoomStatus()
},[])


  return (
    <div className="holiday-wrapper">
      {!editRecord && (
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <Select
                data={roomCategoryList}
                value={filterCategory}
                label={"Category"}
                onChange={(e) => {
                  const filterCategory = e.target.value || "";
                  setFilterCategoryError(false);
                  setFilterCategory(filterCategory);
                }}
                isInline={true}
                errorMessage={"Category is Required"}
                required={true}
                error={filterCategoryError}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Select
                data={roomStatusList}
                value={filterRoomStatus}
                label={"Category"}
                onChange={(e) => {
                  const filterRoomStatus = e.target.value || "";
                  setFilterRoomStatusError(false);
                  setFilterRoomStatus(filterRoomStatus);
                }}
                isInline={true}
                errorMessage={"Room Status is Required"}
                required={true}
                error={filterRoomStatusError}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Select
                data={filterStatusList}
                value={filterStatus}
                label={"Status"}
                onChange={(e) => {
                  const filterStatus = e.target.value;
                  setFilterStatusError(false);
                  setFilterStatus(filterStatus);
                }}
                isInline={true}
                errorMessage={"Status is Required"}
                required={true}
                error={filterStatusError}
              />
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <div className="selection-card-actions">
                <Button
                  label={labels.filterButton}
                  customClass="button button-primary mr-2"
                  onClick={() => {
                    if (filterCategory != "" && filterStatus != "" && filterRoomStatus !="") {
                      getRoomMaster();
                    } else {
                      filterCategory === "" && setFilterCategoryError(true);
                      filterStatus === "" && setFilterStatusError(true);
                      filterRoomStatus === "" && setFilterRoomStatusError(true);
                    }
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <div className="selection-card-actions">
                <Button
                  onClick={() => {
                    addButtonClick();
                  }}
                  customClass="button button-black add-employee-button"
                  label={"Add Room"}
                >
                  Add
                </Button>
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
                title={"List of Rooms"}
                columns={columns}
                data={data}
                options={options}
                style={style}
                actions={[
                  {
                    icon: () => {
                      return (
                        <Refresh
                          onClick={() => {
                            getRoomMaster();
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
                            exportRoomMaster();
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
