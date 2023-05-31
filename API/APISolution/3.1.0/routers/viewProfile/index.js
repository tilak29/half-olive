const express = require("express");
const router = express.Router();

const { viewProfileGetData, viewStockistProfileGetData } = require("./viewProfileRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const { userPanelUpdate, userPanelGet } = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  viewProfile_getData: { url: getData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /viewProfile/getData Get details of Employee
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /viewProfile/getData
 *
 * @apiGroup View Profile
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get the Employee deatils to show in profile
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "statusCode": 200,
 *      "isSuccess": true,
 *      "data": {
 *          "profileDetails": {
 *                  "employeeId": 1,
 *                  "name": "Parth Suthar",
 *                  "mobileNumber": "9586567130",
 *                  "fatherName": "father",
 *                  "gender": 1,
 *                  "dob": "2020-03-28",
 *                  "doa": null,
 *                  "address": null,
 *                  "countryName": "India",
 *                  "stateName": "Gujarat",
 *                  "cityName": "Ahmedabad",
 *                  "pinCode": null,
 *                  "email": "parth.suthar@spec-india.com",
 *                  "designationCode": "Admin",
 *                  "divisionName": "OTC",
 *                  "doj": "2020-03-07",
 *                  "doc": null,
 *                  "manager": "Ankita Gadhia"
 *       }
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
      const { loggedInEmployeeId, loggedInAppIndication } = req.body;
      let response = {};
      if(loggedInAppIndication === 3){
        response = await viewProfileGetData({ loggedInEmployeeId });
      }
      else{
        response = await viewStockistProfileGetData({ loggedInEmployeeId });
      }
      const { isSuccess } = response;
      const employeedetails = response && response[0];
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            profileDetails: employeedetails
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
