import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { Edit, Refresh } from "@material-ui/icons";
import Button from "../../../components/core/Button";
import { GridIcons,options,style,actionColumnStyle} from "../../../components/custom/GridConfig";
import DialogControl from "../../../components/core/Dialog";
import Loading from "../../../components/core/Loading";
import Select from "../../../components/core/Select";
import TextField from "../../../components/core/TextField";
import RadioGroup from "../../../components/core/RadioGroup";
import DisplayMessage from "../../../components/core/DisplayMessage";
import { labels } from "../../../Config.json";
import { isActiveOptions } from "../../../Config.json";

/**
 * @author Kishan Sirodariya
 */

export default function Video(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [rowData, setRowData] = useState({});
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [validationList, setValidationList] = useState({});
  const [displayMessage, setDisplayMessage] = useState({});
  const [id, setId] = useState();
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [DocumentError, setDocumentError] = useState(false);
  const [dtList, setDTData] = useState([]);
  const [dtAllList, setDTAllData] = useState([]);

  const { operationRights = {} } = props;
  const { add = true, edit = true } = operationRights;

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  useEffect(() => {
    getDocumentTypeValue();
    getAddDocumentTypeValue();
  }, []);

  const getDocumentTypeValue = () => {
    props.getStaticLookup({
      params: {
        code: "DocumentTypeGroup",
      },
      onSuccess: (response) => {
        const { list = [] } = response;
        let allOptionObj = { label: "All", value: 0 };
        var t = list;
        const tempList = t;
        if(tempList.length > 1){
          if(tempList[0].value !== 0)tempList.splice(0, 0, allOptionObj);
        }
        setDTAllData(tempList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const getAddDocumentTypeValue = () => {
    props.getStaticLookup({
      params: {
        code: "DocumentTypeGroup",
      },
      onSuccess: (response) => {
        const { list = [] } = response;
        setDTData(list);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const getDocumentTypeList = () => {
    setLoading(true);
    const params = {
        documentGroupId : selectedGroupId == 0 ? null : selectedGroupId,
    };
    props.getDocumentTypeList({
      params,
      onSuccess: (response) => {
        setLoading(false);
        setShowGrid(true);
        const list = response.documentTypeList;
        const data = list.map((record, index) => ({
          ...record,
          srNo: index + 1,
          isActive: record.isActive === 1 ? "Yes" : "No"
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
    setRowData({
      documentType: null,
      description: "",
      documentCode:null,
      documentTypeId: null,
      documentGroupId:"",
      isActive: "1"
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
    // const description = !validateField("description");
    //const documentCode = !validateField("documentCode");
    const documentGroupId = !validateField("documentGroupId");
    const documentType = !validateField("documentType");

    setValidationList({
      // description,
    //  documentCode,
      documentGroupId,
      documentType,
    });
    return (
        // !description &&
     //   !documentCode &&
        !documentGroupId &&
        !documentType
    );
  };

  const addDocumentType = () => {
    if (checkAllValidation()) {
      const params = {
        description: rowData.description,
        documentCode: rowData.documentCode,
        documentGroupId: rowData.documentGroupId,
        documentType:rowData.documentType,
        documentTypeId:rowData.documentTypeId,
        isActive: rowData.isActive
      };
      console.log(params)
      props.addDocumentType({
        params,
        onSuccess: ({ message: displayMessage }) => {
          if(selectedGroupId !== null && selectedGroupId !== '')getDocumentTypeList();
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

  const updateDocumentType = () => {
    if (checkAllValidation()) {
      const params = {
        ...rowData,
        isActive: parseInt(rowData.isActive),
      };
      delete params.tableData;
      props.updateDocumentType({
        params,
        onSuccess: ({ message: displayMessage }) => {
            getDocumentTypeList();
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
      setRowData({
        ...rowData,
        isActive: rowData.isActive === "Yes" ? "1" : "0",
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
    { title: "Sr.No", field: "srNo",sorting:false},
    {
        title: "Document Type Name",
        field: "documentType",
    },
    {
        title: "Document Group",
        field: "documentGroupName",
    },
    {
      title: "Document Description",
      field: "description",
    },

  ];

  const dialogTitleText = currentOpr === "Add" ? "Add Document Type" : `Edit Document Type`;

  const dialogContent = (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required={true}
            value={rowData.documentType}
            label="Document Type Name"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, documentType: e.target.value });
              validateField("documentTypeName");
            }}
            error={validationList && validationList.documentType ? true : false}
            errorMessage={"Document Type Name is Required"}
            maxLength={50}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <Select
              label={"Document Group"}
              data={dtList}
              value={rowData.documentGroupId}
              onChange={(e) => {
                setRowData({...rowData,documentGroupId: e.target.value});
                validateField("documentGroupId");
              }}
              required={true}
              error={validationList && validationList.documentGroupId ? true : false}
              errorMessage={"Document Group is Required"}
            />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            value={rowData.description}
            label="Document Description"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, description: e.target.value });
              validateField("description");
            }}
            multiline={true}
            rows={3}
            // error={validationList && validationList.description ? true : false}
            // errorMessage={"Document Description is Required"}
            maxLength={200}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <RadioGroup
          options={isActiveOptions}
          isOptionAlignRow={true}
          label={"Is Active"}
          labelPlacement={"end"}
          value={rowData.isActive}
          onChange={(e) => setRowData({ ...rowData, isActive: e.target.value })}
        />
      </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <div className="card selection-card selection-card-two-columns mb-3">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg>
            <Select
              label={"Document Type"}
              data={dtAllList}
              value={selectedGroupId}
              onChange={(e) => {
                setSelectedGroupId(e.target.value);
                setDocumentError(false);
              }}
              required={true}
              error={DocumentError}
              isInline={true}
            />
          </Grid>
          <Grid item xs={12} md={4} lg>
            <div className="selection-card-actions">
              <Button
                label={labels.filterButton}
                onClick={(e) => {
                  if (selectedGroupId !== "") {
                    setShowGrid(true);
                    getDocumentTypeList();
                  } else {
                    setDocumentError(true);
                  }
                }}
                customClass="button button-primary mr-2"
              />
              {add && (
                <Button
                  label={"Add Document Type"}
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
              title ={''}
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
                            getDocumentTypeList();
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
            currentOpr === "Add" ? addDocumentType() : updateDocumentType();
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
