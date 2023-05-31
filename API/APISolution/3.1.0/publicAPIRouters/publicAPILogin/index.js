const express = require("express");
const router = express.Router();
const moment = require("moment");

const { 
  getLoginDetails,
  saveRetailerLoginDetails,
  saveRetailerDeviceDetails
 } = require("./publicAPILoginRepository");
const {
  getAuthInfo,
  payLoadValidation,
  sendResponse
} = require("../../../utils");
const {
  publicAPIDataTypeJSON: { login }
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  publicAPIRouterConstant: {
    login: { url: loginRouter }
  }
} = require("../../../routerConstant");
const { loggerInfo } = require("../../../logger.js");
const { handleError } = require("../../../error.js");
const { addOrReplaceAccessDetail } = require("../../../utils.js");
const { json } = require("express");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /publicAPILogin Logged in into Application
 * @apiName Public API Login
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /publicAPILogin
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Logged into the Application  for stockist,chemist or super stockist
 *
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiParam (Request body) {JSON}  Input required JSON of mobilenumber and otp
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "mobileNumber":"9409261193",
 *      "otp":1234
 *    }
 *
 * @apiSuccessExample Success Response  - appIndication (App Indication= Stockist:0, Super Stockist:1, Chemist:2)
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {
 *             "authInfo": {
 *                  "loggedInDesignationId": 0,
 *                  "loggedInEmployeeId": "9409261193",
 *                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV0aG9yaXphdGlvbiIsInNjb3BlIjoiZnVsbF9hY2Nlc3MiLCJqdGkiOiJsOHRmME9tOTBMT3VvU1dOIiwiYWxnIjoiSFMyNTYiLCJ1c2VyTmFtZSI6IktodXNoYnUiLCJyb2xlSWQiOjEsIlVzZXJJZCI6MSwiY3VycmVudERhdGUiOjE1ODAyODgyMTksImlhdCI6MTU4MDI4ODIxOSwiZXhwIjoxNTgwMjg4MjI5fQ.ocXF3xd1E0RHejm9m2Ng-meyQDb6cJ-FChUdADdBKxc",
 *              },
 *             "otherInfo": {
 *                   "serverDate": "2020-02-10 13:33:27"
 *              },
 *             "appIndication":0
 *         },
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "You are successfully Logged in"
 *      }
 *
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Please enter valid OTP."
 *      }
 *
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
  loginRouter,
  async function (req, res, next) {
    try {
      let result = {};
      let bodyData = { ...req.body };

      loggerInfo({
        message: `Requesteded for Method [${req.method}] : Requested URL ${
          req.url
        } : Requested Body ${JSON.stringify(bodyData)}`,
        isPublicLog: true
      });
      const isValidDataType = await payLoadValidation({
        bodyData,
        payLoad: login
      });

      const { isValidate, validationList } = isValidDataType;

      if (isValidate) {
        const response = await getLoginDetails({
          data: JSON.stringify(bodyData)
        });

        if (response[1][0]["@op_IsValide"] === 1) {
          const { mobileNumber, deviceId = null, mobileModal = null, osVersion =null, appVersion=null } = bodyData;
          const { appIndication, name, menuDetail, designationId,isFirstTimeLogin, firstTimeLoginPoints, id  } = JSON.parse(
            response[1][0]["@op_Response"]
          );
//167589 
          const { authInfo, currentDate, expireTokenTime } = await getAuthInfo({
            userName: name,
            loggedInDesignationId: designationId,
            loggedInEmployeeId: id,
            loggedInMobileNumber: mobileNumber,
            loggedInDivisionId: 0,
            loggedInAppIndication: appIndication,
            isPublicAPI: true,
            menus: menuDetail
          });

          const {token} = authInfo;
          saveRetailerLoginDetails({token, mobileNumber, deviceId})

          if(deviceId){
          // DeviceId, MobileModal, OSVersion, MobileNumber, AppVersion
            saveRetailerDeviceDetails({deviceId, mobileModal, osVersion, mobileNumber, appVersion, userType: appIndication})
          }

          result = {
            message: Message({ code: "VALIDLOGIN" }),
            data: {
              authInfo,
              otherInfo: {
                serverDate: moment()
                  .utcOffset("+05:30")
                  .format("YYYY-MM-DD HH:mm:ss")
              },
              userInfo: {
                userName: name
              },
              appIndication,
              expireTokenTime,
              currentDate,
              isFirstTimeLogin,
              firstTimeLoginPoints
            },
            isSuccess: true
          };
        } else {
          result = {
            isSuccess: false,
            message: Message({ code: "INVALIDOTP" })
          };
        }
      } else {
        result = {
          isSuccess: true,
          message: Message({ code: "INVALPAYLOAD" }),
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
