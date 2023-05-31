const express = require("express");
const router = express.Router();

const { areaGetData, areaSaveData } = require("./areaMasterRepository");
const {
  payLoadValidation,
  sendResponse,
  getNoOfGroupShow
} = require("../../../utils");
const {
  areaMasterAdd,
  areaMasterUpdate,
  areaMasterDelete,
  areaMasterGetData
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  areaMaster_getData: { url: getData },
  areaMaster_insertData: { url: insertData },
  areaMaster_updateData: { url: updateData },
  areaMaster_updateData: { url: deleteData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /areaMaster/getData Get Data from Area Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /areaMaster/getData
 *
 * @apiGroup Area Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Area Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {string} cityId Enter city's id to get city wise area
 * @apiParam (Request body) {Number} totalRecords Optional By Default 10 records are sent,If all records are required send 0.
 * @apiParam (Request body) {Number} startFrom Optional If user want to get data from specific id then this filed is used.
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "totalRecords": 0,
 *        "startFrom": 10,
 *        "cityId" : 12,
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *      "areaList": [
 *        {
 *          "areaId": 1,
 *          "companyId": 1,
 *          "areaName": "Ahmedabad 1",
 *          "cityId": 1,
 *          "createdBy": 4,
 *          "createdDate": "2020-02-13 20:26:49",
 *          "updatedBy": null,
 *          "updatedDate": null,
 *          "deletedBy": null,
 *          "deletedDate": null
 *        }
 *        ]
 *        },
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
      const { totalRecords, startFrom, cityId } = req.body;
      const noOfGroupShow = await getNoOfGroupShow({ totalRecords, startFrom });

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: areaMasterGetData
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await areaGetData({
          cityId,
          noOfGroupShow
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              areaList: [...response]
            },
            isSuccess
          };
        } else {
          result = {
            isSuccess: false,
            message: Message({})
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
 * @api {post} /areaMaster/insertData Insert Data into Area Master
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /areaMaster/insertData
 *
 * @apiGroup Area Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Area Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {Array}   cityId Required Enter city's id to add city wise area
 * @apiParam (Request body) {String}  areaName Required Enter area's name
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "cityId":1,
 *        "areaName": "Ahmedabad 1",
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
        areaId: 0
      };
      const result = await areaMasterRequestHandler({
        bodyData,
        validatorData: areaMasterAdd,
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
 * @api {post} /areaMaster/updateData Update Data of Area Master
 * @apiName UpdateData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /areaMaster/updateData
 *
 * @apiGroup Area Master
 *
 * @apiDescription This API is Used to update data in Area Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - areaId and updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "updatedDate":"2020-01-16 14:32:54",
 *      "areaId": 2,
 *      "areaName" :"bb",
 *      "cityId":2
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
      const result = await areaMasterRequestHandler({
        bodyData: { ...req.body },
        validatorData: areaMasterUpdate,
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
 * @api {post} /areaMaster/deleteData Delete Data from Area Master
 * @apiName DeleteData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /areaMaster/deleteData
 *
 * @apiGroup Area Master
 *
 * @apiDescription This API is Used to delete data from Area Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - areaId and updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *       "updatedDate":"2020-01-16 14:32:54",
 *       "areaId": 15
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
      const result = await areaMasterRequestHandler({
        bodyData: { ...req.body },
        validatorData: areaMasterDelete,
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

const areaMasterRequestHandler = async ({
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
    const response = await areaSaveData({
      data: JSON.stringify(bodyData),
      operationType
    });
    if (response[3] && response[3][0]["@op_IsSuccess"] === 1) {
      const messageResult = await getResponse({
        operationType,
        operationFlag: response[3][0]["@op_Flag"]
      });
      result = { isSuccess: true, ...messageResult };
    } else {
      result = {
        message: Message({}),
        isSuccess: false
      };
    }
  } else {
    result = {
      message: Message({ code: "INVALPAYLOAD" }),
      isSuccess: false,
      ...result
    };
  }
  result = { isValidate, validationList, ...result };
  return result;
};

const getResponse = async ({ operationType, operationFlag }) => {
  switch (operationType) {
    case 0:
      if (operationFlag === 1)
        result = { message: Message({ code: "RINS" }), isSuccess: true };
      else if (operationFlag === 2)
        result = { message: Message({ code: "DUPAREA" }), isSuccess: false };
      break;
    case 1:
      if (operationFlag === 0)
        result = { message: Message({ code: "REFRESH" }), isSuccess: false };
      else if (operationFlag === 1)
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      else if (operationFlag === 2)
        result = { message: Message({ code: "DUPAREA" }), isSuccess: false };
      break;
    case 2:
      if (operationFlag === 1)
        result = { message: Message({ code: "RDEL" }), isSuccess: true };
      else
        result = { message: Message({ code: "NOCHANGE" }), isSuccess: false };
  }
  return result;
};
module.exports = router;
