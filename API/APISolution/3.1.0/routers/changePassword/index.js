const express = require("express");
const router = express.Router();

const { setPassword } = require("./changePasswordRepository");
const {
  payLoadValidation,
  sendResponse,
  userAccessDetails
} = require("../../../utils");
const { changePassword } = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  changePassword: { url: changePasswordRouter }
} = require("../../../routerConstant");
const { credentialEncryptionDecryptionKey } = require("../../../config.json");
const CryptoJS = require("crypto-js");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /changePassword Change Password
 * @apiName Change Password
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /changePassword
 *
 * @apiGroup 1.User
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to change password
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object -oldPassword,newPassword,confirmPassword with Encrypted form
 *
 * @apiParamExample {json} Input (body/json)
 *     {
 *       "encryptedText":"U2FsdGVkX18d1RC38Loox8VWl1UHI8k/twvk6uxDTfF6YVUJsEmmQDibBOS708wKascuN7hv7G3txyXc46IKDrfA1D16awH4hL5eWTHRJTaypJTgdrF2bb8g0Qr9vO0r"
 *     }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Password Updated Successfully"
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
 *    HTTP/1.1 440 unknown
 *      {
 *        "statusCode": 440,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Your session is expired please do logged in"
 *      }
 *
 */
router.post(
  changePasswordRouter,
  async function (req, res, next) {
    try {
      let result = {};
      const { encryptedText, loggedInEmployeeId, loggedInAppIndication = 3 } = req.body;

      if (encryptedText) {
        const bytes = CryptoJS.AES.decrypt(
          encryptedText,
          credentialEncryptionDecryptionKey
        );
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        const bodyData = { ...decryptedData, loggedInEmployeeId };
        const { newPassword, oldPassword } = bodyData;

        const isPasswordValid = /^[a-zA-Z0-9?!@#\$%\^\&*\)\(+=_-]+$/.test(
          newPassword
        );
        if (isPasswordValid) {
          const isValidDataType = await payLoadValidation({
            bodyData: bodyData,
            payLoad: changePassword
          });
          const { isValidate, validationList } = isValidDataType;
          if (isValidate && oldPassword !== newPassword) {
            const response = await setPassword({
              loggedInEmployeeId,
              newPassword,
              oldPassword,
              loggedInAppIndication
            });
            if (
              response[3] &&
              response[3][0]["@op_IsSuccess"] === 1 &&
              response[3][0]["@op_Flag"] === 1
            ) {
              const findIndex = userAccessDetails.filter(
                x => x.loggedInEmployeeId === loggedInEmployeeId
              );
              userAccessDetails.splice(findIndex, 1);
              result = {
                message: Message({ code: "RESET" }),
                isSuccess: true
              };
            } else if (response[3] && response[3][0]["@op_Flag"] === 0) {
              result = {
                message: Message({ code: "WrongPassword" }),
                isSuccess: false
              };
            } else {
              result = {
                isSuccess: false,
                message: Message({})
              };
            }
          } else if (oldPassword === newPassword) {
            result = {
              isSuccess: false,
              message: Message({ code: "SamePassword" })
            };
          } else {
            result = {
              isSuccess: false,
              message: Message({ code: "NotMatchPassword" })
            };
          }
          req.result = { isValidate, validationList, ...result };
        } else {
          const message = Message({ code: "INVALPASS" });
          req.result = {
            isSuccess: true,
            isValidate: false,
            validationList: [{ newPassword: message }],
            message
          };
        }
      } else {
        req.result = {
          isSuccess: false,
          isValidate: true,
          validationList: [],
          message: Message({})
        };
      }
    } catch (e) {
      handleError(e, res);
    }
    next();
  },
  sendResponse
);

module.exports = router;
