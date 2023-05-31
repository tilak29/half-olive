import React from "react";

import { getPrintStampDateTime } from "../../Utils/DateTimeUtils.js";

/**
 * Printing for a Grid
 * @author Tejal Sali
 */

export default class PrintableGrid extends React.Component {
  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
  }

  getHeader = function (columns) {
    const printHeaderStyle={
      // width: "100%",
      // bordercollapse: "collapse",
      border: "1px solid black"
    };
    return columns.map(({ title }) => {
      return (
        <th className="text-center" style={printHeaderStyle} key={title}>
          {title}
        </th>
      );
    });
  };

  getRowsData = function (columns) {
    return this.props.data.map((row, index) => {
      return (
        <tr key={index}>
          <RenderRow rowData={row} columns={columns} index={index} />
        </tr>
      );
    });
  };

  render() {
    const printOuterStyle={
      width: "100%",
      bordercollapse: "collapse",
      border: "1px solid black"
    };

    const columns = this.props.columns.filter(
      ({ printable = true }) => printable === true
    );
    return (
      <div style={{ padding: "10px" }}>
        <div style={{ fontSize: "12px" }}>
          {getPrintStampDateTime(new Date())}
        </div>
        {this.props.title && (
          <div style={{ textAlign: "center" }}>
            <b>{this.props.title}</b>
            <br />
            <br />
          </div>
        )}
        
        {/* //L166358 */}
        {this.props.header && (
          <div>
            {this.props.header}
            <br />
          </div>
        )}

        <table style={printOuterStyle} style={{borderCollapse:'collapse',width: "100%"}}>
          <thead>
            <tr>{this.getHeader(columns)}</tr>
          </thead>
          <tbody>{this.getRowsData(columns)}</tbody>
        </table>
      </div>
    );
  }
}

const getText = function ({ col, value }) {
  return col.type && col.type === "boolean"
    ? value === true
      ? "Yes"
      : "No"
    : value;
};

const RenderRow = function ({ rowData, columns, index }) {
  const printRowStyle={
    // width: "100%",
    // bordercollapse: "collapse",
    border: "1px solid black"
  };
  return columns.map((col) => {
    const text = getText({ col, value: rowData[col.field] });
    return <td style={printRowStyle} key={index + col.field + text}>{text}</td>;
  });
};
