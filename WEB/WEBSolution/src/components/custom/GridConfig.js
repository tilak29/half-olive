import React from "react";
import { forwardRef } from "react";

import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";

export const GridIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export const style = {
  boxShadow: "none",
  "& table": {
    border: "1px solid #E0E0E0",
  },
};

export const actionColumnStyle = {
  // cellStyle: { width: "130px" },
  sorting: false,
};

export const options = {
  headerStyle: {
    backgroundColor: "#F5F5F5",
    color: "#22222",
  },
  searchFieldStyle: {
    underline: {
      "&:after": {
        borderBottomColor: "#ED3237",
      },
    },
  },
  pageSize: 10,
  actionsColumnIndex: -1,
  emptyRowsWhenPaging: false,
  draggable: false,};

export const tableoptions = {
  headerStyle: {
    backgroundColor: "#F5F5F5",
    color: "#22222",
  },
  searchFieldStyle: {
    underline: {
      "&:after": {
        borderBottomColor: "#ED3237",
      },
    },
  },
  pageSize: 10,
  actionsColumnIndex: -1,
  emptyRowsWhenPaging: false,
  draggable: false, exportButton: true
};
