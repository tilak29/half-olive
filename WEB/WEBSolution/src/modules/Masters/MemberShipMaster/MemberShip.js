import React, { useState, useEffect } from "react";
import Loading from "../../../components/core/Loading";
import DisplayMessage from "../../../components/core/DisplayMessage";
import { Grid } from "@material-ui/core";
import { labels } from "../../../Config.json";
import Button from "../../../components/core/Button";
import Select from "../../../components/core/Select";
import DatePicker from "../../../components/core/DatePicker";
import {
  getDisplayDate,
  getDBFormateDateTime,
  getDCRFormatDate,
} from "../../../Utils/DateTimeUtils.js";
import Roomcategory from "../../../components/custom/Roomcategory/RoomcategoryContainer";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";
export default function MemberShipMaster(props) {
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [data, setData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStatusError, setFilterStatusError] = useState(false);
  const [rowData, setRowData] = useState({});
  const [validationList, setValidationList] = useState({});
  const [currentOpr, setCurrentOpr] = useState();
  const [id, setId] = useState();
  const [days, setDays] = useState([]);
  const [occupancy, setOccupancy] = useState([]);
  const [name, setName] = useState([]);
  const [udata, setUpdateData] = useState([]);
  const [record, setRecord] = useState([]);
  const [records, setRecords] = useState([]);
  const [daysLength,setDaysLength] = useState([]);
  const [filterStatusList,setFilterStatusList] = useState([]);
  const [memberShipData,setMemberShipData] = useState();
  const [showUpdateAndDeleteButton,toggleShowUpdateAndDeleteButton] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const getMemberShipMasterEffectiveDate = () =>{
    const params = {};
    props.getMemberShipMasterEffectiveDate ({
      params,
      onSuccess: (response) => {
        const { effectiveDate = [] } = response;
        const data = effectiveDate.map((item) => ({
          label:getDisplayDate(item.effectiveDate),
          value:item.effectiveDate,
        }))
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
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    })
  }

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

  const getMemberShip = () => {
    const params = {
      effectiveDate:filterStatus
    };
    props.getMemberShip ({
      params,
      onSuccess: (response) => {
        const { memberShipRoom = [] } = response;
        let memberShipData = memberShipRoom.map((item) => ({
          effectiveDate:item.effectiveDate,
          memberShipMasterId: item.memberShipMasterId,
          roomid:item.roomCategoryId,
          DayId:item.days,
          occupancyid:item.occupancyId,
          amount:item.amount
        }))
        setRecords(memberShipData);
        setMemberShipData(memberShipData);
        setShowGrid(true);
        setLoading(false);
      },
      onFailure: ({ message }) => {},
    })
  }
  const getMemberShipDays = () => {
    const params = {};
    props.getMemberShipDays({
      params,
      onSuccess: (response) => {
        const { memberShipDays = [] } = response;
        const days = memberShipDays.map((item, index) => ({
          ...item,
        }));
        setDaysLength(days.length)
        setDays(days);
      },
      onFailure: ({ message }) => {},
    });
  };

  useEffect(() => {
    getMemberShipMasterEffectiveDate();
    getOccupancy();
    getMemberShipDays();
    getRoomCategoryList();
  }, []);

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

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        ...rowData,
        effectiveDate: getDisplayDate(memberShipData[0].effectiveDate)
      });
      setRecords(memberShipData)
    }
  }, [editRecord]);

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
      effectiveDate: null,
    });
    setRecord([]);

  };

  const addMemberShip = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        effectiveDate:getDBFormateDateTime(rowData.effectiveDate),
        memberShipData:record.filter((item)=>item.value != "")
      };
      props.insertMemberShipData({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getMemberShipMasterEffectiveDate(); 
          getMemberShip();
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

  const updateMemberShip = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        effectiveDate:getDBFormateDateTime(rowData.effectiveDate),
        memberShipData:records.filter((item)=>item.amount != "")
      };
      props.updateMemberShipData({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getMemberShip();
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

  const deleteMemberShip = (e) => {
      e.preventDefault();
      setLoading(true);
      const params = {
        effectiveDate:filterStatus
      };
      props.deleteMemberShipData({
        params,
        onSuccess: ({ message: displayMessage }) => {
          getMemberShipMasterEffectiveDate(); 
          getMemberShip();
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
  };
  const getData = (value, roomid, occupancyid, DayId) => {
    setData([{ value: value, roomid: roomid, occupancyid: occupancyid, DayId: DayId }]);
  };

  useEffect(() => {
    if (data.length != 0) {
      let find = record.find(
        (item) =>
          item.roomid == data[0].roomid &&
          item.occupancyid == data[0].occupancyid &&
          item.DayId == data[0].DayId
      );
      if (find) {
        setRecord(
          record.map((item) =>
            item.roomid == data[0].roomid &&
            item.occupancyid == data[0].occupancyid &&
            item.DayId == data[0].DayId
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
  const UpdateData = (amount, roomid, occupancyid, DayId) => {
    setUpdateData([
      { amount: amount, roomid: roomid, occupancyid: occupancyid, DayId: DayId },
    ]);
  };

  useEffect(() => {
    if (udata.length != 0) {
          let find = records.find(
            (item) =>
              item.roomid == udata[0].roomid &&
              item.occupancyid == udata[0].occupancyid &&
              item.DayId == udata[0].DayId
          );
          if (find) {
            setRecords(
              records.map((item) =>
                item.roomid == udata[0].roomid &&
                item.occupancyid == udata[0].occupancyid &&
                item.DayId == udata[0].DayId
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
      getMemberShip();
    }
  },[filterStatus])
  const getTomorrowDate = () => {
    let TodayDate = new Date();
    TodayDate.setDate(TodayDate.getDate() + 1);
    return TodayDate
  }
  const FormContent = (
    <>
      <Grid item xs={12} md={2} style={{ marginBottom: "30px" }}>
        {(currentOpr == "Update")? (
          <Select
          data={filterStatusList.filter((item) => getDCRFormatDate(item.value) > getDBFormateDateTime(new Date()))}
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
        ):
        (
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
            setRowData({ ...rowData, effectiveDate: getDisplayDate(date) });
            validateField("effectiveDate");
          }}
          format={"dd-MMM-yyyy"}
          placeholder={"dd-MMM-yyyy"}
          required={true}
          minDate={getTomorrowDate()}
          error={validationList && validationList.effectiveDate ? true : false}
          errorMessage={"Effective Date is Required"}
        />
        )}

      </Grid>
      <div
        className="d-flex align-items-center justify-content-end "
        style={{ overflowX: "auto" }}
      >
        <Grid xs={12} md={12}>
          {editRecord == true && currentOpr == "Update" ? (
            <Roomcategory
              days={days}
              filterIndex={daysLength}
              update={true}
              showDays={true}
              occupancy={occupancy}
              name={name}
              UpdateData={UpdateData}
              value={memberShipData}
            />
          ) : (
            <Roomcategory
              days={days}
              filterIndex={daysLength}
              view={false}
              showDays={true}
              occupancy={occupancy}
              name={name}
              getData={getData}
            />
          )}
        </Grid>
      </div>


      <Grid item xs={12} style={{ justifyContent: "space-",  marginTop: "30px" }}>
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
              currentOpr === "Add" ? addMemberShip(e) : updateMemberShip(e);
            }}
            customClass="button button-primary"
            label={labels.saveButton}
          />
        </div>
      </Grid>
    </>
  );

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  return (
    <div className="holiday-wrapper">
      {!editRecord && (
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
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

            {/* <Grid item xs={12} md={4} lg={1}>
              <div className="selection-card-actions">
                <Button
                  label={labels.filterButton}
                  customClass="button button-primary mr-2"
                  onClick={() => {
                    if (filterStatus !== "") {
                      getMemberShip();
                    } else {
                      filterStatus === "" && setFilterStatusError(true);
                    }
                  }}
                />
              </div>
            </Grid> */}

            <Grid item xs={12} md={6} lg={3}>
              <div style={{display:"flex"}}>
                <div className="selection-card-actions" style={{marginRight:"20px"}}>
                  <Button
                    onClick={() => {
                      addButtonClick();
                    }}
                    customClass="button button-black add-employee-button"
                    label={"Add MemberShip"}
                  >
                    Add
                  </Button>
                </div>
                {showUpdateAndDeleteButton && (
                  <div style={{display:"flex"}}>
                    <div className="selection-card-actions" style={{marginRight:"20px"}}>
                      <Button
                        onClick={() => {
                          setCurrentOpr("Update");
                          toggleEditRecord(!editRecord);
                        }}
                        customClass="button button-black add-employee-button"
                        label={"Update MemberShip"}
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
                        label={"Delete MemberShip"}
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
        <div className="card">
          <div className="table-wrapper table-size-xs" style={{ overflowX: "auto" }}>
            {!editRecord && (
             <Roomcategory
             days={days}
             view={true}
             filterIndex={5}
             showDays={true}
             occupancy={occupancy}
             name={name}
             getData={getData}
             value={memberShipData}
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
            deleteMemberShip(e);
            setDeleteDialog(false);
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
