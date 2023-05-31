const express = require("express");
const router = express.Router();

const {
    getDayWiseDate,
    getMorningTherapy,
    getDefaultTherapy,
    getAdditionalTherapy,
    getDietPlanName,
    getExistingRecord,
    saveTreatmentSectionDetails,
    getMealTypeName,
} = require("./treatmentRepository");
const {
    payLoadValidation,
    sendResponse,
} = require("../../../../utils");
const {
    treatmentSectionAdd
} = require("../../../../dataType.json");
const { Message } = require("../../../../Messages");
const {
    treatment_getDayWiseDate: { url: getDayWiseDateApi },
    treatment_getMorningTherapy: { url: getMorningTherapyApi },
    treatment_getDefaultTherapy: { url: getDefaultTherapyApi },
    treatment_getAdditionalTherapy: { url: getAdditionalTherapyApi },
    treatment_getDietPlanName: { url: getDietPlanNameApi },
    treatment_getExistingRecord: { url: getExistingRecordApi },
    treatment_saveTreatmentSectionDetails: { url: saveTreatmentSectionDetailsApi },
    treatment_getMealTypeName: { url: getMealTypeNameApi }
} = require("../../../../routerConstant");
const { handleError } = require("../../../../error");

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /treatment/getDayWiseDate Get CheckedIn to CheckedOut Range Of Date For Guest from Booking Details
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatment/getDayWiseDate
 *
 * @apiGroup Treatment 
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get CheckedIn to CheckedOut Range Of Date For Guest from Booking Details
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {Number}  GuestId, GuestId is for which Guest the date range you want //GuestId = 21
 * @apiParam (Request body) {Number}  BookingStatus, BookingStatus is also check the Guest with BookingStatus And Give Date Range of Guest //BookingStatus = 128
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "GuestId":21,
 *         "BookingStatus":129
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *       {
 *         "isValidate": true,
 *         "validationList": [],
 *         "message": "Data received successfully.",
 *         "data": {
 *           "dateList": [
 *             {
 *               "day": "1",
 *               "dates": "2022-08-16T00:00:00.000Z",
 *               "bookingId": "5"
 *             },
 *            {
 *               "day": "2",
 *               "dates": "2022-08-17T00:00:00.000Z",
 *               "bookingId": "5"
 *             },
 *             {
 *               "day": "3",
 *               "dates": "2022-08-18T00:00:00.000Z",
 *               "bookingId": "5"
 *             },
 *             {
 *               "day": "4",
 *               "dates": "2022-08-19T00:00:00.000Z",
 *               "bookingId": "5"
 *             },
 *             {
 *               "day": "5",
 *               "dates": "2022-08-20T00:00:00.000Z",
 *               "bookingId": "5"
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
    getDayWiseDateApi,
    async function (req, res, next) {
        try {
            let result = {};
            const {
                BookingId,
                BookingStatus
            } = req.body;

            const isValidDataType = await payLoadValidation({
                bodyData: req.body,
            });

            const { isValidate, validationList } = isValidDataType;
            if (isValidate) {

                const response = await getDayWiseDate
                    ({
                        BookingId, BookingStatus
                    });
                const { isSuccess } = response;
                delete response.isSuccess;
                if (isSuccess === true) {
                    result = {
                        message: Message({ code: "Success" }),
                        data: {
                            dateList: [...response.recordset]
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
 * @api {post} /treatment/getMorningTherapy Get Morning Therapy List From Treatment Master
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatment/getMorningTherapy
 *
 * @apiGroup Treatment 
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Morning Therapy List From Treatment Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *       {
 *          "isValidate": true,
 *          "validationList": [],
 *          "message": "Data received successfully.",
 *          "data": {
 *            "treatmentList": [
 *              {
 *                "value": 81,
 *                "label": "yoga"
 *              },
 *              {
 *                "value": 82,
 *                "label": "sirodhara"
 *              },
 *              {
 *                "value": 83,
 *                "label": "mud bath"
 *              },
 *            ]
 *          },
 *          "isSuccess": true,
 *          "statusCode": 200
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
    getMorningTherapyApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { GuestId } = req.body;

            const isValidDataType = await payLoadValidation({
                bodyData: req.body,
            });

            const { isValidate, validationList } = isValidDataType;
            if (isValidate) {

                const response = await getMorningTherapy({ GuestId });
                const { isSuccess } = response;
                delete response.isSuccess;
                if (isSuccess === true) {
                    result = {
                        message: Message({ code: "Success" }),
                        data: {
                            treatmentList: [...response.recordset]
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
 * @api {post} /treatment/getDefaultTherapy Get Default Therapy List From TherapyType Master
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatment/getDefaultTherapy
 *
 * @apiGroup Treatment 
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Default Therapy List From TherapyType Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *       {
 *          "isValidate": true,
 *          "validationList": [],
 *          "message": "Data received successfully.",
 *          "data": {
 *            "defaultTreatmentList": [
 *              {
 *                "value": 4,
 *                "label": "Accupunture"
 *              },
 *              {
 *                "value": 3,
 *                "label": "Physio Therapy"
 *              },
 *              {
 *                "value": 6,
 *                "label": "Raga"
 *              }
 *            ]
 *          },
 *          "isSuccess": true,
 *         "statusCode": 200
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
    getDefaultTherapyApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { } = req.body;

            const isValidDataType = await payLoadValidation({
                bodyData: req.body,
            });

            const { isValidate, validationList } = isValidDataType;
            if (isValidate) {

                const response = await getDefaultTherapy();
                const { isSuccess } = response;
                delete response.isSuccess;
                if (isSuccess === true) {
                    result = {
                        message: Message({ code: "Success" }),
                        data: {
                            defaultTreatmentList: [...response.recordset]
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
 * @api {post} /treatment/getAdditionalTherapy Get Additional Therapy List From TherapyType Master
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatment/getAdditionalTherapy
 *
 * @apiGroup Treatment 
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Additional Therapy List From TherapyType Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *       {
 *          "isValidate": true,
 *          "validationList": [],
 *          "message": "Data received successfully.",
 *          "data": {
 *            "additionalTreatmentList": [
 *              {
 *                "value": 9,
 *                "label": "Colon Therapy"
 *              },
 *              {
 *                "value": 5,
 *                "label": "E-Healing"
 *              },
 *              {
 *                "value": 2,
 *                "label": "Evening Therapy"
 *              },
 *              {
 *                "value": 1,
 *                "label": "Morning Therapy"
 *              },
 *              {
 *                "value": 8,
 *                 "label": "Personal Hypno Therapy"
 *              },
 *              {
 *                "value": 7,
 *                "label": "Personal Yoga"
 *              }
 *           ]
 *          },
 *          "isSuccess": true,
 *          "statusCode": 200
 *        }
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
    getAdditionalTherapyApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { } = req.body;

            const isValidDataType = await payLoadValidation({
                bodyData: req.body,
            });

            const { isValidate, validationList } = isValidDataType;
            if (isValidate) {

                const response = await getAdditionalTherapy();
                const { isSuccess } = response;
                delete response.isSuccess;
                if (isSuccess === true) {
                    result = {
                        message: Message({ code: "Success" }),
                        data: {
                            additionalTreatmentList: [...response.recordset]
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
 * @api {post} /treatment/getDietPlanName Get Diet List From Diet Master
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatment/getDietPlanName
 *
 * @apiGroup Treatment 
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Diet List From Diet Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *       {
 *          "isValidate": true,
 *          "validationList": [],
 *          "message": "Data received successfully.",
 *          "data": {
 *            "dietPlanList": [
 *              {
 *                "value": "1",
 *                "label": "Low-Carb"
 *              },
 *              {
 *                "value": "2",
 *                "label": "Paleolithic (Paleo) Diet"
 *              },
 *              {
 *                "value": "4",
 *                "label": "Ketogenic (Keto) Diet"
 *              },
 *              {
 *                "value": "6",
 *                "label": "Carrots Diet"
 *              },
 *              {
 *                "value": "8",
 *                "label": "Fruit Diet"
 *              },
 *              {
 *                "value": "151",
 *                "label": "Juice Diet"
 *              },
 *              {
 *                "value": "63",
 *                "label": "Light diet"
 *              },
 *              {
 *                "value": "64",
 *                "label": "liver tonic diet"
 *              },
 *            ]
 *          },
 *          "isSuccess": true,
 *          "statusCode": 200
 *        }
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
    getDietPlanNameApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { } = req.body;

            const isValidDataType = await payLoadValidation({
                bodyData: req.body,
            });

            const { isValidate, validationList } = isValidDataType;
            if (isValidate) {

                const response = await getDietPlanName();
                const { isSuccess } = response;
                delete response.isSuccess;
                if (isSuccess === true) {
                    result = {
                        message: Message({ code: "Success" }),
                        data: {
                            dietPlanList: [...response.recordset]
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
 * @api {post} /treatment/getExistingRecord Get Exiting Record Of GuestTreatmentHistory
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatment/getExistingRecord
 *
 * @apiGroup Treatment 
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Exiting Record Of GuestTreatmentHistory
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiParam (Request body) {Number}  GuestId, GuestId is for which Guest record is stored in database in we got //GuestId = 21
 * @apiParam (Request body) {Number}  BookingId, BookingId is also check for the Guest with BookingId we got existing Record //BookingId = 4
 * @apiParam (Request body) {Number}  Date, Date is also check for which Date record is stored in database and we got existing Record //Date = "2022-08-16"
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "GuestId":21,
 *        "BookingId":4,
 *        "Date":"2022-08-16"
 *      }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *       {
 *          "isValidate": true,
 *          "validationList": [],
 *          "message": "Data received successfully.",
 *          "data": {
 *            "existingDataList": [
 *              {
 *                "morningTherapy": "[85,107,93,108,83]",
 *                "eveningTherapy": "[85,107,90,108,88]",
 *                "defaultTherapy": "[4]",
 *                "additionalTherapy": "[9,8]",
 *                "dietId": "[11]",
 *                "avoidedItems": "Demo Items",
 *                "remarks": "Demo Remarks",
 *                "mealType": null,
 *                "comments": null
 *              }
 *            ]
 *          },
 *          "isSuccess": true,
 *          "statusCode": 200
 *        }
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
    getExistingRecordApi,
    async function (req, res, next) {
        try {
            let result = {};
            const {
                GuestId,
                BookingId,
                Date
            } = req.body;

            const isValidDataType = await payLoadValidation({
                bodyData: req.body,
            });

            const { isValidate, validationList } = isValidDataType;
            if (isValidate) {

                const response = await getExistingRecord
                    ({
                        GuestId,
                        BookingId,
                        Date
                    });
                const { isSuccess } = response;
                delete response.isSuccess;
                if (isSuccess === true) {
                    result = {
                        message: Message({ code: "Success" }),
                        data: {
                            existingDataList: [...response.recordset]
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
 * @api {post} /treatment/saveTreatmentSectionDetails Insert & Update Functionality of the Treatmentsection Detail
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatment/saveTreatmentSectionDetails
 *
 * @apiGroup Treatment 
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert & Update Functionality of the Treatmentsection Detail
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 *
 * @apiParamExample {json} Input (body/json)
 *      {
 *        "MorningTherapy":"81,82"
 *        "EveningTherapy":"4,5",
 *        "DefaultTherapy":"16"
 *        "AdditionalTherapy":"53,55"
 *        "dietId":"67,68,61"
 *        "AvoidedItems":"Avoid this items"
 *        "Remarks":"Demo Remraks"
 *      }
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
    saveTreatmentSectionDetailsApi,
    async function (req, res, next) {
        try {
            const bodyData = {
                ...req.body
            };
            const result = await treatmentSectionRequestHandler({
                bodyData,
                validatorData: treatmentSectionAdd,
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

const treatmentSectionRequestHandler = async ({
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
        const response = await saveTreatmentSectionDetails({
            data: JSON.stringify(bodyData),
            operationType
        });
        if (response && response.isSuccess) {
            if (operationType === 0) {
                result = { message: Message({ code: "RINS" }), isSuccess: true };
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

/**
 * @apiDefine ApiVersion
 * @apiVersion 3.1.0
 */
/**
 * @api {post} /treatment/getMealTypeName Get Meal Types From Static Data which is already configured
 * @apiName GetData
 * @apiVersion 3.1.0
 * @apiUse ApiVersion
 * @apiSampleRequest /treatment/getMealTypeName
 *
 * @apiGroup Treatment 
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Meal Types From Static Data which is already configured
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 3.1.0
 * 
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *       {
 *          "isValidate": true,
 *          "validationList": [],
 *          "message": "Data received successfully.",
 *          "data": {
 *             "mealTypeList": [
 *              {
 *                "label": "Herbal Juice",
 *                "value": "148"
 *              },
 *              {
 *                "label": "Breakfast",
 *                "value": "149"
 *              },
 *              {
 *                "label": "Post Breakfast",
 *                "value": "150"
 *              },
 *              {
 *                "label": "Lunch",
 *                "value": "151"
 *             },
 *              {
 *                "label": "Post Lunch",
 *                "value": "152"
 *              },
 *              {
 *                "label": "Dinner",
 *                "value": "153"
 *              },
 *              {
 *                "label": "Health / Post Dinner",
 *                "value": "154"
 *              }
 *            ]
 *          },
 *          "isSuccess": true,
 *          "statusCode": 200
 *        }
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
    getMealTypeNameApi,
    async function (req, res, next) {
        try {
            let result = {};
            const { } = req.body;

            const isValidDataType = await payLoadValidation({
                bodyData: req.body,
            });

            const { isValidate, validationList } = isValidDataType;
            if (isValidate) {

                const response = await getMealTypeName();
                const { isSuccess } = response;
                delete response.isSuccess;
                if (isSuccess === true) {
                    result = {
                        message: Message({ code: "Success" }),
                        data: {
                            mealTypeList: [...response.recordset]
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