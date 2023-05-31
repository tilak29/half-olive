const express = require("express");
const router = express.Router();

const {
  notificationGetData,
  notificationSaveData,
  notificationGetCount
} = require("./notificationInfoRepository");
const { sendResponse, payLoadValidation } = require("../../../utils");
const {
  notificationInfoGetCount,
  notificationInfoAdd
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  notificationInfo_getData: { url: getData },
  notificationInfo_insertData: { url: insertData },
  notificationInfo_getCount: { url: getCount }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /notificationInfo/getData Get Data from notificationInfo table
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /notificationInfo/getData
 *
 * @apiGroup Nofification Info
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data from notificationInfo table
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *          "page":null,
 *          "pageSize":null,
 *          "orderBy":null,
 *          "orderDirection":null,
 *          "search":null
 *        }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "You get data Successfully",
 *    "data": {
 *        "notificationList":
 *        [
 *            {
 *                "srNo": 1,
 *                "notificationId": 6,
 *                "notificationMessage": "sdfsdf",
 *                "totalRecord": 2
 *            },
 *            {
 *                "srNo": 2,
 *                "notificationId": 7,
 *                "notificationMessage": "Test again",
 *                "totalRecord": 2
 *            }
 *        ],
 *        "totalRecords": 2
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
router.post(
  getData,
  async function (req, res, next) {
    try {
      let result = {};
      const {
        loggedInEmployeeId,
        loggedInAppIndication,
        isAdmin,
        page,
        pageSize,
        orderBy,
        orderDirection,
        search,
        loggedInMobileNumber = null
      } = req.body;

      const response = await notificationGetData({
        loggedInEmployeeId,
        isAdmin,
        page,
        pageSize,
        orderBy,
        orderDirection,
        search,
        loggedInAppIndication,
        loggedInMobileNumber
      });
      const { isSuccess } = response;
      const notification = response && response[0];
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            notificationList: notification
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
 * @api {post} /notification/getCount Get count of notification
 * @apiName GetCount
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /notification/getCount
 *
 * @apiGroup Nofification Info
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get count of notification
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "You get data Successfully",
 *    "data": {
 *        "notificationCount": 5
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
router.post(
  getCount,
  async function (req, res, next) {
    try {
      let result = {};
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: notificationInfoGetCount
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const { loggedInEmployeeId, loggedInAppIndication, loggedInMobileNumber } = req.body;
        const response = await notificationGetCount({
          loggedInEmployeeId,
          loggedInAppIndication,
          loggedInMobileNumber
        });
        const { isSuccess } = response;
        if (isSuccess && response && response[0]) {
          const notification = response && response[0]["Count"];
          result = {
            message: Message({ code: "Success" }),
            data: {
              notificationCount: notification
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
 * @api {post} /notificationInfo/insertData Insert Data into notificationInfo table
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /notificationInfo/insertData
 *
 * @apiGroup Notification Info
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into notificationInfo table
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {json} Input
 *
 * @apiParamExample {json} Input (body/json) - employeeId,message,loggedInEmployeeId are required fields for action based notifications.
 *                                           - divisionIds,stateIds,designationIds,message,loggedInEmployeeId are required fields for group notifications.
 *      {
 *          "employeeId":13,
 *          "divisionIds": "[1,2,5,6]",
 *          "stateIds": "[12]",
 *          "designationIds": "[1]",
 *          "message": "Test again and again"
 *        }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *       "isValidate": true,
 *        "validationList": [],
 *        "message": "Record Inserted Successfully",
 *        "isSuccess": true,
 *        "statusCode": 200,
 *        "data": {}
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
      let result = {};
      const bodyData = req.body;
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: notificationInfoAdd
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await notificationSaveData({
          data: bodyData,
          operationType: 0
        });
        const { isSuccess, flag } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "RINS" }),
            isSuccess
          };
        } else if (flag === "Concurrency") {
          result = {
            message: Message({ code: "REFRESH" }),
            isSuccess: false,
            ...response
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
        req.result = { isValidate, validationList, ...result };
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
