const express = require("express");
const router = express.Router();

const { getLookupData } = require("./getAvailableItemsForSchemeDataRepository");
const { sendResponse } = require("../../../../utils");
const {
  getAvailableItemsForSchemeData_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getAvailableItemsForScheme/lookUpData Get Available ItemId and Brand for Scheme
 * @apiName GetAvailableItemsForSchemeData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getAvailableItemsForSchemeData/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Available ItemId and Brand for Scheme lookup
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *             "availableItemList": [
 *                 {
 *                    "value": 5,
 *                    "label": "Baby soap"
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
      const {schemeId = null, divisionId = null} = req.body;
      const response = await getLookupData({schemeId,divisionId:JSON.stringify(divisionId)});
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            availableItemList: [...response[1]]
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
