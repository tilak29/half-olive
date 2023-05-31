import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Edit, SaveAlt, Refresh } from "@material-ui/icons";
import { Grid, IconButton, Tooltip } from "@material-ui/core";

import Button from "../../../components/core/Button";
import {
  GridIcons,
  options,
  style,
  actionColumnStyle,
} from "../../../components/custom/GridConfig";
import Loading from "../../../components/core/Loading";
import RadioGroup from "../../../components/core/RadioGroup";
import TextField from "../../../components/core/TextField";
import StatesSelect from "../../../components/custom/StatesSelect/StatesSelectContainer";
import DisplayMessage from "../../../components/core/DisplayMessage";

import DialogControl from "../../../components/core/Dialog";
import downloadExcel from "../../../Utils/DownloadExcel";
import {
  getDisplayDate,
} from "../../../Utils/DateTimeUtils.js";

/**
 * Add, update operations for city master
 * @author Tejal Sali
 */
export default function CityList(props) {
  const [data, setData] = useState([]);
  const [chemistData, setChemistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const [selectedStateName, setSelectedStateName] = useState("");
  const [showGrid, setShowGrid] = useState(false);
  const [showChemistList, setShowChemistList] = useState(false);
  const [error, setError] = useState(false);
  const [editRecord, toggleEditRecord] = useState(false);
  const [currentOpr, setCurrentOpr] = useState();
  const [validationList, setValidationList] = useState({});
  const [rowData, setRowData] = useState({});
  const [id, setId] = useState();
  const [titleProperties, setTitleProperties] = useState({});
  const [selectedCityName, setSelectedCityName] = useState("");
  const [disabledExport, setDisabledExport] = useState(false);

  const { operationRights } = props;
  const { add, edit } = operationRights;

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
                  setRowData({
                    isMetroCity: data[id].isMetroCity,
                  });
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
      editable: "never",
    },
    {
      title: "City Name",
      field: "cityName",
    },
    {
      title: "Is Metro City",
      field: "isMetroCity",
    },
    {
      title: "No Of Chemist",
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div
            // className="table-edit-controls"
            className="cursor-pointer text-primary"
            // style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              setSelectedCityName(data[id].cityName);
              setShowChemistList(true);
              getChemistList(id);
              setDisabledExport(data[id].noOfChemist === 0);
            }}
          >
            {data[id].noOfChemist}
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
    {
      title: "Area",
      field: "areaName",
    },
    // {
    //   title: "Active",
    //   field: "isActiveLabel",
    // },
  ];

  const isMetroCityOptions = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getCityList = (e) => {
    const params = {
      stateId: selectedState,
    };
    e.preventDefault();
    setLoading(true);
    props.getCityList({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { cityList = [] } = response;
        const data = cityList.map((city, index) => ({
          ...city,
          srNo: index + 1,
          isMetroCity: city.isMetroCity === 1 ? "Yes" : "No",
        }));
        setData(data);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const getChemistList = (id) => {
    setLoading(true);
    let params = {
      cityId: data[id].cityId,
      stateId: data[id].stateId,
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
          areaName: chemist.areaName,
          pinCode: chemist.pinCode == null || chemist.pinCode == "null" ? "" : chemist.pinCode,
          address: chemist.address == null || chemist.address == "null" ? "" : chemist.address,
          dob: chemist.dob == null || chemist.dob == "null" ? "" : getDisplayDate(chemist.dob),
          routeName: chemist.routeName,
          isVerified: chemist.isVerified !=null && chemist.isVerified === 1 ? "Yes" : "No"
        }));
        setChemistData(data);
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

  const checkAllValidation = () => {
    const stateId = !validateField("stateId");
    const cityName = !validateField("cityName");
    setValidationList({ stateId, cityName });
    return !stateId && !cityName;
  };

  const exportChemistList = () => {
    const header = [
      [
        "Sr. No",
        "Chemist Name",
        "Contact Person",
        "Mobile Number",
        "Area",
        "Pin Code",
        "Address",
        "DOB",
        "Route",
        "Is Verified"
      ],
    ];
    downloadExcel({
      data: chemistData,
      fileName: `Chemists_${selectedCityName} `,
      header: header,
    });
  };

  const addCity = (e) => {
    if (checkAllValidation()) {
      e.preventDefault();
      setLoading(true);
      props.addCity({
        params: rowData,
        onSuccess: ({ message: displayMessage }) => {
          setLoading(false);
          if (showGrid) {
            getCityList(e);
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

  const updateCity = (e) => {
    const params = {
      ...rowData,
      isMetroCity: parseInt(rowData.isMetroCity),
    };
    e.preventDefault();
    setLoading(true);
    props.updateCity({
      params,
      onSuccess: ({ message: displayMessage }) => {
        setLoading(false);
        getCityList(e);
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
  };

  const dialogContent = (
    <div>
      <Grid container spacing={3}>
        {currentOpr === "Add" && (
          <Grid item xs={12}>
            <StatesSelect
              value={rowData.stateId}
              onChange={(e) => {
                setRowData({ ...rowData, stateId: e.target.value });
                validateField("stateId");
              }}
              error={validationList && validationList.stateId ? true : false}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            required={true}
            value={rowData.cityName}
            label="City Name"
            numeric={false}
            isAutoFocus={false}
            onChange={(e) => {
              setRowData({ ...rowData, cityName: e.target.value });
              validateField("cityName");
            }}
            error={
              validationList && validationList.cityName
                ? validationList.cityName
                : false
            }
            errorMessage={"City Name is Required"}
            maxwidth={40}
          />
        </Grid>
        <Grid item xs={12}>
          <RadioGroup
            options={isMetroCityOptions}
            isOptionAlignRow={true}
            label={"Is Metro City"}
            labelPlacement={"end"}
            value={rowData.isMetroCity}
            onChange={(e) =>
              setRowData({
                ...rowData,
                isMetroCity: parseInt(e.target.value),
              })
            }
          />
        </Grid>
      </Grid>
    </div>
  );

  useEffect(() => {
    if (editRecord && currentOpr === "Update") {
      const rowData = data[id];
      setRowData({
        cityId: rowData.cityId,
        stateId: rowData.stateId,
        cityName: rowData.cityName,
        isMetroCity:
          rowData.isMetroCity && rowData.isMetroCity === "Yes" ? 1 : 0,
        updatedDate: rowData.updatedDate,
      });
    } else if (editRecord && currentOpr === "Add") {
      setRowData({
        stateId: "",
        cityName: null,
        isMetroCity: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord]);

  const dialogTitleText =
    currentOpr === "Add"
      ? "Add City"
      : `Update City for ${titleProperties.stateName}`;

  return (
    <div>
      <div className="card selection-card selection-card-two-columns mb-3">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StatesSelect
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setError(false);
              }}
              setSelectedStateName={setSelectedStateName}
              error={error}
              isInline={true}
            />
          </Grid>

          <Grid item xs={12} md={4} lg>
            <div className="selection-card-actions">
              <Button
                label={"Go"}
                onClick={(e) => {
                  if (selectedState !== "") {
                    setShowGrid(true);
                    setTitleProperties({
                      stateName: selectedStateName,
                    });
                    getCityList(e);
                  } else {
                    setError(true);
                  }
                }}
                customClass="button button-primary mr-2"
              />
              {add && (
                <Button
                  label={"Add City"}
                  onClick={() => {
                    toggleEditRecord(!editRecord);
                    setCurrentOpr("Add");
                    setValidationList({});
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
              title={`Cities of ${titleProperties.stateName}`}
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
                          getCityList(e);
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
          open={editRecord}
          dialogTitleText={dialogTitleText}
          dialogContent={dialogContent}
          onCancel={() => {
            toggleEditRecord(!editRecord);
            setLoading(false);
          }}
          onSubmit={(e) => {
            currentOpr === "Add" ? addCity(e) : updateCity(e);
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
                title={`Chemists Of ${selectedCityName} City`}
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
