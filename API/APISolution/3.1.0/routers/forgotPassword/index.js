const express = require("express");
const router = express.Router();

const { getPassword } = require("./forgotPasswordRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
  forgotPassword: forgotPasswordValidator
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  forgotPassword: { url: forgotPasswordRouter }
} = require("../../../routerConstant");
const sendBulkSMS = require("../../../bulkSMS");
const { loggerInfo } = require("../../../logger.js");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /forgotPassword Forgot Password
 * @apiName Forgot Password
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /forgotPassword
 *
 * @apiGroup 1.User
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Send the Password of the User
 *
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {String}  mobileNumber Enter Mobile Number For getting Password
 * @apiParam (Request body) {String}  code Enter code to get appropriate sms
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *       "mobileNumber":"9586567130",
 *       "code":"ForgotPassword"
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
 *        "message": "Password is Sent to your Registered Mobile Number"
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
  forgotPasswordRouter,
  async function (req, res, next) {
    try {
      let result = {};
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: forgotPasswordValidator
      });
      loggerInfo({
        message: `Requesteded for Method [${req.method}] : Requested URL ${
          req.url
        } : Requested Body ${JSON.stringify(req.body)}`
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const { mobileNumber, code } = req.body;
        const response = await getPassword({
          mobileNumber,
          code
        });
        const { isSuccess } = response;
        if (isSuccess && response[0] && response[0].length > 0) {
          const msgRes = await sendBulkSMS(
            mobileNumber,
            response[0][0],
            response[1][0]
          );
          if(msgRes && msgRes.status == 200){
            result = {
              message: Message({
                code: "ForgotPass"
              }),
              data: {},
              isSuccess: true
            };
          } else {
            result = {
              message: Message({ code: "PASSWORDNOTSEND" }),
              isSuccess: false
            };
          }
        } else {
          result = {
            ...response,
            isSuccess: false,
            message: Message({ code: "NOUSER" })
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
