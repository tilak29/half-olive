const express = require("express");
const router = express.Router();

const { monthlyStatusGetData } = require("./monthlyStatusRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
  publicAPIDataTypeJSON: { monthlyStatusGet }
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  publicAPIRouterConstant: {
    monthlyStatus_getData: { url: getData }
  }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /monthlyStatus/getData Get Monthly Status Data
 * @apiName Get Monthly Status
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /monthlyStatus/getData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Monthly Status Data for Stockist/Chemist
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 2.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        "monthlyStatusList": [
 *              {
 *                 "pendingOrders": 113,
 *                 "supplyedOrders": 0,
 *                 "receivedOrders": 131
 *              }
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
      const { loggedInEmployeeId, loggedInAppIndication } = req.body;
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: monthlyStatusGet
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await monthlyStatusGetData({
          loggedInEmployeeId,
          loggedInAppIndication
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              monthlyStatusList: response
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
