const express = require("express");
const router = express.Router();

const { sendResponse, payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const {
  therapyType_getData: { url: getTherapy },
  therapyType_saveData: { url: saveTherapy },
  therapyType_deleteData: { url: deleteTherapy },
} = require("../../../routerConstant");
const { therapyTypeMaster } = require("../../../dataType.json");
const { handleError } = require("../../../error.js");
const { saveTherapyType, getTherapyType } = require("./therapyTypeRepository");

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /therapyType/getTherapyType Get Data from TherapyType Master
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /therapyType/getTherapyType
 *
 * @apiGroup TherapyType Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of TherapyType Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {Number}  filterStatus, filterStatus is for filter the data by the data is Active or Not. //For Active Record:1//For InActive Record:0//For All Record:isActive
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "filterStatus": 0,
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Data received successfully.",
 *      "data": {
 *         "therapyType": [
 *                  {
 *                   "therapyId": 1,
 *                   "typeName": "Morning Therapy",
 *                   "amount": 999,
 *                   "effectiveDate": "2022-08-27T11:41:00.000Z",
 *                   "default": 1,
 *                   "active": "Yes",
 *                   "isActive": true
 *                 },
 *          ]
 *      },
 *      "isSuccess": true,
 *      "statusCode": 200
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
  getTherapy,
  async function (req, res, next) {
    try {
      let result = {};
      const { filterStatus } = req.body;
      const response = await getTherapyType({ filterStatus });
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            therapyType: [...response.recordset],
          },
          isSuccess,
        };
      } else {
        result = {
          message: Message({}),
          isSuccess: false,
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
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /therapyType/insertData Insert Data into TherapyType Master
 * @apiName SaveData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /therapyType/saveTherapyType
 *
 * @apiGroup TherapyType Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into TherapyType Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {String}  therapyName Required Enter Type's name
 * @apiParam (Request body) {Boolean} isActive Therapy Status
 *
 * @apiParamExample {json} Input (body/json)
 *     {
 *      "typeName": "test",
 *      "isActive": true,
 *     }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *       "isValidate": true,
 *       "validationList": [],
 *       "data": {
 *           "insertId": 2,
 *           "affectedRows": 1
 *       },
 *       "message": "Record Inserted Successfully",
 *       "isSuccess": true,
 *       "statusCode": 200
 *     }
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

// Update Record

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /therapyType/saveTherapyType Update Data of TherapyType Master
 * @apiName UpdateData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /therapyType/saveTherapyType
 *
 * @apiGroup TherapyType Master
 *
 * @apiDescription This API is Used to update data in TherapyType Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - TherapyId and updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "updatedDate":"2022-07-22 10:44:00",
 *      "TherapyId": 5,
 *      "isActive" :true,
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
  saveTherapy,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body,
      };

      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: therapyTypeMaster,
      });
      const { isValidate, validationList } = isValidDataType;
      const operationType = bodyData.therapyId ? 1 : 0;
      if (isValidate) {
        const response = await saveTherapyType({
          data: JSON.stringify(bodyData),
          operationType,
        });

        if (response && response.isSuccess) {
          if (operationType === 0) {
            result = { message: Message({ code: "RINS" }), isSuccess: true };
          }
          else {
            result = { message: Message({ code: "DMAE" }), isSuccess: false };
          }
          if (operationType === 1) {
            result = { message: Message({ code: "RUPD" }), isSuccess: true };
          }
        } else {
          result = {
            message: Message({}),
            isSuccess: false,
          };
        }
      } else {
        result = {
          message: Message({ code: "INVALPAYLOAD" }),
          isSuccess: true,
          ...result,
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
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /therapyType/deleteData Delete Data of TherapyType Master
 * @apiName DeleteData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /therapyType/deleteData
 *
 * @apiGroup TherapyType Master
 *
 * @apiDescription This API is Used to delete data in TherapyType Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - TherapyId is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "TherapyId": 5
 *    }
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
  deleteTherapy,
  async function (req, res, next) {
    try {
      const result = await therapyTypeRequestHandler({
        bodyData: { ...req.body },
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

const therapyTypeRequestHandler = async ({
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
    const response = await saveTherapyType({
      data: JSON.stringify(bodyData),
      operationType
    });
    if (response && response.isSuccess) {
      if (operationType === 0) {
        result = { message: Message({ code: "RINS" }), isSuccess: true };
      } else {
        result = { message: Message({ code: "DMAE" }), isSuccess: false };
      }
      if (operationType === 1) {
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      }
      if (operationType === 2) {
        result = { message: Message({ code: "RDEL" }), isSuccess: true };
      }
    } else {
      result = {
        message: Message({}),
        isSuccess: false
      };
    }
  }
  else {
    result = {
      message: Message({ code: "INVALPAYLOAD" }),
      isSuccess: true,
      ...result
    };
  }
  result = { isValidate, validationList, ...result };
  return result;
};

module.exports = router;
