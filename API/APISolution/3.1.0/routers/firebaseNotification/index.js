const express = require("express");
const router = express.Router();

const {
  firebaseNotification,
  firebaseInsertToken,
  firebaseGetData
} = require("./firebaseNotification");
const { payLoadValidation, sendResponse } = require("../../../utils");
const dataTypeForValidation = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  firebaseNotification: { url: firebase },
  firebaseInsertToken: { url: updateData },
  notification_getData: { url: getData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /firebaseNotification Firebase Notification
 * @apiName Firebase Notification
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /firebaseNotification
 *
 * @apiGroup Others
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to get Firebase Notifications
 *
 * @apiParam (Request body) {String}  deviceId Enter DeviceId to get notification
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *       "deviceId":"12345678910"
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
 *        "message": "Password is Sent to your EmailId"
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
  firebase,
  async function (req, res, next) {
    try {
      const {
        firebaseNotification: firebaseNotificationValidator
      } = dataTypeForValidation;
      let result = {};
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: firebaseNotificationValidator
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const { loggedInEmployeeId } = req.body;
        result = await firebaseNotification({ loggedInEmployeeId });
      } else {
        result = { message: Message({ code: "INVALPAYLOAD" }), ...result };
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
 * @api {post} /firebaseInsertToken Insert token of Firebase
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /firebaseInsertToken
 *
 * @apiGroup Others
 *
 * @apiDescription This API is Used to Insert token of Firebase
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiParam (Request body) {String} firebaseToken Required to Insert token
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "firebaseToken":"sdfsdtgerge5e6536tw4t3635y35uy"
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Record Inserted Successfully",
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
  updateData,
  async function (req, res, next) {
    try {
      let result = {};
      const { loggedInEmployeeId, firebaseToken } = req.body;
      const response = await firebaseInsertToken({
        loggedInEmployeeId,
        firebaseToken
      });
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess) {
        result = {
          message: Message({ code: "RINS" }),
          isSuccess
        };
      } else {
        result = {
          message: Message({}),
          isSuccess
        };
      }
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
 * @api {post} /notification/getData Get Notification Info
 * @apiName GetNotificationData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /notification/getData
 *
 * @apiGroup Others
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Notification Info
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *             "notificationList": [
 *                  {
 *                    "notificationId": 1,
 *                    "companyId": 1,
 *                    "employeeId": 1,
 *                    "date": "2020-03-23 19:41:03",
 *                    "notificationMessage": "Please Submit Your DCR",
 *                    "createdBy": 1,
 *                    "createdDate": "2020-03-23 19:41:03",
 *                    "updatedBy": null,
 *                    "updatedDate": null,
 *                    "deletedBy": null,
 *                    "deletedDate": null
 *                  }
 *             ]
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
      const { loggedInEmployeeId } = req.body;
      const bodyData = { ...req.body };
      const {
        firebaseGetData: firebaseNotificationValidator
      } = dataTypeForValidation;
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: firebaseNotificationValidator
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await firebaseGetData({ loggedInEmployeeId });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              notificationList: [...response]
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
module.exports = router;
