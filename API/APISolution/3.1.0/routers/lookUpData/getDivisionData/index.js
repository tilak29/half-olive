const express = require("express");
const router = express.Router();

const { getLookupData,getAllLookupData,getStockistAssignedDivisionData } = require("./getDivisionDataRepository");
const { sendResponse } = require("../../../../utils");
const {
  getDivisionData_lookUpData: { url: getData },
  getAllDivisionData_lookUpData : {url:getAllData},
  getStockistAssignedDivision_lookUpData : {url:getAssignedDivision}
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getDivisionData/lookUpData Get DivisionId and DivisionName
 * @apiName GetDivisionData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getDivisionData/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get DivisionId and DivisionName for lookup
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "You get data Successfully",
 *         "data": {
 *             "divisionList": [
 *                 {
 *                    "value": 1,
 *                    "label": "Division1234"
 *                 },
 *                 {
 *                    "value": 2,
 *                    "label": "test1"
 *                  }
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
      const { loggedInDivisionId, loggedInAppIndication } = req.body;
      const loggedInDivisionIds = loggedInDivisionId?loggedInDivisionId:null;
      const response = await getLookupData({loggedInDivisionIds, loggedInAppIndication});
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            divisionList: [...response.recordset]
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

router.post(
  getAllData,
  async function (req, res, next) {
    try {
      let result = {};
      const response = await getAllLookupData();
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            allDivisionList: [...response.recordset]
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

router.post(
  getAssignedDivision,
  async function (req, res, next) {
    try {
      let result = {};
      const { loggedInMobileNumber } = req.body;      
      const response = await getStockistAssignedDivisionData({loggedInMobileNumber});
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            divisionList: [...response[1]]
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
