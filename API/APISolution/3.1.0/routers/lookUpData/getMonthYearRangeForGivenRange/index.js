const express = require("express");
const router = express.Router();

const {
  sendResponse,
  dateMonthYearRange,
  payLoadValidation
} = require("../../../../utils");
const { getMonthYearRangeLookUp } = require("../../../../dataType.json");
const {
  getMonthYearRangeForGivenRange_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getMonthYearRangeForGivenRange/lookUpData Get MonthYearRange Data For given Range
 * @apiName Get Month Year Range For Given Range
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getMonthYearRangeForGivenRange/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Month Year List for Given Range
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *
 *  If month year range is required without financial year
 *    {
 *      "startMonth":"-5",
 *      "endMonth":"2"
 *    }
 *
 *  If month year range is required with last,current and next financial year
 *    {
 *      "isFinancialYear":true,
 *      "startYear":"-1",
 *      "endYear":"1"
 *    }
 *
 *  If current financial year is required
 *    {
 *      "isFinancialYear":true
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "statusCode": 200,
 *      "isSuccess": true,
 *      "data": {
 *            "monthYearList":[
 *                {
 *                  "label": "Mar-2020",
 *                  "value": "3-2020"
 *                },
 *             ]
 *      },
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully"
 *    }
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
      const {
        startMonth,
        endMonth,
        isFinancialYear,
        startYear,
        endYear
      } = req.body;
      const isValidDataType = await payLoadValidation({
        bodyData: { ...req.body },
        payLoad: getMonthYearRangeLookUp
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        monthYearList = await dateMonthYearRange({
          startMonth,
          endMonth,
          isFinancialYear,
          startYear,
          endYear
        });
        result = {
          message: Message({ code: "Success" }),
          data: {
            monthYearList: [...monthYearList]
          },
          isSuccess: true
        };
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
