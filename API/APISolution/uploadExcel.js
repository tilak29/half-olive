const excelToJSON = require("convert-excel-to-json");
const fs = require("fs");

/**
 * @author "Khushbu Shah"
 */
const getJSONFromExcel = async ({ file, columnToKey }) => {
  const filename = file.name;
  const getJSON = async () => {
    return new Promise((resolve, reject) => {
      file.mv("excel/" + filename, async err => {
        if (err) {
          reject(err);
        } else {
          const resultFromExcel = await excelToJSON({
            sourceFile: "excel/" + filename,
            header: { rows: 1 },
            columnToKey: columnToKey
          });
          resolve(resultFromExcel);
        }
      });
    });
  };
  const json = await getJSON();
  fs.unlink("excel/" + filename, function (err) {
    if (err) throw err;
  });
  return json;
};
module.exports = {
  getJSONFromExcel
};
