const express = require("express");
const router = express.Router();
const {
  getDiet,
  getTreatment,
  saveTemplete,
  getDiseaseList,
  gettempleteDiseaseCategories,
  deletetemplete,
  updatetemplete,
  getTreatmentdetail

} = require("./treatmentTempleteRepository");
const { sendResponse,payLoadValidation } = require("../../../utils");
const {
  templeteSave
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
    treatment_getdietname: { url: getDietName },
    treatment_getTreatment: { url: getTreatmentName }, 
    treatment_inserttreatmentdata: { url: inserttreatmentdata }, 
    treatment_getdiseaselist: { url: getDisease }, 
    treatment_gettempletediseaselist: { url: gettempletediseaseCategoriesApi}, 
    treatment_deletetemplete: { url: templetelistdelete},
    treatment_updatetemplete: { url: templetelistupdate},
    treatment_getTreatmentdetail : { url: getTreatmentNamedetail  }, 
    
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");


/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /treatementtempletemaster/getdietname Get Data from show Diet List 
 * @apiName getDietName
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatementtempletemaster/getdietname
 *
 * @apiGroup dietMaster Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of dietMaster Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {Number}  TreatmentId use TreatmentId.
 *
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *         "TreatmentId":1
 *        }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *   {
 *       "isValidate": true,
 *       "validationList": [],
 *       "message": "Data received successfully.",
 *       "data": {
 *         "dietNameList": [
 *           {
 *             "label": "Juice Diet",
 *             "diseaseId": [
 *               1,
 *               1
 *             ],
 *             "value": 151
 *           }
 *         ]
 *       },
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
    getDietName,
    async function (req, res, next) {
      try {
        let result = {};
        const {TreatmentId} = req.body;
        
        const response = await getDiet({TreatmentId});
      
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              dietNameList: [...response.recordset],
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
 * @api {post} /treatementtempletemaster/getTreatment Get Data from show treatment List 
 * @apiName getTreatmentName
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatementtempletemaster/getTreatmentName
 *
 * @apiGroup getTreatment Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Treatment Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {Number}  TreatmentId use TreatmentId.
 *
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *         "TreatmentTempleteId":1
 *        }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "Data received successfully.",
 *         "data": {
 *           "treatmentNameList": [
 *             {
 *               "label": "exercise",
 *               "value": 91
 *             },
 *             {
 *               "label": "sirodhara",
 *               "value": 82
 *             },
 *             {
 *               "label": "yoga",
 *               "value": 84
 *             }
 *           ]
 *         },
 *         "isSuccess": true,
 *         "statusCode": 200
 *       }
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
    getTreatmentName,
    async function (req, res, next) {
      try {
        let result = {};
        const {TreatmentId} = req.body;
        const response = await getTreatment({TreatmentId});
    
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              treatmentNameList: [...response.recordset],
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
 * @api {post} /treatementtempletemaster/getdiseaselist Get Data from Disease Master
 * @apiName getDisease
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatementtempletemaster/getdiseaselist
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
 * @apiParam (Request body) {Number}  filterCategory use the disease id.
 * @apiParam (Request body) {Number}  filterStatus send active 1 or 0.
 *
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *         "filterCategory":12,
 *        "filterStatus":1
 *        }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *           {
 *             "isValidate": true,
 *             "validationList": [],
 *             "message": "Data received successfully.",
 *             "data": {
 *               "diseaseMasterList": [
 *                 {
 *                   "treatmentTempleteId": 10,
 *                   "templateName": "Low Diabetes Crab",
 *                   "description": "For Low Diabetes Crab",
 *                   "active": "YES",
 *                   "isActive": true,
 *                   "dietId": "[11,151,1]",
 *                   "treatmentId": "[90,82,81]",
 *                   "diseaseId": "[12]"
 *                 }
 *               ]
 *             },
 *             "isSuccess": true,
 *             "statusCode": 200
 *           }
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
        const { filterCategory, filterStatus} = req.body;
  
        const response = await getDiseaseList({filterCategory,filterStatus});
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {        
          result = {
            message: Message({ code: "Success" }),
            data: {
              diseaseMasterList: [...response.recordset]
            },
            isSuccess
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





  
  router.post(
    getTreatmentNamedetail,
    async function (req, res, next) {
      
      try {
        let result = {};
        const {} = req.body;
      
        const response = await getTreatmentdetail();
    
        const { isSuccess } = response;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              TreatmentdetailList: [...response.recordset],
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
 * @api {post} treatementtempletemaster/gettempletediseaselist Get Data from Disease Master
 * @apiName gettempletediseaseCategoriesApi
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest treatementtempletemaster/gettempletediseaselist 
 *
 * @apiGroup Disease Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Disease Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0

 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *         {
 *           "isValidate": true,
 *           "validationList": [],
 *           "message": "Data received successfully.",
 *           "data": {
 *             "diseaseCategoryList": [
 *               {
 *                 "value": 12,
 *                 "label": "Back Pain"
 *               }
 *             ]
 *           },
 *           "isSuccess": true,
 *           "statusCode": 200
 *         }
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
    gettempletediseaseCategoriesApi,
    async function (req, res, next) {
      
      try {
        let result = {};
        const {} = req.body;
      
        const response = await gettempleteDiseaseCategories();
    
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              diseaseCategoryList: [...response.recordset],
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
 * @api {post} /treatementtempletemaster/inserttreatmentdata Insert Data into TreatmentTemplete Master
 * @apiName inserttreatmentdata
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatementtempletemaster/inserttreatmentdata
 *
 * @apiGroup TreatmentTemplete Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into TreatmentTemplete Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {String}  Treatment Name is Required
 * @apiParam (Request body) {int}  Diseases Selection is Required
 * @apiParam (Request body) {int}  Treatment Selection is Required
 * @apiParam (Request body) {int}  Diet Selection is Required
 * 
 *
 * @apiParamExample {json} Input (body/json)
 *        {
 *           "description": "add",
 *           "isActive": 1,
 *           "templateName": "Low Crab New",
 *           "diseaseId": 12 ,
 *           "treatmentId":  81 ,
 *           "dietId":  1 
 *         }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *       {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "Record inserted successfully.",
 *         "isSuccess": true,
 *         "statusCode": 200,
 *         "data": {}
 *       }
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
    inserttreatmentdata,
    async function (req, res, next) {
      try {
        var result = {};
        const bodyData = {
          ...req.body
        };
        const isValidDataType = await payLoadValidation({
          bodyData: bodyData,
          payLoad: templeteSave
        });
  
        const { isValidate, validationList } = isValidDataType;
  
        if (isValidate) {
  
          const response = await saveTemplete({
            data: JSON.stringify(bodyData)
          });
  
          if (response && response.isSuccess) {
            if (response.recordset[0].Count == 1) {
              result = { message: Message({ code: "DUPTREATMENTTEMPLETE" }), isSuccess: false };
            } else {
              result = { message: Message({ code: "RINS" }), isSuccess: true };
            }
  
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
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /treatementtempletemaster/updatetemplete Update Data of TreatmentTemplete Master
 * @apiName templetelistupdate
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatementtempletemaster/updatetemplete
 *
 * @apiGroup TreatmentTemplete Master
 *
 * @apiDescription This API is Used to update data in TreatmentTemplete Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 
 * @apiParamExample {json} Input (body/json)
 *          {
 *             "description": "add",
 *             "isActive": 1,
 *             "templateName": "Low Crab New",
 *             "diseaseId": 12 ,
 *             "treatmentId":  81 ,
 *             "dietId":  1 
 *           }
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
    templetelistupdate,
    async function (req, res, next) {
      try {
        let result = {};
        const bodyData = {
          ...req.body
        };
        const isValidDataType = await payLoadValidation({
          bodyData: bodyData,
          payLoad: templeteSave
        });
        const { isValidate, validationList } = isValidDataType;
        if (isValidate) {
          const response = await updatetemplete({
            data: JSON.stringify(bodyData)
          });
          if (response && response.isSuccess) {
            result = { message: Message({ code: "RUPD" }), isSuccess: true };
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
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /treatementtempletemaster/deletetemplete Delete Data of TreatmentTemplete Master
 * @apiName templetelistdelete
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatementtempletemaster/deletetemplete
 *
 * @apiGroup Treatment Master
 *
 * @apiDescription This API is Used to delete data in TreatmentTemplete Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - TreatmentTempleteId is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "TreatmentTempleteId": 11
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
    templetelistdelete,
    async function (req, res, next) {
      try {
        let result = {};
        const bodyData = {
          ...req.body
        };
        const data = {
          TreatmentTempleteId: bodyData.treatmentTempleteId,
          loggedInEmployeeId: bodyData.loggedInUserId
        }
  
        const isValidDataType = await payLoadValidation({
          bodyData: data,
        });
        const { isValidate, validationList } = isValidDataType;
        if (isValidate) {
          const response = await deletetemplete({
            data
          });
  
          if (response && response.isSuccess) {
            result = { message: Message({ code: "RDEL" }), isSuccess: true };
  
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

module.exports = router;