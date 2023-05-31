const express = require("express");
const router = express.Router();

const {  saveDiseaseList , getHealthDisease } = require("./healthHistoryDiseaseRepository");
const { sendResponse,payLoadValidation } = require("../../../utils");
const {
  healthHistory
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  treatment_getData : { url: getDiseaseData },
  treatment_updateData: { url: updateDisease },
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /treatment/getDisease Get Data from Health History
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatment/getDisease
 *
 * @apiGroup Health History
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Health History
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {Number}  filterStatus, filterStatus is for filter the data by the data is Active or Not. //For Active Record:1//For InActive Record:0//For All Record:isActive
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "comments" : "This is Disease"
 *        "diseaseId": "13,14,25",
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
 *                "comments": "This is Comments",
 *               "diseaseId": "13,14,25",
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
  getDiseaseData,
  async function (req, res, next) {
    try {
      let result = {};
      const { guestId } = req.body;
      const response = await getHealthDisease({ guestId });

      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            diseaseList: [...response.recordset]
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
  updateDisease,
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
        if (response.recordset[0].Count == 1) {
          result = { message: Message({ code: "RINS" }), isSuccess: true };
        }
        else
        {
          result = { message: Message({ code: "RUPD" }), isSuccess: true };  
        }
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
  