const express = require("express");
const router = express.Router();

const { cityGetData, citySaveData } = require("./cityMasterRepository");
const {
  payLoadValidation,
  sendResponse,
  getNoOfGroupShow
} = require("../../../utils");
const {
  cityMasterAdd,
  cityMasterUpdate,
  cityMasterDelete,
  cityMasterGetData
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  cityMaster_getData: { url: getData },
  cityMaster_insertData: { url: insertData },
  cityMaster_updateData: { url: updateData },
  cityMaster_updateData: { url: deleteData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /cityMaster/getData Get Data from City Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /cityMaster/getData
 *
 * @apiGroup City Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of City Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {string} stateId Enter state's id to get state wise City
 * @apiParam (Request body) {Number} totalRecords Optional By Default 10 records are sent,If all records are required send 0.
 * @apiParam (Request body) {Number} startFrom Optional If user want to get data from specific id then this filed is used.
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "totalRecords": 0,
 *        "startFrom": 10,
 *        "stateId" : 12,
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        "cityList": [
 *              {
 *                 "cityId": 1,
 *                 "companyId": 1,
 *                 "stateId": 12,
 *                 "cityName": "Ahmedabad",
 *                 "isMetroCity": 1,
 *                 "createdBy": 4,
 *                 "createdDate": "2020-02-12 17:30:51",
 *                 "updatedBy": null,
 *                 "updatedDate": null,
 *                 "deletedBy": null,
 *                 "deletedDate": null,
 *                 "noOfChemist": 0
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
      const { totalRecords, startFrom, stateId } = req.body;
      const noOfGroupShow = await getNoOfGroupShow({ totalRecords, startFrom });

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: cityMasterGetData
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await cityGetData({
          stateId,
          noOfGroupShow
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              cityList: [...response]
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
 * @api {post} /cityMaster/insertData Insert Data into City Master
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /cityMaster/insertData
 *
 * @apiGroup City Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into City Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {Array}   stateId Required Enter state's id to add state wise city
 * @apiParam (Request body) {String}  cityName Required Enter city's name
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "stateId":12,
 *        "cityName": "Ahmedabad 1",
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {
 *          "insertId": 2,
 *          "affectedRows": 1
 *       },
 *      "message": "Record Inserted Successfully",
 *      "isSuccess": true,
 *      "statusCode": 200
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
 */
router.post(
  insertData,
  async function (req, res, next) {
    try {
      const bodyData = {
        ...req.body,
        cityId: 0
      };
      const result = await cityMasterRequestHandler({
        bodyData,
        validatorData: cityMasterAdd,
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
 * @api {post} /cityMaster/updateData Update Data of City Master
 * @apiName UpdateData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /cityMaster/updateData
 *
 * @apiGroup City Master
 *
 * @apiDescription This API is Used to update data in City Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - cityId and updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "updatedDate":"2020-01-16 14:32:54",
 *      "cityId": 2,
 *      "cityName" :"bb",
 *      "stateId":12
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
 * }
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
      const result = await cityMasterRequestHandler({
        bodyData: { ...req.body },
        validatorData: cityMasterUpdate,
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

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /1.0.0/cityMaster/deleteData Delete Data from City Master
 * @apiName DeleteData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /1.0.0/cityMaster/deleteData
 *
 * @apiGroup City Master
 *
 * @apiDescription This API is Used to delete data from City Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - cityId and updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *       "updatedDate":"2020-01-16 14:32:54",
 *       "cityId": 15
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Record Deleted Successfully",
 *      "isSuccess": true,
 *      "statusCode": 200,
 *      "data": {}
 *    }
 *
 * @apiErrorExample
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "statusCode": 500,
 *      "isSuccess": false,
 *      "data": {},
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Internal Server Error"
 *    }
 */
router.post(
  deleteData,
  async function (req, res, next) {
    try {
      const result = await cityMasterRequestHandler({
        bodyData: { ...req.body },
        validatorData: cityMasterDelete,
        operationType: 2
      });
      req.result = { ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

const cityMasterRequestHandler = async ({
  bodyData,
  validatorData,
  operationType
}) => {
  let result = {};
  const isValidDataType = await payLoadValidation({
    bodyData: bodyData,
    payLoad: validatorData
  });
  const { isValidate, validationList } = isValidDataType;

  if (isValidate) {
    const response = await citySaveData({
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
        result = { message: Message({ code: "DUPCITY" }), isSuccess: false };
      break;

    case 1:
      if (operationFlag === 0)
        result = { message: Message({ code: "REFRESH" }), isSuccess: false };
      else if (operationFlag === 1)
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      else if (operationFlag === 2)
        result = { message: Message({ code: "DUPCITY" }), isSuccess: false };
      break;
  }
  return result;
};
module.exports = router;
