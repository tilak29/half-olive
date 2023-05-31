const express = require("express");
const router = express.Router();

const { routeGetData, routeDownloadData } = require("./empRouteRepository");
const { sendResponse, payLoadValidation } = require("../../../utils");
//const { versionGet } = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  empRoute_getRouteData: { url: getData },
  empRoute_downloadRouteData: { url: downloadData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /empRoute/getRouteData Get Data from RouteMaster table
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /empRoute/getRouteData
 *
 * @apiGroup Route Group
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data from RouteMaster table
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {string} stateId Enter state's id to get state wise City
 * @apiParam (Request body) {string} employeeId Enter employee's id to get employee wise data
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "stateId" : 12,
 *        "employeeId" : 2
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *    "isValidate": true,
 *    "validationList": [],
 *      "message": "You get data Successfully",
 *    "data": {
 *        "routeList": [
 *                {
 *                 "routeId": 1,
 *                 "cityName": "Bhavnagar"
 *                 "routeName": "Mahua , Valvad , Anaval , Karchaliya",
 *                 "routeTypeId":2,
 *                 "routeTypeValue": "Head Quarter",
 *                 "distanceFromHq": 65,
 *                 "tpVisitPerMonth": 1,
 *                 "isActive": 1,
 *                 "updatedDate":null
 *            }
 *        ]
 *    },
 *    "isSuccess": true,
 *    "statusCode": 200
 *}
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
 *    HTTP/1.1 401 Unauthorized
 *      {
 *        "statusCode": 401,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": false,
 *        "validationList": [
 *          {
 *             "Error": "You are UnAuthorized to perform this Action"
 *          }
 *         ],
 *        "message": "You are UnAuthorized to perform this Action"
 *      }
 */

router.post(
  getData,
  async function (req, res, next) {
    try {
      let result = {};
      const { stateId, cityId, employeeId, isActive } = req.body;

      const response = await routeGetData({
        stateId,
        cityId,
        employeeId,
        isActive
      });

      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          //routeList: response[0],
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
      req.result = { isValidate: true, validationList: [], ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /empRoute/downloadRouteData Get Excel Data of Assigned Route Of Employee Master
 * @apiName downloadRouteData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /empRoute/downloadRouteData
 *
 * @apiGroup Route Master
 *
 * @apiDescription This API is Used to get Data of Assigned Route from Route Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object employeeId,stateId,cityId are required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "employeeId":3,
 *        "stateId":12
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        "routeList": [],
 *        "routeTypeList":[]
 *      },
 *      "isSuccess": true,
 *      "statusCode": 200
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
 *    HTTP/1.1 401 Unauthorized
 *      {
 *        "statusCode": 401,
 *        "isSuccess": false,
 *        "data": {},
 *        "isValidate": false,
 *        "validationList": [
 *          {
 *             "Error": "You are UnAuthorized to perform this Action"
 *          }
 *         ],
 *        "message": "You are UnAuthorized to perform this Action"
 *      }
 */
router.post(
  downloadData,
  async function (req, res, next) {
    try {
      let result = {};
      const { stateId, employeeId } = req.body;
      // const isValidDataType = await payLoadValidation({
      //   bodyData: req.body,
      //   payLoad: routeMasterDownloadData
      // });
      // const { isValidate, validationList } = isValidDataType;
      // if (isValidate) {
      const response = await routeDownloadData({
        employeeId,
        stateId
      });
      const length = response.length;

      if (length > 0) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            routeList: response[0],
            routeTypeList: response[1]
          },
          isSuccess: true
        };
      } else {
        result = {
          message: Message({}),
          isSuccess: false
        };
      }
      // } else {
      //   result = {
      //     message: Message({ code: "INVALPAYLOAD" }),
      //     isSuccess: false,
      //     ...result
      //   };
      // }
      req.result = { isValidate: true, validationList: [], ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

module.exports = router;
