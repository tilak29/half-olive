const express = require("express");
const router = express.Router();

const {
  stockistEmployeeGetData,
  stockistAssignedEmployeeGetData,
  stockistEmployeeSaveData
} = require("./stockistEmployeeMasterRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
  stockistEmployeeMasterAdd,
  stockistEmployeeMasterGet,
  validateStockistEmployeeMasterGet
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  stockistEmployeeMaster_getData: { url: getData },
  stockistEmployeeMaster_insertData: { url: insertData },
  stockistEmployeeMaster_getAssignedStockist: {url: getAssignedStockist}
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /stockistEmployeeMaster/getData Get Data from Stockist Employee Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /stockistEmployeeMaster/getData
 *
 * @apiGroup Stockist Employee Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of assigned Stockist of Employee Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - employeeId and stateId are required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "employeeId" : 2,
 *        "stateId" : 12
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
 *               "stockistId": 1,
 *               "stockistName": "Khushbu",
 *               "isSelected": 0
 *           }
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
      const { employeeId, stateId, loggedInEmployeeId } = req.body;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: stockistEmployeeMasterGet
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await stockistEmployeeGetData({
          employeeId,
          stateId,
          loggedInEmployeeId
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              stockistList: [...response[0]]
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
 * @apiVersion 3.0.0
 */
/**
* @api {post} /stockistEmployeeMaster/getAssignedStockist Get Data from Stockist Employee Master
* @apiName GetData
* @apiVersion 1.0.0
* @apiUse ApiVersion
* @apiSampleRequest /stockistEmployeeMaster/getAssignedStockist
*
* @apiGroup Stockist Employee Master
*
* @apiBody JSON(application/json)
*
* @apiDescription This API is Used to Get Data of assigned Stockist of Employee Master
*
* @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
* @apiHeader (Request headers) {String} accept-version 1.0.0
*
* @apiParam (Request body) {JSON} Input JSON Object - employeeId and stateId are required
*
* @apiParamExample {json} Input (body/json)
*      {
*        "employeeId" : 2,
*        "stateId" : 12,
*        "cityId" : 1,
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
*               "value": 1,
*               "label": "Khushbu"
*           }
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
  getAssignedStockist,
 async function (req, res, next) {
   try {
     let result = {};
     const { loggedInEmployeeId, stateId, cityId } = req.body;

     const isValidDataType = await payLoadValidation({
       bodyData: req.body,
       payLoad: validateStockistEmployeeMasterGet
     });

     const { isValidate, validationList } = isValidDataType;
     if (isValidate) {
       const response = await stockistAssignedEmployeeGetData({
         loggedInEmployeeId,
         stateId,
         cityId
       });
       const { isSuccess } = response;
       delete response.isSuccess;
       if (isSuccess === true) {
         let stockistData = response[0];
         let listData = [];
         for (let item of stockistData) {
          let objStockistData = {
            value: item.StockistId,
            label: item.StockistName,
          };
          listData.push(objStockistData);
         }
         result = {
           message: Message({ code: "Success" }),
           data: {
             stockistList:listData
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
 * @api {post} /stockistEmployeeMaster/insertData Insert Data of Stockist to Employee
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /stockistEmployeeMaster/insertData
 *
 * @apiGroup Stockist Employee Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data of Stockist to Employee
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - stockistJsonArray as array and employeeId are required field
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *          "employeeId":3,
 *          "stockistJsonArray":[2]
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
 *        "message": "Record Saved Successfully",
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
      const result = await stockistEmployeeMasterRequestHandler({
        bodyData: { ...req.body },
        validatorData: stockistEmployeeMasterAdd
      });

      req.result = { ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

const stockistEmployeeMasterRequestHandler = async ({
  bodyData,
  validatorData
}) => {
  let result = {};
  const isValidDataType = await payLoadValidation({
    bodyData,
    payLoad: validatorData
  });
  const { isValidate, validationList } = isValidDataType;

  if (isValidate) {
    const { stockistJsonArray, loggedInEmployeeId, employeeId } = bodyData;
    const response = await stockistEmployeeSaveData({
      stockistJsonArray,
      loggedInEmployeeId,
      employeeId
    });
    if (response[3] && response[3][0]["@op_IsSuccess"] === 1) {
      const messageResult = await getResponse({
        operationType: 0,
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
        result = { message: Message({ code: "RSAVE" }), isSuccess: true };
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
      break;
  }
  return result;
};
module.exports = router;
