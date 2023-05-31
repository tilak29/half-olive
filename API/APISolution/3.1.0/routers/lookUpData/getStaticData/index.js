const express = require("express");
const router = express.Router();

const { getLookupData } = require("./getStaticDataRepository");
const { sendResponse, payLoadValidation } = require("../../../../utils");
const {
  getStaticData_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { getStaticDataLookup } = require("../../../../dataType.json");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getStaticData/lookUpData Get StaticId and StaticName
 * @apiName GetStaticData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getStaticData/lookUpData
 *
 * @apiGroup Static Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Static Data for lookup
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {String} code Enter code to get the static data
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *             "List": [
 *                 {
 *                     "value": 3,
 *                     "label": "Casual Leave"
 *                 },
 *                 {
 *                     "value": 4,
 *                     "label": "Leave Without Pay"
 *                 }
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
      const { code } = req.body;
      const bodyData = { ...req.body };
      
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: getStaticDataLookup
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await getLookupData({ code });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              List: [...response.recordset]
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
