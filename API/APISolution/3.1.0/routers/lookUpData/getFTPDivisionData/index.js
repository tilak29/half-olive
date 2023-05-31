const express = require("express");
const router = express.Router();

const { getLookupData } = require("./getFTPDivisionDataRepository");
const { sendResponse } = require("../../../../utils");
const {
  getFTPDivisionData_lookUpData: { url: getData }
} = require("../../../../routerConstant");
const { Message } = require("../../../../Messages");
const { handleError } = require("../../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.0.0
 */
/**
 * @api {post} /getFTPDivisionData/lookUpData Get division data
 * @apiName GetFTPDivisionData
 * @apiVersion 3.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getFTPDivisionData/lookUpData
 *
 * @apiGroup Lookup
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Division Data
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {
 *            "DepotList":[
 *                {
 *                  "DepotCode": "001",
 *                  "Name": "SMART LABORATORIES PVT. LTD.",
 *                  "ShortName": "SLPL"
 *                }
 *             ]
 *          },
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "You get data Successfully"
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
 *
 */
router.post(
  getData,
  async function (req, res, next) {
    try {
      let result = {};
      let response = await getLookupData();
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            divisionList: [...response]
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
