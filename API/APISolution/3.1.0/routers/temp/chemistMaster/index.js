const express = require("express");
const router = express.Router();

const {
  chemistGetData,
  chemistSaveData,
  chemistListMobile,
  chemistUpdateRouteData,
  chemistGetProfile,
  chemistSaveEmployeewiseSorting
} = require("./chemistMasterRepository");
const {
  payLoadValidation,
  sendResponse,
  designationDetails
} = require("../../../utils");
const {
  chemistMasterGetData,
  chemistMasterAdd,
  chemistMasterUpdate,
  chemistGetDataMobile,
  chemistProfileGetData,
  validateSaveEmployeewiseChemistSorting
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  chemistMaster_getData: { url: getData },
  chemistMaster_insertData: { url: insertData },
  chemistMaster_updateData: { url: updateData },
  getChemistList_getData: { url: getDataMobile },
  chemist_updateRoute: { url: updateDataRoute },
  chemist_getProfile: { url: getProfile },
  chemistMaster_saveChemistSorting: { url: saveChemistSorting }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /chemistMaster/getData Get Data from Chemist Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /chemistMaster/getData
 *
 * @apiGroup Chemist Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of Chemist Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "areaId":[4,5],
 *        "cityId":3,
 *        "stateId":12,
 *        "page":0,
 *        "pageSize":0,
 *        "orderBy":null,
 *        "orderDirection":null,
 *        "search":null
 *      }
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
 *               "companyId": 1,
 *               "chemistName": "Parth Suthar",
 *               "countryId": 1,
 *               "address": "Naroda",
 *               "pinCode": "382330",
 *               "mobile": "1111111111",
 *               "email": "parth.suthar@spec-india.com",
 *               "fax": null,
 *               "gstin": null,
 *               "dob": null,
 *               "dlNumber": null,
 *               "contactPerson": null,
 *               "stateId": 12,
 *               "stateName": "Gujarat",
 *               "cityId": 3,
 *               "cityName": "Test",
 *               "areaId": 4,
 *               "areaName": "Ahmedabad",
 *               "routeId": 5,
 *               "routeName": "MEETING AT BARDOLI"
 *           },
 *        ],
 *        "totalRecords": 2
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
      const {
        areaId = null,
        cityId = null,
        stateId = null,
        loggedInEmployeeId,
        loggedInDesignationId,
        employeeId,
        routeId,
        page = 0,
        pageSize = 0,
        orderBy = null,
        orderDirection = null,
        search = null,
        isRouteChemist = false,
        loggedInAppIndication,
        chemistMasterCall = false,
      } = req.body;

      const adminNSLDesignation = JSON.parse(
        designationDetails[0].filter((x) => x.Code === "ADMIN_DESIGNATIONS")[0]
          .Value
      );
      const newBodyData = {
        ...req.body,
        cityId:
          loggedInDesignationId &&
          adminNSLDesignation &&
          adminNSLDesignation.includes(loggedInDesignationId)
            ? cityId
            : 0,
        areaId:
          loggedInDesignationId &&
          adminNSLDesignation &&
          adminNSLDesignation.includes(loggedInDesignationId)
            ? areaId
            : 0,
        stateId:
          loggedInDesignationId &&
          adminNSLDesignation &&
          adminNSLDesignation.includes(loggedInDesignationId)
            ? stateId
            : 0           
      };

      const isValidDataType = await payLoadValidation({
        bodyData: newBodyData,
        payLoad: chemistMasterGetData
      });
      const { isValidate, validationList } = isValidDataType;

      if (isValidate) {
        let newAreaId = areaId ? JSON.stringify(areaId) : null;
        const response = await chemistGetData({
          newAreaId,
          cityId,
          stateId,
          loggedInEmployeeId,
          loggedInDesignationId,
          employeeId,
          routeId,
          page,
          pageSize,
          orderBy,
          orderDirection,
          search,
          loggedInAppIndication
        });
        const { isSuccess } = response;
        const chemist = response && response[0];
        const totalRecords =
          response && response[0] && response[0].length != 0
            ? response[0][0].TotalRecord
            : 0;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              chemistList: chemist,
              totalRecords: totalRecords
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
 * @api {post} /chemistMaster/insertData Insert Data into Chemist Master
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /chemistMaster/insertData
 *
 * @apiGroup Chemist Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Chemist Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {String}  chemistName Enter Chemist Name to insert
 *
 * @apiParamExample {json} Input (body/json)
 *     {
 *      "chemistName": "Parth",
 *      "stateId": 12,
 *      "cityId": 3,
 *      "areaId":4,
 *      "contactPerson":"Parth",
 *      "mobile":"1111111111",
 *      "routeId":5
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
  insertData,
  async function (req, res, next) {
    try {
      const bodyData = {
        ...req.body,
        chemistId: 0,
        countryId: 1,
        isActive: 1,
        routeId: req.body.routeId ? req.body.routeId : -1
      };
      const result = await chemistMasterRequestHandler({
        bodyData,
        validatorData: chemistMasterAdd,
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
 * @api {post} /chemistMaster/updateData Update Data of Chemist Master
 * @apiName UpdateData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /chemistMaster/updateData
 *
 * @apiGroup Chemist Master
 *
 * @apiDescription This API is Used to update data in Chemist Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - chemistId and updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "updatedDate":"2020-01-16 14:32:54",
 *      "chemistId": 2,
 *      "chemistName": "Parth",
 *      "stateId": 12,
 *      "cityId": 3,
 *      "areaId":4,
 *      "contactPerson":"Parth",
 *      "mobile":"1111111111",
 *      "routeId":5
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
  updateData,
  async function (req, res, next) {
    try {
      const bodyData = {
        ...req.body,
        countryId: 1,
        routeId: req.body.routeId ? req.body.routeId : -1
      };
      const result = await chemistMasterRequestHandler({
        bodyData,
        validatorData: chemistMasterUpdate,
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
 * @api {post} /getChemistList/getData Get Chemist list by Routeid
 * @apiName GetChemistList
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /getChemistList/getData
 *
 * @apiGroup Chemist Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Chemist list by routeid
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiParam (Request body) {String} routeId Required to get chemist route wise
 * @apiParam (Request body) {String} visitDate date wise chemist list
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "data": {
 *            "chemistList":[
 *                      {
 *                          "visitLogId": null,
 *                          "areaId": 5,
 *                          "chemistId": 19,
 *                          "chemistName": "qqqq",
 *                          "workingWithId": null,
 *                          "visitTime": null,
 *                          "chemistRemarks": null,
 *                          "pob": null,
 *                          "updatedDate": null,
 *                          "boxPoints": null,
 *                          "balancePoints": null,
 *                          "address": null
 *                      },
 *             ]
 *          },
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "You get data Successfully"
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
 *
 */
router.post(
  getDataMobile,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = req.body;
      const { routeId, visitDate = null, loggedInEmployeeId } = bodyData;
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: chemistGetDataMobile
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await chemistListMobile({
          routeId,
          visitDate,
          loggedInEmployeeId
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              chemistList: [...response]
            },
            isSuccess
          };
        } else {
          result = {
            isSuccess: false,
            message: Message({})
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
 * @api {post} /chemist/updateRoute Update Route of Chemist
 * @apiName UpdateChemistRoute
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /chemist/updateRoute
 *
 * @apiGroup Chemist Master
 *
 * @apiDescription This API is Used to Update Route of Chemist
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {number} Input
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "json":[
 *               {
 *                  "chemistId":2,
 *                  "routeId":1,
 *                  "updatedDate":"2020-03-06 12:11:43"
 *               },{
 *                  "chemistId":3,
 *                  "routeId":2,
 *                  "updatedDate":"2020-02-24 10:05:18"
 *              }
 *             ]
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
  updateDataRoute,
  async function (req, res, next) {
    try {
      const bodyData = req.body;
      const { json, loggedInEmployeeId } = bodyData;

      const response = await chemistUpdateRouteData({
        json,
        loggedInEmployeeId
      });
      if (response && response[1] && response[1][0]["@op_IsSuccess"] === 1) {
        if (response[1][0]["@op_Flag"] === 0) {
          result = { message: Message({ code: "REFRESH" }), isSuccess: false };
        } else {
          result = { message: Message({ code: "RUPD" }), isSuccess: true };
        }
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
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /chemist/getProfile Get Data from Chemist Master(Mobile)
 * @apiName GetProfile
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /chemist/getProfile
 *
 * @apiGroup Chemist Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data from Chemist Master(Mobile)
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "chemistId":5
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *      "chemistList":{
 *               "companyId": 2,
 *               "chemistName": "Parth Suthar",
 *               "countryId": 1,
 *               "address": "Naroda",
 *               "pinCode": "382330",
 *               "mobile": "1111111111",
 *               "email": "parth.suthar@spec-india.com",
 *               "fax": null,
 *               "gstin": null
 *            }
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
  getProfile,
  async function (req, res, next) {
    try {
      let result = {};
      const { chemistId } = req.body;
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: chemistProfileGetData
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await chemistGetProfile({
          chemistId
        });
        const { isSuccess } = response;
        const chemistList = response && response[0];
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              chemistList
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

const chemistMasterRequestHandler = async ({
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
    const response = await chemistSaveData({
      data: JSON.stringify(bodyData),
      operationType
    });
    if (response[3] && response[3][0]["@op_IsSuccess"] === 1) {
      const messageResult = await getResponse({
        operationType,
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
  let result = "";
  switch (operationType) {
    case 0:
      if (operationFlag === 1)
        result = { message: Message({ code: "RINS" }), isSuccess: true };
      else if (operationFlag === 2)
        result = {
          message: Message({ code: "DUPCHEMIST" }),
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
          message: Message({ code: "DUPCHEMIST" }),
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


/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /chemistMaster/saveChemistSorting save Chemist sorting for employee
 * @apiName GetChemistList
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /chemistMaster/saveChemistSorting
 *
 * @apiGroup Chemist Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to save Chemist sorting for employee
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 * @apiHeader (Request headers) {String} deviceid
 *
 * @apiParam (Request body) {String} chemistList array Required to save data
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *        "statusCode": 200,
 *        "isSuccess": true,
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Data saved successfully."
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
 *
 */
router.post(
  saveChemistSorting,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = req.body;
      const { chemistList, loggedInEmployeeId } = bodyData;
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: validateSaveEmployeewiseChemistSorting
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await chemistSaveEmployeewiseSorting({
          loggedInEmployeeId, chemistList
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        if (isSuccess === true) {
          result = {
            message: Message({ code: "RSAVE" }),
            isSuccess
          };
        } else {
          result = {
            isSuccess: false,
            message: Message({})
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
