const express = require("express");
const {
  monthlyExpenseSummary_getData: { url: getDatasummary }
} = require("../../../routerConstant");
const router = express.Router();
const { getMonthiyExpense } = require('./monthlyExpenseSummaryRepository')
const { sendResponse, payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const { handleError } = require("../../../error");
const {
  monthlyExpenseSummary
} = require("../../../dataType.json");

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /monthlyExpenseSummary/getData Get Data from Monthly expense summary
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /monthlyExpenseSummary/getData
 *
 * @apiGroup MonthlyExpenseSummary
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Monthly expense summary 
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {JSON} Input JSON Object - EmployeeId and month are required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "EmployeeId": 1,
 *        "month": 8,
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "You get data Successfully",
 *    "data": {
 *        "monthlyLeaveExpenseList": [
      {
        "MonthlySummaryId": 1,
        "EmployeeId": "28",
        "Month": 8,
        "Year": 2022,
        "PLCredit": 1,
        "OpeningPL": 1,
        "ClosingPL": 2,
        "SLCredit": 1,
        "OpeningSL": 1,
        "ClosingSL": 2,
        "CLCredit": 1,
        "OpeningCL": 1,
        "ClosingCL": 2,
        "EarlyExitCredit": 3,
        "EarlyExit": 0,
        "PresentDays": 21,
        "PL": 0,
        "SL": 0,
        "CL": 0,
        "LWP": 0,
        "Holiday": 2,
        "CreatedBy": "28",
        "CreatedDate": "2022-08-10T13:29:37.277Z",
        "UpdatedBy": null,
        "UpdatedDate": null,
        "DeletedBy": null,
        "DeletedDate": null
      }
    ]
 *    },
 *    "isSuccess": true,
 *    "statusCode": 200
 *  }
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

router.post(getDatasummary, async function (req, res, next) {
  try {
    let result = {};
    const bodyData = {
      EmployeeId: req.body.EmployeeId ? req.body.EmployeeId : req.body.loggedInReferenceId,
      month: req.body.month
    };
    const response = await getMonthiyExpense({
      EmployeeId: bodyData.EmployeeId,
      Month: bodyData.month
    });
    const isValidDataType = await payLoadValidation({
      bodyData: bodyData,
      payLoad: monthlyExpenseSummary
    });
    const { isValidate } = isValidDataType;
    const { isSuccess } = response
    if (isSuccess) {
      result = {
        message: Message({ code: "Success" }),
        data: {
          monthlyLeaveExpenseList: [...response.recordset]
        },
        isValidate,
        isSuccess
      };
      res.json({ isSuccess, isValidate, ...result });
    } else {
      result = {
        message: Message({}),
        isSuccess: false
      };
    }
    next()
  } catch (e) {
    console.log(e);
    handleError(e, res);
  }
},
  sendResponse
)



module.exports = router;