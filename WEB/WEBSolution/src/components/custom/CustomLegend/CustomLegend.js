import React from "react";
import Style from "./CustomLegend.module.css";

export default function CustomLegend(props) {
  return (
    <div className={Style.LegendContainer}>
      {props.legendList.map((singleLegendObj) => (
        <div className={Style.SingleLegendWrap}>
          <div
            className={Style.LegendBox}
            style={{
              backgroundColor: singleLegendObj.color,
              borderColor: singleLegendObj.border
                ? singleLegendObj.border
                : "e3e6e9",
            }}
          ></div>
          <div className={Style.LegendLsabel}>{singleLegendObj.label}</div>
        </div>
      ))}
    </div>
  );
}
