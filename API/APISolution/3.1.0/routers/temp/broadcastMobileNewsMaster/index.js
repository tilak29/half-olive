const express = require("express");
const router = express.Router();

const {
  broadcastMobileNewsGetData,
  broadcastMobileNewsSaveData
} = require("./broadcastMobileNewsMasterRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
  broadcastMobileNewsMasterAdd,
  broadcastMobileNewsMasterUpdate
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  broadcastMobileNewsMaster_getData: { url: getData },
  broadcastMobileNewsMaster_insertData: { url: insertData },
  broadcastMobileNewsMaster_updateData: { url: updateData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /broadcastMobileNewsMaster/getData Get Data from Broad Cast MobileNews Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /broadcastMobileNewsMaster/getData
 *
 * @apiGroup BroadCast MobileNews Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Broad Cast MobileNews Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        "broadcastMobileNewsList": [
 *           {
 *               "broadcastId": 1,
 *               "divisionIds": "[1]",
 *               "stateIds": "[12]",
 *               "designationIds": "[1]",
 *               "message": "Test",
 *               "startDate": "2020-03-27",
 *               "endDate": "2020-04-27",
 *               "stateName": "Gujarat, Haryana, Himachal pradesh, Jammu & kashmir",
 *               "divisionName": "OTC",
 *               "designationName": "Admin",
 *               "isAllowBroadCast" : 1
 *           }
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
      const { loggedInEmployeeId } = req.body;
      const response = await broadcastMobileNewsGetData({ loggedInEmployeeId });
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            broadcastMobileNewsList: [...response]
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
 * @api {post} /broadcastMobileNewsMaster/insertData Insert Data of Broad Cast MobileNews Master
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /broadcastMobileNewsMaster/insertData
 *
 * @apiGroup BroadCast MobileNews Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data of BroadCast MobileNews Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object -  divisionIds=array, stateIds=array,designationIds=array,message,startDate,endDate,isActive are required fields
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "divisionIds": "[1]",
 *        "stateIds": "[12]",
 *        "designationIds": "[1]",
 *        "message": "Test",
 *        "startDate": "2020-03-31",
 *        "endDate": "2020-04-01",
 *        "isActive": "1"
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "isValidate": true,
 *        "validationList": [],
 *        "data": {
 *            "insertId": 2,
 *            "affectedRows": 1
 *         },
 *        "message": "Record Inserted Successfully",
 *        "isSuccess": true,
 *        "statusCode": 200
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
 */
router.post(
  insertData,
  async function (req, res, next) {
    try {
      const result = await broadcastMobileNewsMasterRequestHandler({
        bodyData: { ...req.body },
        validatorData: broadcastMobileNewsMasterAdd,
        operationType: 0
      });

      req.result = { ...result };
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
 * @api {post} /broadcastMobileNewsMaster/updateData Update Data of Broad Cast MobileNews Master
 * @apiName UpdateData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /broadcastMobileNewsMaster/updateData
 *
 * @apiGroup BroadCast MobileNews Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Update Data of BroadCast MobileNews Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object -broadcastId , divisionIds=array, stateIds=array,designationIds=array,message,startDate,endDate,isActive are required fields
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "broadcastId": 1,
 *        "divisionIds": "[1]",
 *        "stateIds": "[12]",
 *        "designationIds": "[1]",
 *        "message": "Test",
 *        "startDate": "2020-03-31",
 *        "endDate": "2020-04-01",
 *        "isActive": "1"
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "isValidate": true,
 *        "validationList": [],
 *        "data": {
 *            "insertId": 2,
 *            "affectedRows": 1
 *         },
 *        "message": "Record Updated Successfully",
 *        "isSuccess": true,
 *        "statusCode": 200
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
 */
router.post(
  updateData,
  async function (req, res, next) {
    try {
      const result = await broadcastMobileNewsMasterRequestHandler({
        bodyData: { ...req.body },
        validatorData: broadcastMobileNewsMasterUpdate,
        operationType: 1
      });

      req.result = { ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

const broadcastMobileNewsMasterRequestHandler = async ({
  bodyData,
  validatorData,
  operationType
}) => {
  let result = {};
  const isValidDataType = await payLoadValidation({
    bodyData,
    payLoad: validatorData
  });
  const { isValidate, validationList } = isValidDataType;

  if (isValidate) {
    const response = await broadcastMobileNewsSaveData({
      data: bodyData,
      operationType
    });
    const { isSuccess } = response;
    delete response.isSuccess;
    if (isSuccess === true) {
      const messageResult = await getResponse({
        operationType
      });
      result = { isValidate, validationList, ...messageResult };
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
  result = { isValidate, validationList, ...result };
  return result;
};

const getResponse = async ({ operationType }) => {
  let result = {};
  switch (operationType) {
    case 0:
      result = { message: Message({ code: "RINS" }), isSuccess: true };
      break;

    case 1:
      result = { message: Message({ code: "RUPD" }), isSuccess: true };
  }
  return result;
};
module.exports = router;
