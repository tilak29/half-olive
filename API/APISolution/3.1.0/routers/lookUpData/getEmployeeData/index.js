const express = require("express");
const router = express.Router();

const { getLookupData } = require("./getEmployeeDataRepository");
const { sendResponse } = require("../../../../utils");
const {
  getEmployeeData_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getEmployeeData/lookUpData Get StateId,DivisionId,DesignationId, EmployeeId and Employee Name
 * @apiName GetEmployeeData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getEmployeeData/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get StateId,DivisionId,DesignationId, EmployeeId and Employee Name for lookup
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - If no parameters are added then all data will come
 *
 * @apiParamExample {json} Input (body/json)
 *
 *    {
 *      "stateIds":[1,12],
 *      "designationIds":[5,6],
 *      "divisionIds":[1],
 *      "cityIds":[1]
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *             "employeeList":
 *              [
 *                  {
 *                    "value": 1,
 *                    "label": "Parth Suthar (Admin | Ahmedabad | Division1234 | Gujarat)",
 *                    "stateId": 12,
 *                    "stateName": "Gujarat",
 *                    "divisionId": 1
 *                    "divisionName": "OTC",
 *                    "designationId": 6,
 *                    "designationCode": "SL",
 *                    "cityId": 12,
 *                    "cityName": "Ahmedabad",
 *                   }
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
      const { designationIds, stateIds, divisionIds, cityIds, loggedInReferenceId, loggedInDivisionId } = req.body;
      const response = await getLookupData({
        designationIds,
        stateIds,
        divisionIds,
        cityIds,
        loggedInReferenceId,
        loggedInDivisionId
      });
      console.log("response :: ",response);
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            employeeList: [...response.recordset]
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
