const express = require("express");
const router = express.Router();

const { 
        notificationGetData,
        notificationGetNewCount 
      } = require("./notificationRepository");
const { sendResponse, payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const {
    notificationList_getData: { url: getData },
    notificationList_getCount: {url: getCount}
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /notificationList/getData Get Data from cs_notificationinfo table
 * @apiName GetData
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /notificationList/getData
 *
 * @apiGroup Notification List
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data from cs_notificationinfo table
 *
 * @apiHeader (Request headers) {String} accept-version 2.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "Data received successfully.",
 *    "data": {
 *        "notificationList": 
 *            [
 *                {
 *                    "notificationMessage": "Dear Stockist, New order received, Order Number: CM_20200806_152.",
 *                    "notificationTime": "02:47 PM"
 *                }
 *            ]
 *    },
 *    "isSuccess": true,
 *    "statusCode": 200
 *}
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
      const { loggedInEmployeeId, loggedInAppIndication, loggedInMobileNumber } = req.body;
      const response = await notificationGetData({
        loggedInEmployeeId,
        loggedInAppIndication,
        loggedInMobileNumber
      });

      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            notificationList: response[0]
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
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /notificationList/getCount Get Data from cs_notificationinfo table
 * @apiName GetCount
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /notificationList/getCount
 *
 * @apiGroup Notification List
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get count of new notifications from cs_notificationinfo table
 *
 * @apiHeader (Request headers) {String} accept-version 2.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "Data received successfully.",
 *    "data": {
 *        "notificationCount": 5
 *    },
 *    "isSuccess": true,
 *    "statusCode": 200
 *}
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
      const { loggedInEmployeeId, loggedInAppIndication,loggedInMobileNumber } = req.body;
      const response = await notificationGetNewCount({
        loggedInEmployeeId,
        loggedInAppIndication,
        loggedInMobileNumber
      });

      const { isSuccess } = response;
      const notification = response && response[0][0]["Count"];
      const customerNotificationCount = response && response[1][0]["CustomerNotificationCount"];
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            notificationCount: notification,
            customerNotificationCount: customerNotificationCount
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


module.exports = router;
