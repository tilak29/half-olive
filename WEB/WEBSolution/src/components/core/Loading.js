import React from "react";

/**
 * Loading component to show the progress.
 * This will be displyed in the center of the screen.
 * @author Tejal Sali
 */
export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        width:"100%",
        height:"100%"
      }}
    >
      <div className="lds-default" style={{  margin: "0px auto",
  display: "block",
  top: "calc(50% - 40px)"
}}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
