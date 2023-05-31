import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

import {
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import { getDisplayDate } from "../../../Utils/DateTimeUtils.js";
import CustomLegend from "../../../components/custom/CustomLegend/CustomLegend";

export default function ManagerTourPlanList(props) {
  const [data, setData] = useState([]);

  const getManagerTourPlan = () => {
    const { rowData = {} } = props;
    let params = {
      month: rowData.month,
      year: rowData.year,
      employeeId: rowData.employeeId,
    };

    props.getManagerTourPlan({
      params,
      onSuccess: (response) => {
        const { managerTourPlanList = [] } = response;
        const formattedData = managerTourPlanList.map((record, index) => {
          return {
            ...record,
            srNo: index + 1,
            workingDateDisplay: getDisplayDate(record.workingDate),
          };
        });

        setData(formattedData);
      },
      onFailure: ({ message }) => {
        props.displayErrorMessage(message);
      },
    });
  };

  useEffect(() => {
    getManagerTourPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { title: "Sr.No", field: "srNo" },
    { title: "Day Of Week", field: "dayOfWeek" },
    { title: "Working Date", field: "workingDateDisplay" },
    {
      title: "State",
      field: "stateName",
    },
    {
      title: "Working With",
      field: "workingWithName",
    },
    {
      title: "Remarks",
      field: "remarks",
    },
  ];

  return (
    <div className="table-wrapper editable-table-wrapper table-size-xs">
      <CustomLegend
        legendList={[
          {
            color: "#C9EEEB",
            label: "Holiday Off",
          },
          {
            color: "#EDF2FF",
            label: "Week Off",
          },
        ]}
      />
      <MaterialTable
        icons={GridIcons}
        title={props.title}
        columns={columns}
        data={data}
        style={style}
        options={{
          ...options,
          paging: false,
          search: false,
          rowStyle: (rowData) => ({
            backgroundColor:
              rowData.offDayClass === "holidayoff"
                ? "#C9EEEB"
                : rowData.offDayClass === "weekoff"
                ? "#EDF2FF"
                : "",
          }),
        }}
      />
    </div>
  );
}
