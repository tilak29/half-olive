const express = require("express");
const router = express.Router();

const {
    getEffectiveDateFilter,
    getMealTemplateList,
    getExistingMealData,
    saveMealTemplateData,
    getMealEditDay,
    getExistingDataOnEffeDateWise
} = require("./mealTemplateRepository");
const {
    payLoadValidation,
    sendResponse,
} = require("../../../utils");
const { Message } = require("../../../Messages");
const {
    mealTemplate_getMealTemplateList: { url: getMealTemplateListApi },
    mealTemplate_getExistingMealData: { url: getExistingMealDataApi },
    mealTemplate_getEffectiveDateFilter: { url: getEffectiveDateFilterApi },
    mealTemplate_saveMealTemplateData: { url: saveMealTemplateDataApi },
    mealTemplate_updateMealTemplateData: { url: updateMealTemplateDataApi },
    mealTemplate_deleteMealTemplateData: { url: deleteMealTemplateDataApi },
    mealTemplate_getMealEditDay: { url: getMealEditDayApi },
    mealTemplate_getExistingDataOnEffeDateWise: { url: getExistingDataOnEffeDateWiseApi }
} = require("../../../routerConstant");
const { handleError } = require("../../../error");

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /mealTemplate/getEffectiveDateFilter Get Effective Date From Meal Template
 * @apiName GetEffectiveDateFilter
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /mealTemplate/getEffectiveDateFilter
 *
 * @apiGroup Meal Template
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Effective Date From Meal Template
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *        {
 *   "isValidate": true,
 *   "validationList": [],
 *   "message": "Data received successfully.",
 *   "data": {
 *     "effectiveDateList": [
 *       {
 *         "effectiveDate": "2022-10-05T00:00:00.000Z"
 *       },
 *       {
 *         "effectiveDate": "2022-10-07T00:00:00.000Z"
 *       }
 *     ]
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
    getEffectiveDateFilterApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { } = req.body;

            const isValidDataType = await payLoadValidation({
                bodyData: req.body,
            });

            const { isValidate, validationList } = isValidDataType;
            if (isValidate) {

                const response = await getEffectiveDateFilter();
                const { isSuccess } = response;
                delete response.isSuccess;
                if (isSuccess === true) {
                    result = {
                        message: Message({ code: "Success" }),
                        data: {
                            effectiveDateList: [...response.recordset]
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
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /mealTemplate/getMealTemplateList Get Meal Template Data From Meal Template Detail
 * @apiName GetMealTemplateList
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /mealTemplate/getMealTemplateList
 *
 * @apiGroup Meal Template
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Meal Template Data From Meal Template Detail
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {Number}  effectiveDate, effectiveDate is for filter the data by the dates. //For eg. effectiveDate:'2022-10-06' then the Record of the 6th Sep will Listing.
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "effectiveDate":"2022-10-05"
 *      }
 * 
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *        {
 *     "isValidate": true,
 *     "validationList": [],
 *     "message": "Data received successfully.",
 *     "data": {
 *       "mealTemplateList": [
 *         {
 *           "mealTemplateId": "1",
 *           "dayId": "Sunday",
 *           "herbalJuice": "Herbal Juice - in the morning",
 *           "breakfast": "Breakfast - after herbal juice",
 *           "postBreakfast": "Post Breakfast - before lunch",
 *           "lunch": "Lunch -  in the afternoon",
 *           "postLunch": "Post Lunch - before dinner",
 *           "dinner": "Dinner - in the evening",
 *           "healthPostDinner": "Post Dinner - before night"
 *         }
 *       ]
 *     },
 *     "isSuccess": true,
 *     "statusCode": 200
 *   }
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
    getMealTemplateListApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { effectiveDate } = req.body;
            const response = await getMealTemplateList({ effectiveDate });
            const { isSuccess } = response;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "Success" }),
                    data: {
                        mealTemplateList: [...response.recordset]
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
 * @api {post} /mealTemplate/getExistingMealData Get Meal Name & Menu From Meal Template Detail
 * @apiName GetExistingMealData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /mealTemplate/getExistingMealData
 *
 * @apiGroup Meal Template
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Meal Name & Menu From Meal Template Detail
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {Number}  mealTemplateId, mealTemplateId is for filter the data depends on the Primary key of the Meal Template.
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "mealTemplateId":1
 *      }
 * 
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *        {
 *     "isValidate": true,
 *     "validationList": [],
 *     "message": "Data received successfully.",
 *     "data": {
 *       "existingMealList": [
 *         {
 *           "mealTypeId": 148,
 *           "mealName": "Herbal Juice",
 *           "menu": "Herbal Juice - in the morning"
 *         },
 *         {
 *           "mealTypeId": 149,
 *           "mealName": "Breakfast",
 *           "menu": "Breakfast - after herbal juice"
 *         },
 *         {
 *           "mealTypeId": 150,
 *           "mealName": "Post Breakfast",
 *           "menu": "Post Breakfast - before lunch"
 *         },
 *         {
 *           "mealTypeId": 151,
 *           "mealName": "Lunch",
 *           "menu": "Lunch -  in the afternoon"
 *         },
 *         {
 *           "mealTypeId": 152,
 *           "mealName": "Post Lunch",
 *           "menu": "Post Lunch - before dinner"
 *         },
 *         {
 *           "mealTypeId": 153,
 *           "mealName": "Dinner",
 *           "menu": "Dinner - in the evening"
 *         },
 *         {
 *           "mealTypeId": 154,
 *           "mealName": "Health / Post Dinner",
 *           "menu": "Post Dinner - before night"
 *         }
 *       ]
 *     },
 *     "isSuccess": true,
 *     "statusCode": 200
 *   }
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
    getExistingMealDataApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { mealTemplateId } = req.body;
            const response = await getExistingMealData({ mealTemplateId });
            const { isSuccess } = response;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "Success" }),
                    data: {
                        existingMealList: [...response.recordset]
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
 * @api {post} /mealTemplate/saveMealTemplateData Insert Data into Meal Template & Meal Template Detail
 * @apiName SaveMealTemplateData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /mealTemplate/saveMealTemplateData
 *
 * @apiGroup Meal Template
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert Data into Meal Template & Meal Template Detail
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {String}  Days
 * @apiParam (Request body) {Boolean} EffectiveDate Required
 * @apiParam (Request body) {Boolean} Menu For Each Meal Type
 *
 * @apiParamExample {json} Input (body/json)
 *     {
 *      "dayIndex":1,
 *      "effectiveDate":'2022-10-06',
 *      "Herbal Juice":"Herbal Juice - in the morning"
 *      "Breakfast":"Breakfast - after herbal juice"
 *      "Post Breakfast":"Post Breakfast - before lunch"
 *      "Lunch":"Lunch -  in the afternoon"
 *      "Post Lunch":"Post Lunch - before dinner"
 *      "Dinner":"Dinner - in the evening"
 *      "Health / Post Dinner":"Post Dinner - before night"
 *     }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *       "isValidate": true,
 *       "validationList": [],
 *       "data": {
 *           "insertId": 2,
 *           "affectedRows": 7
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
    saveMealTemplateDataApi,
    async function (req, res, next) {
        try {
            const bodyData = {
                ...req.body
            };
            const result = await mealTemplateRequestHandler({
                bodyData,
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
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /mealTemplate/updateMealTemplateData Update Data of Meal Template & Meal Template Detail.
 * @apiName UpdateMealTemplateData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /mealTemplate/updateMealTemplateData
 *
 * @apiGroup Meal Template
 *
 * @apiDescription This API is Used to update data of Meal Template & Meal Template Detail
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - MealTemplateId and EffectiveDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "mealTemplateId":1,
 *      "effectiveDate": '2022-10-05'
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
    updateMealTemplateDataApi,
    async function (req, res, next) {
        try {
            const result = await mealTemplateRequestHandler({
                bodyData: { ...req.body },
                //validatorData: locationMasterUpdate,
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
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /mealTemplate/deleteMealTemplateData Delete Data of Meal Template & Meal Template Detail
 * @apiName DeleteMealTemplateData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /mealTemplate/deleteMealTemplateData
 *
 * @apiGroup Meal Template
 *
 * @apiDescription This API is Used to delete data of Meal Template & Meal Template Detail
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - MealTemplateId is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "mealTemplateId": 1
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
    deleteMealTemplateDataApi,
    async function (req, res, next) {
        try {
            const result = await mealTemplateRequestHandler({
                bodyData: { ...req.body },
                //validatorData: locationMasterDelete,
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

const mealTemplateRequestHandler = async ({
    bodyData,
    //validatorData,
    operationType
}) => {
    let result = {};
    const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        //payLoad: validatorData
    });
    const { isValidate, validationList } = isValidDataType;

    if (isValidate) {
        const response = await saveMealTemplateData({
            data: JSON.stringify(bodyData),
            operationType
        });
        if (response && response.isSuccess) {
            if (operationType === 0) {
                if (response.recordset[0].Count == 1) {
                    result = { message: Message({ code: "DUPRecord" }), isSuccess: false };
                } else {
                    result = { message: Message({ code: "RINS" }), isSuccess: true };
                }
            }
            else if (operationType === 1) {
                result = { message: Message({ code: "RUPD" }), isSuccess: true };
            }
            if (operationType === 2) {
                result = { message: Message({ code: "RDEL" }), isSuccess: true };
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

router.post(
    getMealEditDayApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { } = req.body;

            const isValidDataType = await payLoadValidation({
                bodyData: req.body,
            });

            const { isValidate, validationList } = isValidDataType;
            if (isValidate) {

                const response = await getMealEditDay();
                const { isSuccess } = response;
                delete response.isSuccess;
                if (isSuccess === true) {
                    result = {
                        message: Message({ code: "Success" }),
                        data: {
                            MealEditDay: [...response.recordset]
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

router.post(
    getExistingDataOnEffeDateWiseApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { effectiveDate, dayindex } = req.body;
            const response = await getExistingDataOnEffeDateWise({ effectiveDate, dayindex });
            const { isSuccess } = response;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "Success" }),
                    data: {
                        existingMealDataList: [...response.recordset]
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
