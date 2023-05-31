import React, { useState, useEffect } from "react";
import Loading from "../../../components/core/Loading";
import DisplayMessage from "../../../components/core/DisplayMessage";
import MaterialTable from "material-table";
import {
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import { LeakAddTwoTone, Refresh, SaveAlt } from "@material-ui/icons";
import { Edit } from "@material-ui/icons";
import { Delete } from "@material-ui/icons";
import { Grid, IconButton, ListItemAvatar, Tooltip } from "@material-ui/core";
import { actionColumnStyle } from "../../../components/custom/GridConfig";
import { labels } from "../../../Config.json";
import Button from "../../../components/core/Button";
import TextField from "../../../components/core/TextField";
import Select from "../../../components/core/Select";
import SingleCheckBox from "../../../components/core/SingleCheckBox";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";
import MultipleSelectionList from "../../../components/custom/MultipleSelectionList";
import downloadExcel from "../../../Utils/DownloadExcel";


/**
 * Add,update,delete operations for TreatmentTemplete Master
 */
export default function TreatmentTempleteMaster(props) {
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [showGrid, setShowGrid] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [data, setData] = useState();
  const [disabledExport, setDisabledExport] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCategoryError, setFilterCategoryError] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStatusError, setFilterStatusError] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [getdietList, setGetdietList] = useState([]);
  const [gettreatmentList, setGettreatmentList] = useState();
  const [diseaseId,setDiseaseId] = useState([])
  const [diseaseName,setDiseaseName] = useState([])
  const columns = [

    {
       title: "Sr#",
        field: "srNo",
         editable: "never",
         cellStyle: {
          textAlign: "center"
        }
     },
    { title: "Template Name", field: "templateName" },
    { title: "Disease Name", field: "diseaseName" },
    { title: "Description", field: "description" },
    { title: "Active", field: "active" },
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
                }}
              >
                <Edit fontSize="small"/>
              
              </IconButton>
            </Tooltip>
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
          </div>
        );
      },
      printable: false,
    },
  ];

  const filterStatusList = [
    // { label: "All", value: 'null'},
    { label: "All", value: 'td.DeletedBy'},
    { label: "Active", value: 1 },
    { label: "InActive", value: 0 },
  ];

  
  const exportTreatmentTempleteMaster = () => {
    const exportData = diseaseName.map((item) => ({
      srNo: item.srNo,
      TemplateName:item.templateName,
      Description: item.description,
      active: item.active,
    }));
    const header = [
      ["Sr.No", "Templete Name", "Description", "Is Active"],
    ];
    downloadExcel({
      data: exportData,
      fileName: "TreatmentTempleteMaster",
      header: header,
    });
  };

  // filter related variables and methods. - End
  const [rowData, setRowData] = useState({});
  const [diet, setDiet] = useState([]);
  const [treatment, settreatment] = useState([]);
  const [validationList, setValidationList] = useState({});
  const [currentOpr, setCurrentOpr] = useState();
  const [id, setId] = useState();
  const [diseaseCategoryList, setDiseaseCategoryList] = useState([]); 

const gettempleteDiseaseCategories = () => {
    const params = {      
    };
    props.gettempleteDiseaseCategories({
      params,
      onSuccess: (response) => {        
       let allOptionObj = { label: "All", value: "td.DeletedBy" };
       
      //  let allOptionObj = { label: "All", value: "null" };
       const { diseaseCategoryList } = response;
       diseaseCategoryList.splice(0, 0, allOptionObj);
       setDiseaseCategoryList(diseaseCategoryList);
      },
      onFailure: ({ message }) => {

      },
    });
  };
 
  const [updatedata,setUpdataData] = useState(false)

  useEffect(() => {
    if(updatedata)
    {
      getTreatment();
    }
 },[rowData.diseaseId]);

 
//useof add button
const getDietCategories = () => {
    setLoading(true);
     const params = {
      TreatmentId:diseaseId
     };
     props.getDietCategories({
       params,
       onSuccess: (response) => {
         const { dietCategoryList = [] } = response;
          const data = dietCategoryList.map((item, index) => ({
           ...item,
           srNo: index + 1,
    
         }));
         setData(data);
         setLoading(false);
       },
       onFailure: ({ message }) => {
         setLoading(false);
 
        },
      });
};

const getTreatmentdetail = () => {
  setLoading(true);
   const params = {
    //TreatmentId:diseaseId
   };
   props.getTreatmentdetail({
     params,
     onSuccess: (response) => {

       const { treatmentdetailList = [] } = response;
        const gettreatmentList = treatmentdetailList.map((item, index) => ({
         ...item,
         srNo: index + 1,
  
       }));
       setGettreatmentList(gettreatmentList);
       setLoading(false);
     },
      onFailure: ({ message }) => {
       setLoading(false);

      },
    });
};



const getDiet = () => {
    setLoading(true);
     const params = {
      TreatmentId:rowData.diseaseId
     };
     props.getDiet({
       params,
       onSuccess: (response) => {
         const { dietNameList = [] } = response;
         
          const getdietList = dietNameList.map((item, index) => ({
           ...item,
           srNo: index + 1,
           value:item.value,
           DiseaseId:item.diseaseId,
           DietName:item.dietName
         }));
         
         setGetdietList(getdietList);
         setLoading(false);
       },

       onFailure: ({ message }) => {
         setLoading(false);

       },
     });
};

const getTreatment = () => {
    setLoading(true);
     const params = {
      TreatmentId:rowData.diseaseId
     };
 
     props.getTreatment({
       params,
       onSuccess: (response) => {
         const { treatmentNameList = [] } = response;
         let a = JSON.parse(treatmentNameList[0].dietId);
         setDiet([...diet,...a]);
         let b =JSON.parse(treatmentNameList[0].treatmentId)
         settreatment([...treatment,...b]);
         setLoading(false);
       },

       onFailure: ({ message }) => {
         setLoading(false);
   
       },
     });
   };
  const checkAllValidation = () => {
    const templateName = !validateField("templateName");
    const diseaseId = !validateField("diseaseId");
    const dietId = !validateField("dietId");
    const treatmentId = !validateField("treatmentId");

    setValidationList({
      ...validationList,
      templateName,
      diseaseId,
      dietId,
      treatmentId
    });

    return !templateName && !diseaseId &&!dietId &&!treatmentId;
  };

useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = diseaseName[id];
      setUpdataData(false)
    
      setRowData({
        ...rowData,
        templateName: rowData.templateName,
        diseaseId: JSON.parse(rowData.diseaseId),
        // treatmentId:JSON.parse(rowData.treatmentId),
        // dietId:JSON.parse(rowData.dietId),
        description: rowData.description,
        isActive: rowData.isActive,
      });
       settreatment(JSON.parse(rowData.treatmentId))
       setDiet(JSON.parse(rowData.dietId))
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
      description:"",
      isActive: "1",
      templateName:"",
      diseaseId:[],
      // dietId:[],
      // treatmentId:[]
    }); 
    settreatment([])
    setDiet([])
  };

  const addtempleteMaster = (e) => {
    
    //  if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0"),
        dietId:diet,
        treatmentId:treatment
      };
      props.saveTemplete({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getDiseaseList(e);
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
    //  }
  };


  const updatetempletelist = (e) => {
      // if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      delete rowData["srNo"];
      delete rowData["tableData"];
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive ? "1" : "0"),
        dietId:diet,
        treatmentId:treatment
      };

      props.updatetemplete({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getDiseaseList(e);
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
    //}
  };

const deletetemplete = (e) => {    
    const { treatmentTempleteId } = diseaseName[id];
      setLoading(true);   
      const params = {
        treatmentTempleteId 
      };
      props.deletetemplete({
        params,
        onSuccess: ({ message: displayMessage }) => {
          showGrid && getDiseaseList(e);
          setLoading(false);
          setDisplayMessage({
            open: true,
            displayMessage,
            severity: "success",
          });
          setDeleteDialog(!deleteDialog);
        },
        onFailure: ({ message }) => {
          getDiseaseList(e);
          setLoading(false);
          displayErrorMessage(message);
        },
      });
    };

  useEffect(() => {
    gettempleteDiseaseCategories();
    getDietCategories();
    getTreatmentdetail();
    getDiet();
  }, []);

  const getDiseaseList = () => {
    setLoading(true);
    const params = {
     // AUTOCODEUTILITY - Add request params here.
     filterCategory,
     filterStatus,
     DiseaseId: setDiseaseCategoryList === "All" ? "" : setDiseaseCategoryList,
   };
 
   props.getDiseaseList({
     params,
     onSuccess: (response) => {
       const { diseaseMasterList = [] } = response;
       setDisabledExport(diseaseMasterList.length === 0);
       const diseaseName = diseaseMasterList.map((item, index) => ({
         ...item,
         srNo: index + 1,
        diseaseId:item.diseaseId
       }));
       
       setDiseaseName(diseaseName);
       setShowGrid(true);
       setLoading(false);
     },
     onFailure: ({ message }) => {
       setLoading(false);
     
     },
   });
 };

 const FormContent = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <TextField
        required={true}
        value={rowData.templateName}
        label="Template Name"
        numeric={false}
        isAutoFocus={false}
        onChange={(e) => {
          setRowData({ ...rowData, templateName: e.target.value });
          validateField("dietName");
        }}
        error={validationList && validationList.templateName ? true : false}
        errorMessage={"Template Name is Required"}
        maxLength={100}
        multiline={false}
        rows={0}
      />

    </Grid>
          
 
    <Grid item xs={12} md={6}>
  
       <TextField
          required={false}
          value={rowData.description}
          label="Description"
          numeric={undefined}
          isAutoFocus={false}
          onChange={(e) => {
            setRowData({ ...rowData, description: e.target.value });
            validateField("Description");
          }}
          maxLength={350}
          multiline={true}
          rows={1}
        />

    </Grid>
    <Grid item xs={12} md={2}>
    <SingleCheckBox
        label={"Is Active"}
        checked={rowData.isActive}
        onChange={(e) => {
          setRowData({ ...rowData, isActive: e.target.checked });
        }}
        required={false}
      />
      </Grid>

      
    <Grid item xs={12} md={4} className="treatment-template-table" >
    {/* <div style={{ overflowY: "auto", maxHeight: "590px" }}> */}
    <MultipleSelectionList
                  items={data}
                  width={"100%"}
                  checked={rowData.diseaseId}
                  setChecked={(e) => {
                    setRowData({...rowData,diseaseId:e})
                    setUpdataData(true)
                    validateField("TreatmentId");
                  }}
                  required={true}
                  keyField={"value"}
                  textField={"label"}
                  label={"Diseases"}
                  columns={2}
                  style={{ overflowY: "auto", maxHeight: "450px" }}
                /> 
    {/* </div> */}

    </Grid>

    <Grid item xs={12} md={4} className="treatment-template-table" >
    {/* <div style={{ overflowY: "auto", maxHeight: "560px" }}> */}
    <MultipleSelectionList
                  items={gettreatmentList}
                  width={"100%"}
                  checked={treatment}
                  setChecked={(e) => {
                    settreatment(e)
                    validateField("TreatmentId");
                  }}
                  required={true}
                  keyField={"value"}
                  textField={"label"}
                  label={"Treatment"}
                  columns={2}
                  style={{ overflowY: "auto", maxHeight: "450px" }}
                /> 

    {/* </div> */}
    </Grid>


    <Grid item xs={12} md={4}  className="treatment-template-table" >
    {/* <div style={{ overflowY: "auto", maxHeight: "560px" }}> */}
      
    <MultipleSelectionList
                  items={getdietList}
                  width={"100%"}
                  checked={diet}
                  setChecked={(e) => {
                   setDiet(e)
                   validateField("TreatmentId");
                  }}
                   required={true}
                  keyField={"value"}
                  textField={"label"}
                  label={"Diet"}
                  columns={2}
                  style={{ overflowY: "auto", maxHeight: "450px" }}
                /> 
   
     {/* </div> */}
    </Grid>

   
    <Grid item xs={12} style={{ justifyContent: "space-"}}>
      <div className="d-flex align-items-center justify-content-end">
        <Button
          autoFocus
          onClick={() => {
            toggleEditRecord(!editRecord);
            setLoading(false);
           // setShowGrid(false);
          }}
          customClass="button button-black mr-2"
          label={labels.cancelButton}
        />
        
        <Button
          onClick={(e) => {
           
            currentOpr === "Add" ? addtempleteMaster(e) :updatetempletelist(e);
          
          }}
          customClass="button button-primary"
          label={labels.saveButton}
        />
        
      </div>
    </Grid>
  </Grid>
);

const b= []
let c = gettreatmentList
useEffect(() => {
  if(treatment.length>0)
  {
    for(let i=0; i<treatment.length;i++)
    {
        const a = gettreatmentList.find((item) => item.value == treatment[i])
    
       //if(b.includes(a)==false){
      //   console.log("1 call")
        
        b.push(a)
        const d = c.filter((item) => item.value != b[i].value )
        c=d
       
      // else if(b.includes(a)==true)
      //  {
      //     console.log("2 call")
      //     //b.push(a)
          //const d = c.filter((item) => item.value != b[i].value)
          //c=d
      //}
     
      }
    setGettreatmentList([...b,...c])
  }
},[treatment])


const v= []
let t = getdietList
useEffect(() => {
  
  if(diet.length>0)
  {
    for(let i=0; i<diet.length;i++)
    {
      const a = getdietList.find((item) => item.value == diet[i])
      v.push(a)
      const k = t.filter((item) => item.value != v[i].value)
      t=k
    }
    setGetdietList([...v,...t])
  }
},[diet])

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
                 <Select
                data={diseaseCategoryList}
                value={filterCategory}
                label={"Disease"}
                onChange={(e) => {
                  const filterCategory = e.target.value || "";
                  setFilterCategoryError(false);
                  setFilterCategory(filterCategory);
                }}
                isInline={true}
                errorMessage={"Disease Name is Required"}
                required={true}
                error={filterCategoryError}
              /> 
            </Grid> 
            

             <Grid item xs={12} md={4} lg={3}>
              <div className="selection-card-actions">
                <Button
                   label={labels.filterButton}
                   customClass="button button-primary mr-2"
                  onClick={() => {
                    if (filterCategory != "") {
                      getDiseaseList();
                    } else {
                      filterCategory === "" && setFilterCategoryError(true);
                      filterStatus === "" && setFilterStatusError(true);
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
                  label={"Add Template"}
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
                title={"List of Template"}
                columns={columns}
                data={diseaseName}
                options={options}
                style={style}
                actions={[
                  {
                    icon: () => {
                      return (
                        <Refresh
                          onClick={() => {
                           getDiseaseList();
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
                            exportTreatmentTempleteMaster();
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
      {deleteDialog && (
        <ConfirmationDialog
          open={deleteDialog}
          dialogTitle="Delete Diet"
          dialogContentText="Are you sure you want to delete this Diet ?"
          cancelButtonText="Cancel"
          okButtonText="Delete"
          onCancel={() => {
            setDeleteDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            setDeleteDialog(false);
            deletetemplete(e);
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
