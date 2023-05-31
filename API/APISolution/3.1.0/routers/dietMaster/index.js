const express = require("express");
const router = express.Router();

const {
  getDietMaster,
  saveDietMaster,
  getDietCategories,
  getDelete,
  updateDietMaster,
  viewMealData
} = require("./dietMasterRepository");
const { sendResponse, payLoadValidation } = require("../../../utils");
const {
  dietMasterSave
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  dietMaster_getDietMaster: { url: getDietMasterApi },
  dietMaster_getDeleteMaster: { url: getDeleteMasterApi },
  dietMaster_saveDietMaster: { url: saveDietMasterApi },
  dietMaster_getDietCategories: { url: getDietCategoriesApi },
  dietMaster_updateDietMaster: { url: updateDietMasterApi },
  dietMaster_viewMealData: { url: viewMealDataApi }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /dietMaster/getDietMasterApi Get Data from Division Master
 * @apiName getDietMasterApi
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dietMaster/getDietMasterApi
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
 * @apiParam (Request body) {Number}  filterCategory use the disease id.
 * @apiParam (Request body) {Number}  filterStatus send active 1 or 0.
 *
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *         "filterCategory":9,
 *        "filterStatus":1
 *        }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *      {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "You get data Successfully",
 *    "data": {
 *       "dietMasterList": [
 *    {
 *      "dietId": 4,
 *      "diseaseId": 9,
 *      "dietName": "Ketogenic (Keto) Diet",
 *      "diseaseName": "Diabetes",
 *      "description": "this is ketogenic diet for diabetes patient.",
 *      "active": "Yes",
 *      "isActive": true
 *    },
 *    {
 *      "dietId": 10,
 *      "diseaseId": 9,
 *      "dietName": "low sugar diet",
 *      "diseaseName": "Diabetes",
 *      "description": null,
 *      "active": "Yes",
 *      "isActive": true
 *    },
 *    {
 *      "dietId": 11,
 *      "diseaseId": 9,
 *      "dietName": "bitter diet",
 *      "diseaseName": "Diabetes",
 *      "description": null,
 *      "active": "Yes",
 *      "isActive": true
 *    }
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
  getDietMasterApi,
  async function (req, res, next) {
    try {
      let result = {};
      const { rowData, filterStatus } = req.body;
      const response = await getDietMaster({ rowData, filterStatus });

      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            dietMasterList: [...response.recordset]
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

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /dietMaster/saveDietMasterApi Insert Data into Diet Master
 * @apiName saveDietMasterApi
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dietMaster/saveDietMasterApi
 *
 * @apiGroup Diet Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Diet Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {String}  dietName Required Enter Diet's name
 * @apiParam (Request body) {int}  DiseaseId Required select Disease's id
 * @apiParam (Request body) {Boolean} isActive Diet Status
 *
 * @apiParamExample {json} Input (body/json)
 *     {
 *      "dietName": "kito-diet",
 *      "DiseaseId":9,
 *      "isActive": true,
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
  saveDietMasterApi,
  async function (req, res, next) {
    try {
      var result = {};
      const bodyData = {
        ...req.body
      };
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: dietMasterSave
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await saveDietMaster({
          data: JSON.stringify(bodyData)
        });
        if (response && response.isSuccess) {
          if (response.recordset[0].Count == 1) {
            result = { message: Message({ code: "DUPDIET" }), isSuccess: false };
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
 * @api {post} /dietMaster/getDietCategoriesApi Get Data from Disease Master
 * @apiName getDietCategoriesApi
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dietMaster/getDietCategoriesApi
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
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *        "isValidate": true,
 *        "validationList": [],
 *        "message": "Data received successfully.",
 *        "data": {
 *          "dietCategoryList": [
 *            {
 *              "label": "Acidity",
 *              "value": 26
 *            },
 *            {
 *              "label": "Back Pain",
 *              "value": 12
 *            },
 *            {
 *              "label": "Chickenpox",
 *              "value": 13
 *            },
 *            {
 *              "label": "Covid-19",
 *              "value": 1
 *            },
 *            {
 *              "label": "Diabetes",
 *              "value": 9
 *            },
 *            {
 *              "label": "Fever",
 *              "value": 25
 *            },
 *            {
 *              "label": "Fibroids",
 *              "value": 49
 *            },
 *            {
 *              "label": "Flu",
 *              "value": 32
 *            },
 *            {
 *              "label": "High Blood Pressure",
 *              "value": 33
 *            },
 *            {
 *              "label": "Lead Poisoning",
 *              "value": 36
 *            },
 *            {
 *              "label": "Maleria",
 *              "value": 28
 *            },
 *            {
 *              "label": "Pneumonia",
 *              "value": 44
 *            },
 *            {
 *              "label": "Stress",
 *              "value": 37
 *            },
 *            {
 *              "label": "Vomitting",
 *              "value": 31
 *            }
 *          ]
 *        },
 *        "isSuccess": true,
 *        "statusCode": 200
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
  getDietCategoriesApi,
  async function (req, res, next) {

    try {
      let result = {};

      const { } = req.body;


      const response = await getDietCategories();

      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            dietCategoryList: [...response.recordset],
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

router.post(
  updateDietMasterApi,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body
      };

      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: dietMasterSave
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await updateDietMaster({
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
 * @api {post} /dietMaster/getDeleteMasterApi Delete Data of dietMaster
 * @apiName getDeleteMasterApi
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dietMaster/getDeleteMasterApi
 *
 * @apiGroup dietMaster
 *
 * @apiDescription This API is Used to delete data in dietMaster
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - LocationId is required
 *
 * @apiParamExample {json} Input (body/json)
 *     {
 *        "dietId":154
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *     {
 *       "message": "Record deleted successfully.",
 *       "isSuccess": true,
 *       "statusCode": 200,
 *       "data": {}
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
  getDeleteMasterApi,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body,
      };

      const response = await getDelete(bodyData);
      const { isSuccess } = response;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "RDEL" }),
          isSuccess: true
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
 * @api {post} /dietMaster/viewMealData Get Meal Name & Menu From DietMealMaster
 * @apiName ViewMealData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /dietMaster/viewMealData
 *
 * @apiGroup Diet Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Meal Name & Menu From DietMealMaster
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {Number}  DietId, DietId is for filter the data by the Get Data which is related to particular DietID.
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "DietId":270
 *      }
 * 
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *        {
 *    "isValidate": true,
 *    "validationList": [],
 *    "message": "Data received successfully.",
 *    "data": {
 *      "mealDataList": [
 *        {
 *          "mealTypeId": 148,
 *          "mealName": "Herbal Juice",
 *          "menu": "Herbal Juice"
 *        },
 *        {
 *          "mealTypeId": 149,
 *          "mealName": "Breakfast",
 *          "menu": "Breakfast"
 *        },
 *        {
 *          "mealTypeId": 150,
 *          "mealName": "Post Breakfast",
 *          "menu": "Post Breakfast"
 *        },
 *        {
 *          "mealTypeId": 151,
 *          "mealName": "Lunch",
 *          "menu": "Lunch"
 *        }
 *      ]
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
  viewMealDataApi,
  async function (req, res, next) {
    try {
      let result = {};
      const { DietId } = req.body;
      const response = await viewMealData({ DietId });
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess === true) {
        result = {
          message: Message({ code: "Success" }),
          data: {
            mealDataList: [...response.recordset]
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

module.exports = router;