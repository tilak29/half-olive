const express = require("express");
const router = express.Router();
const moment = require("moment");

const {
  userRegistrationSaveData,
  userRegistrationGetData,
  userRegistrationUpdateDataById,
  getMatchingChemistList
} = require("./userRegistrationRepository");
const {
  payLoadValidation,
  sendResponse,
  getNoOfGroupShow
} = require("../../../utils");
const {
  publicAPIDataTypeJSON: { userRegistrationAdd, userRegistrationGet }
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  publicAPIRouterConstant: {
    userRegistration_insertData: { url: insertData },
    userRegistration_getData: { url: getData },
    userRegistration_updateData: { url: updateData },
    userRegistration_getMatchingChemistData:{url:getMatchingChemistData}
  }
} = require("../../../routerConstant");
const { imageUpload } = require("../../../uploadImageToServer");
const {
  imageFolderName: { registrationFolderName, invoiceFolderName }
} = require("../../../config.json");
const { fileMimeType } = require("../../../fileMimeTypeUtils");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /userRegistration/getData  User Registration - Get Data
 * @apiName User Registration Get Data
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /userRegistration/getData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Registered User
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        "userList": [
 *              {
 *                 "requestId": 1,
 *                 "name": "Khushbu Shah",
 *                 "address": "A/3 Gayatri Chamber",
 *                 "area": "Station Road",
 *                 "city": "Bardoli",
 *                 "stateId": 12,
 *                 "stateName": "Gujarat",
 *                 "mobileNumber": "9724236893",
 *                 "email": null,
 *                 "registeredAs": 0,
 *                 "registeredAsStr":"Stockist",
 *                 "status": 65,
 *                 "remarks": null,
 *                 "updatedBy": null,
 *                 "updatedDate": null
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
  getData,
  async function (req, res, next) {
    try {
      let result = {};
      const { totalRecords, startFrom, statusId, year } = req.body;
      const noOfGroupShow = await getNoOfGroupShow({ totalRecords, startFrom });

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: userRegistrationGet
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await userRegistrationGetData({
          noOfGroupShow,
          statusId,
          year
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              userList: [...response[1]]
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
 * @api {post} /userRegistration/insertData  User Registration - Insert Data
 * @apiName User Registration Insert Data
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /userRegistration/insertData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Register stockist,chemist and super stockist
 *
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiParam (Request body) {JSON}  Input required JSON of mobilenumber,name,address,state(id),city,area and registeredAs(registeredAs= Stockist:0, Super Stockist:1, Chemist:2)
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *       "name": "Khushbu Shah",
 *       "address": "A/3 Gayatri Chamber",
 *       "state": 12,
 *       "city": "Bardoli",
 *       "area": "Station Road",
 *       "mobileNumber": "9409261193",
 *       "registeredAs": 0,
 *       "email" : ""
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
 *      "message": "We’ve receive your request. We’ll get back to you in 48 hours.",
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
      const bodyData = {
        ...req.body,
        loggedInEmployeeId: 0
      };
      const file = req.files ? req.files.file : undefined;
      const result = await userRegisterRequestHandler({
        bodyData,
        validatorData: userRegistrationAdd,
        operationType: 0,
        file
      });
      req.result = { ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);

const userRegisterRequestHandler = async ({
  bodyData,
  validatorData,
  operationType
}) => {
  let result = {};
  //let isValidFile = true;
  const isValidDataType = await payLoadValidation({
    bodyData: bodyData,
    payLoad: validatorData
  });
  const { isValidate, validationList } = isValidDataType;

  if (isValidate) {
    //image related code
    //start

    let {
      documentName,
      documentTypeId,
      loggedInEmployeeId
    } = bodyData;
    let newImageName = null;

  //if (isValidFile === true) {
      if (documentName !== "" && documentName !== undefined && documentName !== null)
          {
        // const newItemImage = await imageUpload({
        //   image : documentName,
        //   bucketName: `${registrationFolderName}`,
        //   imageName: imageName ? imageName.split(".")[0] : imageName,
        //   isImageDeleted : false,
        //   loggedInEmployeeId
        // });
        const newItemImage = await imageUpload({
          image : documentName,
          bucketName: `${registrationFolderName}`,
          loggedInEmployeeId
        });

        const { key } = newItemImage;
        newImageName = key;
        bodyData.documentName = newImageName;
      // } else {
      //   bodyData.documentName =
      //     ((isImageDeleted === false || isImageUpdated === false) &&
      //       imageUrl) ||
      //     null;
      // }
      


    //end
    //const { loggedInEmployeeId } = bodyData;
    const response = await userRegistrationSaveData({
      loggedInEmployeeId,
      data: JSON.stringify(bodyData),
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
        result = {
          message: Message({ code: "SuccessRegistration" }),
          isSuccess: true
        };
      else if (operationFlag === 2)
        result = {
          message: Message({ code: "DUPRegistartion" }),
          isSuccess: false
        };
      else if (operationFlag === 3)
        result = {
          message: Message({ code: "USER_REQUEST_WAIT_MESSAGE" }),
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
          message: Message({ code: "DUPRegistartion" }),
          isSuccess: false
        };
      else if (operationFlag === 3)
        result = {
          message: Message({ code: "USER_REQUEST_WAIT_MESSAGE" }),
          isSuccess: false
        };
      break;
  }
  return result;
};

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /userRegistration/updateData  User Registration - Update Data
 * @apiName User Registration Update Data
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /userRegistration/updateData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to update registered user
 *
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} ispublicapi true
 *
 * @apiParam (Request body) {JSON}  Input required registrationId
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *       "registrationId": 1,
 *       "statusId":65,
 *       "updatedDate":null
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
        "isValidate": true,
        "validationList": [],
        "message": "Record updated successfully.",
        "isSuccess": true,
        "statusCode": 200,
        "data": {}
      }
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
      let result = {};

      const {
        registrationId,
        loggedInEmployeeId,
        statusId,
        updatedDate,
        remarks
      } = req.body;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body
      });

      const { isValidate, validationList } = isValidDataType;

      if (isValidate) {
        const response = await userRegistrationUpdateDataById({
          loggedInEmployeeId,
          registrationId,
          statusId,
          updatedDate,
          remarks
        });

        const { isSuccess, affectedRows } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          if (affectedRows === 0) {
            result = {
              message: Message({ code: "REFRESH" }),
              isSuccess: false
            };
          } else {
            result = {
              message: Message({ code: "RUPD" }),
              isSuccess
            };
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
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /userRegistration/getMatchingChemistData  User Registration - Get matching chemist list Data
 * @apiName User Registration Get Matching Chemist Data
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /userRegistration/getMatchingChemistData
 *
 * @apiGroup 1.Public API
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of chemist those are matching with Registered User
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *        "chemistList": [
 *              {
 *                 "chemistName": "",
 *                 "stateName": "",
 *                 "cityName": "",
 *                 "areaName": "",
 *                 "address": "",
 *                 "mobile": "",
 *                 "email": "",
 *                 "fax": "",
 *                 "gstin": "",
 *                 "dlNumber": "",
 *                 "contactPerson":""
 *               }
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
  getMatchingChemistData,
  async function (req, res, next) {
    try {
      let result = {};
      const { loggedInEmployeeId, registrationId } = req.body;

        const response = await getMatchingChemistList({ loggedInEmployeeId, registrationId });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              chemistList: [...response[0]]
            },
            isSuccess
          };
        } else {
          result = {
            message: Message({}),
            isSuccess: false
          };
        }
      const isValidate = true, validationList = {};
      req.result = {isValidate, validationList, ...result };
      next();
    } catch (e) {
      handleError(e, res);
    }
  },
  sendResponse
);



module.exports = router;
