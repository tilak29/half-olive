const express = require("express");
const router = express.Router();

const { getLookupData } = require("./getAreaDataRepository");
const { sendResponse, payLoadValidation } = require("../../../../utils");
const {
  getAreaData_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { getAreaDataLookup } = require("../../../../dataType.json");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getAreaData/lookUpData Get AreaId and AreaName
 * @apiName GetAreaData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getAreaData/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get SAreaId and AreaName for lookup
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {String} cityId Enter cityId to get city wise Area
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *             "areaList": [
 *                 {
 *                     "value": 1,
 *                     "label": "Ahmedabad"
 *                 },
 *                 {
 *                      "value": 4,
 *                      "label": "Ahmedabad"
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
      const { cityId } = req.body;
      const bodyData = { ...req.body };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: getAreaDataLookup
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await getLookupData({ cityId });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              areaList: [...response]
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
