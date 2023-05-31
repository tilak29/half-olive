const express = require("express");
const router = express.Router();

const {
  redeemRequestSaveData,
  redeemRequestGetRewardStatusData,
  redeemRequestListGetData,
  redeemApprovalChemistMessage
} = require("./redeemrequestRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
  publicAPIDataTypeJSON: {
    redeemRequestAdd,
    redeemRequestGetRewardStatus,
    redeemRequestUpdate,
    redeemRequestGetData
  }
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const { submitWalletTransfer, successCode, pendingCode, failerCodeToClient } = require("../payTM/index");
const {
  publicAPIRouterConstant: {
    redeemRequest_getRewardStatusData: { url: getRewardStatusData },
    redeemRequest_insertData: { url: insertData },
    redeemRequest_updateData: { url: updateData },
    redeemRequest_getData: { url: getData },
    redeemRequest_getMessageData: { url: getMessageData }
  }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");
const { Environment } = require("../../../config.json");
const sendBulkSMS = require("../../../bulkSMS");
const {
  firebaseNotification
} = require("../../routers/firebaseNotification/firebaseNotification");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /redeemRequest/getRewardStatusData  Redeem Request - Get Reward Status Data
 * @apiName Redeem Request Reward Status Get Data
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /redeemRequest/getRewardStatusData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Redeem Request Reward Status
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
 *        "redeemRequestList": [
 *              {
 *                 "schemeCode": "SCHM12",
 *                 "rewardName": "Tour to Udaipur",
 *                 "rewardDescription": "You will get this reward on purchase of some item",
 *                 "rewardImage": "https://file-upload-pharma.s3.ap-south-1.amazonaws.com/reward/1592458567484.png",
 *                 "points": 205,
 *                 "statusText": "Requested",
 *                 "remarks": null
 *              }
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
  getRewardStatusData,
  async function (req, res, next) {
    try {
      let result = {};
      const { loggedInEmployeeId } = req.body;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: redeemRequestGetRewardStatus
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await redeemRequestGetRewardStatusData({
          loggedInEmployeeId
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              redeemRequestList: response[0]
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
 * @api {post} /redeemRequest/insertData  Redeem Request - Insert Data
 * @apiName Redeem Request Insert Data
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /redeemRequest/insertData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert data in Redeem Request table
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiParam (Request body) {JSON} Input required JSON of schemeId,rewardId,rewardName,rewardImage,points,status,remarks
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *       "schemeId": 26,
 *       "rewardId": 5,
 *       "rewardName": "Tour to Udaipur",
 *       "rewardImage": "1592458567484.png",
 *       "points": 205,
 *       "status": 77,
 *       "remarks": "Test",
 *        "qty":1
 *    }
 *
 * @apiSuccessExample Success Response"
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
      let bodyData = {
        ...req.body,
        redeemRequestId: 0
      };

      /** PayTM intigration */
      const { rewardValue, loggedInMobileNumber, uom, qty = 1 } = bodyData;
      let transactionId = null, statusCode = '';
      let payTMTransactionSuccess = null;
      if (uom === 97) // request for wallet transfer only if redeem request is a type of Scan Box
      {
        payTMTransactionSuccess = Message({code:"PAYTMSUCCESS"});
        const orderId = `INV_${Date.now()}`;
        const transactionResponse = await submitWalletTransfer({ 
            mobileNumber: loggedInMobileNumber, 
            orderId, 
            amount: rewardValue*qty, 
            requestObject: JSON.stringify(bodyData) 
          });
        if(Environment === "Dev")
        {
          transactionResponse.transactionId = 1;
          transactionResponse.statusCode = pendingCode[0];
        }
        transactionId = transactionResponse.transactionId;
        if(transactionId == 0)
        {
          const result = {
            message: Message({code:"RDMRQSRFAIL"}),
            isSuccess: false,
            isValidate: true,
            validationList: []
          };
          req.result = { ...result };
          next();
          return;
        }
        statusCode = transactionResponse.statusCode;
        bodyData = {...bodyData, transactionId }
        if (successCode.indexOf(statusCode) >= 0) {
          bodyData = {...bodyData, transactionStatus: 1, isPending: 0}
        }
        else if (pendingCode.indexOf(statusCode) >= 0) {
          bodyData = {...bodyData, transactionStatus: 1, isPending: 1}
        }
        else if (failerCodeToClient.indexOf(statusCode) >= 0) {
          const result = {
            message: Message({ code: statusCode }),
            isSuccess: false,
            isValidate: true,
            validationList: []
          };
          req.result = { ...result };
          next();
          return;
        }
        else {
          const result = {
            message: Message({code:"RDMRQSRFAIL"}),
            isSuccess: false,
            isValidate: true,
            validationList: []
          };
          req.result = { ...result };
          next();
          return;
        }
      }
      /** PayTM intigration End */

      let result = await redeemRequestHandler({
        bodyData,
        validatorData: redeemRequestAdd,
        operationType: 0
      });

      if(payTMTransactionSuccess != null)
      {
        result = {...result, message: payTMTransactionSuccess}
      }
      
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
 * @api {post} /redeemRequest/updateData  Redeem Request - Update Data
 * @apiName Redeem Request Update Data
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /redeemRequest/updateData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Update data in Redeem Request table
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input required JSON of redeemRequestId,status,updatedDate
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *       "redeemRequestId" : 1,
 *       "status": 77,
 *       "remarks": "Test",
 *       "updatedDate":null
 *    }
 *
 * @apiSuccessExample Success Response"
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
      const bodyData = {
        ...req.body
      };
      //console.log(bodyData);
      const result = await redeemRequestHandler({
        bodyData,
        validatorData: redeemRequestUpdate,
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

const redeemRequestHandler = async ({
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
    const { loggedInEmployeeId } = bodyData;
    bodyData = { ...bodyData, chemistId: loggedInEmployeeId };
    const response = await redeemRequestSaveData({
      loggedInEmployeeId,
      data: JSON.stringify(bodyData),
      operationType
    });
    if (response[2] && response[2][0]["@op_IsSuccess"] === 1) {
      if (response[2][0]["@notificationObject"] != null) {
        let notificationObject = JSON.parse(response[2][0]["@notificationObject"]);
        notificationObject.forEach(element => {
          let json = typeof (element) === "string" ? JSON.parse(element) : element;
          if (
            json != null &&
            json.firebaseToken != null &&
            json.notificationMessage != null
          ) {
            const registrationToken = json.firebaseToken;
            const notificationMsg = json.notificationMessage;
            firebaseNotification({ registrationToken, notificationMsg });
          }
          if (json != null && json.mobileNumber != null && json.notificationMessage != null) {
            sendBulkSMS(json.mobileNumber, json.notificationMessage, null);
          }
        });
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
      if (operationFlag === 0)
        result = {
          message: Message({ code: "INSUFFICIENTPOINTS" }),
          isSuccess: false
        };
      else if (operationFlag === 1)
        result = {
          message: Message({ code: "RINS" }),
          isSuccess: true
        };
      break;

    case 1:
      if (operationFlag === 0)
        result = {
          message: Message({ code: "INSUFFICIENTPOINTS" }),
          isSuccess: false
        };
      else if (operationFlag === 1)
        result = { message: Message({ code: "RUPD" }), isSuccess: true };
      else if (operationFlag === 3)
        result = { message: Message({ code: "REDEEM_ALREADY_REJECTED" }), isSuccess: false };
      break;
  }
  return result;
};

/**
 * @apiDefine ApiVersion
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /redeemRequest/getData  Redeem Request - Get Redeem Request List
 * @apiName Redeem Request List for approval
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /redeemRequest/getData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get list of Redeem Request data
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {Number} stateId=null, this value will be used to get all redeem request data of selected state, if null then all state data will come
 * @apiParam (Request body) {Number} cityId=null, this value will be used to get all redeem request data of selected city, if null then all city data will come
 * 
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "stateId": null,
 *        "cityId" : 12,
 *        "year": 2020,
 *        "status": null
 *      }
 * 
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        "redeemRequestList": [
 *              {
                remptionId: 3,
                status: 3,
                chemistName: "bajrang medicose",
                stateName: "Gujarat",
                cityName: "Ahmedabad",
                areaName: "Bopal",
                redemptionItem: "Samsung Washing Machine",
                balancePoints: "1200",
                redeemDate: "2020-02-10",
                slName: "Amit Chavda",
                slStatus: "Approved",
                slComments: "Test",
                remarks: "will be deliver in 10 days",
                adminName: "Tejal Sali",
              }
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
      const { loggedInEmployeeId, stateId, cityId, year, status, loggedInAppIndication } = req.body;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: redeemRequestGetData
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await redeemRequestListGetData({
          loggedInEmployeeId,
          stateId,
          cityId,
          year,
          status,
          loggedInAppIndication
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              redeemRequestList: response[0]
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
 * @api {post} /redeemRequest/getMessageData  Approval message
 * @apiName Redeem Request approval messave for chemist
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /redeemRequest/getMessageData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get message template of Redeem Request approval for chemist
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * 
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "statusId": 45,
 *        "chemistName" : 12
 *      }
 * 
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        "approvalMessage": "Dear Petron, Your request has been <approved>"
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
  getMessageData,
  async function (req, res, next) {
    try {
      let result = {};
      const { statusId, chemistName } = req.body;

      const response = await redeemApprovalChemistMessage({
        statusId: statusId | null,
        chemistName
      });
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            approvalMessage: response[1][0]["message"]
          },
          isSuccess,
          isValidate: true
        };
      } else {
        result = {
          message: Message({}),
          isSuccess: false
        };
      }

      req.result = { ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);


module.exports = router;
