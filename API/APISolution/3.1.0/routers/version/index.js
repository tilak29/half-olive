const express = require("express");
const router = express.Router();

const {
    versionGetData,
    getApplicationPath
} = require("./versionRepository");
const { sendResponse, payLoadValidation } = require("../../../utils");
const { versionGet } = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  version_getData: { url: getData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /version/getData Get Data from applicationversionmaster table
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /version/getData
 *
 * @apiGroup Version Info
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data from applicationversionmaster table
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *	    "application": "RETAILER",
 *	    "currentVersion":"1.0.0"
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "Data received successfully.",
 *    "data": {
 *        "versionInfo": [
 *            [
 *                {
 *                    "isUpdateRequired": 0,
 *                    "latestVersion": "0"
 *                }
 *            ],
 *            {
 *                "fieldCount": 0,
 *                "affectedRows": 0,
 *                "insertId": 0,
 *                "serverStatus": 35,
 *                "warningCount": 0,
 *                "message": "",
 *                "protocol41": true,
 *                "changedRows": 0
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
      const {
        application,
        currentVersion,
        appVersion = ""
      } = req.body;

      const response = await versionGetData({
        application,
        currentVersion,
        appVersion
      });

      const { isSuccess } = response;
      if (isSuccess === true) {

        const {IsUpdateRequired, LatestVersion, LatestVersionId} = response[0][0];
        let messageText = "";
        if(IsUpdateRequired === 1)
        {
          const resposeAppPath = await getApplicationPath(application);
          const{isSuccess} = resposeAppPath;
          messageText = isSuccess ? resposeAppPath[0].AppPath : "";
        }
        else
        {
          messageText = Message({ code: "Success" })
        }
        result = {
          message: messageText,
          data: response[0][0],
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
