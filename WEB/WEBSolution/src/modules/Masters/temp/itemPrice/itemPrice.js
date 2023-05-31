import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Grid, Tooltip, IconButton, Link } from "@material-ui/core";
import { SaveAlt, Refresh } from "@material-ui/icons";

import Button from "../../../components/core/Button";
import colors from "../../../Colors/colors";
import {
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import TextField from "../../../components/core/TextField";
import DisplayMessage from "../../../components/core/DisplayMessage";
import Select from "../../../components/core/Select";
import DatePicker from "../../../components/core/DatePicker";
import {
  getDBFormateDate,
  getDisplayDate,
  getBrowserFormatDate,
} from "../../../Utils/DateTimeUtils.js";
import { labels } from "../../../Config.json";
import DialogControl from "../../../components/core/Dialog";
import Loading from "../../../components/core/Loading";
import downloadExcel from "../../../Utils/DownloadExcel";

/**
 * List of prices for item for future dates
 * Add operation for Item Price Master
 * Export item prices for selective dates
 * @author Tejal Sali, Khushbu Shah
 */
export default function ItemPrice(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [exportDialog, setExportDialog] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [divisionList, setDivisionsList] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [divisionError, setDivisionError] = useState(false);
  const [effectiveDateError, setEffectiveDateError] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [errorCheck, setErrorCheck] = useState([]);
  const [effectiveDate, setEffectiveDate] = useState(null);
  const [saveClick, setSaveClick] = useState(0);
  const [savedFilters, saveFilters] = useState({});
  const [exportDates, setExportDates] = useState([]);

  const { operationRights, serverDate } = props;
  const { add } = operationRights;

  let minDate = getBrowserFormatDate(serverDate);
  minDate.setDate(minDate.getDate() + 1);

  const getDivisions = () => {
    props.getDivisions({
      onSuccess: (response) => {
        const { divisionList } = response;
        setDivisionsList(divisionList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const getCategories = () => {
    props.getCategories({
      onSuccess: (response) => {
        let allOptionObj = { label: "All", value: "All" };
        const { categoryList = [] } = response;
        categoryList.splice(0, 0, allOptionObj);
        setSelectedCategory("All");
        setCategoryList(categoryList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const getItemPriceExportDates = () => {
    props.getItemPriceExportDates({
      onSuccess: (response) => {
        const { itemPriceExportDateList = [] } = response;
        const data = itemPriceExportDateList.map((date) =>
          getDisplayDate(date.effectiveStartDate)
        );
        setExportDates(data);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    getDivisions();
    getCategories();
    getItemPriceExportDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getItemPriceList = (oldFilters = false) => {
    setLoading(true);
    const params = {
      divisionId: oldFilters ? savedFilters.divisionId : selectedDivision,
      // effectiveStartDate: getDBFormateDate(
      //   oldFilters ? savedFilters.effectiveDate : effectiveDate
      // )
    };
    if (
      oldFilters
        ? savedFilters.categoryId
        : (selectedCategory === "All" ? "" : selectedCategory) !== ""
    )
      params.categoryId = oldFilters
        ? savedFilters.categoryId
        : selectedCategory === "All"
        ? ""
        : selectedCategory;

    let errorArr = [];
    props.getItemPriceList({
      params,
      onSuccess: (response) => {
        setLoading(false);
        const { itemPriceList = [] } = response;
        const list = itemPriceList.map((item, index) => {
          const er = [false, false, false]; //L166176
          errorArr.push(er);
          return {
            ...item,
            srNo: index + 1,
            mrp: "",
            ptr: "",
            pts: "", //L166176
          };
        });
        setData(list);
        setErrorCheck(errorArr);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const exportItemPriceList = (exportDate, date) => {
    props.exportItemPriceList({
      params: { effectiveStartDate: date },
      onSuccess: (response) => {
        const header = [["Id", "Brand", "Pack", "MRP", "PTR", "PTS"]]; //L166176
        downloadExcel({
          data: response.itemPriceList,
          fileName: `ItemPrice_${exportDate}`,
          header: header,
        });
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  const resetData = () => {
    let errorArr = [];
    const list = data.map((item) => {
      const er = [false, false, false]; //L166176
      errorArr.push(er);
      return {
        ...item,
        mrp: "",
        ptr: "",
        pts: "" //L166176
      };
    });
    setData(list);
    setErrorCheck(errorArr);
  };

  const checkAllValidations = () => {
    let isValidate = true;
    let isZero = false;

    data.forEach((item, index) => {
      if (
//L166176
        (item.ptr !== "" && item.mrp !== "" && item.pts !== "") ||
        (item.ptr === "" && item.mrp === "" && item.pts === "")
      ) {
          let newArry = errorCheck;
          const updatedvalue = [false, false, false]; //L166176
          if (
            (item.ptr !== "" && parseFloat(item.ptr) === 0) ||
            (item.mrp !== "" && parseFloat(item.mrp) === 0) ||
            (item.pts !== "" && parseFloat(item.pts) === 0) //L166176
          ) {
            isValidate = false;
            isZero = true;

            if (parseFloat(item.mrp) === 0) updatedvalue[0] = true;
            if (parseFloat(item.ptr) === 0) updatedvalue[1] = true;
            if (parseFloat(item.pts) === 0) updatedvalue[2] = true; //L166176
          }
          newArry[index] = updatedvalue;
          setErrorCheck(newArry);
      } else {
        isValidate = false;
        if (item.ptr === "") {
          let newArry = errorCheck;
          const updatedvalue = [false, true, false]; //L166176
          newArry[index] = updatedvalue;
          setErrorCheck(newArry);
        } else if (item.mrp === "") {
          let newArry = errorCheck;
          const updatedvalue = [true, false, false]; //L166176
          newArry[index] = updatedvalue;
          setErrorCheck(newArry);
        } 
//L166176
        else if (item.pts === "") {
          let newArry = errorCheck;
          const updatedvalue = [false, false, true];
          newArry[index] = updatedvalue;
          setErrorCheck(newArry);
        }
      }
    });
    if (isZero) displayErrorMessage(`Please Enter a Valid Price value.`);
    else if (!isValidate) {
      displayErrorMessage("Please clear error!");
    }
    return isValidate;
  };

  const saveItemsPrice = () => {
    setSaveClick(saveClick + 1);
    if (checkAllValidations()) {
      const itemPriceData = [...data]
        .filter((item) => {
          return (
            item.ptr !== null &&
            item.ptr !== "" &&
            item.mrp !== null &&
            item.mrp !== "" && //L166176
            item.pts !== null &&
            item.pts !== "" 
          );
        })
        .map((item) => {
          return {
            itemId: item.itemId,
            mrp: item.mrp,
            ptr: item.ptr,
            pts: item.pts //L166176
          };
        });
      if (itemPriceData.length > 0) {
        props.addItemPrice({
          params: {
            itemPriceData,
            effectiveStartDate: getDBFormateDate(savedFilters.effectiveDate),
          },
          onSuccess: ({ message: displayMessage }) => {
            setDisplayMessage({
              open: true,
              displayMessage,
              severity: "success",
            });
            getItemPriceExportDates();
            getItemPriceList(true);
          },
          onFailure: ({ message }) => {
            displayErrorMessage(message);
          },
        });
      } else {
        displayErrorMessage("Nothing to save!");
        return;
      }
    }
  };

  const baseColumns = [
    {
      title: "Sr.No",
      field: "srNo",
    },
    {
      title: "Brand",
      field: "brand",
    },
    {
      title: "Pack",
      field: "pack",
    },
    {
      title: "Current MRP",
      field: "currentMrp",
    },
    {
      title: "Current PTR",
      field: "currentPtr",
    },
//L166176
    {
      title: "Current PTS",
      field: "currentPts",
    },
    {
      title: "New MRP",
      field: "mrp",
      hidden: !add,
      sorting: false,
      render: ({ tableData: { id } }) => {
        let ar =
          errorCheck.length > 0 && errorCheck[id]
            ? errorCheck[id]
            : [false, false, false]; //L166176
        return (
          <TextField
            required={false}
            value={data[id].mrp}
            type={"decimal"}
            isAutoFocus={false}
            onChange={(e) => {
              data[id].mrp = e.target.value;
              setData(data);
            }}
            error={ar[0] ? true : false}
            placeholder={"0.0"}
            errorMessage={"MRP is Required"}
            isInline={true}
            maxLength={10}
          />
        );
      },
    },
    {
      title: "New PTR",
      field: "ptr",
      hidden: !add,
      sorting: false,
      render: ({ tableData: { id } }) => {
        let ar =
          errorCheck.length > 0 && errorCheck[id]
            ? errorCheck[id]
            : [false, false, false]; //L166176
        return (
          <TextField
            required={false}
            value={data[id].ptr}
            type={"decimal"}
            isAutoFocus={false}
            onChange={(e) => {
              data[id].ptr = e.target.value;
              setData(data);
            }}
            error={ar[1] ? true : false}
            placeholder={"0.0"}
            errorMessage={"PTR is Required"}
            isInline={true}
            maxLength={10}
          />
        );
      },
    },
//L166176
    {
      title: "New PTS",
      field: "pts",
      hidden: !add,
      sorting: false,
      render: ({ tableData: { id } }) => {
        let ar =
          errorCheck.length > 0 && errorCheck[id]
            ? errorCheck[id]
            : [false, false, false];
        return (
          <TextField
            required={false}
            value={data[id].pts}
            type={"decimal"}
            isAutoFocus={false}
            onChange={(e) => {
              data[id].pts = e.target.value;
              setData(data);
            }}
            error={ar[2] ? true : false}
            placeholder={"0.0"}
            errorMessage={"PTS is Required"}
            isInline={true}
            maxLength={10}
          />
        );
      },
    }
  ];

  const exportDialogContent = (
    <table className="table table-bordered">
      <thead>
        <tr className={"grey-table-header"}>
          <th>Effective Date</th>
        </tr>
      </thead>
      <tbody>
        {exportDates.map((date) => {
          return (
            <tr>
              <td>
                <Link
                  component="button"
                  color="inherit"
                  onClick={() => {
                    exportItemPriceList(date, getDBFormateDate(date));
                  }}
                >
                  {date}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div className="holiday-wrapper">
      <div className="card selection-card selection-card-two-columns mb-3">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg>
            <Select
              required={true}
              data={divisionList}
              value={selectedDivision}
              label={"Division"}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setDivisionError(false);
              }}
              error={divisionError}
              errorMessage={"Division is Required"}
              isInline={true}
            />
          </Grid>
          <Grid item xs={12} md={4} lg>
            <Select
              data={categoryList}
              value={selectedCategory}
              label={"Category"}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} lg>
            <DatePicker
              required={true}
              minDate={new Date()}
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
              errorMessage={"Effective Date is Required"}
              isInline={true}
            />
          </Grid>
          <Grid item xs={12} md={4} lg>
            <div className="selection-card-actions">
              <Button
                label={labels.filterButton}
                onClick={() => {
                  if (selectedDivision !== "" && effectiveDate !== null) {
                    saveFilters({
                      divisionId: selectedDivision,
                      effectiveDate,
                      categoryId:
                        selectedCategory === "All" ? "" : selectedCategory,
                    });
                    setShowGrid(true);
                    getItemPriceList();
                  } else {
                    if (selectedDivision === "") setDivisionError(true);
                    if (effectiveDate === null) setEffectiveDateError(true);
                  }
                }}
                customClass="button button-primary mr-2"
              />
              <Tooltip title="Export">
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    getItemPriceExportDates();
                    setExportDialog(true);
                  }}
                  size="small"
                >
                  <SaveAlt style={{ color: colors.defaultRed }} />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      </div>
      {showGrid && saveClick >= 0 && !loading && (
        <div className="card">
          <div className="table-wrapper editable-table-wrapper table-smaller">
            <MaterialTable
              icons={GridIcons}
              title={
                "Update items price from " +
                getDisplayDate(savedFilters.effectiveDate)
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
                          getItemPriceList(true);
                        }}
                      />
                    );
                  },
                  tooltip: "Refresh Data",
                  isFreeAction: true,
                },
              ]}
            />
            {add && data.length > 0 && (
              <div className="d-flex align-items-center justify-content-end mt-3 ">
                <Button
                  label={labels.resetButton}
                  onClick={() => {
                    resetData();
                  }}
                  autoFocus
                  customClass="button button-black mr-2"
                />
                <Button
                  label={labels.saveButton}
                  onClick={() => {
                    saveItemsPrice();
                  }}
                  customClass="button button-primary mr-2"
                />
              </div>
            )}
          </div>
        </div>
      )}
      {exportDialog && (
        <DialogControl
          maxWidth={"md"}
          open={exportDialog}
          dialogTitleText={"Export Item Price"}
          dialogContent={exportDialogContent}
          onCancel={() => {
            setExportDialog(false);
          }}
          cancelAction={false}
          submitAction={false}
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
