import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Edit, Delete, Close, Refresh, AddBox, Save, Print  } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import moment from "moment";
import Loading from "../../../components/core/Loading";
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
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";
import {
  getDisplayDate,
  getDBFormateDate,
  getPrintStampDateTime
} from "../../../Utils/DateTimeUtils.js";
import PrintableQRCode from "../../../components/custom/PrintableQRCode";

/**
 * Add, update operations based on rights for QR
 * Add, Update items to QR
 * @author Imran Patwa
 */

export default function QR(props) {
  const [data, setData] = useState([]);
  const [qrData, setQrData] = useState([]);
  const [printHistoryData, setPrintHistoryData] = useState([]);  
  const [qrMasterIdForHistory, setQrMasterIdForHistory] = useState(0);
  const [rowData, setRowData] = useState({});
  const [reprintRowData, setReprintRowData] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [printRecord, togglePrintRecord] = useState(false);
  const [rePrintRecord, toggleReprintRecord] = useState(false);
  const [generateQRCode, toggleGenerateQRCode] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [id, setId] = useState();
  const [printId, setPrintId] = useState();
  const [startDate, setStartDate] = useState("");
  const { operationRights, serverDate } = props;
  const { add, edit, delete: allowDelete } = operationRights;
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gridNumberOfColumns, setGridNumberOfColumns] = useState(0);

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const todayDate = moment(serverDate, "YYYY-MM-DD HH:mm:ss").format(
    "YYYY-MM-DD"
  );

  const isPastDatedHoliday = (date) => {
    const isPastDated = moment(date).isSameOrBefore(todayDate);
    return isPastDated;
  };

  useEffect(() => {
    getQRList();   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(qrData.length > 0){
      console.log(qrData);
      printClickNew();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[qrData]);

  useEffect(() => {
    if(rePrintRecord && reprintRowData!=null){
      console.log(reprintRowData);
      printDownloadQR(reprintRowData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[reprintRowData]);

  useEffect(() => {
    if(qrMasterIdForHistory > 0){
      getQRPrintHistoryData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[qrMasterIdForHistory]);

  

  const getQRList = () => {
    const now = Date.now();
    setLoading(true);
    props.getQRList({
      onSuccess: (response) => {
        setLoading(false);
        const { qrCodeList = [] } = response;
        const data = qrCodeList.map((item, index) => ({
          ...item,
          endDate: getDisplayDate(item.endDate),
          startDate: getDisplayDate(item.startDate),
          allowEdit: isPastDatedHoliday(item.startDate)
        }));
        setData(data);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const getQRPrintHistoryData = () => {
    setLoading(true);
    const params = {
      qrMasterId : qrMasterIdForHistory
    };
    props.getQRPrintHistory({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { qrPrintHistoryData = [] } = response;
        const printHistorydata = qrPrintHistoryData.map((history, index) => ({
          ...history,
          createdDate: getPrintStampDateTime(history.createdDate)
        }));
        debugger;
        setPrintHistoryData(printHistorydata);
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
    setRowData({
      name: "",
      description: "",
      point: "",
      startDate: null,
      endDate: null,
      allowEdit:false,
      sequenceCode:""
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
    const name = !validateField("name");
    const description = !validateField("description");
    const point = !validateField("point");
    const sequenceCode = !validateField("sequenceCode");
    const startDate = !validateField("startDate");
    const endDate = !validateField("endDate");    

    setValidationList({
      name,
      description,
      point,
      sequenceCode,
      startDate,
      endDate
    });
    return (
      !name &&
      !description &&
      !point &&
      !sequenceCode &&
      !startDate &&
      !endDate
    );
  };

  const addQR = () => {
    if (checkAllValidation()) {
      setLoading(true);
      const params = {
        ...rowData,
        startDate: getDBFormateDate(rowData.startDate),
        endDate: getDBFormateDate(rowData.endDate)       
      };
      props.addQR({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          getQRList();
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

  const updateQR = () => {    
    if (checkAllValidation()) { 
      setLoading(true);    
      const params = {
        ...rowData,
        startDate: getDBFormateDate(rowData.startDate),
        endDate: getDBFormateDate(rowData.endDate)
      };
      props.updateQR({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          getQRList();
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

  const deleteQR = (e) => {    
    const { qrMasterId, updatedDate } = data[id];
      setLoading(true);     
      const params = {
        qrMasterId, updatedDate 
      };
      props.deleteQR({
        params,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          getQRList();
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

    const printDownloadQR = (rowsData) => {   
     
      const { qrMasterId, updatedDate, numberOfPrints, qrPrintId, numberOfColumns } = rowsData;

      const qrCodes = [];
      // let i = 0;
      // while (i < numberOfPrints) {
      //   let codes = +new Date()+ "" +i;
      //   qrCodes.push(codes);
      //   i++;
      // }
      
        setLoading(true);     
        const params = {
          qrMasterId, 
          updatedDate,
          numberOfPrints,
          qrCodes:JSON.stringify(qrCodes),
          qrPrintId,
          numberOfColumns
        };
        props.printDownloadQR({
          params,
          onSuccess: (response) => {
            console.log(response);
            let { qrCodeData = "[]" } = response;
            // qrCodeData = JSON.parse(qrCodeData);
            setLoading(false);
            setGridNumberOfColumns(numberOfColumns);            
            setQrData(qrCodeData);
            togglePrintRecord(!printRecord);        
            getQRList();
          },
          onFailure: ({ message }) => {
            setLoading(false);
            displayErrorMessage(message);
          },
        });
    };

    const generateQRCodes = (e) => {   
     
      const { qrMasterId, updatedDate, numberOfPrints } = rowData;

      const qrCodes = [];
      // let i = 0;
      // while (i < numberOfPrints) {
      //   let codes = +new Date()+ "" +i;
      //   qrCodes.push(codes);
      //   i++;
      // }
      
        setLoading(true);     
        const params = {
          qrMasterId, 
          updatedDate,
          numberOfPrints,
          qrCodes:JSON.stringify(qrCodes)
        };
      
        props.generateQRCode({
          params,
          onSuccess: ({ message: displayMessage }) => {
            setLoading(false);
            getQRList();
            setDisplayMessage({
              open: true,
              displayMessage,
              severity: "success",
            });
            toggleGenerateQRCode(!generateQRCode);
          },
          onFailure: ({ message }) => {
            setLoading(false);
            displayErrorMessage(message);
          },
        });
    };



  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        qrMasterId: rowData.qrMasterId,
        name: rowData.name,
        description: rowData.description,
        point: rowData.point,
        sequenceCode: rowData.sequenceCode,
        numberOfCodes: rowData.numberOfCodes,
        startDate: rowData.startDate,
        endDate: rowData.endDate,
        updatedDate: rowData.updatedDate,
        allowEdit:rowData.allowEdit
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  useEffect(() => {
    if (generateQRCode) {
      const rowData = data[id];

      setRowData({
        qrMasterId: rowData.qrMasterId,
        name: rowData.name,
        description: rowData.description,
        point: rowData.point,
        sequenceCode:rowData.sequenceCode,
        startDate: rowData.startDate,
        endDate: rowData.endDate,
        updatedDate: rowData.updatedDate,  
        numberOfPrints : rowData.numberOfPrints   
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateQRCode]);

  useEffect(() => {
    if (rePrintRecord) {      
      const rowDatae = printHistoryData[printId];
      setReprintRowData({
          qrMasterId: rowDatae.qrMasterId,       
          updatedDate: rowDatae.updatedDate,  
          numberOfPrints : rowDatae.numberOfCodes,
          numberOfColumns : rowDatae.numberOfColumns,
          qrPrintId : rowDatae.qrPrintId
      });
    }
    else
      setReprintRowData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rePrintRecord]);

  useEffect(() => {
    setQrMasterIdForHistory(0);
    if (printRecord) {
      const rowData = data[id];
      setQrMasterIdForHistory(rowData.qrMasterId);
      setRowData({
        qrMasterId: rowData.qrMasterId,
        name: rowData.name,
        description: rowData.description,
        point: rowData.point,
        sequenceCode:rowData.sequenceCode,
        startDate: rowData.startDate,
        endDate: rowData.endDate,
        updatedDate: rowData.updatedDate,  
        numberOfPrints : rowData.numberOfPrints,
        availableCodes : rowData.availableCodes,
        qrPrintId : rowData.qrPrintId   
      });
    }
    else
      toggleReprintRecord(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printRecord]);
 

  const baseColumns = [
    {
      title: "Action",
      ...actionColumnStyle,
      hidden: !edit,
      render: ({ tableData: { id }, itemList = "" }) => {
        return (
          <div className="">
            <Tooltip title="Generate QR Code">
              <IconButton
                aria-label="generate"
                onClick={() => {
                  setId(id);
                  toggleGenerateQRCode(true);
                }}
                size="small"
              >
                <Save fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Print">
              <IconButton
                aria-label="print"
                onClick={() => {
                  setId(id);
                  togglePrintRecord(true);
                }}
                size="small"
              >
                <Print fontSize="small" />
              </IconButton>
            </Tooltip>
         

            {(
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
            
            {
            (
              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setId(id);
                    setDeleteDialog(true);
                  }}
                >
                  <Delete fontSize="small" />
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
    },
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Description",
      field: "description",
    },
    {
      title: "Point",
      field: "point",
    },
    {
      title: "Sequence Code",
      field: "sequenceCode",
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

  const reprintColumns = [
    {
      title: "Action",
      ...actionColumnStyle,      
      render: ({ tableData: { id } }) => {
        return (
          <div className="">      

            <Tooltip title="Reprint">
              <IconButton
                aria-label="print"
                disabled={!printHistoryData[id].reprintAllowed[0]}
                onClick={() => {
                  setPrintId(id);
                  toggleReprintRecord(true);
                  
                }}
                size="small"
              >
                <Print fontSize="small" />
              </IconButton>
            </Tooltip>         
          </div>
        );
      },
    },
    {
      title: "Sr.No",
      field: "srNo",
    },
    {
      title: "No. Codes",
      field: "numberOfCodes",
    }, 
    {
      title: "Printed On",
      field: "createdDate",
    }, 
    {
      title: "Printed By",
      field: "printedBy",
    },
    
  ];

  const dialogTitleText = currentOpr === "Add" ? "Add QR Code" : `Edit QR Code`;

  const dialogContent = (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required={true}
            value={rowData.name}
            label="Name"
            numeric={false}
            disabled={rowData.allowEdit}
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
        <Grid item xs={12} md={1}>
          <TextField
            required={true}
            value={rowData.sequenceCode}
            label="Code"
            numeric={false}
            disabled={rowData.qrMasterId!=null && rowData.qrMasterId!=0  && rowData.numberOfCodes!=null && rowData.numberOfCodes!=0}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, sequenceCode: e.target.value });
              validateField("sequenceCode");
            }}
            error={validationList && validationList.sequenceCode ? true : false}
            errorMessage={"Sequence Code is Required"}
            maxLength={3}
          />
        </Grid>    

        <Grid item xs={12} md={2}>
          <TextField
            required={true}
            value={rowData.point}
            label="QR Point"
            numeric={true}
            disabled={rowData.allowEdit}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, point: e.target.value });
              validateField("point");
            }}
            error={validationList && validationList.point ? true : false}
            errorMessage={"QR Point is Required"}
            maxLength={4}
          />
        </Grid>    

         <Grid item xs={12} md={3}>
          <TextField
            required={true}
            value={rowData.numberOfCodes}
            label="Number Of Codes"
            numeric={true}
            disabled = {currentOpr === "Update"}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, numberOfCodes: e.target.value });
              validateField("numberOfCodes");
            }}
            error={validationList && validationList.numberOfCodes ? true : false}
            errorMessage={"Number of Codes is Required"}
            maxLength={6}
          />
        </Grid>   

        <Grid item xs={12} md={6}>
          <DatePicker
            required={true}
            variant="inline"
            margin="none"
            label="Start Date"
            disabled={rowData.allowEdit}
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
        <Grid item xs={12} md={6}>
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
        
        <Grid item xs={12} md={12}>
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
        
      </Grid>
    </div>
  );

  /* 3rd party library to generate QR code */

const printClickNew = async () => {
  var divContents = document.getElementById("printQR").innerHTML;
  console.log("---", divContents);
  var printWindow = window.open("", "", "height=200,width=400");
  printWindow.document.write(
    "<html><head><title>Print from Smart Laboratories</title>"
  );
  printWindow.document.write("</head><body >");
  printWindow.document.write(divContents);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
};

  const formContent = (
    <div>
                    
        <Grid>
            Available QR Codes : {rowData.availableCodes}
          <Grid >
            <TextField
              required={true}
              value={rowData.numberOfPrints}
              label="Number of Prints"
              numeric={true}
              isAutoFocus={true}
              onChange={(e) => {
                setRowData({ ...rowData, numberOfPrints: e.target.value });
                validateField("numberOfPrints");
              }}
              error={
                validationList && validationList.numberOfPrints
                  ? validationList.numberOfPrints
                  : false
              }
              errorMessage={"Number of Prints is Required"}
              maxLength={5}
            />
          </Grid>
          <Grid >
            <TextField
              required={true}
              value={rowData.numberOfColumns}
              label="Number of Columns"
              numeric={true}
              isAutoFocus={true}
              onChange={(e) => {
                setRowData({ ...rowData, numberOfColumns: e.target.value });
                validateField("numberOfColumns");
              }}
              error={
                validationList && validationList.numberOfColumns
                  ? validationList.numberOfColumns
                  : false
              }
              errorMessage={"Number of Columns is Required"}
              maxLength={1}             
            />
          </Grid>
        </Grid>
      
      <div>
        <div className="card">
          <div className="table-wrapper editable-table-wrapper">
            <MaterialTable
              icons={GridIcons}
              title={"QR Print History"}
              columns={reprintColumns}
              data={printHistoryData}
              style={style}
              options={options}            
            ></MaterialTable>
          </div>
        </div>
       </div>
    </div>
  );

  const formReprintContent = (

    <div>
        <div className="card">
        <div className="table-wrapper editable-table-wrapper">
          <MaterialTable
            icons={GridIcons}
            title={"QR Print History"}
            columns={reprintColumns}
            data={data}
            style={style}
            options={options}            
          ></MaterialTable>
        </div>
        </div>
    </div>
  );


  const formGenerateQRCode = (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            required={true}
            value={rowData.numberOfPrints}
            label="Generate Codes"
            numeric={true}
            isAutoFocus={true}
            onChange={(e) => {
              setRowData({ ...rowData, numberOfPrints: e.target.value });
              validateField("numberOfPrints");
            }}
            error={
              validationList && validationList.numberOfPrints
                ? validationList.numberOfPrints
                : false
            }
            errorMessage={"Number of Codes is Required"}
            maxLength={6}
          />
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      (
          <div className="card">
            <div className="table-wrapper editable-table-wrapper">
              <MaterialTable
                icons={GridIcons}
                title={"List of QR"}
                columns={baseColumns}
                data={data}
                style={style}
                options={options}
                actions={
                  add
                    ? [
                      {
                        icon: () => {
                          return (
                            <Refresh
                              onClick={() => {
                                getQRList();
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
                        tooltip: "Add QR",
                        isFreeAction: true,
                      },
                    ]
                    : [
                      {
                        icon: () => {
                          return (
                            <Refresh
                              onClick={() => {
                                getQRList();
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
      {editRecord && (
        <DialogControl
          maxWidth={"md"}
          open={editRecord}
          dialogTitleText={dialogTitleText}
          dialogContent={dialogContent}
          onCancel={() => {
            toggleEditRecord(!editRecord);
            setLoading(false);
          }}
          onSubmit={() => {
            currentOpr === "Add" ? addQR() : updateQR();
          }}
        />
      )}
      {generateQRCode && (
        <DialogControl
          open={generateQRCode}
          dialogTitleText={"Generate QR Code"}
          dialogContent={formGenerateQRCode}
          onCancel={() => {
            toggleGenerateQRCode(!generateQRCode);
          }}
          onSubmit={(e) => {
            generateQRCodes(e);
          }}
          maxWidth="sm"
          fullWidth="false"
        />
      )}
      {printRecord && (
        <DialogControl
          open={printRecord}
          dialogTitleText={"Print / Download QR Codes"}
          dialogContent={formContent}
          onCancel={() => {
            togglePrintRecord(!printRecord);
          }}
          onSubmit={(e) => {
            if(rowData.numberOfPrints > rowData.availableCodes)
              displayErrorMessage(`Available QR Codes to Print / Download are only ${rowData.availableCodes}`);
            else if(rowData.numberOfPrints > 10000)
              displayErrorMessage(`You can print maximum 10000 codes at a time only.`);
            else
              printDownloadQR(rowData);
          }}
          maxWidth="sm"
          fullWidth="false"
        />
      )}

       {loading && <Loading />}
      {deleteDialog && (
        <ConfirmationDialog
          open={deleteDialog}
          dialogTitle="Delete QR"
          dialogContentText="Are you sure you want to delete this QR ?"
          cancelButtonText="Cancel"
          okButtonText="Delete"
          onCancel={() => {
            setDeleteDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            setDeleteDialog(false);
            deleteQR(e);
          }}
        />
      )}

      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    
      <div style={{ display: "none", backgroundColor: "white" }} id={"printQR"}>
      {(printRecord || rePrintRecord) && qrData.length > 0 && ( 
        <PrintableQRCode
          title={"QR Codes"}
          qrData={qrData}
          rows={Math.ceil(qrData.length/gridNumberOfColumns)}
          columns={gridNumberOfColumns}
          size={150}
        />)
      }
      </div>

    </div>
  );

  
}