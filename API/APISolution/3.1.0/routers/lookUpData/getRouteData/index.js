const express = require("express");
const router = express.Router();

const { getLookupData } = require("./getRouteDataRepository");
const { sendResponse } = require("../../../../utils");
const {
  getRouteData_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getRouteData/lookUpData Get RouteId and RouteName
 * @apiName GetRouteData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getRouteData/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get RouteId and RouteName for lookup
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - date for dcr
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "date" : "2020-06-03",
 *        "employeeId" :"[3,5]",
 *        "isOfficialRoutesRequired":false
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
 *                    "label": "MEETING AT AHMEDABAD"
 *                },
 *                {
 *                    "value": 3,
 *                    "label": "Swastik Cross Road"
 *                }
 *             ],
 *            "workingWithId":67
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
      const {
        loggedInEmployeeId,
        date,
        employeeId,
        isOfficialRoutesRequired
      } = req.body;
      const response = await getLookupData({
        loggedInEmployeeId,
        date,
        employeeId,
        isOfficialRoutesRequired
      });
      const { isSuccess } = response;
      const routes = response && response[0];
      let workingWithId;
      routes &&
        routes.map((x) => {
          if (x.workingWithId !== null) {
            workingWithId = x.WorkingWithId;
          }
          delete x.WorkingWithId;
          return x;
        });
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            routeList: routes,
            workingWithId
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
