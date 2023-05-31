const express = require("express");
const router = express.Router();

const { getDiseaseMaster, saveDiseaseMaster } = require("./DiseaseMasterRepository");
const { sendResponse, payLoadValidation } = require("../../../utils");
const { Message } = require("../../../Messages");
const {
  publicAPIRouterConstant: { diseaseMaster_getDiseaseMaster_public: getDisease },
  publicAPIRouterConstant: { treatment_updateData_public: updateDisease },
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
 */
router.post(
  getDisease.url,
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
 * @api {post} /treatment/insertDisease Insert Data into Health History
 * @apiName SaveData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatment/insertDisease
 *
 * @apiGroup Disease Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Health History
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {String}  diseaseId Required 
 * @apiParam (Request body) {Boolean} isActive DiseaseId
 *
 * @apiParamExample {json} Input (body/json)
 *     {
 *      "diseaseId": "1,9,12",
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


 router.post(
  updateDisease.url,
  async function (req, res, next) {
    try {
      const result = await diseaseRequestHandler({
        bodyData: {
          ...req.body
        },

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


const diseaseRequestHandler = async ({
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
    const response = await saveDiseaseList({
      data: JSON.stringify(bodyData),
      operationType
    });
    if (response && response.isSuccess) {
      if (operationType === 0 ) {
        result = { message: Message({ code: "RINS" }), isSuccess: true };
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
