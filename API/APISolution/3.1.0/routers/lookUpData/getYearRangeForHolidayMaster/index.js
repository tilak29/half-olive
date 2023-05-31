const express = require("express");
const router = express.Router();

const {
  getYearRangeForHolidayMaster
} = require("./getYearRangeForHolidayMasterRepository");
const { sendResponse, dateYearRange } = require("../../../../utils");
const {
  getYearRangeForHolidayMaster_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getYearRangeForHolidayMaster/lookUpData Get YearRange Data
 * @apiName GetYearRangeData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getYearRangeForHolidayMaster/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get YearList for Holiday Master lookup
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "statusCode": 200,
 *      "isSuccess": true,
 *      "data": {
 *            "yearList":[
 *                {
 *                  "label": 2015,
 *                  "value": 2015
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
      const response = await getYearRangeForHolidayMaster();
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        const rangeYear = JSON.parse(response[0].Value);
        yearList = await dateYearRange({
          startYear: rangeYear[0],
          endYear: rangeYear[1]
        });
        result = {
          message: Message({ code: "Success" }),
          data: {
            yearList: [...yearList]
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
