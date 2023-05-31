const express = require("express");
const router = express.Router();

const { logOut } = require("./logOutRepository");
const {
  payLoadValidation,
  sendResponse,
  userAccessDetails
} = require("../../../utils");
const { logOut: logOutValidator } = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  logOut: { url: logOutRouter }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /logOut Logged Out
 * @apiName Logged Out
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /logOut
 *
 * @apiGroup 1.User
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to send the new token if token is not expired
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "You are successfully Logged out from application"
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
  logOutRouter,
  async function (req, res, next) {
    try {
      let result = {};
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: logOutValidator
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const { loggedInUserId } = req.body;

        const findIndex = userAccessDetails.filter(
          x => x.loggedInUserId === loggedInUserId
        );
        userAccessDetails.splice(findIndex, 1);

        const response = await logOut({
          loggedInUserId
        });
        const { isSuccess } = response;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "LogOut" }),
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
