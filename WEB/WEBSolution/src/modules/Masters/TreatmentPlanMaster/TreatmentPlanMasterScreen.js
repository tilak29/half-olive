import React, { useState, useEffect } from "react";
import DisplayMessage from "../../../components/core/DisplayMessage";
import { Grid } from "@material-ui/core";
import Loading from "../../../components/core/Loading";
import { labels } from "../../../Config.json";
import Button from "../../../components/core/Button";
import Select from "../../../components/core/Select";
import { Delete, AddBox } from "@material-ui/icons";
import MaterialTable from "material-table";
import {
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import MultipleSelectionList from "../../../components/custom/MultipleSelectionList";

/**
 * Add operations for TreatMentPlan
 */
export default function TreatMentPlanMaster(props) {
  const [data, setData] = useState();
  const [dietData, setDietData] = useState();
  const [value, setvalue] = useState();
  const [check, setCheck] = useState([]);
  const [rowData, setRowData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({});
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCategoryError, setFilterCategoryError] = useState(false);
  const [treatmentTemplateCategoryList, setTreatmentTemplateCategoryList] = useState([]);
  const [checkValue, setCheckValue] = useState([]);

  const displayErrorMessage = (message) => {
    setDisplayMessage({
      open: true,
      displayMessage: message,
      severity: "error",
    });
  };

  const getTreatmentTemplateCategories = () => {
    props.getTreatmentTemplateCategories({
      onSuccess: (response) => {
        const { treatmentTemplateCategoryList } = response;
        setTreatmentTemplateCategoryList(treatmentTemplateCategoryList);
      },
      onFailure: ({ message }) => {
        displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    getTreatmentTemplateCategories();
  }, []);

  const getTreatmentList = () => {
    setLoading(true);
    const params = {
      filterCategory
    };
    props.getTreatmentList({
      params,
      onSuccess: (response) => {
        const { treatmentList = [] } = response;
        const data = treatmentList.map((daywise) => ({
          ...daywise,
          value: daywise.treatmentId,
          label: daywise.treatmentName,
        }));
        setData(data);
        setShowGrid(true);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const getDietList = () => {
    const params = {
      filterCategory
    };
    props.getDietList({
      params,
      onSuccess: (response) => {
        const { dietList = [] } = response;
        const dietData = dietList.map((daywise) => ({
          ...daywise,
          value: daywise.dietId,
          label: daywise.dietName,
        }));
        setDietData(dietData);
        setShowGrid(true);
        setLoading(false);
      },
      onFailure: ({ message }) => {
        setLoading(false);
        displayErrorMessage(message);
      },
    });
  };

  const addTreatmentPlan = (e) => {
    setLoading(true);
    let daywisedata = []
    for (let i = 0; i < check.length; i++) {
      if (check[i].flag === true) {
        daywisedata.push(check[i])
      }
    }
    const params = {
      filterCategory,
      daywisedata
    };
    props.addTreatmentPlan({
      params,
      onSuccess: ({ message: displayMessage }) => {
        showGrid && getTreatmentList(e) && getDietList(e);
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
  console.log("data :: ", data)
  const insertDay = () => {
    for (let index = 0; index < 2; index++) {
      const element = <MultipleSelectionList
      items={dietData}
      width={"100%"}
      checked={rowData.dietId}
      setChecked={(e) => {
        setRowData({ ...rowData, dietId: e })
      }}
      required={true}
      keyField={"value"}
      textField={"label"}
      label={"Diet"}
      columns={3}
    />
      
    const newData = [...data];
    newData.push(element);
    setData(newData);
    }
    // var lengthofI = [];
    // for (let index = 1; index <= 3; index++) {
    //   lengthofI.push(index);
    // }
    // setvalue(data);
  };

  return (
    <div className="holiday-wrapper">
      {(
        <div className="card selection-card selection-card-two-columns mb-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <Select
                data={treatmentTemplateCategoryList}
                value={filterCategory}
                label={"Template Name"}
                onChange={(e) => {
                  const filterCategory = e.target.value || "";
                  setFilterCategoryError(false);
                  setFilterCategory(filterCategory);
                }}
                isInline={true}
                required={true}
                error={filterCategoryError}
              />
            </Grid>

            <Grid item xs={6} md={4} lg={3}>
              <div className="selection-card-actions">
                <Button
                  label={labels.filterButton}
                  customClass="button button-primary mr-2"
                  onClick={() => {
                    if (filterCategory !== "") {
                      getTreatmentList();
                      getDietList();
                    } else {
                      filterCategory === "" && setFilterCategoryError(true);
                    }
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      )}
      {showGrid && (
        <>
          <div className="card selection-card selection-card-two-columns mb-3">
            <>
              <div className="card selection-card selection-card-two-columns mb-3">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MultipleSelectionList
                      items={data}
                      width={"100%"}
                      // checked={checkValue.includes(`Day_${i}`) ? rowData.treatmentId : []}
                      checked={rowData.treatmentId}
                      setChecked={(e) => {
                        setRowData({ ...rowData, treatmentId: e })
                      }}
                      required={true}
                      keyField={"value"}
                      textField={"label"}
                      label={"Treatment"}
                      columns={3}
                    />
                    <AddBox
                      className="add-box-button"
                      onClick={() => {
                        console.log(document.getElementsByClassName("card selection-card selection-card-two-columns mb-3")) 
                        insertDay();
                        console.log("Clicked")
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MultipleSelectionList
                      items={dietData}
                      width={"100%"}
                      checked={rowData.dietId}
                      setChecked={(e) => {
                        setRowData({ ...rowData, dietId: e })
                      }}
                      required={true}
                      keyField={"value"}
                      textField={"label"}
                      label={"Diet"}
                      columns={3}
                    />
                  </Grid>
                </Grid>
              </div>
            </>
          </div>
          <Grid item xs={12} style={{ justifyContent: "space-between" }}>
            <div className="d-flex align-items-center justify-content-end">
              <Button
                onClick={(e) => {
                  addTreatmentPlan(e);
                }}
                customClass="button button-primary"
                label={labels.saveButton}
              />
            </div>
          </Grid>
        </>
      )
      }
      {loading && <Loading />}
      <DisplayMessage
        {...displayMessage}
        onClose={() => setDisplayMessage({ open: false })}
      />
    </div >
  );
}
