const express = require("express");
const router = express.Router();

const { getLookupData } = require("./getRoutesForAddDCRRepository");
const { sendResponse, payLoadValidation } = require("../../../../utils");
const {
  getRoutesForAddDCR_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");
const { getRoutesForAddDCRLookup } = require("../../../../dataType.json");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getRoutesForAddDCR/lookUpData Get RouteId and RouteName for ADD DCR Screen in web
 * @apiName Get Routes For ADD DCR
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getRoutesForAddDCR/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get RouteId and RouteName for lookup for ADD DCR Screen
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - employeeIds is required and must be array
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "employeeIds" :"[3,5]"
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *             "routeList": [
 *                {
 *                    "value": 2,
 *                    "label": "MEETING AT AHMEDABAD(Khushbu Shah)"
 *                },
 *                {
 *                    "value": 3,
 *                    "label": "ADMIN DAY(Khushbu Shah)"
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
      const isValidDataType = await payLoadValidation({
        bodyData: { ...req.body },
        payLoad: getRoutesForAddDCRLookup
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const { employeeIds } = req.body;
        const response = await getLookupData({
          employeeIds
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              routeList: [...response]
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
