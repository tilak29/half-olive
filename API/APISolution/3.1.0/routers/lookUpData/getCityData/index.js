const express = require("express");
const router = express.Router();

const { getLookupData, getLookupAllData } = require("./getCityDataRepository");
const { sendResponse, designationDetails } = require("../../../../utils");
const {
  getCityData_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /getCityData/lookUpData Get StateId,CityId and CityName
 * @apiName GetCityData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getCityData/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get StateId, CityId and CityName for lookup
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
 *             "cityList": [
 *                 {
 *                     "stateId": 12,
 *                     "value": 1,
 *                     "label": "Ahmedabad-East"
 *                 },
 *                 {
 *                     "stateId": 12,
 *                     "value": 12,
 *                     "label": "Ahmedabad-South"
 *                 }
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
      const { loggedInDesignationId, companyId, loggedInReferenceId } = req.body;
      const adminDesignation =
        JSON.parse(
          designationDetails[0].filter((x) => x.Code === "ADMIN_DESIGNATIONS")[0]
            .Value
        );
      const admindesignation =
        loggedInDesignationId &&
        adminDesignation &&
        adminDesignation.includes(loggedInDesignationId);
      let response;
      if (admindesignation) {
        response = await getLookupData();
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              cityList: [...response.recordset]
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
        response = await getLookupAllData({
          companyId,
          loggedInReferenceId,
          loggedInDesignationId
        });
        const { isSuccess } = response;
        const cities = response && response[0];
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              cityList: cities
            },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
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
