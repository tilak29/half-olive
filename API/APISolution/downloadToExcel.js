const Excel = require("exceljs");

/**
 * @author "Khushbu Shah"
 */
const downloadToExcel = async ({ data, headers, fileName, res }) => {
  const sheetName = "sheet1";

  //setting workbook properties
  let workbook = new Excel.Workbook();
  workbook.creator = "system";
  workbook.lastModifiedBy = "system";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.properties.date1904 = true;

  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 1,
      visibility: "visible"
    }
  ];

  //Addling worksheet to workbook
  let worksheet = workbook.addWorksheet(sheetName);

  //Adding Headers to worksheet
  worksheet.columns = headers;

  //Adding data to our sheet
  data.map((row, index) => {
    worksheet.addRow(row);
  });

  res.setHeader("Content-Type", "application/vnd.ms-excel");

  res.setHeader("Content-Disposition", "attachment; filename=report.xls");
  workbook.xlsx.write(res).then(function () {
    res.end();
  });
};

module.exports = {
  downloadToExcel
};
