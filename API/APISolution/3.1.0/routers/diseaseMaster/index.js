const express = require("express");
const router = express.Router();

const { getDiseaseMaster, saveDiseaseMaster } = require("./DiseaseMasterRepository");
const { sendResponse, payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const {
diseaseMaster_getDiseaseMaster: { url: getDisease },
diseaseMaster_saveDiseaseMaster : { url: saveDisease },
diseaseMaster_deleteDiseaseMaster : { url: deleteDisease},
} = require("../../../routerConstant");
const { diseaseMasterSave } = require("../../../dataType.json");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /diseaseMaster/getDiseaseMaster Get Data from Disease Master
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /diseaseMaster/getDiseaseMaster
 *
 * @apiGroup Disease Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Disease Master
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
 *      {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "You get data Successfully",
 *    "data": {
 *        "diseaseList": [
 *            {
 *                "DiseaseId": 1,
 *                "DiseaseName": "Covid-19",
 *                "Description": "Disease Description"
 *                "isActive": 1,
 *                "createdBy": 1,
 *                "createdDate": "2022-07-20 17:37:00",
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
  getDisease,
  async function (req, res, next) {
    try {
      let result = {};
      const { filterStatus } = req.body;
      const response = await getDiseaseMaster({ filterStatus });
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            diseaseMasterList: [...response.recordset],
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
 * @api {post} /diseaseMaster/insertData Insert Data into Disease Master
 * @apiName SaveData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /diseaseMaster/saveDiseaseMaster
 *
 * @apiGroup Disease Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Disease Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {String}  diseaseName Required Enter Disease's name
 * @apiParam (Request body) {Boolean} isActive Disease Status
 *
 * @apiParamExample {json} Input (body/json)
 *     {
 *      "diseaseName": "test",
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
 * @api {post} /diseaseMaster/saveDiseaseMaster Update Data of Disease Master
 * @apiName UpdateData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /diseaseMaster/saveDiseaseMaster
 *
 * @apiGroup Disease Master
 *
 * @apiDescription This API is Used to update data in Disease Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - DiseaseId and updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "updatedDate":"2022-07-22 10:44:00",
 *      "DiseaseId": 5,
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
  saveDisease,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body,
      };

      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: diseaseMasterSave,
      });
      const { isValidate, validationList } = isValidDataType;
      const operationType = bodyData.diseaseId ? 1 : 0;
      if (isValidate) {
        const response = await saveDiseaseMaster({
          data: JSON.stringify(bodyData),
          operationType,
        });

        if (response && response.isSuccess ) {
          if (operationType === 0 ){
            result = { message: Message({ code: "RINS" }), isSuccess: true };
          } 
          else{
            result = { message: Message({ code: "DMAE" }), isSuccess: false };
          }
          if (operationType === 1) {
            result = { message: Message({ code: "RUPD" }), isSuccess: true };
          }
        } else {
          result = {
            message: Message({ }),
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
 * @api {post} /diseaseMaster/deleteData Delete Data of Disease Master
 * @apiName DeleteData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /diseaseMaster/deleteData
 *
 * @apiGroup Disease Master
 *
 * @apiDescription This API is Used to delete data in Disease Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - DiseaseId is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "DiseaseId": 5
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
  deleteDisease,
  async function (req, res, next) {
    try {
      const result = await deleteMasterRequestHandler({
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

const deleteMasterRequestHandler = async ({
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
    const response = await saveDiseaseMaster({
      data: JSON.stringify(bodyData),
      operationType
    });
    if (response && response.isSuccess) {
      if (operationType === 0 ) {
        result = { message: Message({ code: "RINS" }), isSuccess: true };
      }else{
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
