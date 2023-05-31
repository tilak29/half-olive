import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

import {
  GridIcons,
  options,
  style,
} from "../../../components/custom/GridConfig";
import { getDisplayDate } from "../../../Utils/DateTimeUtils.js";
import CustomLegend from "../../../components/custom/CustomLegend/CustomLegend";

export default function SLTourPlanList(props) {
  const [data, setData] = useState([]);

  const getSLTourPlan = () => {
    const { rowData = {} } = props;
    let params = {
      month: rowData.month,
      year: rowData.year,
      employeeId: rowData.employeeId,
    };

    props.getSLTourPlan({
      params,
      onSuccess: (response) => {
        const { slTourPlanList = [] } = response;
        const formattedData = slTourPlanList.map((record, index) => {
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
    getSLTourPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { title: "Sr.No", field: "srNo" },
    { title: "Day Of Week", field: "dayOfWeek" },
    { title: "Working Date", field: "workingDateDisplay" },
    {
      title: "Route",
      field: "routeName",
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
