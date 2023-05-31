const express = require("express");
const router = express.Router();

const { getLookupData } = require("./getChemistByEmployeeIdRepository");
const { sendResponse, payLoadValidation } = require("../../../../utils");
const {
  getChemistByEmployeeId_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { getChemistByEmployeeIdLookup } = require("../../../../dataType.json");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /getChemistByEmployeeId/lookUpData Get ChemistId and ChemistName by EmployeeId
 * @apiName GetChemistByEmployeeId
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getChemistByEmployeeId/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get ChemistId and ChemistName by EmployeeId
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 2.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *             "chemistList": [
 *                {
 *                    "value": 37,
 *                    "label": "chemist for route 16"
 *                }
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
      const { loggedInEmployeeId } = req.body;
      const bodyData = { ...req.body };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: getChemistByEmployeeIdLookup
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await getLookupData({ loggedInEmployeeId });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              chemistList: [...response]
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
