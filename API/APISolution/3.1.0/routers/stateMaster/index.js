const express = require("express");
const router = express.Router();

const { stateGetData, stateSaveData } = require("./stateMasterRepository");
const {
  payLoadValidation,
  sendResponse,
  getNoOfGroupShow
} = require("../../../utils");
const {
  stateMasterAdd,
  stateMasterUpdate,
  stateMasterGetData
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  stateMaster_getData: { url: getData },
  stateMaster_insertData: { url: insertData },
  stateMaster_updateData: { url: updateData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /stateMaster/getData Get Data from State Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /stateMaster/getData
 *
 * @apiGroup State Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of State Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {string} countryId Enter country's id to get country wise State
 * @apiParam (Request body) {Number} totalRecords Optional By Default 10 records are sent,If all records are required send 0.
 * @apiParam (Request body) {Number} startFrom Optional If user want to get data from specific id then this filed is used.
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "totalRecords": 0,
 *        "startFrom": 10,
 *        "countryId" : 1,
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "statusCode": 200,
 *      "isSuccess": true,
 *      "data": {
 *          "stateList":[
 *                  {
 *                    "stateId": 1,
 *                    "companyId": 1,
 *                    "countryId": 1,
 *                    "stateName": "ANDAMAN NICOBAR",
 *                    "createdBy": 4,
 *                    "createdDate": "2020-02-04 00:00:00",
 *                    "updatedBy": null,
 *                    "updatedDate": null,
 *                    "deletedBy": null,
 *                    "deletedDate": null
 *                  }
 *                 ],
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
      const { totalRecords, startFrom, countryId } = req.body;
      const noOfGroupShow = await getNoOfGroupShow({ totalRecords, startFrom });

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: stateMasterGetData
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await stateGetData({
          countryId,
          noOfGroupShow
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              stateList: [...response]
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
 * @api {post} /stateMaster/insertData Insert Data into State Master
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /stateMaster/insertData
 *
 * @apiGroup State Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into State Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {Array}   countryId Required Enter country's id to add country wise state
 * @apiParam (Request body) {String}  stateName Required Enter State's name
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "countryId":2,
 *        "stateName": "Gujarat Test",
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {
 *          "insertId": 39,
 *          "affectedRows": 1
 *      },
 *    "message": "Record Inserted Successfully",
 *    "isSuccess": true,
 *    "statusCode": 200
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
        stateId: 0
      };

      const result = await stateMasterRequestHandler({
        bodyData,
        validatorData: stateMasterAdd,
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
 * @api {post} /stateMaster/updateData Update Data of State Master
 * @apiName UpdateData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /stateMaster/updateData
 *
 * @apiGroup State Master
 *
 * @apiDescription This API is Used to update data in State Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - stateId and updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "updatedDate":"2020-01-16 14:32:54",
 *      "stateId": 39,
 *      "stateName" :"bb",
 *      "countryId":1
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {},
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Record Updated Successfully"
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
      const result = await stateMasterRequestHandler({
        bodyData: { ...req.body },
        validatorData: stateMasterUpdate,
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

const stateMasterRequestHandler = async ({
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
    const response = await stateSaveData({
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
        result = { message: Message({ code: "DUPSTATE" }), isSuccess: false };
      break;
    case 1:
      if (operationFlag === 0)
        result = { message: Message({ code: "REFRESH" }), isSuccess: false };
      else if (operationFlag === 1)
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      else if (operationFlag === 2)
        result = { message: Message({ code: "DUPSTATE" }), isSuccess: false };
      break;
    case 2:
      if (operationFlag === 1)
        result = { message: Message({ code: "RDEL" }), isSuccess: true };
      else
        result = { message: Message({ code: "NOCHANGE" }), isSuccess: false };
      break;
  }
  return result;
};
module.exports = router;
