import * as XLSX from "xlsx";
import fileSaver from "file-saver";

const generateSheet = async ({ data, header }) => {
  let ws = XLSX.utils.aoa_to_sheet(header);

  XLSX.utils.sheet_add_json(ws, data, {
    skipHeader: true,
    origin: "A2",
  });
  const headerLength = fitToColumn(header);
  const dataLength = fitToColumn(data);

  function fitToColumn(data) {
    const columnWidths = [];
    for (const property in data[0]) {
      columnWidths.push({
        w: Math.max(
          property ? property.toString().length : 0,
          ...data.map((obj) =>
            obj[property] ? obj[property].toString().length : 0
          )
        ),
      });
    }
    return columnWidths;
  }

  let columnWidth = [];
  for (let i = 0; i < headerLength.length; i++) {
    columnWidth.push({
      wch:
        data.length === 0 || headerLength[i]["w"] > dataLength[i]["w"]
          ? headerLength[i]["w"]
          : dataLength[i]["w"],
    });
  }
  ws["!cols"] = columnWidth;
  return ws;
};

const downloadExcel = async ({ data, fileName, header, data1, header1 }) => {
  const ws = await generateSheet({ data, header });
  let sheets = { Export: ws };
  let sheetNames = ["Export"];
  let ws1;
  if (data1) {
    ws1 = await generateSheet({ data: data1, header: header1 });
    sheets = { ...sheets, Export1: ws1 };
    sheetNames.push("Export1");
  }
  const wb = {
    Sheets: { ...sheets },
    SheetNames: [...sheetNames],
  };

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blobData = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  fileSaver.saveAs(blobData, fileName + ".xls");
  return;
};

export default downloadExcel;
