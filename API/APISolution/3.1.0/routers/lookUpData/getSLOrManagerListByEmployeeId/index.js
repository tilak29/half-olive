const express = require("express");
const router = express.Router();

const { getLookupData } = require("./getSLOrManagerListByEmployeeIdRepository");
const { sendResponse } = require("../../../../utils");
const {
  getSLOrManagerListByEmployeeId_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getSLOrManagerListByEmployeeId/lookUpData Get SL Or ManagerList By EmployeeId
 * @apiName Get SL Or ManagerList By EmployeeId
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getSLOrManagerListByEmployeeId/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get SL Or ManagerList ByEmployeeId  for lookup
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - isSelRequired=false,isManager=false,designationIds=null,isReportingRequired=false,isNameRequired=true,employeeId=loggedInEmployeeID and stateId fields are as input param.
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *             "slOrManagerList":
 *              [
 *                  {
 *                    "value": 1,
 *                    "label": "Individual",
 *                    "designationId": 6
 *                  },
 *                  {
 *                    "value": 2,
 *                    "label": "Khushbu Shah (SL | Ahmedabad | Division1234 | Gujarat)",
 *                    "designationId": 6
 *                  },
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
      const {
        loggedInEmployeeId,
        isSelRequired,
        isManager,
        stateId,
        designationIds,
        isReportingRequired,
        isNameRequired,
        employeeId,
        loggedInDivisionId
      } = req.body;
      const response = await getLookupData({
        loggedInEmployeeId,
        isSelRequired,
        isManager,
        stateId,
        designationIds,
        isReportingRequired,
        isNameRequired,
        employeeId,
        loggedInDivisionId
      });
      const { isSuccess } = response;
      delete response.isSuccess;
      const slOrManager = response && response[0];
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            slOrManagerList: slOrManager
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
