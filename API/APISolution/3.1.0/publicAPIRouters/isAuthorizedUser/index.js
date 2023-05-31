const express = require("express");
const router = express.Router();

const { authorizedUserGetData } = require("./isAurhorizedRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
  publicAPIDataTypeJSON: { isAuthorizedUser }
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  publicAPIRouterConstant: {
    isAuthorizedUser: { url: isAuthorizedUserRouter }
  }
} = require("../../../routerConstant");
const { loggerInfo } = require("../../../logger.js");
const { handleError } = require("../../../error.js");
const { genJti } = require("../../../jwt-token");
const sendBulkSMS  = require("../../../bulkSMS");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /isAuthorizedUser Check Authorized User
 * @apiName Check Authorized User
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /isAuthorizedUser
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Check given User is registered in system or not
 *
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiParam (Request body) {JSON}  Input required JSON of mobilenumber
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "mobileNumber":"9409261193"
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Otp is sent to your registered mobile number."
 *      }
 *
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "This mobile Number is not registered in our system,please fill required information to use this application."
 *      }
 *
 *
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "You are not authorized to use this application."
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
  isAuthorizedUserRouter,
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
        payLoad: isAuthorizedUser
      });

      const { isValidate, validationList } = isValidDataType;

      if (isValidate) {
        const { mobileNumber } = bodyData;
        const otp = await genJti(4, true);
        const response = await authorizedUserGetData({
          data: JSON.stringify({ mobileNumber, otp })
        });
        if (response[1][0]["@op_IsValide"] === 1) {
          // const msgRes = await sendSms(
          //   response[1][0]["@op_Response"],
          //   mobileNumber,
          //   null
          // );
          // if (msgRes && msgRes["MessageId"]) {
          //   result = {
          //     message: Message({ code: "OTPSENT" }),
          //     data: {},
          //     isSuccess: true
          //   };
          // }

          const msgResult = await sendBulkSMS(
            mobileNumber,
            response[1][0]["@op_Response"],
            null
          );
          if(msgResult){
            if (msgResult.status == 200) {
                result = {
                  message: Message({ code: "OTPSENT" }),
                  data: {},
                  isSuccess: true
                };
            } 
          }

        } else if (response[1][0]["@op_IsValide"] === 2) {
          result = {
            isSuccess: false,
            message: Message({ code: "INVALIDUSERMOB" })
          };
        } else {
          result = {
            isSuccess: false,
            message: Message({ code: "REGISTRATION" })
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
