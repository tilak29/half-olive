const express = require("express");
const router = express.Router();

const {
  dietPlanGetData,
  therapyPlanGetData
} = require("./dietPlanMasterRepository");

const { sendResponse,payLoadValidation } = require("../../../utils");

const { Message } = require("../../../Messages");
const {
  treatment_getDietPlan: { url: getDietplanCategoriesApi },
  treatment_gettherapyPlan: { url: gettherapyplanCategoriesApi }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");
const { OperationalError } = require("bluebird");

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /dietPlanMaster/getDietplanCategoriesApi Get Data from DietPlan Master
 * @apiName getDietplanCategoriesApi
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dietPlanMaster/getDietplanCategoriesApi
 *
 * @apiGroup dietPlan Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of dietPlanMaster 
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *  
 * @apiParam (Request body) {int}  GuestId To check and return  get the dietlist
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *         "GuestId":18
 *       }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK   
 *             {
 *                    "isValidate": true,
 *                    "validationList": [],
 *                    "message": "Data received successfully.",
 *                    "data": {
 *                      "dietplanCategoryList": [
 *                        {
 *                          "guestId": 18,
 *                          "dietName": "Fruit Diet",
 *                          "diseaseName": "Acidity",
 *                          "diseaseId": "26"
 *                        },
 *                        {
 *                          "guestId": 18,
 *                          "dietName": "Carrots Diet",
 *                          "diseaseName": "Chickenpox",
 *                          "diseaseId": "13"
 *                        },
 *                        {
 *                          "guestId": 18,
 *                          "dietName": "Paleolithic (Paleo) Diet",
 *                          "diseaseName": "Chickenpox",
 *                          "diseaseId": "13"
 *                        },
 *                        {
 *                          "guestId": 18,
 *                          "dietName": "bitter diet",
 *                          "diseaseName": "Diabetes",
 *                          "diseaseId": "9"
 *                        },
 *                        {
 *                          "guestId": 18,
 *                          "dietName": "Ketogenic (Keto) Diet",
 *                          "diseaseName": "Diabetes",
 *                          "diseaseId": "9"
 *                        },
 *                        {
 *                          "guestId": 18,
 *                          "dietName": "low sugar diet",
 *                          "diseaseName": "Diabetes",
 *                          "diseaseId": "9"
 *                        }
 *                      ]
 *                    },
 *                    "isSuccess": true,
 *                    "statusCode": 200
 *           }
 *     
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
  getDietplanCategoriesApi,
  async function (req, res, next) {
    try {
      let result = {};
      const {GuestId} = req.body;
      const response = await dietPlanGetData({GuestId});
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            dietplanCategoryList: [...response.recordset],
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
 * @api {post} /dietPlanMaster/gettherapyplanCategoriesApi Get Data from DietPlan Master
 * @apiName gettherapyplanCategoriesApi
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dietPlanMaster/gettherapyplanCategoriesApi 
 *
 * @apiGroup dietPlan Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Data of dietPlanMaster 
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *  
 * @apiParam (Request body) {int}  GuestId To check and get the TherapyPlanlist
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *         "GuestId":18
 *       }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK   
 *        {
 *                "isValidate": true,
 *                "validationList": [],
 *                "message": "Data received successfully.",
 *                "data": {
 *                  "therapyplanCategoryList": [
 *                    {
 *                      "guestId": 18,
 *                      "treatmentName": "gym",
 *                      "diseaseName": "Diabetes",
 *                      "diseaseId": "9"
 *                    }
 *                  ]
 *                },
 *                "isSuccess": true,
 *                "statusCode": 200
 *              }
 *     
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
  gettherapyplanCategoriesApi,
  async function (req, res, next) {
    try {
      let result = {};
      const {GuestId} = req.body;
      const response = await therapyPlanGetData({GuestId});
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            therapyplanCategoryList: [...response.recordset],
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
module.exports = router;