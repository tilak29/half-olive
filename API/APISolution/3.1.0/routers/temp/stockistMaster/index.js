const express = require("express");
const router = express.Router();

const {
  stockistGetData,
  stockistSaveData
} = require("./stockistMasterRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
  stockistMasterAdd,
  stockistMasterUpdate,
  stockistMasterGetData
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  stockistMaster_getData: { url: getData },
  stockistMaster_insertData: { url: insertData },
  stockistMaster_updateData: { url: updateData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /stockistMaster/getData Get Data from Stockist Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /stockistMaster/getData
 *
 * @apiGroup Stockist Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Stockist Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - stateId and isActive are required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "stateId" : 12,
 *        "isActive":1
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        "stockistList": [
 *           {
 *               "srNo": 1,
 *               "stockistId": 1,
 *               "stockistName": "Khushbu",
 *               "countryId": 1,
 *               "countryName": "India",
 *               "stateId": 12,
 *               "stateName": "Gujarat",
 *               "cityId": 15,
 *               "cityName": "Bardoli",
 *               "dob": "2015-10-03 00:00:00",
 *               "contactPerson": "Khushbu",
 *               "isActive": 1,
 *               "address": null,
 *               "mobileNumber": "9409261193",
 *               "email": "khushbu.shah@spec-india.com",
 *               "phoneNumber": "1234567890",
 *               "pinCode": null,
 *               "gstNumber": null,
 *               "updatedDate": null,
 *               "isSuperStockist": 1,
 *               "totalRecord": 1
 *           },
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
      const { stateId, loggedInEmployeeId, isActive, search } = req.body;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: stockistMasterGetData
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await stockistGetData({
          loggedInEmployeeId,
          stateId,
          isActive,
          search
        });
        const { isSuccess } = response;
        const stockist = response && response[0];
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              stockistList: [...stockist]
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
 * @api {post} /stockistMaster/insertData Insert Data into Stockist Master
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /stockistMaster/insertData
 *
 * @apiGroup Stockist Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Stockist Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json) In
 *      {
 *          "stockistName": "Khushbu",
 *          "countryId": 1,
 *          "stateId": 12,
 *          "cityId": 15,
 *          "dob": "2015-03-12",
 *          "contactPerson": "Khushbu",
 *          "isActive": 1,
 *          "address": null,
 *          "mobileNumber": "9409261193",
 *          "email": "khushbu.shah@spec-india.com",
 *          "phoneNumber": "1234567890",
 *          "pinCode": null,
 *          "gstNumber": null,
 *          "isSuperStockist": 1,
 *          "dlNo":"1478844",
 *          "expiryDate":"2020-03-20"
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
      const bodyData = {
        ...req.body,
        stockistId: 0
      };

      const result = await stockistMasterRequestHandler({
        bodyData,
        validatorData: stockistMasterAdd,
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
 * @api {post} /stockistMaster/updateData Update Data of Stockist Master
 * @apiName UpdateData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /stockistMaster/updateData
 *
 * @apiGroup Stockist Master
 *
 * @apiDescription This API is Used to update data in Stockist Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - stockistId and updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *          "stockistId":1,
 *          "stockistName": "Khushbu",
 *          "countryId": 1,
 *          "stateId": 12,
 *          "cityId": 15,
 *          "dob": "2015-03-12",
 *          "contactPerson": "Khushbu",
 *          "isActive": 1,
 *          "address": null,
 *          "mobileNumber": "9409261193",
 *          "email": "khushbu.shah@spec-india.com",
 *          "phoneNumber": "1234567890",
 *          "pinCode": null,
 *          "gstNumber": null,
 *          "isSuperStockist": 1,
 *          "updatedDate":"2020-01-16 14:32:54",
 *          "dlNo":"14dfg",
 *          "expiryDate":"2020-03-20"
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Record Updated Successfully",
 *      "isSuccess": true,
 *      "statusCode": 200,
 *      "data": {}
 *   }
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
      const result = await stockistMasterRequestHandler({
        bodyData: {
          ...req.body
        },
        validatorData: stockistMasterUpdate,
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

const stockistMasterRequestHandler = async ({
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
    const response = await stockistSaveData({
      data: JSON.stringify(bodyData),
      operationType
    });
    if (response[3] && response[3][0]["@op_IsSuccess"] === 1) {
      const messageResult = await getResponse({
        operationType,
        operationFlag: response[3][0]["@op_Flag"]
      });
      result = { ...messageResult };
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

const getResponse = async ({ operationType, operationFlag }) => {
  let result = {};
  switch (operationType) {
    case 0:
      if (operationFlag === 1)
        result = { message: Message({ code: "RINS" }), isSuccess: true };
      else if (operationFlag === 2)
        result = {
          message: Message({ code: "DUPStockist" }),
          isSuccess: false
        };
      else if (operationFlag === 3)
        result = {
          message: Message({ code: "DUPUser" }),
          isSuccess: false
        };
        else if (operationFlag === 4)
        result = {
          message: Message({ code: "DUP_STOCKIST_REF_CODE" }),
          isSuccess: false
        };
      break;

    case 1:
      if (operationFlag === 0)
        result = { message: Message({ code: "REFRESH" }), isSuccess: false };
      else if (operationFlag === 1)
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      else if (operationFlag === 2)
        result = {
          message: Message({ code: "DUPStockist" }),
          isSuccess: false
        };
      else if (operationFlag === 3)
        result = {
          message: Message({ code: "DUPUser" }),
          isSuccess: false
        };
        else if (operationFlag === 4)
        result = {
          message: Message({ code: "DUP_STOCKIST_REF_CODE" }),
          isSuccess: false
        };
      break;
  }
  return result;
};
module.exports = router;
