const express = require("express");
const router = express.Router();

const {
  getDCRCalendarData,
  getPreviewData,
  getIsLeaveApprovalPendingData,
  getDCRPreviewData,
  getDCRCalendarDataAsync,
} = require("./dcrCalendarDataRepository");
const { sendResponse, payLoadValidation } = require("../../../utils");
const {
  dcr_getData: { url: getData },
  dcr_previewData: { url: getPreview },
  isLeaveApprovalPending_getData: { url: getLeaveApprovalPendingData },
  dcr_previewDCRData: { url: previewDCRData },
  dcr_getCalendarDataAsync: { url: getCalendarDataAsync },
} = require("../../../routerConstant");
const { Message } = require("../../../Messages");
const { getDcrPreview } = require("../../../dataType.json");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /dcr/getData Get DCR Calendar data
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dcr/getData
 *
 * @apiGroup DCR
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get DCR Calendar data
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "employeeId":1,
 *      "month":"3",
 *      "year": "2020"
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *             "dcrCalendarList": {
 *                  "2020-03-01": {
 *                          "dateName": "Sunday",
 *                          "dayIndication": "weekoff",
 *                          "dayIndicationValue": "weekoff",
 *                          "isDcrLocked": 1,
 *                          "productiveCalls": 0,
 *                          "totalCalls": 0,
 *                          "weekDayIndex": 6,
 *                          "isDayEnded":0,
 *                          "isExpenseFilled":1,
 *                          "workingWithId":32,
 *                          "workingWithName":"Khushbu Shah"
 *                      },
 *                },
 *             "isTourPlanExists": 0
 *         },
 *         "isSuccess": true,
 *         "statusCode": 200
 *       }
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
  getData,
  async function (req, res, next) {
    try {
      let result = {};
      const { employeeId, loggedInEmployeeId, month, year } = req.body;
      const response = await getDCRCalendarData({
        employeeId,
        loggedInEmployeeId,
        month,
        year,
      });
      const { isSuccess } = response;

      delete response.isSuccess;
      if (isSuccess === true) {
        const dcrCalendarData = response[0];
        let objRes = {};
        for (let d of dcrCalendarData) {
          let objmonth = {};
          const date = d.MonthDate;
          objmonth["dateName"] = d.DateName;
          objmonth["dayIndication"] = d.DayIndication;
          objmonth["dayIndicationValue"] = d.DayIndicationValue;
          objmonth["isDCRLocked"] = d.IsDCRLocked;
          objmonth["productiveCalls"] = d.ProductiveCalls;
          objmonth["totalCalls"] = d.TotalCalls;
          objmonth["isDayEnded"] = d.IsDayEnded;
          objmonth["isExpenseFilled"] = d.IsExpenseFilled;
          objmonth["weekDayIndex"] = d.WeekDayIndex;
          objmonth["workingWithId"] = d.WorkingWithId;
          objmonth["workingWithName"] = d.WorkingWithName;
          objRes[date] = objmonth;
        }
        result = {
          message: Message({ code: "Success" }),
          data: {
            dcrCalendarList: objRes,
            isTourPlanExists: response[2][0]["isTourPlanExists"],
            tpRemarks: JSON.parse(response[2][0]["outputJson"]),
          },
          isSuccess,
          isCamelCase: true,
        };
      } else {
        result = {
          message: Message({}),
          isSuccess: false,
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
 * @api {post} /dcr/previewData Get DCR Preview data
 * @apiName GetPreviewData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dcr/previewData
 *
 * @apiGroup DCR
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get DCR Preview data
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "date":"2020-03-05",
 *      "employeeId":2
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *            "dcrPreviewList":{
 *                "dcrPreview": null,
 *                "expense": null,
 *                "visitLog": [
 *                        {
 *                            "pob": 0,
 *                            "srNo": 1,
 *                            "areaId": 4,
 *                            "areaName": "Ahmedabad",
 *                            "chemistId": 3,
 *                            "updatedBy": null,
 *                            "visitTime": "10.10 AM",
 *                            "serverTime": "05-Mar-2020 10:10",
 *                            "visitLogId": 1,
 *                            "chemistName": "Parth S",
 *                            "workingWith": null,
 *                            "workingWithId": null,
 *                            "chemistRemarks": "test"
 *                        }
 *                    ],
 *                  "isDcrSubmitted": 0,
 *                  "isDayEnded": 0,
 *                  "isExpenseFilled": 0,
 *                  "comments":{
 *                            "expenseRemarks": null,
 *                            "eveningComments": "EveningText1",
 *                            "morningComments": "MorningText1"
 *                  }
 *              },
 *         "isSuccess": true,
 *         "statusCode": 200
 *       }
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
  getPreview,
  async function (req, res, next) {
    try {
      let result = {};
      const { loggedInEmployeeId, date, employeeId } = req.body;
      const bodyData = { ...req.body };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: getDcrPreview,
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await getPreviewData({
          loggedInEmployeeId,
          date,
          employeeId,
        });
        const { isSuccess } = response;
        const dcrPreviewData = response[0][0];
        const dcrPreviewparam = dcrPreviewData.DCRPreview;
        const expenseparam = dcrPreviewData.Expense;
        const visitLogparam = dcrPreviewData.VisitLog;
        const dcrSubmitted = dcrPreviewData.IsDCRSubmitted;
        const dayEnded = dcrPreviewData.IsDayEnded;
        const expenseFilled = dcrPreviewData.IsExpenseFilled;
        const commentparam = dcrPreviewData.Comments;
        const tpRemarks = dcrPreviewData.TPRemarks;
        const pOBRoleWiseData = dcrPreviewData.POBRoleWise;
        delete response.isSuccess;
        const dcrPreview =
          dcrPreviewparam === "{}" ? null : JSON.parse(dcrPreviewparam);
        const expense = expenseparam === "{}" ? null : JSON.parse(expenseparam);
        const visitLog =
          visitLogparam === "[]" ? [] : JSON.parse(visitLogparam);
        const comment = commentparam === "{}" ? null : JSON.parse(commentparam);
        const pOBRoleWise =
          pOBRoleWiseData === "[]" ? [] : JSON.parse(pOBRoleWiseData);
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              dcrPreviewList: {
                dcrPreview,
                expense,
                visitLog,
                isDCRSubmitted: dcrSubmitted,
                isDayEnded: dayEnded,
                isExpenseFilled: expenseFilled,
                comments: comment,
                tpRemarks,
                pOBRoleWise,
              },
            },
            isSuccess,
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false,
          };
        }
      } else {
        req.result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result,
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
 * @api {post} /isLeaveApprovalPending/getData Get data of Is Leave Approval Pending
 * @apiName GetIsLeaveApprovalPending
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /isLeaveApprovalPending/getData
 *
 * @apiGroup DCR
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get data of Is Leave Approval Pending
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {
 *            "isLeaveApprovalPending":0
 *          },
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "You get data Successfully"
 *      }
 *
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": false,
 *        "data": {
 *            "isLeaveApprovalPending":1
 *          },
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Please approve/reject your subordinates leave"
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
  getLeaveApprovalPendingData,
  async function (req, res, next) {
    try {
      let result = {};
      const { loggedInEmployeeId } = req.body;
      const response = await getIsLeaveApprovalPendingData({
        loggedInEmployeeId,
      });
      const { isSuccess } = response;
      delete response.isSuccess;
      const isLeaveApprovalPending = Object.values(response[0])[0];
      if (isSuccess === true) {
        if (isLeaveApprovalPending === 0) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              isLeaveApprovalPending: false,
            },
            isSuccess,
          };
        } else if (isLeaveApprovalPending === 1) {
          result = {
            message: Message({ code: "APPOVEREJECTLEAVE" }),
            data: {
              isLeaveApprovalPending: true,
            },
            isSuccess: false,
          };
        }
      } else {
        result = {
          message: Message({}),
          isSuccess: false,
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

/* Get DCR Preview Async Data */
router.post(
  previewDCRData,
  async function (req, res, next) {
    try {
      let result = {};
      const { loggedInEmployeeId, date, employeeId } = req.body;
      const bodyData = { ...req.body };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: getDcrPreview,
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const startTime = new Date();
        const response = await getDCRPreviewData({
          loggedInEmployeeId,
          date,
          employeeId,
        });

        if (response != null) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              employeeData: response[0][0],
              tourplanData: response[1][0],
              attendanceData: response[2][0],
              expenseData: response[3][0],
              routesCovered: response[4][3][0],
              visitData: response[4][2],
              pOBRoleWiseData: response[4][12],
            },
            isSuccess: true,
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false,
          };
        }
      } else {
        req.result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result,
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

/* Get DCR Calendar Async Data */
router.post(
  getCalendarDataAsync,
  async function (req, res, next) {
    try {
      let result = {};
      const {
        employeeId = 0,
        loggedInEmployeeId,
        month = 0,
        year = 0,
      } = req.body;
      const response = await getDCRCalendarDataAsync({
        employeeId,
        loggedInEmployeeId,
        month,
        year,
      });

      if (response != null) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            dateList: response[0][1],
            weekOff: response[1][0],
            tourPlan: response[2],
            expense: response[3],
            attendance: response[4],
            holiday: response[5],
            leave: response[6],
            visitLog: response[7],
            unlockDCR: response[8],
            reportingPeriod: response[9][0],
          },
          isSuccess: true,
        };
      } else {
        result = {
          message: Message({}),
          isSuccess: false,
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

module.exports = router;
