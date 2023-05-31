import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Edit, SaveAlt, Refresh, AddBox } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";

import Button from "../../../components/core/Button";
import {
  GridIcons,
  options,
  style,
  actionColumnStyle,
} from "../../../components/custom/GridConfig";
import Loading from "../../../components/core/Loading";
import TextField from "../../../components/core/TextField";
import StateCitySelect from "../../../components/custom/StateCitySelect/StateCitySelectContainer";
import DisplayMessage from "../../../components/core/DisplayMessage";
import DialogControl from "../../../components/core/Dialog";

import { labels } from "../../../Config.json";
import downloadExcel from "../../../Utils/DownloadExcel";

/**
 * Add, update operations based on rights for area master
 * @author Tejal Sali
 */
export default function AreaList(props) {
  const [data, setData] = useState([]);
  const [chemistData, setChemistData] = useState([]);
  const [displayMessage, setDisplayMessage] = useState({});
  const [
    stateCitySelectFilterProperties,
    setStateCitySelectFilterProperties,
  ] = useState({});
  const [showGrid, setShowGrid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [validationList, setValidationList] = useState({});
  const [rowData, setRowData] = useState({});
  const [id, setId] = useState();
  const [titleProperties, setTitleProperties] = useState({});
  const [showChemistList, setShowChemistList] = useState(false);
  const [selectedAreaName, setSelectedAreaName] = useState("");
  const [disabledExport, setDisabledExport] = useState(false);

  const {
    operationRights: { add, edit },
  } = props;

  const {
    stateValue: stateFilterValue = "",
    cityValue: cityFilterValue = "",
    cityName: cityFilterName = "",
    stateName: stateFilterName = "",
  } = stateCitySelectFilterProperties;

  const columns = [
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
                  toggleEditRecord(!editRecord);
                  setCurrentOpr("Update");
                  setValidationList({});
                }}
              >
                <Edit fontSize="small" />
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
      title: "Area Name",
      field: "areaName",
    },
    {
      title: "No Of Chemist",
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div
            className="cursor-pointer text-primary"
            onClick={() => {
              setSelectedAreaName(data[id].areaName);
              setShowChemistList(true);
              getChemistList(id);
              setDisabledExport(data[id].totalChemist === 0);
            }}
          >
            {data[id].totalChemist}
          </div>
        );
      },
    },
  ];

  const chemistColumns = [
    {
      title: "Sr.No",
      field: "srNo",
    },
    {
      title: "Chemist Name",
      field: "chemistName",
    },
    {
      title: "Contact Person",
      field: "contactPerson",
    },
    {
      title: "Mobile Number",
      field: "mobile",
    },
    {
      title: "Route",
      field: "routeName",
    },
  ];

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getChemistList = (id) => {
    setLoading(true);
    let params = {
      stateId: titleProperties.stateFilterValue,
      cityId: titleProperties.cityFilterValue,
      areaId: [data[id].areaId],
    };

    props.getChemistList({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { chemistList = [] } = response;
        const activeChemist = chemistList.filter(
          (chemist) => chemist.isActive === 1
        );
        const data = activeChemist.map((chemist, index) => ({
          srNo: index + 1,

          chemistName: chemist.chemistName,
          contactPerson: chemist.contactPerson,
          mobile: chemist.mobile,
          routeName: chemist.routeName,
        }));
        setChemistData(data);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const getAreaList = (cityId) => {
    setLoading(true);
    props.getAreaList({
      params: { cityId },
      onSuccess: (response) => {
        setLoading(false);
        const { areaList = [] } = response;
        const data = areaList.map((area, index) => ({
          ...area,
          srNo: index + 1,
        }));
        setData(data);
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
      rowData[field] === []
    ) {
      setValidationList({ ...validationList, [field]: true });
      isValid = false;
    } else {
      setValidationList({ ...validationList, [field]: false });
    }
    return isValid;
  };

  const exportChemistList = () => {
    const header = [
      ["Sr. No", "Chemist Name", "Contact Person", "Mobile Number", "Route"],
    ];
    downloadExcel({
      data: chemistData,
      fileName: `Chemists_${selectedAreaName} `,
      header: header,
    });
  };

  const addArea = () => {
    if (validateField("areaName")) {
      setLoading(true);
      props.addArea({
        params: rowData,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          if (showGrid) {
            getAreaList(rowData.cityId);
          }
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

  const updateArea = () => {
    if (validateField("areaName")) {
      setLoading(true);
      props.updateArea({
        params: rowData,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          getAreaList(rowData.cityId);
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

  const dialogContent = (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            required={true}
            value={rowData.areaName}
            label="Area Name"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, areaName: e.target.value });
              validateField("areaName");
            }}
            error={
              validationList && validationList.areaName
                ? validationList.areaName
                : false
            }
            errorMessage={"Area Name is Required"}
            maxLength={40}
          />
        </Grid>
      </Grid>
    </div>
  );

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        areaId: rowData.areaId,
        cityId: rowData.cityId,
        areaName: rowData.areaName,
        updatedDate: rowData.updatedDate,
      });
    } else if (editRecord && currentOpr === "Add") {
      // console.log(currentOpr);
      const { stateFilterValue, cityFilterValue } = titleProperties;
      setRowData({
        stateId: stateFilterValue,
        cityId: cityFilterValue,
        areaName: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  const dialogTitleText = `${currentOpr} Area for ${titleProperties.stateName}, ${titleProperties.cityName}`;

  return (
    <div>
      <div className="card selection-card selection-card-two-columns mb-3">
        <Grid container spacing={3}>
          <StateCitySelect
            stateCitySelectProperties={stateCitySelectFilterProperties}
            setStateCitySelectProperties={setStateCitySelectFilterProperties}
            isInline={true}
          />
          <Grid item xs={12} md={4} lg>
            <div className="selection-card-actions">
              <Button
                label={labels.filterButton}
                onClick={(e) => {
                  if (stateFilterValue !== "" && cityFilterValue !== "") {
                    setShowGrid(true);
                    setTitleProperties({
                      stateName: stateFilterName,
                      cityName: cityFilterName,
                      stateFilterValue,
                      cityFilterValue,
                    });
                    getAreaList(cityFilterValue);
                  } else {
                    setStateCitySelectFilterProperties({
                      ...stateCitySelectFilterProperties,
                      stateError: stateFilterValue === "" ? true : false,
                      cityError: cityFilterValue === "" ? true : false,
                    });
                  }
                }}
                customClass="button button-primary mr-2"
              />
            </div>
          </Grid>
        </Grid>
      </div>
      {showGrid && (
        <div className="card">
          <div className="table-wrapper">
            <MaterialTable
              icons={GridIcons}
              title={`Area of ${titleProperties.stateName}, ${titleProperties.cityName}`}
              columns={columns}
              data={data}
              options={options}
              style={style}
              actions={
                add
                  ? [
                      {
                        icon: () => {
                          return (
                            <AddBox
                              onClick={() => {
                                setCurrentOpr("Add");
                                toggleEditRecord(!editRecord);
                                setValidationList({});
                              }}
                            />
                          );
                        },
                        tooltip: "Add Area",
                        isFreeAction: true,
                      },
                      {
                        icon: () => {
                          return (
                            <Refresh
                              onClick={(e) => {
                                getAreaList(titleProperties.cityFilterValue);
                              }}
                            />
                          );
                        },
                        tooltip: "Refresh Data",
                        isFreeAction: true,
                      },
                    ]
                  : [
                      {
                        icon: () => {
                          return (
                            <Refresh
                              onClick={(e) => {
                                getAreaList(titleProperties.cityFilterValue);
                              }}
                            />
                          );
                        },
                        tooltip: "Refresh Data",
                        isFreeAction: true,
                      },
                    ]
              }
            />
          </div>
        </div>
      )}
      {editRecord && (
        <DialogControl
          open={editRecord}
          dialogTitleText={dialogTitleText}
          dialogContent={dialogContent}
          onCancel={() => {
            toggleEditRecord(!editRecord);
            setLoading(false);
          }}
          onSubmit={(e) => {
            currentOpr === "Add" ? addArea(e) : updateArea(e);
          }}
        />
      )}

      {showChemistList && (
        <DialogControl
          open={showChemistList}
          isDialogTitle={false}
          fullWidth={true}
          dialogContent={
            <div className="table-wrapper">
              <MaterialTable
                title={`Chemists Of ${selectedAreaName} Area`}
                columns={chemistColumns}
                data={chemistData}
                style={style}
                options={{ ...options }}
                actions={[
                  {
                    icon: () => {
                      return (
                        <SaveAlt
                          onClick={() => {
                            exportChemistList();
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
            </div>
          }
          cancelAction={false}
          submitButtonText={"Ok"}
          onSubmit={(e) => {
            setShowChemistList(false);
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
