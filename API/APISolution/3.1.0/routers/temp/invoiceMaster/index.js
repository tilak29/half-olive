const express = require("express");
const router = express.Router();

const {
  invoiceGetData,
  invoiceSaveData,
  invoiceGetDataForMobile,
  invoiceGetDetailData,
  invoiceCheckDuplicate,
  invoiceGetMasterData,
  returnInvoiceUpdateData,
  invoiceGetByEmployeeAndDate,
  invoiceGetItemData
} = require("./invoiceMasterRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
  invoiceMasterGet,
  invoiceMasterGetForMobile,
  invoiceMasterGetDetail,
  invoiceMasterAdd,
  invoiceMasterUpdate,
  invoiceMasterUpdateStatus,
  invoiceMasterCheckDuplicate,
  invoiceMasterGetMasterData,
  returnInvoiceUpdate,
  returnInvoiceUpdateStatus,
  invoiceMasterGetItemData
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  invoiceMaster_getData: { url: getData },
  invoiceMaster_getDataForMobile: { url: getDataForMobile },
  invoiceMaster_getDetailData: { url: getDetailData },
  invoiceMaster_insertData: { url: insertData },
  invoiceMaster_updateData: { url: updateData },
  invoiceMaster_updateStatusData: { url: updateStatusData },
  invoiceMaster_checkDuplicate: { url: checkDuplicate },
  invoiceMaster_getMasterData: { url: getMasterData },
  invoiceMaster_updateReturnData: { url: updateReturnData },
  invoiceMaster_updateReturnStatusData: { url: updateReturnStatusData },
  invoiceMaster_getInvoiceChemistByEmployee: { url: getInvoiceChemistByEmployee },
  invoiceMaster_getInvoiceItemData: { url: getInvoiceItemData },
} = require("../../../routerConstant");
const {
  imageFolderName: { invoiceFolderName }
} = require("../../../config.json");
const { imageUpload } = require("../../../uploadImageToServer");
const { handleError } = require("../../../error.js");
const sendBulkSMS = require("../../../bulkSMS");
const {
firebaseNotification
} = require("../firebaseNotification/firebaseNotification");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /invoiceMaster/getData Get invoice data
 * @apiName Get Data
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /invoiceMaster/getData
 *
 * @apiGroup Invoice Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Invoice by status
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input statusId,stateId,cityId are required.
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "statusId":85,
 *      "stateId":12,
 *      "cityId":1
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *      "invoiceList": [
 *         {
 *          "invoiceId": 1,
 *          "chemistId": 1,
 *          "chemistName": "Parth Suthar",
 *          "stockistId": 2,
 *          "stockistName": "Stockist Name 1",
 *          "invoiceNumber": "123456",
 *          "invoiceDate": "2020-06-19",
 *          "noOfItems": 2,
 *          "purchasePoints": 1000,
 *          "boxPoints": 2.5,
 *          "statusText": "Pending",
 *          "status": 85,
 *          "fileName": "https://file-upload-pharma.s3.ap-south-1.amazonaws.com/invoice/File.jpg",
 *          "verfiedBy": null,
 *          "approvedBy": null,
 *          "remarks": "test",
 *          "invoiceItems": "[{\"qty\": 10, \"pack\": 10, \"brand\": \"Acifresh syrup\", \"itemId\": 1}, {\"qty\": 20, \"pack\": 10, \"brand\": \"Item 2\", \"itemId\": 2}]",
 *          "orderByColumn": 1
 *          }
 *        ]
 *      },
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
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: invoiceMasterGet
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const { statusId, stateId, cityId, month, year, loggedInEmployeeId, loggedInAppIndication } = req.body;
        const response = await invoiceGetData({
          statusId,
          stateId,
          cityId,
          month,
          year,
          loggedInEmployeeId,
          loggedInAppIndication
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              invoiceList: response[0]
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
 * @api {post} /invoiceMaster/getDataForMobile Get invoice data For Mobile
 * @apiName Get Data For Mobile
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /invoiceMaster/getDataForMobile
 *
 * @apiGroup Invoice Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Invoice For Mobile
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *      "invoiceList": [
 *         {
 *          "invoiceId": 1,
 *          "stockistName": "Stockist Name 1",
 *          "invoiceNumber": "123456",
 *          "invoiceDate": "2020-06-19",
 *          "grandTotal": null,
 *          "statusText": "Pending",
 *          "fileName": "https://file-upload-pharma.s3.ap-south-1.amazonaws.com/invoice/File.jpg",
 *          "remarks": "test"
 *          }
 *        ]
 *      },
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
  getDataForMobile,
  async function (req, res, next) {
    try {
      let result = {};
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: invoiceMasterGetForMobile
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const { loggedInEmployeeId, chemistMobileNumber = null } = req.body;
        const response = await invoiceGetDataForMobile({
          loggedInEmployeeId,
          chemistMobileNumber
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              invoiceList: response[0]
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
 * @api {post} /invoiceMaster/getDetailData Get Detail invoice data
 * @apiName Get Detail Invoice Data
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /invoiceMaster/getDetailData
 *
 * @apiGroup Invoice Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Invoice Detail By Invoice Id
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiParam (Request body) {json} Input - invoiceId is required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *      "invoiceId":1
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *      "invoiceDetailList": [
 *         {
 *          "itemId": 1,
 *          "brand": "Acifresh syrup",
 *          "pack": 10,
 *          "rate": 1.11,
 *          "ptr": 1,
 *          "qty": 10,
 *          "totalAmount": 500,
 *          "looseQty": 10,
 *          "boxQty": 1
 *          }
 *        ]
 *      },
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
  getDetailData,
  async function (req, res, next) {
    try {
      let result = {};
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: invoiceMasterGetDetail
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const { invoiceId, loggedInEmployeeId } = req.body;
        const response = await invoiceGetDetailData({
          invoiceId,
          loggedInEmployeeId
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              invoiceDetailList: response[0]
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
 * @api {post} /invoiceMaster/insertData Insert Data into Invoice Master
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /invoiceMaster/insertData
 *
 * @apiGroup Invoice Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Invoice Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiParam (Request body) {json} Input - invoiceMasterJson as array with chemistId,status and remarks is and image having base64 data are required
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *      "invoiceMasterJson":[{
 *        "fileName": null,
 *        "status": null,
 *        "remarks":null,
 *        "stockistId":1
 *        }],
 *      "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/4RHaRXhpZgAASUkqAAgAAAAQAAABAwABAAAAwiAAAAEBAwABAAAAtQgAAAIBAwADAAAAzgAAAAMBAwABAAAABQAAAAYBAwABAAAAAgAAAA8BA"
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
      const { invoiceMasterJson, loggedInEmployeeId } = req.body;
      if(invoiceMasterJson[0].isReturnInvoice == null || invoiceMasterJson[0].isReturnInvoice === 0)
      {
        invoiceMasterJson[0].chemistId = loggedInEmployeeId;
      }
      const result = await invoiceMasterRequestHandler({
        bodyData: { ...req.body, invoiceMasterJson },
        validatorData: invoiceMasterAdd,
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
 * @api {post} /invoiceMaster/updateData Update Data into Invoice Master
 * @apiName Update Data
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /invoiceMaster/updateData
 *
 * @apiGroup Invoice Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Update Data into Invoice Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {json} Input - invoiceMasterJson is array with invoiceId,chemistId,stockistId,updatedDate and invoiceDetailJson with itemId and qty are numeric fields
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *      "invoiceMasterJson":[{
 *        "invoiceId": 1,
 *        "invoiceDate":null,
 *        "invoiceNumber":null,
 *        "chemistId": 1,
 *        "status": null,
 *        "remarks":null,
 *        "stockistId":1,
 *        "updatedDate":null
 *       }],
 *      "invoiceDetailJson":[
 *        {
 *          "itemId": 1,
 *          "qty":10
 *        }
 *       ]
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {},
 *      "message": "Record Updated Successfully",
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
  updateData,
  async function (req, res, next) {
    try {
      const result = await invoiceMasterRequestHandler({
        bodyData: {
          ...req.body
        },
        validatorData: invoiceMasterUpdate,
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
 * @api {post} /invoiceMaster/updateStatusData Update Status Data into Invoice Master
 * @apiName Update Status Data
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /invoiceMaster/updateStatusData
 *
 * @apiGroup Invoice Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Update Status Data into Invoice Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {json} Input - invoiceMasterJson as array with invoiceId,status,remarks and updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *  {
 *  "invoiceMasterJson":[
 *    {
 *        "invoiceId":1,
 *        "status": 86,
 *        "remarks": "Test",
 *        "updatedDate": "2020-06-19 17:32:54"
 *     }
 *  ]}
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {},
 *      "message": "Record Updated Successfully",
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
  updateStatusData,
  async function (req, res, next) {
    try {
      const result = await invoiceMasterRequestHandler({
        bodyData: {
          ...req.body
        },
        validatorData: invoiceMasterUpdateStatus,
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

const invoiceMasterRequestHandler = async ({
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
    let {
      loggedInEmployeeId,
      invoiceMasterJson,
      invoiceDetailJson,
      image
    } = bodyData;
    // let newImageName = null;

    // if (image !== "" && image !== undefined && image !== null) {
    //   const newItemImage = await imageUpload({
    //     image,
    //     bucketName: `${invoiceFolderName}`,
    //     loggedInEmployeeId
    //   });
    //   const { key } = newItemImage;
    //   newImageName = key;
    //   invoiceMasterJson[0].fileName = newImageName;
    // }
    // delete bodyData.image;

    const response = await invoiceSaveData({
      loggedInEmployeeId,
      invoiceMasterJson,
      invoiceDetailJson,
      operationType
    });
    if (response[2] && response[2][0]["@op_IsSuccess"] === 1) {
        if(response[2][0]["@notificationObject"] != null)
        {
          let json = JSON.parse(response[2][0]["@notificationObject"]);
          if (
            json != null &&
            json.firebaseToken != null &&
            json.notificationMessage != null
          ) {
            const registrationToken = json.firebaseToken;
            const notificationMsg = json.notificationMessage;
            firebaseNotification({ registrationToken, notificationMsg });
          }
          if(json != null && json.mobileNumber != null && json.notificationMessage != null){
            sendBulkSMS(json.mobileNumber, json.notificationMessage, null);
          }
        }

      const messageResult = await getResponse({
        operationType,
        operationFlag: response[2][0]["@op_Flag"]
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
        result = { message: Message({ code: "DUPINVOICE" }), isSuccess: false };
      else if (operationFlag === 3)
        result = {
          message: Message({ code: "DUPITEMINVOICE" }),
          isSuccess: false
        };
      break;
    case 1:
      if (operationFlag === 0)
        result = { message: Message({ code: "REFRESH" }), isSuccess: false };
      else if (operationFlag === 1)
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      else if (operationFlag === 2)
        result = { message: Message({ code: "DUPINVOICE" }), isSuccess: false };
      else if (operationFlag === 3)
        result = {
          message: Message({ code: "DUPITEMINVOICE" }),
          isSuccess: false
        };
      break;
    case 2:
      if (operationFlag === 0)
        result = { message: Message({ code: "REFRESH" }), isSuccess: false };
      else if (operationFlag === 1)
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      else if (operationFlag === 2)
        result = { message: Message({ code: "DUPINVOICE" }), isSuccess: false };
      break;
  }
  return result;
};

/**
 * @apiDefine ApiVersion
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /invoiceMaster/checkDuplicate Check duplicate invoice is present or not
 * @apiName Check Duplicate
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /invoiceMaster/checkDuplicate
 *
 * @apiGroup Invoice Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Check Duplicate Invoice is present or not
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 2.0.0
 *
 * @apiParam (Request body) {JSON} Input invoiceNumber is required.
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "invoiceNumber":"003"
 *    }
 *
 * @apiSuccessExample Success Response
 *
 * When duplicate Invoice Number is present
 *
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *          "duplicateMessage":"Invoice Number 003 is associated with Sai chemist with 24-06-2020 date and Verified status.",
 *          "isDuplicate":1
 *      },
 *      "isSuccess": true,
 *      "statusCode": 200
 *    }
 *
 * When duplicate Invoice Number is 'Not' present
 *
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {},
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
  checkDuplicate,
  async function (req, res, next) {
    try {
      let result = {};
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: invoiceMasterCheckDuplicate
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const { invoiceNumber, stockistId, pageNo =null, loggedInEmployeeId } = req.body;
        const response = await invoiceCheckDuplicate({
          loggedInEmployeeId,invoiceNumber, stockistId, pageNo
        });

        const { isSuccess } = response;
        const isDuplicateExists = response[0] && response[0].length > 0;
        delete response.isSuccess;
        if (isSuccess === true) {

          result = {
            message: Message({ code: "Success" }),
            data: {
              duplicateInvoiceList:response[0],
              isDuplicateExists
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
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /invoiceMaster/getMasterData Get invoice master data based on point flag
 * @apiName Get Master Data
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /invoiceMaster/getMasterData
 *
 * @apiGroup Invoice Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Invoice Master Data  Based on point flag
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 2.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiParam (Request body) {JSON} Input pointFlag.Default value of pointFlag is 0.(1=PurchasePoints and 0=BoxPoints)
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "pointFlag":1
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *      "invoiceList": [
 *         {
 *          "invoiceId": 17,
 *          "invoiceNumber": "006",
 *          "grandTotal": 8981.1,
 *          "isManuallyAdded": 0,
 *          "points": 5.75,
 *          "invoiceDate": "2020-06-20"
 *         }
 *        ]
 *      },
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
  getMasterData,
  async function (req, res, next) {
    try {
      let result = {};
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: invoiceMasterGetMasterData
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const { loggedInEmployeeId, pointFlag, loggedInAppIndication } = req.body;
        const response = await invoiceGetMasterData({
          pointFlag,
          loggedInEmployeeId,
          loggedInAppIndication
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              invoiceList: response
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
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /invoiceMaster/updateReturnData Update Return Invoice Data into Invoice Master
 * @apiName Update Return Invoice Data
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /invoiceMaster/updateReturnData
 *
 * @apiGroup Invoice Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Update Return Invoice Data into Invoice Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {json} Input - invoiceMasterJson is array with invoiceId,invoiceDate,invoiceNumber,stockistId,remarks,isReturnInvoice,updatedDate and invoiceDetailJson with itemId and qty are numeric fields
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *      "invoiceMasterJson":[{
 *        "invoiceId": 1,
 *        "invoiceDate":null,
 *        "invoiceNumber":null,
 *        "stockistId":1,
 *        "remarks":null,
 *        "updatedDate":null
 *       }],
 *      "invoiceDetailJson":[
 *        {
 *          "itemId": 1,
 *          "qty":10
 *        }
 *       ]
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {},
 *      "message": "Record Updated Successfully",
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
  updateReturnData,
  async function (req, res, next) {
    try {

      const result = await returnInvoiceRequestHandler({
        bodyData: {
          ...req.body
        },
        validatorData: returnInvoiceUpdate,
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
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /invoiceMaster/updateReturnStatusData Update Status Data into Invoice Master
 * @apiName Update Status Data
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /invoiceMaster/updateReturnStatusData
 *
 * @apiGroup Invoice Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Update Status Data of return invoice into Invoice Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {json} Input - invoiceMasterJson as array with invoiceId,status,remarks and updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *  {
 *  "invoiceMasterJson":[
 *    {
 *        "invoiceId":1,
 *        "status": 86,
 *        "remarks": "Test",
 *        "updatedDate": "2020-06-19 17:32:54"
 *     }
 *  ]}
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {},
 *      "message": "Record Updated Successfully",
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
  updateReturnStatusData,
  async function (req, res, next) {
    try {
      const result = await returnInvoiceRequestHandler({
        bodyData: {
          ...req.body
        },
        validatorData: returnInvoiceUpdateStatus,
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

const returnInvoiceRequestHandler = async ({
  bodyData,
  validatorData,
  operationType
}) => {

  let result = {};
  const isValidDataType = await payLoadValidation({
    bodyData: bodyData,
    payLoad: validatorData
  });
  console.log(isValidDataType);

  const { isValidate, validationList } = isValidDataType;
  if (isValidate) {
    let {
      loggedInEmployeeId,
      invoiceMasterJson,
      invoiceDetailJson,
    } = bodyData;

    const response = await returnInvoiceUpdateData({
      loggedInEmployeeId,
      invoiceMasterJson,
      invoiceDetailJson,
      operationType
    });
    if (response[2] && response[2][0]["@op_IsSuccess"] === 1) {
      const messageResult = await getResponse({
        operationType,
        operationFlag: response[2][0]["@op_Flag"]
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



/**
 * @apiDefine ApiVersion
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /invoiceMaster/getInvoiceChemistByEmployee Get invoice master data based on loggedin employee for SL for mobile
 * @apiName Get Master Data For Mobile
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /invoiceMaster/getInvoiceChemistByEmployee
 *
 * @apiGroup Invoice Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Invoice Master Data  Based on loggedin employee for SL mobile app
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 2.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiParam (Request body) {JSON} Input startDate and endDate value of startDate will be date in YYYY-MM-DD format
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "startDate":null,
 *      "endDate":null
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *      "invoiceList": [
 *         {
 *          "invoiceId": 17,
 *          "stockistName": "",
 *          "invoiceNumber": "",
 *          "invoiceDate": "",
 *          "grandTotal": 0,
 *          "statusText": "",
 *          "statusId": 0,
 *          "fileName": "",
 *          "remarks": "",
 *         }
 *        ]
 *      },
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
  getInvoiceChemistByEmployee,
  async function (req, res, next) {
    try {
      let result = {};

        const { loggedInEmployeeId, startDate=null, endDate=null  } = req.body;
        const response = await invoiceGetByEmployeeAndDate({
          loggedInEmployeeId,
          startDate, 
          endDate
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              invoiceList: response[0]
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
 * @apiVersion 3.0.0
 */
/**
 * @api {post} /invoiceMaster/getInvoiceItemData Get invoice item data and latest 3 history 
 * @apiName Get Invoice Item Data
 * @apiVersion 3.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /invoiceMaster/getInvoiceItemData
 *
 * @apiGroup Invoice Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Invoice item and latest 3 invoice of that chemist data based on selected invoice.
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input statusId,stateId,cityId are required.
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "invoiceId":212
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *      "invoiceList": [
 *         {
 *          "invoiceId": 212, *          
 *          "invoiceItems": "[{\"qty\": 10, \"pack\": 10, \"brand\": \"Acifresh syrup\", \"itemId\": 1}, {\"qty\": 20, \"pack\": 10, \"brand\": \"Item 2\", \"itemId\": 2}]",
 *          "InvoiceChemistHistory": "[{\"StockistName\": "abc", \"InvoiceNumber\": "12s34", \"PageNo\": 1, \"InvoiceDate\": "21-May-2021", \"noOfItems\": 5, \"purchasePoints\": 125.5, \"boxPoints\": 21.50, \"sboxPoints\": 10.50, \"statusText\": "Approved"}]", *         
 *          }
 *        ]
 *      },
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
  getInvoiceItemData,
  async function (req, res, next) {
    try {
      let result = {};
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: invoiceMasterGetItemData
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const { invoiceId, loggedInEmployeeId } = req.body;
        const response = await invoiceGetItemData({
          invoiceId,
          loggedInEmployeeId
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              invoiceItemList: response[1][0]
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


module.exports = router;
