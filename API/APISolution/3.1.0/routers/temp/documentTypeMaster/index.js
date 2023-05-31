const express = require("express");
const router = express.Router();

const {
    getDocumentTypeData,
    saveDocumentTypeData,
    getActiveDocumentTypeData
  } = require("./documentTypeMasterRepository");
  const {
    payLoadValidation,
    sendResponse
  } = require("../../../utils");
  
  const { Message } = require("../../../Messages");

  const {
    documentType_getData: { url: getData },
    documentType_saveData: { url: saveData },
    documentType_updateData:{url: updateData},
    documentType_getDocumentData:{url: getDocumentData},
  } = require("../../../routerConstant");
  const { handleError } = require("../../../error.js");
  
  const {
    validateSaveDocumentTypeData,
    validateUpdateDocumentTypeData
  } = require("../../../dataType.json");
  

/**
 * @apiDefine ApiVersion
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /documentType/getData Get Data from documentType Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /documentType/getData
 *
 * @apiGroup Document Type Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of documentType Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "documentGroupId":null
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "You get data Successfully",
 *    "data": {
 *        "documentTypeList": [
 *            {
 *                "documentTypeId": 1,
 *                "documentType": "",
 *                "Description": "",
 *                "isActive": 1
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
    getData,
    async function (req, res, next) {
      try {
        let result = {};
        const { loggedInEmployeeId, documentGroupId = null } = req.body;
        const documentTypeData = await getDocumentTypeData({ documentGroupId });
  
        const { isSuccess } = documentTypeData;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
                documentTypeList: [...documentTypeData]
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
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /documentType/insertData Insert Data into documentType Master
 * @apiName InsertData
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /documentType/insertData
 *
 * @apiGroup Document Type Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Division Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParamExample {json} Input (body/json)
 *     {
 *      "documentType":"", 
 *      "description":"", 
 *      "isActive:0
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
    saveData,
    async function (req, res, next) {
      try {
        const { loggedInEmployeeId, documentTypeId = null, documentType, documentCode, description="", isActive, documentGroupId = null } = req.body;

        const isValidDataType = await payLoadValidation({
            bodyData: req.body,
            payLoad: validateSaveDocumentTypeData
        });
        let result = {};
        const { isValidate, validationList } = isValidDataType;
        if (isValidate){
            const response = await saveDocumentTypeData({
                loggedInEmployeeId, documentTypeId, documentType, documentCode, description, isActive, documentGroupId
            });
            const { isSuccess , isDuplicate = false } = response;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "RINS" }),
                    data: response,
                    isSuccess
                };
            } else {
              if(isDuplicate){
                result = {
                  message: Message({code:"DUPDOCUMENTTYPE"}),
                  isSuccess: false
                };  
              }
              else{
                result = {
                    message: Message({}),
                    isSuccess: false
                };
              }
            }            
        }else{
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
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /documentType/updateData update Data into documentType Master
 * @apiName UpdateData
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /documentType/updateData
 *
 * @apiGroup Document Type Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to update Data into Division Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParamExample {json} Input (body/json)
 *     {
 *      "documentTypeId":1,
 *      "description":"", 
 *      "isActive:0
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
 *       "message": "Record Updated Successfully",
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
    updateData,
    async function (req, res, next) {
      try {
        const { loggedInEmployeeId, documentTypeId, documentType,description, isActive,documentGroupId } = req.body;

        const isValidDataType = await payLoadValidation({
            bodyData: req.body,
            payLoad: validateUpdateDocumentTypeData
        });
    
        const { isValidate, validationList } = isValidDataType;
        if (isValidate){
            const response = await saveDocumentTypeData({
                loggedInEmployeeId, documentTypeId, documentType,description, isActive,documentGroupId
            });
            const { isSuccess, isDuplicate = false  } = response;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "RUPD" }),
                    data: response,
                    isSuccess
                };
            } else {
              if(isDuplicate){
                result = {
                  message: Message({code:"DUPDOCUMENTTYPE"}),
                  isSuccess: false
                };  
              }
              else{
                result = {
                    message: Message({}),
                    isSuccess: false
                };
              }
            }            
        }else{
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

  router.post(
    getDocumentData,
    async function (req, res, next) {
      try {
        let result = {};
        const { loggedInEmployeeId, documentGroupId = null } = req.body;
        const documentTypeData = await getActiveDocumentTypeData({ documentGroupId });
  
        const { isSuccess } = documentTypeData;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
                documentTypeList: [...documentTypeData]
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

module.exports = router;