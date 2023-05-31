const express = require("express");
const router = express.Router();

const {
  userPanelGetData,
  userPanelUpdateData
} = require("./userPanelRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const { userPanelUpdate, userPanelGet } = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  userPanel_getData: { url: getData },
  userPanel_updateData: { url: updateData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /userPanel/getData Get the Employee details
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /userPanel/getData
 *
 * @apiGroup User Panel
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get the Employee deatils
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {Number} stateId Required to get statewise employees
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "stateId":"12"
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "statusCode": 200,
 *      "isSuccess": true,
 *      "data": {
 *          "designationList": [
 *              {
 *                "employeeId": 1,
 *                "userName": "Parth Suthar",
 *                "cityName": "Ahmedabad",
 *                "designationCode": "Admin",
 *                "mobileNumber": "9586567130",
 *                "password": "11",
 *                "reportingPeriod": 1,
 *                "updatedBy": 1,
 *                "updatedDate": "2020-01-16 14:32:54"
 *               }
 *           ],
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
      const bodyData = req.body;
      const { stateId, loggedInDivisionId, divisionId = null } = bodyData;
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: userPanelGet
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await userPanelGetData({ stateId, divisionId, loggedInDivisionId });
        const { isSuccess } = response;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              employeeList: [...response]
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

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /userPanel/updateData Update Data of Employee
 * @apiName UpdateData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /userPanel/updateData
 *
 * @apiGroup User Panel
 *
 * @apiDescription This API is Used to update data in Employee
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "updatedDate":"2020-01-16 14:32:54",
 *      "reportingPeriod":"0",
 *      "employeeId":2
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Record Updated Successfully"
 *      }
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
 */
router.post(
  updateData,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = req.body;
      const {
        reportingPeriod,
        employeeId,
        loggedInEmployeeId,
        updatedDate
      } = bodyData;
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: userPanelUpdate
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await userPanelUpdateData({
          reportingPeriod,
          employeeId,
          loggedInEmployeeId,
          updatedDate
        });
        const { isSuccess, flag } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "RUPD" }),
            isSuccess
          };
        } else if (flag === "Concurrency") {
          result = {
            message: Message({ code: "REFRESH" }),
            isSuccess: false,
            ...response
          };
        } else {
          result = {
            isSuccess: false,
            message: Message({})
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
