import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { AddBox, Clear, Edit, Refresh, CheckCircleOutline, HighlightOff, Cancel } from "@material-ui/icons";
import MaterialTable from "material-table";
import React, { forwardRef, useEffect, useState, useRef } from "react";
import DatePicker from "../../../components/core/DatePicker";
import DialogControl from "../../../components/core/Dialog";
import DisplayMessage from "../../../components/core/DisplayMessage";
import Loading from "../../../components/core/Loading";
import RadioGroup from "../../../components/core/RadioGroup";
import TextField from "../../../components/core/TextField";
import Select from "../../../components/core/Select";
import Button from "../../../components/core/Button";
import {
    actionColumnStyle, GridIcons,
    options,
    style,
    tableoptions
} from "../../../components/custom/GridConfig";
import { isActiveOptions } from "../../../Config.json";
import {
    getDBFormateDateTime, getDisplayDate
} from "../../../Utils/DateTimeUtils.js";
import { useReactToPrint } from 'react-to-print';
import PrintDialogControl from "../../../components/core/PrintTableDialog";



/**
 * @author Dileep Lohar
 */
export default function DailyTherapyList(props) {
    const componentRef = useRef();
    //   const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [validationList, setValidationList] = useState({});
    const [displayMessage, setDisplayMessage] = useState({});
    const [editRecord, toggleEditRecord] = useState(false);
    const [currentOpr, setCurrentOpr] = useState();
    const [idEdit, setIdEdit] = useState();
    var [rowData, setRowData] = useState([]);
    const [dailyTherapyList, setDailyTherapyList] = useState([]);
    const [dailyTherapyTypeList, setDailyTherapyTypeList] = useState([]);
    const [dailyTherapyUserList, setDailyTherapyUserList] = useState([]);
    const [dailyTherapySlotList, setDailyTherapySlotList] = useState([]);
    const [editGuestId, setEditGuestId] = useState([]);
    const [filterDate, setFilterDate] = useState(new Date());
    const [filterDateError, setFilterDateError] = useState(false);
    const [typeName, setTypeName] = useState([]);
    const [getdata, setGetdata] = useState([]);
    const [showGrid, setShowGrid] = useState(false);

    const { operationRights } = props;
    const { add, edit } = operationRights;


    const today = new Date().toDateString()


    const checkDate = (dateString) => {
        const gettime = new Date(dateString).toLocaleDateString().split("/")
        const splitdate = gettime[2] + '-' + gettime[1] + '-' + gettime[0]
        return splitdate
    }

    const getDailytherapyList = () => {
        setLoading(true);
        const params = {
            date: checkDate(filterDate)
        };
        props.getDailytherapy({
            params,
            onSuccess: (response) => {
                setLoading(false);
                setShowGrid(true)
                const { dailytherapy } = response;
                setDailyTherapyList(dailytherapy);
            },
            onFailure: ({ message }) => {
                setLoading(false);
                displayErrorMessage(message);
            },
        });
    };


    useEffect(() => {
        // if (filterDate != null) {
            getDailytherapyList()
            getDailytherapyTypeNameList();
            getDailytherapySlotList()
                getdatalist()
    }, []);

    useEffect(() =>{
        getdatalist()
    },[dailyTherapyList])


    const getdatalist = () => {
            var getalldata = []
            dailyTherapyList && dailyTherapyList.map((data1, index) => (
            getalldata.push({ guestId: data1.guestId, guestname: data1.guestName, srNo: index + 1 }),
            data1.dailyReport.daily.type.map((data, i) => {
                if (typeName && typeName.includes(data.typeName.text)) {
                    getalldata[index] = { ...getalldata[index], [data.typeName.text]: data.startTime.text, [data.therapyId.text]: data.therapySlotId.text}
                } else {
                    getalldata[index] = { ...getalldata[index], [dailyTherapyTypeList[i] && dailyTherapyTypeList[i].field]: null }
                }
            }
            )
        )
        )
        setGetdata(getalldata)
    }

 

    var columns = [
        {
            title: "Action",
            ...actionColumnStyle,
            hidden: !edit,
            render: ({ tableData: { id }, guestId }) => {

                return (
                    <div className="table-edit-controls">
                        {

                            editRecord && idEdit == id ?
                                <>
                                    <Tooltip title="Save">
                                        <IconButton
                                            aria-label="Save"
                                            onClick={() => {
                                                updateDailytherapyUserList()
                                            }}
                                        >
                                            <CheckCircleOutline fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Cancel">
                                        <IconButton
                                            aria-label="Cancel"
                                            onClick={() => {
                                                setIdEdit("");
                                                toggleEditRecord(false);
                                                getDailytherapyList()
                                                getdatalist()
                                                getDailytherapyList()
                                                //   getDailytherapyUserList(id)
                                                // setValidationList({});
                                                setRowData([])
                                            }}
                                        >
                                            <Cancel fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </>
                                :
                                today == (filterDate && filterDate.toDateString()) ?
                                <Tooltip title="Edit">
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => {
                                            setIdEdit(id);
                                            setEditGuestId(guestId)
                                            toggleEditRecord(true);
                                            setRowData([])
                                            getDailytherapyList()
                                            getdatalist()
                                    getDailytherapyList()
                                        }}
                                    >
                                        <Edit fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            : <></>
                        }

                    </div>
                );
            },
            printable: false,
        },
        {
            title: "Sr#",
            field: "srNo",
            editable: "never",
            cellStyle: {
                textAlign: "center",
              }
        },
        {
            title: "Guest",
            field: "guestname",
        }
    ];

    // var printcolumns = [
    //     {
    //         title: "Sr#",
    //         field: "srNo",
    //         editable: "never",
    //     },
    //     {
    //         title: "Guest",
    //         field: "guestname",
    //     }
    // ];

    // if(dailyTherapySlotList && dailyTherapyList){
    dailyTherapyTypeList.map((data, i) =>
        columns.push({
            title: data.title, field: data.field
            , render: ({ tableData: { id },guestId }) => {
                return (
                    <>
                        {getdata[id][data.therapyId] != null ? editRecord && idEdit == id ?
                            <Select
                                id={data.therapyId}
                                label={data.title}
                                value={getdata[id][data.therapyId]}
                                data={dailyTherapySlotList.filter((d => d.type == data.therapyId))}
                                onChange={(event) => {

                                    getdata.map((Gdata,i) => {
                                        if(Gdata.guestId == guestId){
                                            const filedname = getdata[i][data.therapyId]
                                            getdata[i][data.therapyId] = event.target.value
                                        }
                                    })

                                    setRowData([...rowData, { therapyid: data.therapyId, value: event.target.value }])

                                    rowData.map((row, i) => {
                                        if (rowData[i].therapyid == data.therapyId) {
                                            rowData[i].value = event.target.value
                                        } else {
                                            setRowData([...rowData, { therapyid: data.therapyId, value: event.target.value }])
                                        }
                                    })


                                    // setRowData({ ...rowData, therapyid: data.therapyId, value: event.target.value })

                                }}

                            />
                            :
                            <div className="input-disabled">
                                <Select
                                    label={data.title}
                                    value={getdata[id][data.therapyId]}
                                    // value={getdata[id].dailyReport && getdata[id].dailyReport.daily.type[i].therapySlotId}
                                    data={dailyTherapySlotList.filter((d => d.type == data.therapyId))}
                                    disabled={true}
                                    onChange={(event, selectedRoom) => {
                                    }}
                                />
                            </div>
                            : <span>-</span>
                        }
                    </>
                );
            },
        })
    )
    // }

    


    const displayErrorMessage = (message) => {
        setDisplayMessage({
            open: true,
            displayMessage: message,
            severity: "error",
        });
    };

    
    const getDailytherapyTypeNameList = () => {
        setLoading(true);
        props.getDailytherapyTypeName({
            onSuccess: (response) => {
                setLoading(false);
                const { dailytherapytypename } = response;

                var fieldname = []
                dailytherapytypename.map((data) => {
                    fieldname.push(data.field)

                })
                setTypeName(fieldname)
                setDailyTherapyTypeList(dailytherapytypename)

            },
            onFailure: ({ message }) => {
                setLoading(false);
                displayErrorMessage(message);
            },
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
        const divisionName = !validateField("divisionName");
        const formedDate = !validateField("formedDate");
        const description = !validateField("description");

        setValidationList({ divisionName, formedDate, description });
        return !divisionName && !formedDate && !description;
    };


    const updateDailytherapyUserList = () => {
        setLoading(true);
        const params = {
            GuestId: editGuestId,
            Data: {
                root: {
                    body: rowData
                }
            },
            date: checkDate(filterDate)
        };
        props.updateDailytherapy({
            params,
            onSuccess: ({ message: displayMessage }) => {
                setDisplayMessage({
                    open: true,
                    displayMessage,
                    severity: "success",
                });
                setRowData([])
                getDailytherapyList()
                getDailytherapyTypeNameList();
                getDailytherapySlotList()
                toggleEditRecord(false)
                setLoading(false);
            },
            onFailure: ({ message }) => {
                setLoading(false);
                displayErrorMessage(message);
            },
        });
    };

    const getDailytherapySlotList = () => {
        setLoading(true);
        props.getDailytherapySlot({
            onSuccess: (response) => {
                setLoading(false);
                const { dailytherapyslot } = response;
                setDailyTherapySlotList(dailytherapyslot);
            },
            onFailure: ({ message }) => {
                setLoading(false);
                displayErrorMessage(message);
            },
        });
    };

    const handlePrint = () => {
        setCurrentOpr(true)
    }

   

    return (
        <>
            {/* {!editRecord ? */}
            <div className="card selection-card selection-card-two-columns mb-3">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={3}>
                        <DatePicker
                            minDateMessage={"Please select a valid date!"}
                            variant="inline"
                            margin="none"
                            label="Date"
                            onChange={(date) => {
                                setShowGrid(false)
                                setFilterDate(date);
                                setFilterDateError(false);
                            }}
                            defaultValue={filterDate}
                            required={true}
                            error={filterDateError}
                            isInline={true}
                        />
                    </Grid>

                    <Grid item xs={12} md={4} lg={3}>
                        <div className="selection-card-actions">
                            <Button
                                label={"Go"}
                                customClass="button button-primary mr-2"
                                onClick={() => {
                                    if (filterDate != null) {
                                        setGetdata([])
                                        setDailyTherapySlotList([])
                                        getDailytherapyTypeNameList();
                                        getDailytherapySlotList()
                                        
                                        getDailytherapyList()
                                        getdatalist()
                                        // setShowGrid(true)
                                        
                                    } else {
                                        filterDate === null &&
                                            setFilterDateError(true);
                                    }
                                }}
                            />
                        </div>
                    </Grid>

                </Grid>
            </div>
            {showGrid ? 
            <div className="card">
                <div className="table-wrapper">
                    <MaterialTable
                        icons={{
                            ...GridIcons,
                            Edit: forwardRef((props, ref) => (
                                <Edit
                                    {...props}
                                    ref={ref}
                                    onClick={() => setValidationList({})}
                                />
                            )),
                            Clear: forwardRef((props, ref) => (
                                <Clear
                                    {...props}
                                    ref={ref}
                                    onClick={() => setValidationList({})}
                                />
                            )),
                        }}
                        title={`List of Daily Therapy`}
                        columns={columns}
                        data={getdata}
                        options={tableoptions}
                        style={style}
                        actions={
                            add === true
                                ? [
                                    {
                                        icon: () => {
                                            return (
                                                <Refresh
                                                    onClick={() => {
                                                    }}
                                                />
                                            );
                                        },
                                        tooltip: "Refresh Data",
                                        isFreeAction: true,
                                    }
                                ]
                                :<></>
                        }
                    />
                    {loading && <Loading />}
                    <DisplayMessage
                        {...displayMessage}
                        onClose={() => setDisplayMessage({ open: false })}
                    />
                </div>
            </div>
            :
            <></>
            }
            <DisplayMessage
                {...displayMessage}
                onClose={() => setDisplayMessage({ open: false })}
            />
        </>
    );
}