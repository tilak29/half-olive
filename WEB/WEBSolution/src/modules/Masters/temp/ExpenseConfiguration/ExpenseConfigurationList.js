import React, { useState } from "react";
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import Button from "../../../components/core/Button";
import {
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import TextField from "../../../components/core/TextField";
import DisplayMessage from "../../../components/core/DisplayMessage";
import DatePicker from "../../../components/core/DatePicker";
import {
  getDBFormateDate,
  getDisplayDate,
  getBrowserFormatDate,
} from "../../../Utils/DateTimeUtils.js";
import { labels } from "../../../Config.json";
import Loading from "../../../components/core/Loading";
import ConfirmationDialog from "../../../components/custom/ConfirmationDialog";

/**
 * Screen to change expense for designations.
 * Role :Admin only
 * @author Nirali Maradiya
 */
export default function ExpenseConfiguration(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [showFilterGrid, setShowFilterGrid] = useState(true);
  const [displayMessage, setDisplayMessage] = useState({});
  const [effectiveDateError, setEffectiveDateError] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const [effectiveDate, setEffectiveDate] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const { serverDate } = props;

  let minDate = getBrowserFormatDate(serverDate);

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };
  const getExpenseConfig = () => {
    const params = { effectiveDate: getDBFormateDate(effectiveDate) };

    setLoading(true);
    props.getExpenseConfig({
      params,
      onSuccess: (response) => {
        setLoading(false);
        setShowFilterGrid(false);
        const { expenseList } = response;

        const oldData = expenseList.map((exp, index) => ({
          ...exp,
        }));
        setOldData(oldData);
        const data = expenseList.map((exp, index) => ({
          ...exp,
          srNo: index + 1,
          metroDaex: "",
          metroDahq: "",
          metroDaos: "",
          metroTa: "",
          nonMetroDaex: "",
          nonMetroDahq: "",
          nonMetroDaos: "",
          nonMetroTa: "",
          hillyDaex: "",
          hillyDahq: "",
          hillyDaos: "",
          hillyTa: "",
        }));
        setData(data);
        const errorArray = data.map((dataObj) => ({
          isMetroDaexError: false,
          isMetroDahqError: false,
          isMetroDaosError: false,
          isMetroTaError: false,
          isNonMetroDaexError: false,
          isNonMetroDahqError: false,
          isNonMetroDaosError: false,
          isNonMetroTaError: false,
          ishillyDaexError: false,
          ishillyDahqError: false,
          ishillyDaosError: false,
          ishillyTaError: false,
        }));

        setErrorArray(errorArray);
        setShowGrid(true);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };
  const saveExpenseConfig = () => {
    let newData = [];
    data.forEach((dObj, idx) => {
      if (
        dObj.metroTa !== "" &&
        dObj.metroDaex !== "" &&
        dObj.metroDahq !== "" &&
        dObj.metroDaos !== "" &&
        dObj.nonMetroDaex !== "" &&
        dObj.nonMetroDahq !== "" &&
        dObj.nonMetroDaos !== "" &&
        dObj.nonMetroTa !== "" &&
        dObj.hillyDaex !== "" &&
        dObj.hillyDahq !== "" &&
        dObj.hillyDaos !== "" &&
        dObj.hillyTa !== ""
      ) {
        delete dObj["designationCode"];
        delete dObj["srNo"];
        delete dObj["tableData"];
        newData.push(dObj);
      }
    });

    const params = {
      json: newData,
      effectiveDate: getDBFormateDate(effectiveDate),
    };
    setLoading(true);
    props.saveExpenseConfig({
      params,
      onSuccess: ({ message: displayMessage }) => {
        setLoading(false);
        setDisplayMessage({
          open: true,
          displayMessage,
          severity: "success",
        });
        setShowGrid(!showGrid);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const checkAllValidations = () => {
    let dataObj = {};
    let isValidate = true;
    let isAllBlank = [];
    for (let i in data) {
      if (
        (data[i].metroTa === "" &&
          data[i].metroDaex === "" &&
          data[i].metroDahq === "" &&
          data[i].metroDaos === "" &&
          data[i].nonMetroDaex === "" &&
          data[i].nonMetroDahq === "" &&
          data[i].nonMetroDaos === "" &&
          data[i].nonMetroTa === "" &&
          data[i].hillyDaex === "" &&
          data[i].hillyDahq === "" &&
          data[i].hillyDaos === "" &&
          data[i].hillyTa === ""
          ) ||
        (data[i].metroTa !== "" &&
          data[i].metroDaex !== "" &&
          data[i].metroDahq !== "" &&
          data[i].metroDaos !== "" &&
          data[i].nonMetroDaex !== "" &&
          data[i].nonMetroDahq !== "" &&
          data[i].nonMetroDaos !== "" &&
          data[i].nonMetroTa !== "" &&
          data[i].hillyDaex !== "" &&
          data[i].hillyDahq !== "" &&
          data[i].hillyDaos !== "" &&
          data[i].hillyTa !== ""
          )
      ) {
        if (
          data[i].metroTa === "" &&
          data[i].metroDaex === "" &&
          data[i].metroDahq === "" &&
          data[i].metroDaos === "" &&
          data[i].nonMetroDaex === "" &&
          data[i].nonMetroDahq === "" &&
          data[i].nonMetroDaos === "" &&
          data[i].nonMetroTa === "" &&
          data[i].hillyDaex === "" &&
          data[i].hillyDahq === "" &&
          data[i].hillyDaos === "" &&
          data[i].hillyTa === ""
        )
          isAllBlank.push(1);
        else isAllBlank.push(0);

        errorArray[i].isMetroTaError = false;
        errorArray[i].isMetroDaexError = false;
        errorArray[i].isMetroDahqError = false;
        errorArray[i].isMetroDaosError = false;
        errorArray[i].isNonMetroDaexError = false;
        errorArray[i].isNonMetroDahqError = false;
        errorArray[i].isNonMetroDaosError = false;
        errorArray[i].isNonMetroTaError = false;
        errorArray[i].ishillyDaexError = false;
        errorArray[i].ishillyDahqError = false;
        errorArray[i].ishillyDaosError = false;
        errorArray[i].ishillyTaError = false;
        setErrorArray([...errorArray]);
      } else {
        if (data[i].metroTa === "") {
          errorArray[i].isMetroTaError = true;
        }
        if (data[i].metroDaex === "") {
          errorArray[i].isMetroDaexError = true;
        }
        if (data[i].metroDahq === "") {
          errorArray[i].isMetroDahqError = true;
        }
        if (data[i].metroDaos === "") {
          errorArray[i].isMetroDaosError = true;
        }
        if (data[i].nonMetroDaex === "") {
          errorArray[i].isNonMetroDaexError = true;
        }
        if (data[i].nonMetroDahq === "") {
          errorArray[i].isNonMetroDahqError = true;
        }
        if (data[i].nonMetroDaos === "") {
          errorArray[i].isNonMetroDaosError = true;
        }
        if (data[i].nonMetroTa === "") {
          errorArray[i].isNonMetroTaError = true;
        }
        if (data[i].hillyDaex === "") {
          errorArray[i].ishillyDaexError = true;
        }
        if (data[i].hillyDahq === "") {
          errorArray[i].ishillyDahqError = true;
        }
        if (data[i].hillyDaos === "") {
          errorArray[i].ishillyDaosError = true;
        }
        if (data[i].hillyTa === "") {
          errorArray[i].ishillyTaError = true;
        }
        setErrorArray([...errorArray]);
        isValidate = false;
      }
    }
    let isBlank = !isAllBlank.includes(0);
    dataObj["isValidate"] = isValidate;
    dataObj["isBlank"] = isBlank;
    return dataObj;
  };

  const baseColumns = [
    {
      title: "Sr.No",
      field: "srNo",
    },
    {
      title: "Designation",
      field: "designationCode",
    },

    {
      title: "Metro RPKM",
      field: "metroTa",
      hidden: false,
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div>
            {oldData[id].metroTa}
            <TextField
              required={false}
              type={"decimal"}
              isAutoFocus={false}
              onChange={(e) => {
                data[id].metroTa = e.target.value;
                setData(data);
                errorArray[id].isMetroTaError = false;
                setErrorArray(errorArray);
              }}
              error={
                errorArray[id].isMetroTaError
                  ? errorArray[id].isMetroTaError
                  : false
              }
              placeholder={"0.0"}
              isInline={true}
              maxLength={10}
            />
          </div>
        );
      },
    },
    {
      title: " 	Metro DA HQ",
      field: "metroDahq",
      hidden: false,
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div>
            {oldData[id].metroDahq}
            <TextField
              required={false}
              type={"decimal"}
              isAutoFocus={false}
              onChange={(e) => {
                data[id].metroDahq = e.target.value;
                setData(data);
                errorArray[id].isMetroDahqError = false;
                setErrorArray(errorArray);
              }}
              error={
                errorArray[id].isMetroDahqError
                  ? errorArray[id].isMetroDahqError
                  : false
              }
              placeholder={"0.0"}
              isInline={true}
              maxLength={10}
            />
          </div>
        );
      },
    },
    {
      title: "Metro DA OS",
      field: "metroDaos",
      hidden: false,
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div>
            {oldData[id].metroDaos}
            <TextField
              required={false}
              type={"decimal"}
              isAutoFocus={false}
              onChange={(e) => {
                data[id].metroDaos = e.target.value;
                setData(data);
                errorArray[id].isMetroDaosError = false;
                setErrorArray(errorArray);
              }}
              error={
                errorArray[id].isMetroDaosError
                  ? errorArray[id].isMetroDaosError
                  : false
              }
              placeholder={"0.0"}
              isInline={true}
              maxLength={10}
            />
          </div>
        );
      },
    },
    {
      title: "Metro DA EX",
      field: "metroDaex",
      hidden: false,
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div>
            {oldData[id].metroDaex}
            <TextField
              required={false}
              type={"decimal"}
              isAutoFocus={false}
              onChange={(e) => {
                data[id].metroDaex = e.target.value;
                setData(data);
                errorArray[id].isMetroDaexError = false;
                setErrorArray(errorArray);
              }}
              error={
                errorArray[id].isMetroDaexError
                  ? errorArray[id].isMetroDaexError
                  : false
              }
              placeholder={"0.0"}
              isInline={true}
              maxLength={10}
            />
          </div>
        );
      },
    },

    {
      title: "Non Metro RPKM",
      field: "nonMetroTa",
      hidden: false,
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div>
            {oldData[id].nonMetroTa}
            <TextField
              required={false}
              type={"decimal"}
              isAutoFocus={false}
              onChange={(e) => {
                data[id].nonMetroTa = e.target.value;
                setData(data);
                errorArray[id].isNonMetroTaError = false;
                setErrorArray(errorArray);
              }}
              error={
                errorArray[id].isNonMetroTaError
                  ? errorArray[id].isNonMetroTaError
                  : false
              }
              placeholder={"0.0"}
              isInline={true}
              maxLength={10}
            />
          </div>
        );
      },
    },
    {
      title: "Non Metro DA HQ",
      field: "nonMetroDahq",
      hidden: false,
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div>
            {oldData[id].nonMetroDahq}
            <TextField
              required={false}
              type={"decimal"}
              isAutoFocus={false}
              onChange={(e) => {
                data[id].nonMetroDahq = e.target.value;
                setData(data);
                errorArray[id].isNonMetroDahqError = false;
                setErrorArray(errorArray);
              }}
              error={
                errorArray[id].isNonMetroDahqError
                  ? errorArray[id].isNonMetroDahqError
                  : false
              }
              placeholder={"0.0"}
              isInline={true}
              maxLength={10}
            />
          </div>
        );
      },
    },
    {
      title: "Non Metro DA OS",
      field: "nonMetroDaos",
      hidden: false,
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div>
            {oldData[id].nonMetroDaos}
            <TextField
              required={false}
              type={"decimal"}
              isAutoFocus={false}
              onChange={(e) => {
                data[id].nonMetroDaos = e.target.value;
                setData(data);
                errorArray[id].isNonMetroDaosError = false;
                setErrorArray(errorArray);
              }}
              error={
                errorArray[id].isNonMetroDaosError
                  ? errorArray[id].isNonMetroDaosError
                  : false
              }
              placeholder={"0.0"}
              isInline={true}
              maxLength={10}
            />
          </div>
        );
      },
    },
    {
      title: "Non Metro DA EX",
      field: "nonMetroDaex",
      hidden: false,
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div>
            {oldData[id].nonMetroDaex}
            <TextField
              required={false}
              type={"decimal"}
              isAutoFocus={false}
              onChange={(e) => {
                data[id].nonMetroDaex = e.target.value;
                setData(data);
                errorArray[id].isNonMetroDaexError = false;
                setErrorArray(errorArray);
              }}
              error={
                errorArray[id].isNonMetroDaexError
                  ? errorArray[id].isNonMetroDaexError
                  : false
              }
              placeholder={"0.0"}
              isInline={true}
              maxLength={10}
            />
          </div>
        );
      },
    },

    //hilly
    //start
    {
      title: "Hilly RPKM",
      field: "hillyTa",
      hidden: false,
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div>
            {oldData[id].hillyTa}
            <TextField
              required={false}
              type={"decimal"}
              isAutoFocus={false}
              onChange={(e) => {
                data[id].hillyTa = e.target.value;
                setData(data);
                errorArray[id].ishillyTaError = false;
                setErrorArray(errorArray);
              }}
              error={
                errorArray[id].ishillyTaError
                  ? errorArray[id].ishillyTaError
                  : false
              }
              placeholder={"0.0"}
              isInline={true}
              maxLength={10}
            />
          </div>
        );
      },
    },
    {
      title: "Hilly DA HQ",
      field: "hillyDahq",
      hidden: false,
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div>
            {oldData[id].hillyDahq}
            <TextField
              required={false}
              type={"decimal"}
              isAutoFocus={false}
              onChange={(e) => {
                data[id].hillyDahq = e.target.value;
                setData(data);
                errorArray[id].ishillyDahqError = false;
                setErrorArray(errorArray);
              }}
              error={
                errorArray[id].ishillyDahqError
                  ? errorArray[id].ishillyDahqError
                  : false
              }
              placeholder={"0.0"}
              isInline={true}
              maxLength={10}
            />
          </div>
        );
      },
    },
    {
      title: "Hilly DA OS",
      field: "hillyDaos",
      hidden: false,
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div>
            {oldData[id].hillyDaos}
            <TextField
              required={false}
              type={"decimal"}
              isAutoFocus={false}
              onChange={(e) => {
                data[id].hillyDaos = e.target.value;
                setData(data);
                errorArray[id].ishillyDaosError = false;
                setErrorArray(errorArray);
              }}
              error={
                errorArray[id].ishillyDaosError
                  ? errorArray[id].ishillyDaosError
                  : false
              }
              placeholder={"0.0"}
              isInline={true}
              maxLength={10}
            />
          </div>
        );
      },
    },
    {
      title: "Hilly DA EX",
      field: "hillyDaex",
      hidden: false,
      sorting: false,
      render: ({ tableData: { id } }) => {
        return (
          <div>
            {oldData[id].hillyDaex}
            <TextField
              required={false}
              type={"decimal"}
              isAutoFocus={false}
              onChange={(e) => {
                data[id].hillyDaex = e.target.value;
                setData(data);
                errorArray[id].ishillyDaexError = false;
                setErrorArray(errorArray);
              }}
              error={
                errorArray[id].ishillyDaexError
                  ? errorArray[id].ishillyDaexError
                  : false
              }
              placeholder={"0.0"}
              isInline={true}
              maxLength={10}
            />
          </div>
        );
      },
    },

    //end
  ];

  return (
    <div className="holiday-wrapper">
      {showFilterGrid && (
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg>
              <DatePicker
                required={true}
                minDate={minDate}
                minDateMessage={"Please select a valid date!"}
                variant="inline"
                margin="none"
                label="Effective Date"
                defaultValue={effectiveDate}
                onChange={(date) => {
                  setEffectiveDate(date);
                  setEffectiveDateError(false);
                }}
                error={effectiveDateError}
                isInline={true}
              />
            </Grid>
            <Grid item xs={12} md={4} lg>
              <div className="selection-card-actions">
                <Button
                  label={labels.filterButton}
                  onClick={() => {
                    if (effectiveDate !== null) {
                      getExpenseConfig();
                    } else {
                      if (effectiveDate === null) setEffectiveDateError(true);
                    }
                  }}
                  customClass="button button-primary mr-2"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      )}
      {showGrid && (
        <div className="card">
          <div className="table-wrapper editable-table-wrapper table-smaller">
            <MaterialTable
              icons={GridIcons}
              title={
                "Expense Configuration from " + getDisplayDate(effectiveDate)
              }
              columns={baseColumns}
              data={data}
              style={style}
              options={{ ...options, paging: false }}
              actions={[
                {
                  icon: () => {
                    return (
                      <Refresh
                        onClick={() => {
                          // getFunction()
                        }}
                      />
                    );
                  },
                  tooltip: "Refresh Data",
                  isFreeAction: true,
                },
              ]}
            />
            <Grid item xs={12} style={{ justifyContent: "space-" }}>
              <div className="d-flex align-items-center justify-content-end">
                <Button
                  autoFocus
                  onClick={() => {
                    setShowFilterGrid(true);
                    setShowGrid(false);
                  }}
                  customClass="button button-black  mr-2 mt-2"
                  label={labels.cancelButton}
                />
                <Button
                  onClick={() => {
                    let validationData = checkAllValidations();
                    if (validationData.isValidate) {
                      if (validationData.isBlank) {
                        setDisplayMessage({
                          open: true,
                          displayMessage: "No records has been updated.",
                          severity: "warning",
                        });
                      } else setConfirmDialog(true);
                    }
                  }}
                  customClass="button button-primary mt-2"
                  label={labels.saveButton}
                />
              </div>
            </Grid>
          </div>
        </div>
      )}
      {confirmDialog && (
        <ConfirmationDialog
          open={confirmDialog}
          dialogTitle={"Save expense"}
          dialogContentText={`expense will be updated from ${getDisplayDate(
            effectiveDate
          )}. Are you sure you want to update?`}
          cancelButtonText="Cancel"
          okButtonText={"Ok"}
          onCancel={() => {
            setConfirmDialog(false);
            setLoading(false);
          }}
          onOk={(e) => {
            setConfirmDialog(false);
            setShowGrid(false);
            setShowFilterGrid(true);
            saveExpenseConfig();
          }}
        />
      )}

      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
      {loading && <Loading />}
    </div>
  );
}
