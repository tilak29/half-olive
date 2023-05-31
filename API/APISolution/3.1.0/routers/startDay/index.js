const express = require("express");
const router = express.Router();

const { startDayInsertData } = require("./startDayRepository");
const {
  payLoadValidation,
  sendResponse,
  checkCurrentTime
} = require("../../../utils");
const { startDay } = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  startDay: { url: insertData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /startDay Insert Start Date into Attendance Info
 * @apiName StartDay
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /startDay
 *
 * @apiGroup Start Day
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Start Date into Attendance Info
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceId
 *
 * @apiParam (Request body) {JSON} Input
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "currentTime":"2020-03-16 14:32:54"
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {},
 *      "message": "Record Inserted Successfully",
 *      "isSuccess": true,
 *      "statusCode": 200
 *    }
 *
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {},
 *      "message": "Your Device date is not match with Server Date",
 *      "isSuccess": false,
 *      "statusCode": 200
 *    }
 *
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {},
 *      "message": "Startdate is already exists for the same date",
 *      "isSuccess": false,
 *      "statusCode": 200
 *    }
 *
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {},
 *      "message": "Please approve/reject your subordinates leave",
 *      "isSuccess": false,
 *      "statusCode": 200
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
  insertData,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body
      };
      const { currentTime, loggedInEmployeeId } = bodyData;
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: startDay
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const isValidCurrentDate = await checkCurrentTime({ currentTime });
        if (isValidCurrentDate) {
          const response = await startDayInsertData({
            loggedInEmployeeId
          });
          if (response[3] && response[3][0]["@op_IsSuccess"] === 1) {
            if (response[3][0]["@op_Flag"] === 1) {
              result = {
                isSuccess: true,
                message: Message({ code: "RINS" })
              };
            } else if (response[3][0]["@op_Flag"] === 2) {
              result = {
                isSuccess: false,
                message: Message({ code: "DUPSTARTDAY" })
              };
            } else if (response[3][0]["@op_Flag"] === 3) {
              result = {
                isSuccess: false,
                message: Message({ code: "APPOVEREJECTLEAVE" })
              };
            } else if (response[3][0]["@op_Flag"] === 4) {
              result = {
                isSuccess: false,
                message: Message({ code: "APPOVEREJECTTOURPLAN" })
              };
            } else if (response[3][0]["@op_Flag"] === 5) {
              result = {
                isSuccess: false,
                message: Message({ code: "NOTALLOWSTARTDAY" })
              };
            }
          } else {
            result = {
              message: Message({}),
              isSuccess: false
            };
          }
        } else {
          result = {
            message: Message({ code: "DateNotMatch" }),
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

module.exports = router;
