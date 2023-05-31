const express = require("express");
const router = express.Router();

const { viewCSProfileGetData, getChemistAssignedSLInfo } = require("./viewCSProfileRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
  publicAPIDataTypeJSON: { viewCSProfileGet }
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  publicAPIRouterConstant: {
    viewCSProfile_getData: { url: getData },
    viewCSProfile_getSLData: { url: getSLData }
  }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /viewCSProfile/getData Get Profile Data
 * @apiName View Cs Profile
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /viewCSProfile/getData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Profile Data for Stockist/Chemist
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        "profileList": [
 *              {
 *                 "userId": 5,
 *                 "userName": "Khushbu Stockist",
 *                 "address": "A/3 Gayatri Chamber",
 *                 "stateId": 12,
 *                 "stateName": "Gujarat",
 *                 "cityId": 1,
 *                 "cityName": "Ahmedabad",
 *                 "mobileNumber": "9909002695",
 *                 "email": "khushbu.shah@india.com",
 *                 "contactPerson": "Khushbu",
 *                 "gstNumber": "856478",
 *                 "dlNumber": "5555555555",
 *                 "balancePoints": null,
 *                 "boxPoints": null,
 *                 "sboxPoints": null,
 *                  "isBoxPointVisible":0,
 *                  "isPurchasePointVisible":0,
 *                  "isSBoxPointVisible":0,
 *                 "dob": "2020-03-13 00:00:00"
 *              }
 *       ]
 *   },
 *   "isSuccess": true,
 *   "statusCode": 200
 *  }
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
      const { loggedInEmployeeId, loggedInAppIndication, loggedInMobileNumber } = req.body;
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: viewCSProfileGet
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await viewCSProfileGetData({
          loggedInMobileNumber,
          loggedInAppIndication
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              profileList: [...response[0]]
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
 * @api {post} /viewCSProfile/getSLData Get Chemist assigned SL data
 * @apiName GetSLData
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getChemistList/getSLData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Chemist assigned SL data
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {
 *            "slName":"",
 *            "slContactNumber":""
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
  getSLData,
  async function (req, res, next) {
    try {
      let result = {};
      const { loggedInEmployeeId, loggedInMobileNumber } = req.body;

      const response = await getChemistAssignedSLInfo({ loggedInMobileNumber });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true && response[1]) {
          const {slList = '[]'} = response[1][0] == null ? '[]' : response[1][0];
          result = {
            message: Message({ code: "Success" }),
            data: {
              slList: JSON.parse(slList)
            },
            isSuccess
          };
        } else {
          result = {
            isSuccess: false,
            message: Message({})
          };
        }
      req.result = { isValidate: true, validationList:[], ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);



module.exports = router;
