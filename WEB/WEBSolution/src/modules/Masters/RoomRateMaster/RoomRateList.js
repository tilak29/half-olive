import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { labels } from "../../../Config.json";
import Loading from "../../../components/core/Loading";
import DisplayMessage from "../../../components/core/DisplayMessage";
import Button from "../../../components/core/Button";
import Select from "../../../components/core/Select";
import { getDisplayDate } from "../../../Utils/DateTimeUtils.js";
import DatePicker from "../../../components/core/DatePicker";
import Roomcategory from "../../../components/custom/Roomcategory/RoomcategoryContainer";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";
import {
  getDCRFormatDate,
  getDBFormateDate,
} from "../../../Utils/DateTimeUtils.js";
// Add, update, delete operations for Location

export default function RoomRateMaster(props) {
  const [rowData, setRowData] = useState({});
  const [currentOpr, setCurrentOpr] = useState();
  const [displayMessage, setDisplayMessage] = useState({});
  const [validationList, setValidationList] = useState({});
  const [loading, setLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [filterStatusList,setFilterStatusList] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [name, setName] = useState([]);
  const [occupancy, setOccupancy] = useState([]);
  const [days, setDays] = useState([]);
  const [data, setData] = useState([]);
  const [udata, setUpdateData] = useState([]);
  const [record, setRecord] = useState([]);
  const [records, setRecords] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStatusError, setFilterStatusError] = useState(false);
  const [roomRateData,setRoomRateData]  = useState();
  const [showUpdateAndDeleteButton,toggleShowUpdateAndDeleteButton] = useState(false);
  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getRoomRateMasterEffectiveDate = () => {
    setLoading(true);
    const params = {};
    props.getTime({
      params,
      onSuccess: (response) => {
        const { effectiveDate = [] } = response;
        const data = effectiveDate.map((item, index) => ({
          value: item.effectiveDate,
          label: getDisplayDate(item.effectiveDate),
        }));
        const now = new Date();
        const dates = effectiveDate.map((item) => (
          item.effectiveDate
        ))
        let closest = Infinity;
        dates.forEach(function(d) {
          const date = new Date(d);
          if (date <= now && (date > new Date(closest) || date < closest)) {
              closest = d;
          }
        });
        setFilterStatus(closest);
        setFilterStatusList(data);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const getRoomRateMasterData = () => {
    setLoading(true);
    let params = {
        effectiveDate: filterStatus}
    props.datefilter({
      params,
      onSuccess: (response) => {
        const { roomratefilter = [] } = response;
        const roomRateData = roomratefilter.map((item) => ({
          roomid:item.roomCategoryId,
          occupancyid:item.occupancyId,
          amount:item.amount,
          roomRateId:item.roomRateId
        }));
        setRecords(roomRateData);
        setRoomRateData(roomRateData)
        setShowGrid(true);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };
  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      setRecords(roomRateData)
    }
  }, [editRecord]);
  useEffect(() => {
    if(getDCRFormatDate(filterStatus) > getDCRFormatDate(new Date()) && filterStatus!="")
    {
      toggleShowUpdateAndDeleteButton(true);
    }
    else
    {
      toggleShowUpdateAndDeleteButton(false);
    }
    if(filterStatus != "")
    {
      getRoomRateMasterData()
    }
  },[filterStatus])
  const getRoomCategoryList = () => {
    setLoading(true);
    const params = {};

    props.listallcategoryname({
      params,
      onSuccess: (response) => {
        const { getallcategoryname = [] } = response;
        const name = getallcategoryname.map((item, index) => ({
          ...item,
        }));
        setName(name);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const getOccupancy = () => {
    const params = {};
    props.getOccupancy({
      params,
      onSuccess: (response) => {
        const { memberShipOccupancy = [] } = response;
        const occupancy = memberShipOccupancy.map((item, index) => ({
          ...item,
          label: item.staticName,
        }));
        setOccupancy(occupancy);
      },
      onFailure: ({ message }) => {},
    });
  };

  const getMemberShipDays = () => {
    const params = {};
    props.getMemberShipDays({
      params,
      onSuccess: (response) => {
        const { memberShipDays = [] } = response;
        const days = memberShipDays.map((item, index) => ({
          ...item,
        }));
        setDays(days);
      },
      onFailure: ({ message }) => {},
    });
  };

  useEffect(() => {
    getOccupancy();
    getMemberShipDays();
    getRoomRateMasterEffectiveDate();
    getRoomCategoryList();
  }, []);


  const addButtonClick = () => {
    toggleEditRecord(!editRecord);
    setCurrentOpr("Add");
    setValidationList({});
    setRowData({
      Data: [],
      effectiveDate: null,
    });
  };

  const getData = (value, roomid, occupancyid) => {
    setData([{ value: value, roomid: roomid, occupancyid: occupancyid }]);
  };

  useEffect(() => {
    if (data.length != 0) {
      let find = record.find(
        (item) =>
          item.roomid == data[0].roomid &&
          item.occupancyid == data[0].occupancyid
      );
      if (find) {
        setRecord(
          record.map((item) =>
            item.roomid == data[0].roomid &&
            item.occupancyid == data[0].occupancyid
              ? { ...find, value: data[0].value }
              : item
          )
        );
      } else {
        setRecord([...record, ...data]);
      }
    } else {
      setRecord([...record, ...data]);
    }
  }, [data]);

  const UpdateData = (amount, roomid, occupancyid) => {
    setUpdateData([
      { amount: amount, roomid: roomid, occupancyid: occupancyid },
    ]);
  };
  useEffect(() => {
    if (udata.length != 0) {
      let find = records.find(
        (item) =>
          item.roomid == udata[0].roomid &&
          item.occupancyid == udata[0].occupancyid
      );
      if (find) {
        setRecords(
          records.map((item) =>
            item.roomid == udata[0].roomid &&
            item.occupancyid == udata[0].occupancyid
              ? { ...find, amount: udata[0].amount }
              : item
          )
        );
      } else {
        setRecords([...records, ...udata]);
      }
    } else {
      setRecords([...records, ...udata]);
    }
  }, [udata]);

  const insertRoomRate = (e) => {
    if (checkAllValidation()) {
    e.preventDefault();
    setLoading(true);
    const params = {
      EffectiveDate: getDBFormateDate(rowData.effectiveDate),
      Data: record.filter((item) => item.value != ""),
    };
    props.saveroomRate({
      params,
      onSuccess: ({ message: displayMessage }) => {
        setLoading(false);
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
        getRoomRateMasterEffectiveDate();
        getRoomRateMasterData();
        toggleEditRecord(!editRecord);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  }
  };

  const updateRoomRate = (e) => {
    if (checkAllValidation()) {
    e.preventDefault();
    setLoading(true);
    delete rowData["srNo"];
    const params = {
      EffectiveDate: filterStatus,
      Data: records.filter((item) => item.amount != ""),
    };
    props.updateroomRate({
      params,
      onSuccess: ({ message: displayMessage }) => {
        setLoading(false);
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
        getRoomRateMasterData();
        toggleEditRecord(!editRecord);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  }
  };

  const getDelete = (e) => {
    setLoading(true);
    const params = {
      effectiveDate:filterStatus,
    };
    props.deleteroomrate({
      params,
      onSuccess: ({ message: displayMessage }) => {
        getRoomRateMasterData();
        setLoading(false);
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
      },
      onFailure: ({ message }) => {},
    });
  };
  const checkAllValidation = () => {
    const effectiveDate = !validateField("effectiveDate");
    let data
    if(currentOpr == "Add")
    {
      data = (record.length == 0 )? true:false
    }
    else if(currentOpr == "Update")
    {
      data = (records.length == 0)? true:false
    }
    if(data)
    {
      displayErrorMessage(" Enter a Data");
    }
    setValidationList({
      ...validationList,
      effectiveDate,
      data
    });

    return !effectiveDate && !data;
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

const getTomorrowDate = () => {
  let TodayDate = new Date();
  TodayDate.setDate(TodayDate.getDate() + 1);
  return TodayDate
}
  const FormContent = (
    <>
      <Grid item xs={12} md={2} style={{ marginBottom: "30px" }}>
        {editRecord == true && currentOpr == "update" ? (
          <Select
          data={filterStatusList.filter((item) => getDCRFormatDate(item.value) > getDBFormateDate(new Date()))}
          value={filterStatus}
          label={"Effective Dates"}
          onChange={(e) => {
            const filterStatus = e.target.value;
            setRowData({...rowData,effectiveDate:getDisplayDate(filterStatus)})
            setFilterStatusError(false);
            setFilterStatus(filterStatus);
          }}
          isInline={true}
          errorMessage={"filterStatus is Required"}
          required={true}
          error={filterStatusError}
        />
        ) : (
          <DatePicker
            defaultValue={
              rowData.effectiveDate !== null
                ? getDisplayDate(rowData.effectiveDate)
                : null
            }
            disablePast={true}
            label="Effective Date"
            tooltipText={"Effective Date"}
            onChange={(date) => {
              setRowData({ ...rowData, effectiveDate: date });
              validateField("effectiveDate");
            }}
            format={"dd-MMM-yyyy"}
            placeholder={"dd-MMM-yyyy"}
            required={true}
            minDate={getTomorrowDate()}
            error={
              validationList && validationList.effectiveDate ? true : false
            }
            errorMessage={"Effective Date is Required"}
          />
        )}
      </Grid>
      <div
        className="d-flex align-items-center justify-content-end "
        style={{ overflowX: "auto" }}
      >
        <Grid xs={12} md={12}>
          {editRecord == true && currentOpr == "update" ? (
            <Roomcategory
              days={days}
              filterIndex={1}
              update={true}
              showDays={false}
              occupancy={occupancy}
              name={name}
              UpdateData={UpdateData}
              value={roomRateData}
            />
          ) : (
            <Roomcategory
              days={days}
              filterIndex={1}
              view={false}
              showDays={false}
              occupancy={occupancy}
              name={name}
              getData={getData}
            />
          )}
        </Grid>
      </div>
      <Grid style={{ marginTop: "30px" }}>
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
              currentOpr === "Add" ? insertRoomRate(e) : updateRoomRate(e);
            }}
            customClass="button button-primary"
            label={labels.saveButton}
          />
        </div>
      </Grid>
    </>
  );


  return (
    <div className="holiday-wrapper">
      {!editRecord && (
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
            <Select
                data={filterStatusList}
                value={filterStatus}
                label={"Effective Dates"}
                onChange={(e) => {
                  const filterStatus = e.target.value;
                  setFilterStatusError(false);
                  setFilterStatus(filterStatus);
                }}
                isInline={true}
                errorMessage={"filterStatus is Required"}
                required={true}
                error={filterStatusError}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <div style={{display:"flex"}}>
                <div className="selection-card-actions" style={{marginRight:"20px"}}>
                  <Button
                    onClick={() => {
                      addButtonClick();
                    }}
                    customClass="button button-black add-employee-button"
                    label={"Add Room Rate"}
                  >
                    Add
                  </Button>
                </div>
                {showUpdateAndDeleteButton && (
                  <div style={{display:"flex"}}>
                    <div className="selection-card-actions" style={{marginRight:"20px"}}>
                      <Button
                        onClick={() => {
                          setCurrentOpr("update");
                          toggleEditRecord(!editRecord);
                        }}
                        customClass="button button-black add-employee-button"
                        label={"Update Room Rate"}
                        >
                        Update
                      </Button>
                    </div>
                    <div className="selection-card-actions">
                      <Button
                        onClick={() => {
                          setDeleteDialog(true)
                        }}
                        customClass="button button-black add-employee-button"
                        label={"Delete Room Rate"}
                        >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      )}

      {showGrid && !editRecord && (
        <div className="table-wrapper table-size-xs">
          {!editRecord && (
            <Roomcategory
              days={days}
              view={true}
              filterIndex={1}
              showDays={false}
              occupancy={occupancy}
              name={name}
              getData={getData}
              value={roomRateData}
            />
          )}
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
      {deleteDialog && (
        <ConfirmationDialog
          open={deleteDialog}
          dialogTitle="Delete RoomRate"
          dialogContentText="Are you sure you want to delete this RoomRate Date ?"
          cancelButtonText="Cancel"
          okButtonText="Delete"
          onCancel={() => {
            setDeleteDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            setDeleteDialog(false);
            getDelete(e);
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
