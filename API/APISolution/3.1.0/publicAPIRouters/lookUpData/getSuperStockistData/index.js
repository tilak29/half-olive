const express = require("express");
const router = express.Router();

const { getLookupData } = require("./getSuperStockistDataRepository");
const { sendResponse } = require("../../../../utils");
const {
  getSuperStockistData_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getSuperStockistData/lookUpData LookUpData - Get Super StockistId and StockistName
 * @apiName LookUpData - GetSuperStockistData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getSuperStockistData/lookUpData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Super StockistId and StockistName for lookup
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *             "superStockistList": [
 *                 {
 *                    "value": 1,
 *                    "label": "Khushbu"
 *                  }
 *             ]
 *         },
 *         "isSuccess": true,
 *         "statusCode": 200
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
 */
router.post(
  getData,
  async function (req, res, next) {
    try {
      const {loggedInAppIndication = 3, loggedInEmployeeId = 0, divisionId = null} = req.body;
      let result = {};
      const response = await getLookupData({loggedInEmployeeId, loggedInAppIndication, divisionId});
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            superStockistList: [...response]
          },
          isSuccess
        };
      } else {
        result = {
          message: Message({}),
          isSuccess: false
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
