import React, { useState, useEffect } from "react";
import Loading from "../../../components/core/Loading";
import DisplayMessage from "../../../components/core/DisplayMessage";
import MaterialTable from "material-table";
import {
  getDBFormateDate,
  getBrowserFormatDate,
  getDisplayDate,
} from "../../../Utils/DateTimeUtils.js";
import SingleCheckBox from "../../../components/core/SingleCheckBox";
import Select from "../../../components/core/Select";
import {
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import TextField from "../../../components/core/TextField";

import { Delete, AddBox, Edit, NoMeetingRoom } from "@material-ui/icons";
import { Grid, IconButton, Tooltip, InputLabel } from "@material-ui/core";
import { actionColumnStyle } from "../../../components/custom/GridConfig";
import { labels } from "../../../Config.json";
import Button from "../../../components/core/Button";

import MultipleCheckboxSelect from "../../../components/custom/MultipleCheckboxSelect";
import Autocomplete from "../../../components/core/Autocomplete";
import DatePicker from "../../../components/core/DatePicker";
import RadioGroup from "../../../components/core/RadioGroup";
import DialogControl from "../../../components/core/Dialog";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";
import AddGuest from "../../../components/custom/AddGuest/AddGuestContainer";
import { staticDataId } from "../../../Config.json";
import formatRelativeWithOptions from "date-fns/esm/fp/formatRelativeWithOptions/index.js";
export default function AddBooking(props) {
  const {onCancelClick, 
        onSaveClick, 
        displaySuccessMessage, 
        displayErrorMessage,
        search = true,
        CancelButton = true,
        ConfirmButton = true,
        data={},
        currentOpr = "Add"
      } = props;
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [searchRecord, toggleSearchRecord] = useState(false);
  const [addMore, toggleAddMore] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState([]);
  const [check, setCheck] = useState([]);
  const [selectedRoom, SetSelectedRoom] = useState([]);
  const [roomRecord, toggleRoomRecord] = useState(false);
  const [checked, setChecked] = useState([]);
  const [roomselected, setRoomSelected] = useState([]);
  const [addPrimaryGuest, toggleAddPrimaryGuest] = useState(false);
  const [newGuestData, setNewGuestData] = useState([]);
  const [rowData, setRowData] = useState(data);
  const [validationList, setValidationList] = useState({});
  const [roomList, setRoomList] = useState([]);
  const [guestList, setguestList] = useState([]);
  const [roomStatus, setRoomStatus] = useState();
  const [defaultRoomStatus, setDefaultRoomStatus] = useState([]);
  const [setPrimaryGuestValue,toggleSetPrimaryGuestVAlue] = useState(true);
  const [checkedOutDialog,setCheckedOutDialog] = useState(false);
  const [showCheckedOutButton, toggleShowCheckedOutButton] = useState(false);
  const [confirmButton,toggleConfirmButton] = useState(ConfirmButton);
  const [cancelButton,toggleCancelButton] = useState(CancelButton);
  const [bookingRoomAssignmentId,setBookingRoomAsignmentId] = useState();
  const [updateGuestList,setUpdateGuestList] = useState([]);
  useEffect(() => {
    if(data!=undefined)
    {
      if (Object.keys(data).length > 0) {
        setRowData(data);
        if(data.bookingId!=undefined && currentOpr=="Update")
        {
            manageBooking_GetGuestBookingDetails(props.data);
            manageBooking_GetRoomAssignDetails(props.data);
        }
      }
    }
  }, [data]);
  // :{ Book_Status_Booked,Book_Status_CheckedIn,Book_Status_CheckedOut}
  useEffect(() => {
    if(data.bookingStatus!=undefined && data.bookingStatus == staticDataId.Book_Status_CheckedIn && data.bookingStatus !="")
    {
      toggleShowCheckedOutButton(true);
    }
    else
    {
      toggleShowCheckedOutButton(false);
    }

    if(data.bookingStatus!=undefined && data.bookingStatus == staticDataId.Book_Status_CheckedOut)
    {
      toggleConfirmButton(false);
    }
    else
    {
      toggleConfirmButton(true);
    }
  },[data])
  const columnGuestDetails = [
    {
      title: "Select",
      ...actionColumnStyle,
      render: (id) => {
        return (
          <div className="table-edit-controls"
          style={{display: "flex",
            alignItems: "center",
            marginLeft:"-10px",
            justifyContent: "center",
            height: "10px"}}>
            <RadioGroup
              value={check}
              options={[{ label: "", value: id.bookingReferenceCode }]}
              isOptionAlignRow={true}
              onChange={(e) => {
                setCheck(id.bookingReferenceCode);
                setSelectedGuest(id);
              }}
              labelPlacement={"start"}
            />
          </div>
        );
      },
      printable: false,
    },
    {
      title: "Sr#",
      field: "srNo",
      editable: "never",
      cellStyle:{
        textAlign:"center"
      }
    },
    {
      title: "Booked By",
      field: "guestName",
    },
    {
      title: "Mobile No.",
      field: "mobileNo",
      cellStyle:{
        textAlign:"right"
      }
    },
    {
      title: "Booking Code",
      field: "bookingReferenceCode",
      cellStyle:{
        textAlign:"right"
      }
    },
    {
      title: "Start Date",
      field: "startDate",
    },
    {
      title: "End Date",
      field: "endDate",
    }
  ];
  const [roomAssignGuest, SetRoomAssignGuest] = useState([]);
  const columnExistingGuestDetails = [
    // {
    //   title: "Select",
    //   ...actionColumnStyle,
    //   render: (id) => {
    //     return (
    //       <div className="table-edit-controls" style={{display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //         height: "10px"}}>
    //         <SingleCheckBox
    //           checked={false}
    //           disabled={(newGuestData.find((item) => item.guestId === id.guestId))? true : false}
    //           onChange={(e) => {

    //             if (checked.find((item) => item.guestId === id.guestId)) {
    //               setChecked(
    //                 checked.filter((item) => item.guestId !== id.guestId)
    //               );
    //             } else {
    //               setChecked([
    //                 ...checked,
    //                 {
    //                   firstName: id.firstName,
    //                   lastName: id.lastName,
    //                   dob: id.dob,
    //                   gender: id.gender,
    //                   mobileNo: id.mobileNumber,
    //                   guestId:id.guestId,
    //                   genderName:id.genderName,
    //                   label:id.guestName,
    //                   value:id.guestId,
    //                   treatment:0
    //                 },
    //               ]);
    //             }
    //           }
    //         }
    //         />
    //       </div>
    //     );
    //   },
    //   printable: false,
    // },
    {
      title: "Sr#",
      field: "srNo",
      editable: "never",
      cellStyle:{
        textAlign:"center"
      }
    },
    {
      title: "First Name",
      field: "firstName",
    },
    {
      title: "Last Name",
      field: "lastName",
    },
    {
      title: "Middle Name",
      field: "middleName",
    },
    {
      title: "Mobile No.",
      field: "mobileNo",
    },
    {
      title: "Gender",
      field: "genderName",
    },
    {
      title: "DOB",
      field: "dob",
    },
  ];
  const columnRoomDetails = [
    {
      title: "Select",
      ...actionColumnStyle,
      render: (id) => {
        return (
          <div className="table-edit-controls">
            <SingleCheckBox
              checked={false}
              disabled={(roomAssignGuest.find((item) => item.roomId === id.roomId) 
                )? true : false}
              onChange={(e) => {
                if(id.selectGuest!=undefined)
                {
                  let b = [];
                  for(let i=0;i<(id.selectGuest).length;i++)
                  {
                    let a = newGuestData.find((item) => item.guestId == id.selectGuest[i])
                    b.push({...id,firstName:a.firstName,lastName:a.lastName,guestId:a.guestId})
                  }
                  
                  let a = roomselected.find((item) => item.roomId == id.roomId)
                  if(a)
                  {
                    setRoomSelected(roomselected.filter((item) => item.roomId != id.roomId))
                    SetSelectedRoom(selectedRoom.filter((item) => item.roomId != id.roomId))
                  }
                  else
                  {
                    setRoomSelected([...roomselected,...b]);
                    SetSelectedRoom([...selectedRoom,id]);
                  }
                }

              }}
            />
          </div>
        );
      },
      printable: false,
    },
    {
      title: "Sr#",
      field: "srNo",
      cellStyle:{
        textAlign:"center"
      },
      editable: "never",
    },
    {
      title: "Room Category",
      field: "categoryName",
    },
    {
      title: "Room",
      field: "roomName",
    },
    {
      title: "Key",
      field: "keyNo",
    },
    {
      title: "Room Status",
      field: "staticName",
    },
    {
      title: "Features",
      field: "features",
    },
    {
      title: "Select Guest",
      field: "selectGuest",
      render: ({tableData: {id} , selectGuest}) => {
        return ( 
          <MultipleCheckboxSelect
              items={newGuestData}
              disabled={(roomAssignGuest.find((item) => item.roomId === roomList[id].roomId)? true : false)}
              keyField={"value"}
              textField={"label"}
              label={"Room Category"}
              checked={roomList[id].selectGuest}
              subString={true}
              setChecked={(element) => {
                let e,flage = true,data,room,elements = element;
                if(roomList[id].selectGuest!=undefined)
                {
                  e = (element).filter((item) => roomList[id].selectGuest.indexOf(item)==-1)
                }

                if(selectedRoom.length > 0)
                {
                    for(let i=0; i<selectedRoom.length; i++)
                    {
                      if((selectedRoom[i].selectGuest).find((item) => item == element) && element.length==1)
                      {
                        
                        data = (newGuestData.find((item) => item.guestId == (selectedRoom[i].selectGuest).find((item) => item == element)))
                        room = selectedRoom[i]
                        flage=false
                        break;
                      }
                      else if((selectedRoom[i].selectGuest).find((item) => item == e))
                      {
                        data = (newGuestData.find((item) => item.guestId == (selectedRoom[i].selectGuest).find((item) => item == e)))
                        room = selectedRoom[i]
                        flage=false
                        break;
                      }
                      else if(roomList[id].selectGuest==undefined && element.length>1)
                      {
                        for(let j=0;j<elements.length;j++)
                        {
                          if((selectedRoom[i].selectGuest).find((item) => item == elements[j]))
                          {
                            data = (newGuestData.find((item) => item.guestId == (selectedRoom[i].selectGuest).find((item) => item == elements[j])))
                            room = selectedRoom[i]
                            displayErrorMessage(`${data.firstName} ${data.lastName} Already assign to ${room.roomName}`)
                            element = element.filter((item) => item != elements[j])
                          }
                        }
                      }
                    }
                    for(let i=0;i<roomList.length;i++)
                  {
                    if(roomList[i].selectGuest!=undefined)
                    {
                      if((roomList[i].selectGuest).find((item) => item == element) && element.length==1)
                      {
                        if(roomList[i] === roomList[id])
                        {
                          flage=true;
                          break;
                        }
                        data = (newGuestData.find((item) => item.guestId == (roomList[i].selectGuest).find((item) => item == element)))
                        room = roomList[i]
                        flage=false
                        break;
                      }
                      else if((roomList[i].selectGuest).find((item) => item == e) )
                      {
                        data = (newGuestData.find((item) => item.guestId == (roomList[i].selectGuest).find((item) => item == e)))
                        room = roomList[i]
                        flage=false
                        break;
                      }
                    }
                    else if(roomList[id].selectGuest==undefined && element.length>1)
                    {
                      for(let j=0;j<elements.length;j++)
                      {
                        if(roomList[i].selectGuest!=undefined)
                        {
                          if((roomList[i].selectGuest).find((item) => item == elements[j]))
                          {
                            data = (newGuestData.find((item) => item.guestId == (roomList[i].selectGuest).find((item) => item == elements[j])))
                            room = roomList[i]
                            displayErrorMessage(`${data.firstName} ${data.lastName} Already assign to ${room.roomName}`)
                            element = element.filter((item) => item != elements[j])
                          }
                        }
                      }
                    }
                  }
                    if(flage!=false)
                    {
                      setRoomList(roomList.map((item) => item.srNo == id+1 ?{...roomList[id],selectGuest:element}:item))
                    }
                    else
                    {
                      displayErrorMessage(`${data.firstName} ${data.lastName} Already assign to ${room.roomName}`)
                    }
                }
                else
                {
                    
                  for(let i=0;i<roomList.length;i++)
                  {
                    if(roomList[i].selectGuest!=undefined)
                    {
                      if((roomList[i].selectGuest).find((item) => item == element) && element.length==1)
                      {
                        if(roomList[i] === roomList[id])
                        {
                          flage=true;
                          break;
                        }
                        data = (newGuestData.find((item) => item.guestId == (roomList[i].selectGuest).find((item) => item == element)))
                        room = roomList[i]
                        flage=false
                        break;
                      }
                      else if((roomList[i].selectGuest).find((item) => item == e) )
                      {
                        data = (newGuestData.find((item) => item.guestId == (roomList[i].selectGuest).find((item) => item == e)))
                        room = roomList[i]
                        flage=false
                        break;
                      }
                    }
                    else if(roomList[id].selectGuest==undefined && element.length>1)
                    {
                      for(let j=0;j<elements.length;j++)
                      {
                        if(roomList[i].selectGuest!=undefined)
                        {
                          if((roomList[i].selectGuest).find((item) => item == elements[j]))
                          {
                            data = (newGuestData.find((item) => item.guestId == (roomList[i].selectGuest).find((item) => item == elements[j])))
                            room = roomList[i]
                            displayErrorMessage(`${data.firstName} ${data.lastName} Already assign to ${room.roomName}`)
                            element = element.filter((item) => item != elements[j])
                          }
                        }
                      }
                    }
                  }
                  if(flage!=false)
                  {
                    setRoomList(roomList.map((item) => item.srNo == id+1 ?{...roomList[id],selectGuest:element}:item))
                  }
                  else
                  {
                    displayErrorMessage(`${data.firstName} ${data.lastName} Already assign to ${room.roomName}`)
                  }
                }
              }}
            />
        );
      },
    },
  ];
  const columnsRoom = [
    { title: "Sr#", field: "srNo", editable: "never",
    cellStyle:{
      textAlign:"center"
    } },
    
    {
      title: "First Name",
      field: "firstName",
    },
    {
      title: "Last Name",
      field: "lastName",
    },
    {
      title: "Room",
      field: "roomName",
    },
    {
      title: "Room Key",
      field: "keyNo",
    },
    {
      title: "Action",
      ...actionColumnStyle,
      render: (id) => {
        return (
          <div className="table-edit-controls">
            {showCheckedOutButton && (
            <Tooltip title="Checked Out">
              <IconButton
                aria-label="Checked Out"
                onClick={() => {
                  setBookingRoomAsignmentId(id.bookingRoomAssignmentId)
                  setCheckedOutDialog(true);
                }}
                size="small"
              >
                <NoMeetingRoom fontSize="small" />
              </IconButton>
            </Tooltip>
            )}

            <Tooltip title="Edit">
              <IconButton
                aria-label="Edit"
                onClick={(e) => {
                  if(roomList.find((item) => item.roomId == id.roomId))
                  {
                    SetRoomAssignGuest(roomAssignGuest.filter((item) => item.roomId != id.roomId));
                    SetSelectedRoom(selectedRoom.filter((item)=> item.roomId !=id.roomId));
                    toggleRoomRecord(!roomRecord);
                  }
                  else 
                  {
                    let room = selectedRoom.find((item) => item.roomId == id.roomId)
                    let data= [...roomList,room];
                    let Roomlist = data.map((item,index)=>({
                      ...item,
                      srNo:index+1,
                      bookingRoomAssignmentId:0
                    }))
                    setRoomList(Roomlist);
                    SetRoomAssignGuest(roomAssignGuest.filter((item) => item.roomId != room.roomId));
                    SetSelectedRoom(selectedRoom.filter((item)=> item.roomId !=room.roomId));
                    toggleRoomRecord(!roomRecord);
                  }
                }}
                size="small"
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Remove">
              <IconButton
                aria-label="Remove"
                onClick={() => {
                  let list = roomAssignGuest.filter(
                    (item) => item !== id
                  );
                  let data = list.map((list, index) => ({
                    ...list,
                    srNo: index + 1,
                  }));
                  SetRoomAssignGuest(data);
                  let find = selectedRoom.find((item) => item.roomId == id.roomId)
                  if(find)
                  {
                    if(find.selectGuest.length == 1)
                    {
                      SetSelectedRoom(selectedRoom.filter((item) => item.roomId !=find.roomId))
                    }
                    else
                    {
                      SetSelectedRoom(selectedRoom.map((item) => (item.roomId == id.roomId)?
                      {...item,selectGuest:find.selectGuest.filter((item) => item != id.guestId)}:item))
                    }
                  }
                }}
                size="small"
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const bookingList = [
    { label: "Booked", value: 128 },
    { label: "Checked In", value: 129 },
    { label: "Checked Out", value: 130 },
  ];
  const columnsNewGuest = [
    { title: "Sr#", field: "srNo", editable: "never",
    cellStyle:{
      textAlign:"center"
    } },
    {
      title: "First Name",
      field: "firstName",
    },
    {
      title: "Last Name",
      field: "lastName",
    },
    {
      title: "DOB",
      field: "dob",
      cellStyle:{
        textAlign:"center"
      }
    },
    {
      title: "Gender",
      field: "genderName",
    },
    {
      title: "Treatment",
      field: "treatment",
        render: (id) => {
        return (
          <div className="table-edit-controls" style={{display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "10px"}}>

            <SingleCheckBox
              checked={(id.treatment ==0)?false:true}
              onChange={(e) => {
              setNewGuestData(newGuestData.map((item) => item.srNo == id.srNo ?{...id, treatment: (id.treatment ==0)?1:0}:item));
              }}
            />
          </div>
        );
      },
    },

    {
      title: "Mobile No.",
      field: "mobileNo",
    },

    {
      title: "Action",
      ...actionColumnStyle,
      render: (id) => {
        return (
          <div className="table-edit-controls" >
            <Tooltip title="Remove">
              <IconButton
                aria-label="Remove"
                onClick={() => {
                  let list = newGuestData.filter(
                    (item) => item !== id
                  );
                  let data = list.map((list, index) => ({
                    ...list,
                    srNo: index + 1,
                  }));
                  // setguestList(guestList.map((item) => (item.guestId == id.guestId)?{...item,tableData:{...item.tableData,checked:false}}:item))
                  let roomID = (roomAssignGuest.find((item) => item.guestId == id.guestId));
                  if(roomID)
                  {
                    let find = (selectedRoom.find((item) => item.roomId == roomID.roomId));
                    if(find)
                    {
                      if(find.selectGuest.length == 1)
                      {
                        SetSelectedRoom(selectedRoom.filter((item) => item.roomId !=find.roomId))
                      }
                      else
                      {
                        SetSelectedRoom(selectedRoom.map((item) => (item.roomId == roomID.roomId)?
                        {...item,selectGuest:find.selectGuest.filter((item) => item != id.guestId)}:item))
                      }
                      let datas = roomAssignGuest.filter((item) => item.guestId !=id.guestId);
                      let RoomAssignGuest = datas.map((item,index)=>({
                        ...item,
                        srNo:index+1
                      }))
                     SetRoomAssignGuest(RoomAssignGuest);
                     setNewGuestData(data);
                    }
                    else
                    {
                      setNewGuestData(data);
                    }
                  }
                  else
                  {
                    setNewGuestData(data);
                  }
                }}
                size="small"
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const checkedOutPerticularRoom = () => {
    const params = {
      bookingRoomAssignmentId:bookingRoomAssignmentId,
      bookingId:rowData.bookingId
    };
    props.checkedOutPerticularRoom({
      params,
      onSuccess: (response) => {
        displaySuccessMessage(response.message);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const getGuestList = () => {
    const params = {
      // AUTOCODEUTILITY - Add request params here.
    };
    props.getGuestList({
      params,
      onSuccess: (response) => {
        const { guestList } = response;
        const data = guestList.map((guestList, index) => ({
          ...guestList,
          srNo: index + 1,
          guestId: guestList.guestId,
          guestName: guestList.guestName,
          mobileNo: guestList.mobileNumber,
          dob: getDisplayDate(guestList.dob),
          label:guestList.guestName,
          value:guestList.guestId
        }));
        setguestList(data);
        setUpdateGuestList(data);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };
  
  const [roomCategoryList, setroomCategoryList] = useState([]);
  const getRoomCategories = () => {
    const params = {
      // AUTOCODEUTILITY - Add request params here.
    };
    props.getRoomCategories({
      params,
      onSuccess: (response) => {
        const { roomCategoryList } = response;
        setroomCategoryList(roomCategoryList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };
  const getDefaultRoomStatus = () => {
    const params = {};
    props.getDefaultRoomStatus({
      params,
      onSuccess: (response) => {
        const { defaultRoomStatus } = response;
        setDefaultRoomStatus(
          JSON.parse(defaultRoomStatus[0].defaultRoomStatus)
        );
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };
  const [defaultRoomCategory,setDefaultRoomCategory] = useState();
  const getDefaultRoomCategory = () => {
    const params = {};
    props.getDefaultRoomCategory({
      params,
      onSuccess: (response) => {
        const { defaultRoomCategory } = response;
        setDefaultRoomCategory(JSON.parse(defaultRoomCategory[0].defaultRoomCategory))
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };
  const getLatestGuest = () => {
    const params = {
      // AUTOCODEUTILITY - Add request params here.
    };
    props.getLatestGuest({
      params,
      onSuccess: (response) => {
        const { latestGuest } = response;
        const latestGuests = latestGuest.map((item, index) => ({
          ...item,
          guestId: item.guestId,
          guestName: item.guestName,
        }));
        let combineGuestdata = [...newGuestData,{firstName: latestGuests[0].firstName,
          lastName: latestGuests[0].lastName,
          dob: getDisplayDate(latestGuests[0].dob),
          gender:latestGuests[0].gender,
          mobileNo: latestGuests[0].mobileNo,
          guestId: latestGuests[0].guestId,
          genderName:latestGuests[0].genderName,
          label:latestGuests[0].guestName,
          value:latestGuests[0].guestId
        }]
        let Guestdata = combineGuestdata.map((item,index) => ({
          ...item,
          srNo:index+1
        }))
        setNewGuestData(Guestdata);
        if(setPrimaryGuestValue == true)
        {
          setRowData({
            ...rowData,
            guestId: latestGuests[0],
            mobile: latestGuests[0].mobileNo
          });
        }
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };
  const [selectedRoomListm,setSelectedRoomList] = useState([])
  const getRoomList = () => {
    setLoading(true);
    const params = {
      // AUTOCODEUTILITY - Add request params here.
      roomStatus: defaultRoomStatus,
      roomCategory:defaultRoomCategory,
      startDate: getDBFormateDate(rowData.startDate),
      endDate: getDBFormateDate(rowData.endDate),
    };
    props.getRoomList({
      params,
      onSuccess: (response) => {
        const { roomList } = response;
        const Roomlist = roomList.map((item, index) => ({
          ...item,
          srNo: index + 1,
        }));
        setRoomList([...selectedRoomListm,...Roomlist]);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };
  const getRoomStatus = () => {
    const params = {
      // AUTOCODEUTILITY - Add request params here.
    };
    props.getRoomStatus({
      params,
      onSuccess: (response) => {
        const { roomStatus } = response;
        const Roomstatus = roomStatus.map((item, index) => ({
          label: item.staticName,
          value: parseInt(item.staticId),
        }));
        setRoomStatus(Roomstatus);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };
  const checkAllValidation = () => {
    // AUTOCODEUTILITY - Add customized validation here.
    const guestId = !validateField("guestId");
    const AddGuest = (newGuestData.length==0)?true:false;
    const RoomAssignGuest = (selectedRoom.length==0)?true:false;
    if(AddGuest && RoomAssignGuest)
    {
      displayErrorMessage(`Please Select A Guest And Room`);
    }
    else if(AddGuest)
    {
      displayErrorMessage(`Please Select A Guest`);
    }
    else if(RoomAssignGuest)
    {
      displayErrorMessage(`Please Select A Room For Guest`);
    }

    // const mobile = !validateField("mobile");
    const startDate = !validateField("startDate");
    const endDate = !validateField("endDate");
    const bookingStatus = !validateField("bookingStatus");
    setValidationList({
      ...validationList,
      guestId,
      // mobile,
      AddGuest,
      RoomAssignGuest,
      startDate,
      endDate,
      bookingStatus,
    });

    return (
      !guestId &&
      // !mobile &&
      !AddGuest &&
      !RoomAssignGuest &&
      !startDate &&
      !endDate &&
      !bookingStatus
    );
  };

  const manageBooking_GetGuestBookingDetails = (e) => {
    setLoading(true)
    const params = {
      bookingId:e.bookingId
    };
    props.manageBooking_GetGuestBookingDetails({
      params,
      onSuccess: (response) => {
        const { guestbookingdetails = [] } =response
        let data = guestbookingdetails.map((item,index) => ({
          ...item,
          srNo:index+1,
          dob:getDisplayDate(item.dob),
          tableData:{checked:false}
        }))
        setNewGuestData(data)
        setLoading(false)
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  }

  useEffect(() => {
    if(guestList.length>0 && newGuestData.length>0)
    {
      let result = (newGuestData.filter(obj => guestList.some(({guestId}) => obj.guestId === guestId)));
      console.log(result)
      let oldGuestListData = (guestList.filter(obj => !newGuestData.some(({guestId}) => obj.guestId === guestId)))
  
      let modifiedGuestListData = oldGuestListData.map((item) => ({
        ...item,tableData:{...item.tableData,checked:false}
      }))
      let addIntoGuestList = result.map((item) => ({...item,tableData:{...item.table,checked:true}}))
      let combinedata = [...addIntoGuestList,...modifiedGuestListData]
      let guestlist = combinedata.map((item,index) => ({
        ...item,
        srNo:index+1
      }))
      setguestList(guestlist);
    }
    else if(guestList.length>0)
    {
      setguestList(guestList.map((item) => ({...item,tableData:{...item.tableData,checked:false}})))
    }
  },[newGuestData,updateGuestList])

  const manageBooking_GetRoomAssignDetails = (e) => {
    setLoading(true)
    const params = {
      bookingId:e.bookingId
    };
    props.manageBooking_GetRoomAssignDetails({
      params,
      onSuccess: (response) => {
        const { roomAssignDetails = [] } =response
        let data = roomAssignDetails.map((item,index) => ({
          ...item,
          srNo:index+1,
          selectGuest:JSON.parse(item.selectGuest)
        }))
        SetRoomAssignGuest(data);
        let SelectedRoom = []
        let uniqueDataFromData = {}
        for (let i in data) 
        {
          // Extract the roomName
         let roomName = data[i]['roomName'];
          // Use the rooName as the index
          uniqueDataFromData[roomName] = data[i];
        }
        for (let i in uniqueDataFromData) 
        {
          SelectedRoom.push(uniqueDataFromData[i]);
        }
        SetSelectedRoom(SelectedRoom);
        // setSelectedRoomList([...roomList,...SelectedRoom]);
        setLoading(false)
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  }
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
  
  const addManageBooking = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      let guestBookingDetails=[];
      for(let i=0;i<newGuestData.length;i++)
      {
        if(roomAssignGuest.find((item) => item.guestId == newGuestData[i].guestId))
        {
          let rooms = roomAssignGuest.find((item) => item.guestId == newGuestData[i].guestId);
          let guestDatas = newGuestData[i];
          guestBookingDetails.push({guestId:rooms.guestId,roomId:rooms.roomId,keyId:rooms.keyId,treatment:guestDatas.treatment});
        }
      }
      let bookingRoomAssign = [];
      for(let i=0;i<selectedRoom.length;i++)
      {
        bookingRoomAssign.push({roomId:selectedRoom[i].roomId,keyId:selectedRoom[i].keyId,startDate:getDBFormateDate(rowData.startDate),endDate:getDBFormateDate(rowData.endDate),roomStatus:rowData.bookingStatus});
      }
      delete rowData.bookingReferenceCode
      const params = {
        ...rowData,
        startDate:getDBFormateDate(rowData.startDate),
        endDate:getDBFormateDate(rowData.endDate),
        guestId:rowData.guestId.guestId,
        guestBookingDetails:guestBookingDetails,
        bookingRoomAssign:bookingRoomAssign
      };
      props.saveManageBooking({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          onSaveClick();
          displaySuccessMessage(displayMessage);
        },
        onFailure: ({ message: displayMessage }) => {
          setLoading(false);
          displayErrorMessage(displayMessage);
        },
      });
    }
  };

  const updateManageBooking = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      let guestBookingDetails=[];
      for(let i=0;i<newGuestData.length;i++)
      {
        if(roomAssignGuest.find((item) => item.guestId == newGuestData[i].guestId))
        {
          let rooms = roomAssignGuest.find((item) => item.guestId == newGuestData[i].guestId);
          let guestDatas = newGuestData[i];
          guestBookingDetails.push({guestId:rooms.guestId,roomId:rooms.roomId,keyId:rooms.keyId,treatment:guestDatas.treatment});
        }
      }
      let bookingRoomAssign = [];
      for(let i=0;i<selectedRoom.length;i++)
      {
        bookingRoomAssign.push({roomId:selectedRoom[i].roomId,keyId:selectedRoom[i].keyId,bookingRoomAssignmentId:selectedRoom[i].bookingRoomAssignmentId,startDate:getDBFormateDate(rowData.startDate),endDate:getDBFormateDate(rowData.endDate),roomStatus:rowData.bookingStatus});
      }
      const params = {
        ...rowData,
        startDate:getDBFormateDate(rowData.startDate),
        endDate:getDBFormateDate(rowData.endDate),
        guestId:rowData.guestId.guestId,
        guestBookingDetails:guestBookingDetails,
        bookingRoomAssign:bookingRoomAssign
      };
      props.updateManageBooking({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          displaySuccessMessage(displayMessage);
          onSaveClick();
        },
        onFailure: ({ message: displayMessage }) => {
          setLoading(false);
          displayErrorMessage(displayMessage);
        },
      });
    }
  };
//   const displaySuccessMessage = (message) => {
//     setDisplayMessage({
//       open: true,
//       displayMessage: message,
//       severity: "Success",
//     });
//   };
const [eventKey,setEventKey]=useState();

  useEffect(() => {
    getGuestList();
    getRoomStatus();
    getRoomCategories();
    getDefaultRoomCategory();
    getDefaultRoomStatus();
  }, []);

  const getbookingDetails = (e) =>{
    if(e.length==1)
        {
          setRowData({
            ...rowData,
            guestId: {
              guestId: e[0].guestId,
              guestName: e[0].guestName,
            },
            bookingStatus: e[0].bookingStatus,
            startDate: e[0].startDate,
            endDate: e[0].endDate,
            mobile: e[0].mobileNo,
            bookingReferenceCode: e[0].bookingReferenceCode,
          });
          manageBooking_GetRoomAssignDetails(e[0]);
          manageBooking_GetGuestBookingDetails(e[0]);
          // let combineGuestdata = [...newGuestData,{firstName: e[0].firstName,
          //   lastName: e[0].lastName,
          //   dob: e[0].dob,
          //   gender:e[0].gender,
          //   mobileNo: e[0].mobileNo,
          //   guestId: e[0].guestId,
          //   genderName:e[0].genderName,
          //   label:e[0].guestName,
          //   value:e[0].guestId,
          //   treatment:e[0].treatment
          // }]
          //   let Guestdata = combineGuestdata.map((item,index) => ({
          //     ...item,
          //     srNo:index+1
          //   }))
          // setNewGuestData(Guestdata)
        }
        else if(e.length==0)
        {
          setguestList(guestList.map((item) => (item.guestId == rowData.guestId.guestId)?{...item,tableData:{checked:true}}:item))
          setNewGuestData([{...rowData.guestId,srNo:1,treatment:0,tableData:{checked:false}}])
          setRowData({...rowData,mobile:rowData.guestId.mobileNo,startDate:null,endDate:null,bookingReferenceCode:"",bookingStatus:[]})
        }
        else
        {
          toggleSearchRecord(!searchRecord);
        }
  }
const [getANewGusetData,setANewGusetData] = useState();
const [sendDataToAddGuestComponent,toggleSendDataToAddGuestComponent] = useState(false)
  useEffect(() => {
    if(eventKey!=undefined && eventKey === 'Enter')
    {
      if(guestList.find((item) => item.firstName == getANewGusetData.guestId.firstName && item.lastName == getANewGusetData.guestId.lastName))
      {
        getManageBooking();
      }
      else
      {
        toggleSendDataToAddGuestComponent(true)
        toggleAddPrimaryGuest(!addPrimaryGuest);
      }
    }
  },[eventKey,getANewGusetData])
  const [manageBookingList, setManageBookingList] = useState();
  const getManageBooking = (e) => {
    setLoading(true);
    const params = {
      // AUTOCODEUTILITY - Add request params here.
      guestId: props.person ? props.person : rowData.guestId.guestId,
      mobileNo: rowData.mobile,
      referenceCode: rowData.bookingReferenceCode,
    };
    props.getManageBooking({
      params,
      onSuccess: (response) => {
        const { manageBookingList = [] } = response;
        const data = manageBookingList.map((item, index) => ({
          ...item,
          srNo: index + 1,
          dob: getDisplayDate(item.dob),
          startDate: getDisplayDate(item.startDate),
          endDate: getDisplayDate(item.endDate),
          selectedRoom: item.roomName,
          selectedKey: item.keyNo,
          bookingStatus: item.bookingStatus,
        }));
        setManageBookingList(data);
        getbookingDetails(data)
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };
  const dialogContentForSearch = (
      <Grid item xs={12} style={{marginTop:"-30px"}}>
        <MaterialTable
          icons={GridIcons}
          columns={columnGuestDetails}
          data={manageBookingList}
          options={{
            ...options,
            showTitle:false
          }}
          style={style}
        />
      </Grid>
  );
  const dialogContentForAddExistingGuest = (

      <Grid item xs={12} style={{marginTop:"-30px"}}>
        <MaterialTable
          title={"Existing Guest List"}
          icons={GridIcons}
          columns={columnExistingGuestDetails}
          data={guestList}
          options={{
            ...options,
            showTitle:false,
            searchAutoFocus:true,
            selection: true,
            selectionProps: data => (
              {
              disabled:(newGuestData.find((item) => item.guestId === data.guestId))? true : false,
            }
            ),
          }}
          onSelectionChange={(rows) => {
            setChecked(rows)
            // if(newGuestData.length ==0)
            // {
            // }
            // else
            // {
            //   let data = checked;
            //   let a = [];
            //   let b = [] 
            //   for(let i=0;i<rows.length;i++)
            //   {
            //     if(data.find((item) => item.guestId == rows[i].guestId))
            //     {
            //       a.push(rows[i])
            //     }
            //     else
            //     {
            //       b.push(rows[i])
            //     }
            //   }
            //   setChecked([...checked,...b]);
            // }
          }}
          style={style}
        />
      </Grid>
  );
  const dialogContentForRoomAssign = (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div style={{ display: "flex" }}>
          <Grid md={3}>
            <MultipleCheckboxSelect
              items={roomCategoryList}
              keyField={"value"}
              textField={"label"}
              label={"Room Category"}
              checked={defaultRoomCategory}
              setChecked={(e) => {
                setDefaultRoomCategory(e)
              }}
            />
          </Grid>
          <Grid style={{ marginLeft: "20px" }}>
            <InputLabel shrink>Room Status</InputLabel>
            {roomStatus!=undefined  && roomStatus.map((item) => { return (
          <SingleCheckBox 
          checked={(defaultRoomStatus.find((items) => items == item.value))?true:false}
          onChange={(e) =>{
            if((defaultRoomStatus.find((value) => value == item.value))?true:false)
            {
              setDefaultRoomStatus(defaultRoomStatus.filter((items) => items!=item.value));
            }
            else
            {
              setDefaultRoomStatus([...defaultRoomStatus,item.value]);
            }
          }
          }
          label={item.label}
          />
        )})}
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12}>
        <MaterialTable
          title={"Room List"}
          icons={GridIcons}
          columns={columnRoomDetails}
          data={roomList}
          options={options}
          style={style}
        />
      </Grid>
    </Grid>
  );

  const handleCancle = () => {
    toggleAddPrimaryGuest(!addPrimaryGuest);
    toggleSendDataToAddGuestComponent(false);
  };
  const handleSave = (e) => {
    getLatestGuest();
    getGuestList();
    toggleAddPrimaryGuest(!addPrimaryGuest);
    toggleSendDataToAddGuestComponent(false)
  };
  useEffect(() => {
    if(defaultRoomCategory!=undefined && Object.keys(defaultRoomStatus).length>0)
    {
      if (rowData.startDate != null && rowData.endDate !=null) {
        getRoomList();
      }
    }
  },[defaultRoomCategory,defaultRoomStatus,rowData])

  return (
    <div className="holiday-wrapper">
        <Grid container spacing={2}>
        {search && (
          <>
            <Grid item xs={12} md={4} style={{ display: "flex" }}>
              <Autocomplete
                label={"Primary Guest"}
                keyProp={"guestId"}
                labelProp={"guestName"}
                value={rowData.guestId}
                onChange={(event, selectedItem) => {
                  if(typeof selectedItem == "object" && selectedItem!=null)
                  {
                      setRowData({
                        ...rowData,
                        guestId: !!selectedItem ? selectedItem : "",
                      });
                      setANewGusetData({...getANewGusetData,guestId:!!selectedItem ? selectedItem : ""})
                    }
                    else if(typeof selectedItem == "string" && selectedItem!=null)
                    {
                      if(selectedItem.split(' ')[1]!=undefined)
                      {
                        let enterdata ={firstName:selectedItem.split(' ')[0],lastName:selectedItem.split(' ')[1],gender:1,countryId: "1"}
                        setANewGusetData({...getANewGusetData,guestId:!!enterdata ? enterdata : ""})
                      }
                      else
                      {
                        let enterdata ={firstName:selectedItem.split(' ')[0]}
                        setANewGusetData({...getANewGusetData,guestId:!!enterdata ? enterdata : ""})
                      }
                    }
                    setEventKey(event.key)
                  }}
                data={guestList}
              />
              <div style={{marginTop:"12px"}}>
                <Tooltip title="Add Primary Guest">
                  <IconButton
                    aria-label="add"
                    onClick={() => {
                      toggleAddPrimaryGuest(!addPrimaryGuest);
                    }}
                    size="medium"
                  >
                    <AddBox fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                value={rowData.mobile}
                label={"Mobile No."}
                numeric={true}
                isAutoFocus={false}
                onChange={(e) => {
                  setRowData({ ...rowData, mobile: e.target.value });
                  validateField("mobile");
                }}
                error={validationList && validationList.mobile ? true : false}
                errorMessage={"Mobile No is Required"}
                maxLength={10}
                multiline={false}
                rows={0}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                value={rowData.bookingReferenceCode}
                label="BookingCode"
                numeric={true}
                isAutoFocus={false}
                onChange={(e) => {
                  setRowData({
                    ...rowData,
                    bookingReferenceCode: e.target.value,
                  });
                }}
                error={
                  validationList && validationList.bookingReferenceCode
                    ? true
                    : false
                }
                errorMessage={"Enter At List 3 character or value"}
                maxLength={100}
                multiline={false}
                rows={0}
              />
            </Grid>

            <Grid item xs={12} md={2} style={{ display: "flex", marginTop: "16px" }}>
                <Button
                  onClick={(e) => {
                    getManageBooking(e);
                  }}
                  customClass="button button-primary"
                  label={labels.searchButton}
                />
              <div style={{marginLeft:"10px"}}>
                <Button
                  autoFocus
                  onClick={() => {
                    setRowData({
                      ...rowData,
                      guestId: {},
                      bookingStatus: "",
                      startDate: null,
                      endDate: null,
                      mobile: "",
                      bookingReferenceCode: "",
                    });
                    SetRoomAssignGuest([]);
                    setNewGuestData([]);
                    SetSelectedRoom([])
                  }}
                  customClass="button button-black mr-2"
                  label={labels.clearButton}
                />
              </div>
            </Grid>
          </>
        )}
        <hr style={{position: "relative",
        width:"100%",
        border: "none",
        height: "2px",
        background: "lightgrey"}}/>
        <Grid item xs={12} md={4}>
          <DatePicker
            defaultValue={
              rowData.startDate !== null
                ? getDisplayDate(rowData.startDate)
                : null
            }
            label="Start Date"
            tooltipText={"Start Date"}
            onChange={(date) => {
              setRowData({ ...rowData, startDate: date });
              validateField("startDate");
            }}
            format={"dd-MMM-yyyy"}
            placeholder={"dd-MMM-yyyy"}
            disablePast={true}
            required={true}
            error={validationList && validationList.startDate ? true : false}
            errorMessage={"Start Date is Required"}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePicker
            defaultValue={
              rowData.endDate !== null ? getDisplayDate(rowData.endDate) : null
            }
            label="End Date"
            tooltipText={"End Date"}
            onChange={(date) => {
              setRowData({ ...rowData, endDate: date });
              validateField("endDate");
            }}
            format={"dd-MMM-yyyy"}
            placeholder={"dd-MMM-yyyy"}
            disablePast={true}
            required={true}
            error={validationList && validationList.endDate ? true : false}
            errorMessage={"End Date is Required"}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Select
            data={bookingList}
            required={true}
            value={rowData.bookingStatus}
            label={"BookingStatus"}
            onChange={(e) => {
              setRowData({ ...rowData, bookingStatus: e.target.value });
              validateField("bookingStatus");
            }}
            error={
              validationList && validationList.bookingStatus ? true : false
            }
            errorMessage={"BookingStatus is Required"}
          />
        </Grid>

        <Grid item xs={12} style={{ justifyContent: "space-" }}>
          <div>
            <MaterialTable
              icons={GridIcons}
              title={`Add Guest (${newGuestData.length})`}
              columns={columnsNewGuest}
              data={newGuestData}
              style={style}
              options={{
                ...options,
                paging: false,
                search: false,
                showTextRowsSelected:false,
                detailPanelType:"multiple"
              }}
              actions={[
                {
                  icon: () => {
                    return (
                      <Button
                        onClick={(e) => {
                          toggleAddMore(!addMore);
                        }}
                        customClass="button button-primary"
                        label={labels.addMore}
                      />
                    );
                  },
                  tooltip: "Add Existing Guest",
                  isFreeAction: true,
                },
                {
                  icon: () => {
                    return (
                      <AddBox
                        onClick={() => {
                          toggleAddPrimaryGuest(!addPrimaryGuest);
                          toggleSetPrimaryGuestVAlue(false);
                        }}
                      />
                    );
                  },
                  tooltip: "Add New Guest",
                  isFreeAction: true,
                },
              ]}
            />
              {/* <Button
              onClick={(e) => {
                toggleAddMore(!addMore);
              }}
              customClass="button button-primary"
              label={labels.addMore}
            /> */}
          </div>
          <div>
            <MaterialTable
              icons={GridIcons}
              title={`Assign Room (${roomAssignGuest.length})`}
              columns={columnsRoom}
              data={roomAssignGuest}
              style={style}
              options={{
                ...options,
                paging: false,
                search: false,
              }}
              actions={[
                {
                  icon: () => {
                    return (
                      <AddBox
                        onClick={() => {
                          if (rowData.startDate != null && rowData.endDate !=null) {
                            toggleRoomRecord(!roomRecord);
                            getRoomList();
                          }
                          else
                          {
                            displayErrorMessage("Start Date, End Date is required")
                          }
                        }}
                      />
                    );
                  },
                  tooltip: "Assign Room",
                  isFreeAction: true,
                },
              ]}
            />
          </div>
          {/* )} */}
        </Grid>

        <Grid item xs={12} style={{ justifyContent: "space-" }}>
          <div className="d-flex align-items-center justify-content-end">
            {cancelButton && (
              <Button
              autoFocus
              onClick={() => {
                setLoading(false);
                onCancelClick();
              }}
              customClass="button button-black mr-2"
              label={labels.cancelButton}
              />
              )}
              {confirmButton &&(
                <Button
                  onClick={(e) => {
                    currentOpr === "Add"
                      ? addManageBooking(e)
                      : updateManageBooking(e);
                  }}
                  customClass="button button-primary"
                  label={labels.confirmBooking}
                />
              )}
          </div>
        </Grid>
      </Grid>
      {searchRecord && (
        <DialogControl
          open={searchRecord}
          dialogTitleText={`Search Booking`}
          dialogContent={dialogContentForSearch}
          submitButtonText={"Ok"}
          onCancel={() => {
            toggleSearchRecord(!searchRecord);
            setLoading(false);
          }}
          onSubmit={(e) => {
            toggleSearchRecord(!searchRecord);
            setRowData({
              ...rowData,
              guestId: {
                guestId: selectedGuest.guestId,
                guestName: selectedGuest.guestName,
              },
              bookingStatus: selectedGuest.bookingStatus,
              startDate: selectedGuest.startDate,
              endDate: selectedGuest.endDate,
              mobile: selectedGuest.mobileNo,
              bookingReferenceCode: selectedGuest.bookingReferenceCode,
            });
              manageBooking_GetRoomAssignDetails(selectedGuest);
              manageBooking_GetGuestBookingDetails(selectedGuest);
            setLoading(false);
          }}
        />
      )}
      {roomRecord && (
        <DialogControl
          open={roomRecord}
          dialogTitleText={`Assign Room | 
          ${getDisplayDate(
            rowData.startDate
          )} To ${getDisplayDate(rowData.endDate)}`}
          dialogContent={dialogContentForRoomAssign}
          onCancel={() => {
            toggleRoomRecord(!roomRecord);
            setRoomSelected([]);
            setLoading(false);
          }}
          onSubmit={(e) => {
            let  combinedata = [...roomAssignGuest,...roomselected];
            let data = combinedata.map((element, index) => ({
              ...element,
              srNo: index + 1,
            }));
            SetRoomAssignGuest(data);
            setRoomSelected([]);
            toggleRoomRecord(!roomRecord);
            setLoading(false);
          }}
        />
      )}
      {addPrimaryGuest && (
        <DialogControl
          open={addPrimaryGuest}
          dialogTitleText={`Add Guest`}
          dialogContent={
            (sendDataToAddGuestComponent)?
            <AddGuest
              {...props}
              data={getANewGusetData.guestId}
              onCancelClick={handleCancle}
              onSaveClick={handleSave}
              displaySuccessMessage={displaySuccessMessage}
              displayErrorMessage={displayErrorMessage}
            />
            :
            <AddGuest
              {...props}
              onCancelClick={handleCancle}
              onSaveClick={handleSave}
              displaySuccessMessage={displaySuccessMessage}
              displayErrorMessage={displayErrorMessage}
            />
          }
          submitAction={false}
          cancelAction={false}
          onCancel={() => {
            toggleAddPrimaryGuest(!addPrimaryGuest);
            toggleSendDataToAddGuestComponent(false);
            setLoading(false);
          }}
        />
      )}

      {addMore && (
        <DialogControl
          open={addMore}
          dialogTitleText={`Add Existing Guest`}
          dialogContent={dialogContentForAddExistingGuest}
          submitButtonText={"Ok"}
          onCancel={() => {
            toggleAddMore(!addMore);
            setChecked([])
            setLoading(false);
          }}
          onSubmit={(e) => {
            toggleAddMore(!addMore);
            let data = checked.map((datas, index) => ({
              ...datas,
              srNo: index + 1,
              treatment:(datas.treatment == undefined)? 0 : datas.treatment,
              tableData:{id:datas.tableData.id,checked:false}
            }));
            setNewGuestData(data);
            setChecked([]);
            setLoading(false);
          }}
        />
      )}
      {checkedOutDialog && (
        <ConfirmationDialog
          open={checkedOutDialog}
          dialogTitle="Checked Out Room"
          dialogContentText="Are you sure want to Checked Out this?"
          cancelButtonText="Cancel"
          okButtonText="CheckedOut"
          onCancel={() => {
            setCheckedOutDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            checkedOutPerticularRoom();
            setCheckedOutDialog(false);
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

