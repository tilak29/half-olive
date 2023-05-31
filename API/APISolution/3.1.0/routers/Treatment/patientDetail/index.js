const express = require("express");
const router = express.Router();

const {
  patientName,
  patientPersonalDetail
  // messageonwhatsapp
} = require("./patientDetailRepository");
const {
  payLoadValidation,
  sendResponse,
} = require("../../../../utils");
const {
  guestMasterGetData
} = require("../../../../dataType.json");
const { Message } = require("../../../../Messages");
const {
  patientName_getNameData: { url: getNameData },
  patientPersonalDetail_getPdData: { url: getPdData },
} = require("../../../../routerConstant");
const { handleError } = require("../../../../error");

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /patientDetail/getNameData Get Data from Guest Detail Table
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /patientDetail/getNameData
 *
 * @apiGroup Patient Detail
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Guest Detail
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "You get data Successfully",
 *    "data": {
 *        "patientList": [
 *            {
 *                "GuestId": 1,
 *                "GuestName": "Guest1",
 *                "isActive": 1,
 *                "createdBy": 1,
 *                "createdDate": "2022-03-29 12:01:00",
 *                "updatedBy": null,
 *                "updatedDate": null,
 *                "deletedBy": null,
 *                "deletedDate": null
 *            }
 *        ]
 *    },
 *    "isSuccess": true,
 *    "statusCode": 200
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
  getNameData,
  async function (req, res, next) {
    try {
      let result = {};
      const {
        GuestId,
        searchName,
        checkedIn
      } = req.body;

      
      // messageonwhatsapp()
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: guestMasterGetData
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {

        const response = await patientName({
          searchName,
          checkedIn
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              patientList: [...response.recordset]
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
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /patientDetail/getPdData Get Personal Detail Data from Guest Detail Table
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /patientDetail/getPdData
 *
 * @apiGroup Patient Detail
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Personal Detail Data of Guest Detail
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {String}  GuestId Is Required 
 *
 * @apiParamExample {json} Input (body/json)
 *     {
 *      "GuestId": "1",
 *     }
 * 
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "You get data Successfully",
 *    "data": {
 *        "patientDetailList": [
 *            {
 *                "GuestId": 1,
 *                "GuestName": "Guest1",
 *                "Address": "Address For Guest1",
 *                "CityName": "City Name",
 *                "StateName": "State Name",
 *                "CountryName": "Country Name",
 *                "MobileNumber": "Mobile Number",
 *                "Email": "Email",
 *                "createdBy": 1,
 *                "createdDate": "2022-03-29 12:01:00",
 *                "updatedBy": null,
 *                "updatedDate": null,
 *                "deletedBy": null,
 *                "deletedDate": null
 *            }
 *        ]
 *    },
 *    "isSuccess": true,
 *    "statusCode": 200
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
  getPdData,
  async function (req, res, next) {
    try {
      let result = {};
      const {
        GuestId
      } = req.body;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: guestMasterGetData
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {

        const response = await patientPersonalDetail({
          GuestId
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              patientDetailList: [...response.recordset]
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

module.exports = router;