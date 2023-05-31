const express = require("express");
const router = express.Router();

const { firebaseTokenCSSaveData } = require("./firebaseTokenCSRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
  publicAPIDataTypeJSON: { firebaseTokenCS }
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  publicAPIRouterConstant: {
    firebaseTokenCS_insertData: { url: insertData }
  }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /firebaseTokenCS/insertData Insert Firebase token for chemist/stockist
 * @apiName Insert FireBase Token
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /firebaseTokenCS/insertData
 *
 * @apiGroup 1.Public API
 *
 * @apiDescription This API is Used to Insert firebase token for Stockist/Chemist
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 2.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiParam (Request body) {JSON} Input - firebaseToken Required to Insert token
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "firebaseToken":"sdfsdtgerge5e6536tw4t3635y35uy"
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {
 *          "insertId": 2,
 *          "affectedRows": 1
 *       },
 *      "message": "Record inserted successfully.",
 *      "isSuccess": true,
 *      "statusCode": 200
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
  insertData,
  async function (req, res, next) {
    try {
      let result = {};
      const {
        loggedInEmployeeId,
        loggedInAppIndication,
        firebaseToken
      } = req.body;
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: firebaseTokenCS
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await firebaseTokenCSSaveData({
          loggedInEmployeeId,
          loggedInAppIndication,
          firebaseToken
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "RINS" }),
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
