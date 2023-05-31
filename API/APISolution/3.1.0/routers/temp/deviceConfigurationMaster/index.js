const express = require("express");
const router = express.Router();

const {
  deviceConfigurationGetData,
  deviceConfigurationInsertData,
  deviceConfigurationUpdateData
} = require("./deviceConfigurationRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
  deviceIdInsert,
  deviceIdUpdate,
  deviceIdGetData
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  deviceConfiguration_getData: { url: getData },
  deviceConfiguration_insertData: { url: insertData },
  deviceConfiguration_updateData: { url: updateData }
} = require("../../../routerConstant");
const { loggerInfo } = require("../../../logger.js");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /deviceConfiguration/getData Get Data from Device Configuration master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /deviceConfiguration/getData
 *
 * @apiGroup Device Configuration Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Device Configuration Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {Number} stateId Required Get Device details statewise
 * @apiParam (Request body) {Number} divisionId Required Get Device details divisionwise
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "stateId": 12,
 *        "divisionId": 1,
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *      "deviceList": [
 *           {
 *             "deviceConfigId": 1,
 *             "employee": "Parth Suthar(Admin | Ahmedabad | OTC | Gujarat)",
 *             "mobileNumber": "9586567130",
 *             "mobileModal": "Redmi 7",
 *             "osVersion": "9.0",
 *             "fakeGps": 0,
 *             "appVersion": "1.0.0",
 *             "changeDevice": 0,
 *             "updatedBy": null,
 *             "updatedDate": null
 *           },
 *       ]
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
      const { divisionId, stateId } = req.body;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: deviceIdGetData
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await deviceConfigurationGetData({
          stateId,
          divisionId
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              deviceList: [...response]
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
 * @api {post} /deviceConfiguration/insertData Insert Device data into Device Configuration master
 * @apiName Insert DeviceId
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /deviceConfiguration/insertData
 *
 * @apiGroup Device Configuration Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Check the Deviceid
 *
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {json} Input
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *          "mobileNumber":"9586567130",
 *          "deviceId":"abyhsg6s5",
 *          "mobileModal":"Redmi 6",
 *          "osVersion":"Oreo",
 *          "fakeGPS":0,
 *          "appVersion":"1.0.0",
 *          "changeDevice":0
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "isSuccess": true,
 *      "statusCode": 200,
 *      "message": "DeviceId registered successfully",
 *      "data": {}
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
  insertData,
  async function (req, res, next) {
    try {
      let result = {};
      const {
        deviceId,
        appVersion,
        changeDevice = 0,
        fakeGPS,
        mobileModal,
        mobileNumber,
        osVersion
      } = req.body;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: deviceIdInsert
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await deviceConfigurationInsertData({
          deviceId,
          appVersion,
          changeDevice,
          fakeGPS,
          mobileModal,
          mobileNumber,
          osVersion
        });
        const { isSuccess, flag } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            isSuccess,
            statusCode: 200,
            message: Message({ code: "DeviceIdRegistered" })
          };
        } else {
          if (flag === "invalidUser") {
            result = {
              isSuccess,
              statusCode: 216,
              message: Message({ code: "InvalidMobile" })
            };
          } else if (flag === "ContactAdmin") {
            result = {
              isSuccess,
              statusCode: 215,
              message: Message({ code: "ContactAdmin" })
            };
          } else if (flag === "applicationBlock") {
            result = {
              isSuccess,
              statusCode: 218,
              message: Message({ code: "APPLICATIONBLOCK" })
            };
          } else {
            result = {
              isSuccess,
              statusCode: 217,
              message: Message({ code: "INVALIDUSER" })
            };
          }
        }
      } else {
        result = {
          message: Message({ code: "DeviceRegistrationFailed" }),
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
 * @api {post} /deviceConfiguration/updateData Update data of Device Configuration master
 * @apiName Update DeviceId
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /deviceConfiguration/updateData
 *
 * @apiGroup Device Configuration Master
 *
 * @apiDescription This API is Used to Update the Deviceid
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {String} changeDevice Required Change the status of device 0 or 1
 * @apiParam (Request body) {String} deviceConfigId Required DeviceConfig's unique id
 * @apiParam (Request body) {String} updatedDate Required current datetime when user updated data
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *         "changeDevice":1,
 *         "updatedDate":"2020-03-09 12:11:26",
 *         "deviceConfigId":2,
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *       "isValidate": true,
 *       "validationList": [],
 *       "message": "Record Updated Successfully",
 *       "isSuccess": true,
 *       "statusCode": 200,
 *       "data": {}
 *    }
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
  updateData,
  async function (req, res, next) {
    try {
      let result = {};
      const {
        loggedInEmployeeId,
        changeDevice,
        updatedDate,
        deviceConfigId
      } = req.body;
      const bodyData = req.body;
      loggerInfo({
        message: `Employee (${loggedInEmployeeId}) is Requesteded for Method [${
          req.method
        }] : Requested URL ${req.url} : Requested Body ${JSON.stringify(
          bodyData
        )}`
      });
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: deviceIdUpdate
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await deviceConfigurationUpdateData({
          changeDevice,
          updatedDate,
          loggedInEmployeeId,
          deviceConfigId
        });
        const { isSuccess, flag } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = { message: Message({ code: "RUPD" }), isSuccess: true };
        } else if (flag === "Concurrency") {
          result = {
            message: Message({ code: "CONCURRENCY" }),
            isSuccess: false,
            ...response
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
