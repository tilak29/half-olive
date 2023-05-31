const express = require("express");
const router = express.Router();

const { ConnectFTP } = require("../../../ftpConnector");
const readLine = require("readline");
const fs = require("fs");
const { FTP } = require("../../../config.json");
const { FtpFilesToRead } = require("../../../FTPFileDetails.json");
const { asyncDML, asyncBulkDML } = require("../../../dbutils");
const momentDate = require("moment");
const Path = require("path");

const { sendResponse } = require("../../../utils");
const {
  connectFTP_getData: { url: connectFTP },
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.0.0
 */
/**
 * @api {post} /connectFTP/getData FTP Manual Sync Data
 * @apiName Connect  FTP
 * @apiVersion 3.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /connectFTP/getData
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Process FTP Files
 *
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": ""
 *      }
 *
 * @apiErrorExample
 *    HTTP/1.1 500 Internal Server Error
 *      {
 *        "statusCode": 500,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Internal Server Error"
 *      }
 *
 */
router.post(
  connectFTP,
  async function (req, res, next) {
    try {
      let result = { isSuccess: true };
      var responseStatus = await processOutstandingFiles();
      req.result = { isValidate: true, validationList: [], ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

const processOutstandingFiles = async () => {
  let responseStatus = false;
  await ConnectFTP(
    async (ftpClient) => {
      const localPath = FTP.LocalPathToSaveFTPDownloadFiles;
      const basePath = FTP.FTPFileDirectory;
      const filesTobeProcessed = await ftpClient.list(basePath);
      if (filesTobeProcessed != null && filesTobeProcessed.length > 0) {
        await ftpClient.downloadDir(basePath, localPath);
        responseStatus = await processDataOnFtpDownloadComplete();
        return responseStatus;
      }
    },
    async (err) => {
      console.log(err);
      return responseStatus;
    }
  );
};


const fileExists = async (path) => {
  try {
    path = Path.join(Path.resolve(__dirname, "..", "..", ".."), path);
    if (fs.existsSync(path)) return true;
    else return false;
  } catch (err) {
    return false;
  }
};

const processDataOnFtpDownloadComplete = async () => {
  try {
    const maxAllowedLineItems = 100000;

    for (let ftpFile of FtpFilesToRead) {
      if (!ftpFile.IsActive) {
        continue;
      }

      let filePath = `${FTP.LocalPathToSaveFTPDownloadFiles}/${ftpFile.FileName}`;
      let isFileExists = await fileExists(filePath);

      if (!isFileExists) continue;

      let errorInReadingFile = false;
      let readFiles = true;

      // read file contents as a stream

      let fileStream = fs.createReadStream(filePath);

      fileStream.on("error", (err) => {
        console.log(err);
        errorInReadingFile = true;
      });

      if (errorInReadingFile) continue;

      let qry = ``;
      let linesArray = [];

      // create instance to read file content line by line
      const readLineByLine = readLine.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      // read each line in loop
      for await (const line of readLineByLine) {
        let objLine = line.split("\t");

        for (let fieldIndex of ftpFile.DateFieldsToConvert) {
          objLine[fieldIndex] = momentDate(
            objLine[fieldIndex],
            "DD/MM/YYYY"
          ).format("YYYY-MM-DD");
        }

        linesArray.push(objLine);
      }

      if (!readFiles) {
        break;
      }
      // Code here

      if (ftpFile.RequiredTruncate) {
        qry = `TRUNCATE ${ftpFile.TableName};`;
        const response = await asyncDML({ qry });
      }
      qry = ``;
      if (ftpFile.TableFields.length > 0) {
        qry = `INSERT INTO ${ftpFile.TableName} (${ftpFile.TableFields}) VALUES ?;`;
      }

      if (qry.length > 0) {
        let totalLineItems = linesArray.length;
        let totalPackets = Math.ceil(totalLineItems / maxAllowedLineItems);
        for (let index = 0; index < totalPackets; index++) {
          let startIndex = index * maxAllowedLineItems;
          let endIndex = (index + 1) * maxAllowedLineItems - 1;
          if (index === totalPackets - 1) {
            endIndex = totalLineItems;
          }
          const lineItemsToSend = linesArray.slice(startIndex, endIndex);

          const response = await asyncBulkDML({ qry, value: lineItemsToSend });
          const { isSuccess } = response;
        }
      }
    }
  } catch (err) {
    return false;
  }
};

module.exports = router;
