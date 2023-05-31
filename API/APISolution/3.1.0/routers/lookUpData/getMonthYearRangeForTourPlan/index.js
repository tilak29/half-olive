const express = require("express");
const router = express.Router();

const {
  getMonthYearRangeForTourPlan
} = require("./getMonthYearRangeForTourPlanRepository");
const { sendResponse, dateMonthYearRange } = require("../../../../utils");
const {
  getMonthYearRangeForTourPlan_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getMonthYearRangeForTourPlan/lookUpData Get MonthYearRange Data For TourPlan
 * @apiName Get Month Year Range For TourPlan
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getMonthYearRangeForTourPlan/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Month Year List for Sl Tour Plan
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
      const response = await getMonthYearRangeForTourPlan();
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        const rangeYear = JSON.parse(response[0].Value);

        monthYearList = await dateMonthYearRange({
          startMonth: rangeYear[0],
          endMonth: rangeYear[1]
        });
        result = {
          message: Message({ code: "Success" }),
          data: {
            monthYearList: [...monthYearList]
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
