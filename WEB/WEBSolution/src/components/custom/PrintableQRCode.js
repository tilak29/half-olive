import React from "react";
import QRCode from 'qrcode.react';
import { getPrintStampDateTime } from "../../Utils/DateTimeUtils.js";

export default class PrintableQR extends React.Component {
  constructor(props) {
    super(props);
    this.getRowsData = this.getRowsData.bind(this);
  }

  getRowsData = function (imageSrc,rows,columns,size) {
      let images=[]
    for (var i = 0; i <rows; i++) {
        images.push(
          <tr key={(i)}>
            <RenderRow data={imageSrc} columns={columns} size={size} index={(i)} />
          </tr>
        );
    }
    return images;
  };

  render() {
    const printOuterStyle = {
      width: "100%",
      bordercollapse: "collapse",
      border: "1px solid black",
    };

    
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
        <table
          style={printOuterStyle}
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <tbody>{this.getRowsData(this.props.qrData,this.props.rows,this.props.columns,this.props.size)}</tbody>
        </table>
      </div>
    );
  }
}

const RenderRow = function ({data,columns,size, index }) {
  const printRowStyle = {
    //  width: "100%",
    //  bordercollapse: "collapse",
    border: "1px solid black",
    textAlign:'center'
  };
  debugger;
  console.log("data:",data);
  let x=[];
  let res = index*columns;
  for(var k=0;k<columns;k++){
    if(data[res+k])
    {
      x.push(
          <td style={printRowStyle} key={index}>
              <QRCode
                value={data[res+k].qrCode}                
                level={"H"}
                size={size}
                includeMargin={true}
                renderAs={"svg"}   
              />
              <div textAlign="center">{data[res+k].sequenceCodeId}</div>
          </td>
        );
    }
    else
      break;
  }
  return x;
};
