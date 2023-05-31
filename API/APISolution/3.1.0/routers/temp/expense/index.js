const express = require("express");
const router = express.Router();

const {
  expenseSaveData,
  getCalculatedExpense
} = require("./expenseRepository");
const {
  firebaseNotification
} = require(".././firebaseNotification/firebaseNotification");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
  expenseDetailsAdd,
  expenseDetailsUpdate
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  expense_insertData: { url: insertData },
  expense_updateData: { url: updateData },
  expense_getData: { url: getData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /expense/getData Get Data of Calculated Expense
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /expense/getData
 *
 * @apiGroup Expense
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Calculated Expense
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "routeId" : 12,
 *        "routeType":12,
 *        "distanceFromHq" : 50,
 *        "employeeId" :1
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *            "calculatedExpenseList":
 *                {
 *                  "taPerKm": 20,
 *                  "ta": 3000,
 *                  "dahq": 20,
 *                  "daos": null,
 *                  "daex": null,
 *                  "routeTypeId": 12,
 *                  "distanceFromHq": 75
 *                }
 *   },
 *   "isSuccess": true,
 *   "statusCode": 200
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
router.post(
  getData,
  async function (req, res, next) {
    try {
      let result = {};
      const {
        routeId = null,
        routeType = null,
        distanceFromHq = null,
        employeeId = null,
        loggedInEmployeeId
      } = req.body;
      const response = await getCalculatedExpense({
        routeId,
        routeType,
        distanceFromHq,
        employeeId,
        loggedInEmployeeId
      });
      const { isSuccess } = response;
      delete response.isSuccess;
      const expense = response[2] && response[2][0] ? response[2][0] : {};
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            calculatedExpense: expense
          },
          isSuccess
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
 * @api {post} /expense/insertData Insert Data into Expensedetails
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /expense/insertData
 *
 * @apiGroup Expense
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data ExpenseDetails
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiParam (Request body) {json} Input
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "expenseDate":"2020-03-25",
 *        "ta": 100,
 *        "daHq":100,
 *        "daOs":100,
 *        "daEx":100,
 *        "hotel":100,
 *        "others":null,
 *        "remarks":"test",
 *        "twoWayKm":null,
 *        "routeType":null,
 *        "routeId":1
 *      }
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
      const id = req.body.loggedInEmployeeId;
      const bodyData = {
        ...req.body,
        expenseDetailId: 0,
        employeeId: id,
        twoWayKm: req.body.twoWayKm ? req.body.twoWayKm : null,
        routeType: req.body.routeType ? req.body.routeType : null
      };

      const result = await expenseRequestHandler({
        bodyData,
        validatorData: expenseDetailsAdd,
        operationType: 0
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
 * @api {post} /expense/updateData Update data of ExpenseDetails
 * @apiName UpdateData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /expense/updateData
 *
 * @apiGroup Expense
 *
 * @apiDescription This API is Used to update data of ExpenseDetails
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiParam (Request body) {JSON} Input
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "updatedDate":"2020-01-16 14:32:54",
 *      "cityId": 2,
 *      "cityName" :"bb",
 *      "stateId":12
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Record Updated Successfully",
 *      "isSuccess": true,
 *      "statusCode": 200,
 *      "data": {}
 * }
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
      const id = req.body.loggedInEmployeeId;
      const result = await expenseRequestHandler({
        bodyData: { ...req.body, employeeId: id },
        validatorData: expenseDetailsUpdate,
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

const expenseRequestHandler = async ({
  bodyData,
  validatorData,
  operationType
}) => {
  let result = {};
  const isValidDataType = await payLoadValidation({
    bodyData: bodyData,
    payLoad: validatorData
  });
  const { loggedInEmployeeId } = bodyData;
  const { isValidate, validationList } = isValidDataType;
  delete bodyData.companyId;
  delete bodyData.loggedInDesignationId;
  delete bodyData.loggedInEmployeeId;
  delete bodyData.countryId;
  delete bodyData.loggedInDivisionId;
  if (isValidate) {
    const response = await expenseSaveData({
      data: JSON.stringify(bodyData),
      operationType,
      loggedInEmployeeId
    });
    if (response[3] && response[3][0]["@op_IsSuccess"] === 1) {
      if (response[3][0]["@op_Flag"] === 1) {
        const json = JSON.parse(response[3][0].JSON);
        if (
          json !== null &&
          json &&
          json.firebaseToken &&
          json.firebaseToken !== null &&
          json.notificationMessage &&
          json.notificationMessage !== null
        ) {
          const registrationToken = json.firebaseToken;
          const notificationMsg = json.notificationMessage;
          await firebaseNotification({ registrationToken, notificationMsg });
        }
      }
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
        result = { message: Message({ code: "DUPEXPENSE" }), isSuccess: false };
      else if (operationFlag === 3)
        result = {
          message: Message({ code: "NOTALLOWEXPENSE" }),
          isSuccess: false
        };
      break;

    case 1:
      if (operationFlag === 0)
        result = { message: Message({ code: "REFRESH" }), isSuccess: false };
      else if (operationFlag === 1)
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      else if (operationFlag === 2)
        result = { message: Message({ code: "DUPEXPENSE" }), isSuccess: false };
      else if (operationFlag === 3)
        result = {
          message: Message({ code: "NOTALLOWEXPENSE" }),
          isSuccess: false
        };
      break;
  }
  return result;
};
module.exports = router;
