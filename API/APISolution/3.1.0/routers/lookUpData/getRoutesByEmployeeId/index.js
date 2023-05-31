const express = require("express");
const router = express.Router();

const { getLookupData } = require("./getRoutesByEmployeeIdRepository");
const { sendResponse, payLoadValidation } = require("../../../../utils");
const {
  getRoutesByEmployeeId_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { getRoutesByEmployeeIdLookup } = require("../../../../dataType.json");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getRoutesByEmployeeId/lookUpData Get RouteId and RouteName by EmployeeId
 * @apiName GetRouteDataByEmployeeId
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getRoutesByEmployeeId/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get RouteId and RouteName by EmployeeId
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {number} employeeId Enter EmployeeId to get Employeewise route
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
 *                    "label": "MEETING AT AHMEDABAD"
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
      const { employeeId } = req.body;
      const bodyData = { ...req.body };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: getRoutesByEmployeeIdLookup
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await getLookupData({ employeeId });
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
