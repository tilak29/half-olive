const express = require("express");
const router = express.Router();
const moment = require("moment");

const {
  holidayGetData,
  holidaySaveData,
  holidayDownloadData,
  holidayUploadData
} = require("./holidayMasterRepository");
const {
  payLoadValidation,
  sendResponse,
  getNoOfGroupShow,
  trimRequest,
  inValidDataTypeResponse
} = require("../../../utils");
const {
  holidayMastergetData,
  holidayMasterAdd,
  holidayMasterUpdate,
  holidayMasterDelete
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  holidayMaster_getData: { url: getData },
  holidayMaster_insertData: { url: insertData },
  holidayMaster_updateData: { url: updateData },
  holidayMaster_deleteData: { url: deleteData },
  holidayMaster_downloadData: { url: downloadData },
  holidayMaster_uploadData: { url: uploadData }
} = require("../../../routerConstant");
const { validDateRange } = require("./holidayMasterUtils");
const { handleError } = require("../../../error.js");
const { getJSONFromExcel } = require("../../../uploadExcel");
const { fileMimeType } = require("../../../fileMimeTypeUtils");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /holidayMaster/getData Get Data from Holiday Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /holidayMaster/getData
 *
 * @apiGroup Holiday Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Holiday Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {string} stateId Enter state's id to get statewise holiday
 * @apiParam (Request body) {String} year Enter year to find year wise holidays
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "totalRecords": 0,
 *        "startFrom": 10,
 *        "stateId" : 12,
 *        "year" : 2020
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "statusCode": 200,
 *      "isSuccess": true,
 *      "data": {
 *          "holidayList":[
 *              "0": {
 *                    "companyId": 1,
 *                    "holidayId": 1,
 *                    "holidayName": "REPUBLIC DAY",
 *                    "holidayDate": "2020-01-25 18:30:00",
 *                    "stateId": 12,
 *                    "remarks": null,
 *                    "createdBy": 1,
 *                    "createdDate": "2020-01-16 14:32:54",
 *                    "updatedBy": 1,
 *                    "updatedDate": "2020-01-16 14:32:54",
 *                    "deletedBy": null,
 *                    "deletedDate": null
 *                    },
 *                  }
 *           ],
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully"
 *    }
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
 *    HTTP/1.1 401 Unauthorized
 *      {
 *        "statusCode": 401,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": false,
 *        "validationList": [
 *          {
 *             "Error": "You are UnAuthorized to perform this Action"
 *          }
 *         ],
 *        "message": "You are UnAuthorized to perform this Action"
 *      }
 */
router.post(
  getData,
  async function (req, res, next) {
    try {
      let result = {};
      const { totalRecords, startFrom, stateId, year } = req.body;
      const noOfGroupShow = await getNoOfGroupShow({ totalRecords, startFrom });

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: holidayMastergetData
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await holidayGetData({
          noOfGroupShow,
          stateId,
          year
        });
        const { isSuccess } = response;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              holidayList: [...response]
            },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result
        };
      }
      req.result = { isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /holidayMaster/insertData Insert Data into Holiday Master
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /holidayMaster/insertData
 *
 * @apiGroup Holiday Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Holiday Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {Array}   stateIdList Required Enter stateIdList as Array
 * @apiParam (Request body) {String}  holidayName Required Enter Holiday's name
 * @apiParam (Request body) {String}  holidayDate Required Enter Holiday's date
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "stateIdList":[1,12],
 *        "holidayName": "Christmas",
 *        "holidayDate": "2020-12-25 00:00:00"
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "statusCode": 200,
 *      "isSuccess": true,
 *      "data": {},
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Record Inserted Successfully"
 *    }
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
 */
router.post(
  insertData,
  async function (req, res, next) {
    try {
      const bodyData = {
        holidayId: 0,
        ...req.body
      };
      const result = await holidayMasterRequestHandler({
        bodyData,
        validatorData: holidayMasterAdd,
        operationType: 0
      });
      req.result = { ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
    // const bodyData = {
    //   ...req.body,
    //   holidayId: 0
    // };
    // const { holidayDate } = bodyData;

    // const result = {};
    //   result = await holidayMasterRequestHandler({
    //     bodyData,
    //     validatorData: holidayMasterAdd,
    //     operationType: 0
    //   });
    // }
    // req.result = { ...result };
    // next();
  },
  sendResponse
);

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /holidayMaster/updateData Update Data of Holiday Master
 * @apiName UpdateData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /holidayMaster/updateData
 *
 * @apiGroup Holiday Master
 *
 * @apiDescription This API is Used to update data in Holiday Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {String}  updatedDate Required Enter updatedDate For Updating Data
 * @apiParam (Request body) {Number}  holidayId Required to enter <code>HolidayId</code> field value as <code>holidayId</code> which is unique
 * @apiParam (Request body) {Number}  stateId Required to Enter state wise holiday update
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "updatedDate":"2020-01-16 14:32:54",
 *        "holidayId": 20,
 *        "stateId" : 11
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Record Updated Successfully"
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
 */
router.post(
  updateData,
  async function (req, res, next) {
    try {
      const bodyData = {
        holidayId: 0,
        ...req.body
      };
      const result = await holidayMasterRequestHandler({
        bodyData,
        validatorData: holidayMasterUpdate,
        operationType: 1
      });
      req.result = { ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /holidayMaster/deleteData Delete Data from Holiday Master
 * @apiName DeleteData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /holidayMaster/deleteData
 *
 * @apiGroup Holiday Master
 *
 * @apiDescription This API is Used to delete data from Holiday Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - updatedDate and holidayId is required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *       "updatedDate":"2020-01-16 14:32:54",
 *       "holidayId": 15
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Record Deleted Successfully",
 *      "isSuccess": true,
 *      "statusCode": 200,
 *      "data": {}
 *    }
 *
 * @apiErrorExample
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "statusCode": 500,
 *      "isSuccess": false,
 *      "data": {},
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Internal Server Error"
 *    }
 */
router.post(
  deleteData,
  async function (req, res, next) {
    try {
      const result = await holidayMasterRequestHandler({
        bodyData: { ...req.body },
        validatorData: holidayMasterDelete,
        operationType: 2
      });

      req.result = { ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

const holidayMasterRequestHandler = async ({
  bodyData,
  validatorData,
  operationType
}) => {
  let result = {};
  const isValidDataType = await payLoadValidation({
    bodyData: bodyData,
    payLoad: validatorData
  });

  const { isValidate, validationList } = isValidDataType;
  const { holidayDate } = bodyData;
  let isValidDateRange;
  if (holidayDate) {
    isValidDateRange = holidayDate
      ? await validDateRange({ date: holidayDate })
      : false;
  } else {
    isValidDateRange = true;
  }
  if (isValidate && isValidDateRange) {
    const response = await holidaySaveData({
      data: JSON.stringify(bodyData),
      operationType
    });
    if (response[3] && response[3][0]["@op_IsSuccess"] === 1) {
      const messageResult = await getResponse({
        operationType,
        operationFlag: response[3][0]["@op_Flag"]
      });
      result = { ...messageResult };
    } else {
      result = {
        message: Message({}),
        isSuccess: false
      };
    }
  } else {
    result = {
      message: Message({ code: "INVALPAYLOAD" }),
      isSuccess: true,
      isValidate: false,
      ...result
    };
  }
  result = { isValidate, validationList, ...result };
  return result;
};

const getResponse = async ({ operationType, operationFlag }) => {
  let result = {};
  switch (operationType) {
    case 0:
      if (operationFlag === 1)
        result = { message: Message({ code: "RINS" }), isSuccess: true };
      else if (operationFlag === 2)
        result = {
          message: Message({ code: "DUPHOLIDAY" }),
          isSuccess: false
        };
      break;
    case 1:
      if (operationFlag === 0)
        result = { message: Message({ code: "REFRESH" }), isSuccess: false };
      else if (operationFlag === 1)
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      else if (operationFlag === 2)
        result = {
          message: Message({ code: "DUPHOLIDAY" }),
          isSuccess: false
        };
      break;
    case 2:
      if (operationFlag === 1)
        result = { message: Message({ code: "RDEL" }), isSuccess: true };
      else
        result = { message: Message({ code: "NOCHANGE" }), isSuccess: false };
  }
  return result;
};

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /holidayMaster/downloadData Get Excel Data of Holiday Master
 * @apiName DownloadData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /holidayMaster/downloadData
 *
 * @apiGroup Holiday Master
 *
 * @apiDescription This API is Used to get Data of Holiday Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        "holidayList": [],
 *        "stateList": []
 *      },
 *      "isSuccess": true,
 *      "statusCode": 200
 *    }
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
 *    HTTP/1.1 401 Unauthorized
 *      {
 *        "statusCode": 401,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": false,
 *        "validationList": [
 *          {
 *             "Error": "You are UnAuthorized to perform this Action"
 *          }
 *         ],
 *        "message": "You are UnAuthorized to perform this Action"
 *      }
 */
router.post(
  downloadData,
  async function (req, res, next) {
    try {
      let result = {};
      const response = await holidayDownloadData({});
      const length = response.length;
      if (length > 0) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            holidayList: response[0],
            stateList: response[1]
          },
          isSuccess: true
        };
      } else {
        result = {
          message: Message({}),
          isSuccess: false
        };
      }
      req.result = { isValidate: true, validationList: [], ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /holidayMaster/uploadData Upload Excel Data of Holiday
 * @apiName UploadData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /holidayMaster/uploadData
 *
 * @apiGroup Holiday Master
 *
 * @apiDescription This API is Used to Upload Data of Holiday Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {},
 *      "isSuccess": true,
 *      "statusCode": 200
 *    }
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
 *    HTTP/1.1 401 Unauthorized
 *      {
 *        "statusCode": 401,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": false,
 *        "validationList": [
 *          {
 *             "Error": "You are UnAuthorized to perform this Action"
 *          }
 *         ],
 *        "message": "You are UnAuthorized to perform this Action"
 *      }
 */
router.post(
  uploadData,
  async function (req, res, next) {
    try {
      let result = {};
      const file = req.files ? req.files.file : undefined;
      if (file) {
        const mimeType = await fileMimeType({ file });
        const { ext } = mimeType;
        if (ext === "xls" || ext === "xlsx" || ext === "msi") {
          const columnToKey = {
            A: "stateId",
            B: "stateName",
            C: "holidayDate",
            D: "holidayName",
            E: "remarks"
          };
          let fileResult = await getJSONFromExcel({ file, columnToKey });
          const { loggedInEmployeeId } = req.body;
          if ((fileResult.Export && fileResult.Export.length > 0) || (fileResult.Sheet1 && fileResult.Sheet1.length > 0)) {
            const {
              isValidAfterTrim,
              formattedBody,
              trimRequestValidation
            } = await trimRequest({
              bodyData: fileResult
            });
            if (isValidAfterTrim === false || trimRequestValidation > 0) {
              req.result = await inValidDataTypeResponse({ req, res });
              return;
            } else {
              fileResult = formattedBody;
            }

            let dataArray = fileResult.Export;
            if(dataArray == null)
              dataArray = fileResult.Sheet1;
              dataArray = await dataArray.map((x) => {
                x.holidayDate = moment(x.holidayDate).format("YYYY-MM-DD");
              x = {
                ...x,
                stateId: x.stateId || x.stateId === 0 ? x.stateId : null,
                stateName:
                  x.stateName || x.stateName === 0 ? x.stateName : null,
                holidayDate:
                  x.holidayDate || x.holidayDate === 0 ? x.holidayDate : null,
                holidayName:
                  x.holidayName || x.holidayName === 0 ? x.holidayName : null,
                remarks: x.remarks || x.remarks === 0 ? x.remarks : null
              };
              return x;
            });

            const response = await holidayUploadData({
              data: dataArray,
              loggedInEmployeeId
            });
            const isSuccessFlag =
              response[1][0] && response[1][0]["@op_IsSuccess"];
            if (isSuccessFlag === 1) {
              result = {
                message: Message({ code: "RINS" }),
                data: {},
                isSuccess: true
              };
            } else if (isSuccessFlag === 3) {
              result = {
                message: Message({ code: "HOLIDAYUPDATED" }),
                data: {},
                isSuccess: true
              };
            } else if (isSuccessFlag === 2) {
              result = {
                message: Message({ code: "DUPHOLIDAY" }),
                data: {},
                isSuccess: false
              };
            } else {
              result = {
                message: Message({}),
                isSuccess: false
              };
            }
          } else {
            result = {
              message: Message({ code: "NODATAINEXCEL" }),
              isSuccess: false
            };
          }

          req.result = { isValidate: true, validationList: [], ...result };
        } else {
          const message = Message({ code: "INVALIDFILETYPE" });
          req.result = {
            message,
            isSuccess: true,
            isValidate: false,
            validationList: [{ file: message }],
            ...result
          };
        }
      } else {
        const message = Message({ code: "INVALPAYLOAD" });
        req.result = {
          message,
          isSuccess: true,
          isValidate: false,
          validationList: [{ file: message }],
          ...result
        };
      }
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

module.exports = router;
