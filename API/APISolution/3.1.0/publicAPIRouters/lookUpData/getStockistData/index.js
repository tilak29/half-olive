const express = require("express");
const router = express.Router();

const { getLookupData } = require("./getStockistDataRepository");
const { sendResponse } = require("../../../../utils");
const {
  getStockistData_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getStockistData/lookUpData LookUpData - Get StockistId and StockistName
 * @apiName LookUpData - GetStockistData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getStockistData/lookUpData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get StockistId and StockistName for lookup
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiParam (Request body) {JSON} Input - chemistId = chemist mobile number is required when this api is calling from web
 *
 * @apiParamExample {json} Input (body/json)
 * {
 *    "chemistId": 9825485627
 * }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *             "stockistList": [
 *                 {
 *                    "value": 1,
 *                    "label": "Khushbu Stockist"
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
      let result = {};
      const { chemistId, loggedInEmployeeId, loggedInAppIndication } = req.body;
      const response = await getLookupData({ chemistId, loggedInEmployeeId,loggedInAppIndication });
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            stockistList: [...response[2]]
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
