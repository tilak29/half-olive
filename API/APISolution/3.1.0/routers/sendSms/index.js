const express = require("express");
const router = express.Router();

const { sendSMSData, saveSMSData } = require("./sendSmsRepository");
const { sendResponse } = require("../../../utils");
const { Message } = require("../../../Messages");
const {
  sendSms: { url: sendSmsData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");
const sendBulkSMS  = require("../../../bulkSMS");


/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /sendSms SMS send to the user
 * @apiName Send SMS
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /sendSms
 *
 * @apiGroup Others
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Send SMS to the User
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {String}  employeeId end user's id
 * @apiParam (Request body) {String}  message message to be send
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *       "employeeId":1,
 *       "message":"Hello Parth",
 *       "mobileNumber":"9586567130",
 *       "code":"ChemistBirthday"
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
  sendSmsData,
  async function (req, res, next) {
    try {
      let result = {};
      const { employeeId, message, mobileNumber, code, loggedInEmployeeId } = req.body;
      const response = await sendSMSData({
        employeeId,
        code,
        mobileNumber
      });
      const { isSuccess } = response;
      if (isSuccess) {
        const number = mobileNumber
          ? mobileNumber
          : response[0][0]["MobileNumber"];
        const resText = response[1][0] ? response[1][0] : null;
        const msg = message ? message : response[0][0];
        if (msg !== null && msg !== undefined) {
          //ZEN SMS start
          const msgResult = await sendBulkSMS(number,msg,resText);
          if(msgResult){
              if (msgResult.status == 200) {
                const response = await saveSMSData({
                  employeeId,
                  code,
                  msg,
                  loggedInEmployeeId
                });
                const { isSuccess } = response;                
                result = {
                message: Message({
                  code: "SendSMS"
                }),
                isSuccess
              };
              }               
          }
          else {
              result = {
              message: Message({ code: "PASSWORDNOTSEND" }),
              isSuccess: false
              };
            }
          //ZEN SMS 

          // const msgRes = await sendSmsFunction(msg, number, resText);
          // if (msgRes) {
          //   result = {
          //     message: Message({
          //       code: "SendSMS"
          //     }),
          //     isSuccess
          //   };
          // } else {
          //   result = {
          //     message: Message({ code: "PASSWORDNOTSEND" }),
          //     isSuccess: false
          //   };
          // }
        } else {
          result = {
            ...response,
            isSuccess: false,
            message: Message({})
          };
        }
      } else {
        result = {
          ...response,
          isSuccess: false,
          message: Message({ code: "NOUSER" })
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
