const express = require("express");
const router = express.Router();

const {
  dashboardPobProductiveMonthlyCallGetData,
  getChemistBirthdayData,
  getDashboardCountData,
  getDashboardStateWiseCountData,
  getDashboardStateWiseData
} = require("./dashboardRepository");
const { sendResponse } = require("../../../utils");

const { Message } = require("../../../Messages");
const {
  dashboardPobProductiveMonthlyCall_getData: { url: getData },
  dashboardChemistBirthday_getData: { url: getBirthdayData },
  dashboardCountData_getData: { url : getCountData},
  dashboardCountData_getDataStateWiseCount:{url:getDataStateWiseCount},
  dashboardCountData_getDataStateWiseData:{url:getDataStateWiseData}
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /dashboardPobProductiveMonthlyCall/getData Get details of Employee's pob,monthly and productive call
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dashboardPobProductiveMonthlyCall/getData
 *
 * @apiGroup DashBoard
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get the Employee deatils to show in profile
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiParam (Request body) {JSON} Input JSON Object If-employeeId is enter taht employee's data will be sent otherwise loggedin employee's data will be sent.
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "employeeId":3
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "statusCode": 200,
 *      "isSuccess": true,
 *      "data": {
 *          "callDetails": {
 *                  "totalCall": 2,
 *                  "pob": 2170,
 *                  "productiveCall": 2
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
      const { loggedInEmployeeId, employeeId = loggedInEmployeeId } = req.body;
      const response = null;
      // await dashboardPobProductiveMonthlyCallGetData({
      //   employeeId
      // });
      const { isSuccess } = response;
      const callDetails = response && response[1][0];
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            callDetails
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

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /dashboardChemistBirthday/getData Get Chemist's birthday list
 * @apiName GetBirthdayData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dashboardChemistBirthday/getData
 *
 * @apiGroup DashBoard
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Chemist's birthday list
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {
 *            "birthdayList":[
 *                {
 *                  "chemistId": 1,
 *                  "chemistName": "Parth Suthar",
 *                  "mobile": "1111111111",
 *                  "dob": "2020-04-07"
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
  getBirthdayData,
  async function (req, res, next) {
    try {
      let result = {};
      const response = await getChemistBirthdayData();
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            birthdayList: [...response]
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
  getCountData,
  async function (req, res, next) {
    try {
      let result = {};
      const { loggedInEmployeeId, flag } = req.body;
      const response = null;
      //await getDashboardCountData({});
      if (response !== null && response.length > 0) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            countData : response
          },
          isSuccess:true
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
  getDataStateWiseCount,
  async function (req, res, next) {
    try {
      let result = {};
      const { loggedInEmployeeId, flag } = req.body;
      const response = null;
      //await getDashboardStateWiseCountData(flag);
      if (response !== null && response.length > 0) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            StatewiseCount : response
          },
          isSuccess:true
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
  getDataStateWiseData,
  async function (req, res, next) {
    try {
      let result = {};
      const { stateId, flag } = req.body;
      const response = null;
      //await getDashboardStateWiseData(stateId, flag);
      const{isSuccess}= response;
      if (response !== null && isSuccess) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            StatewiseCount : response
          },
          isSuccess:true
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
