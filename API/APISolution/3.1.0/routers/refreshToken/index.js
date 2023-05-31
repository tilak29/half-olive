const express = require("express");
const router = express.Router();

const { setLoginDetails } = require("./refreshTokenRepository");
const {
  getAuthInfo,
  addOrReplaceAccessDetail,
  payLoadValidation,
  sendResponse
} = require("../../../utils");
const { refreshToken } = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  refreshToken: { url: refreshTokenRouter }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /refreshToken Refresh Token
 * @apiName Refresh Token
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /refreshToken
 *
 * @apiGroup 1.User
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to refresh token in some interval if token is not expired
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body/json) {Object} refreshtoken Enter Object as shown in body
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "designationId": 1
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {
 *                  "designationId": 1,
 *                  "loggedInEmployeeId": 1,
 *                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV0aG9yaXphdGlvbiIsInNjb3BlIjoiZnVsbF9hY2Nlc3MiLCJqdGkiOiJsOHRmME9tOTBMT3VvU1dOIiwiYWxnIjoiSFMyNTYiLCJ1c2VyTmFtZSI6IktodXNoYnUiLCJyb2xlSWQiOjEsIlVzZXJJZCI6MSwiY3VycmVudERhdGUiOjE1ODAyODgyMTksImlhdCI6MTU4MDI4ODIxOSwiZXhwIjoxNTgwMjg4MjI5fQ.ocXF3xd1E0RHejm9m2Ng-meyQDb6cJ-FChUdADdBKxc",
 *                  "refrshIntervalInMs": "480000"
 *         },
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Token Refresh Successfully"
 *      }
 *
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": false,
 *        "validationList": [
 *          {
 *           "designationId": "The designation id field is mandatory."
 *          },
 *         ],
 *        "message": "Please Enter all Required field with Valid Data Type"
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
  refreshTokenRouter,
  async function (req, res, next) {
    try {
      let result = {};
      result = {
        isSuccess: false,
        message: Message({})
      };
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: refreshToken
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const {
          userName,
          loggedInDesignationId,
          loggedInReferenceId,
          loggedInDivisionId,
          loggedInAppIndication,
          loggedInUserId
        } = req.body;

        const oldToken = req.headers.authorization;
        const {
          authInfo,
          authInfo: { token },
          key,
          expireTokenTime
//167589 
        } = await getAuthInfo({
          userName,
          loggedInDesignationId,
          loggedInReferenceId,
          loggedInUserId,
          loggedInDivisionId,
          loggedInAppIndication
          
        });

        const userDeatils = {
          loggedInReferenceId,
          loggedInDesignationId,
          loggedInDivisionId,
          loggedInAppIndication,
          loggedInUserId,
          userName
          // token,
          // key
        };
        await addOrReplaceAccessDetail(userDeatils);

        const response = await setLoginDetails({
          loggedInUserId,
          token,
          expireTokenTime,
          key,
          oldToken
        });
        const { isSuccess } = response;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "REFRESHTOKEN" }),
            data: {
              ...authInfo
            },
            isSuccess
          };
        } else {
          result = {
            isSuccess: false,
            message: Message({})
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: false,
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
