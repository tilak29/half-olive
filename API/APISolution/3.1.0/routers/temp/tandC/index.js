const express = require("express");
const router = express.Router();

const {
    getTandC,
    saveTandC
} = require("./tandCRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
    validateSaveTandC
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
    tandc_getData: { url: getData },
    tandc_saveData: { url: saveData },
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 2.0.0
 */
/**
 * @api {post} /tandc/getData Get Data of term and condition from template matser table
 * @apiName GetData
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /tandc/getData
 *
 * @apiGroup T & C
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get T and C from template master table
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
 *        "tandC": "terms and condition body"
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

            const response = await getTandC();

            const { isSuccess } = response;
            delete response.isSuccess;
            if (isSuccess === true) {
                result = {
                    message: Message({ code: "Success" }),
                    data: {
                        tandC: response[0] ? response[0]["Body"]: ""
                    },
                    isSuccess
                };
            } else {
                result = {
                    message: Message({}),
                    isSuccess: false
                };
            }

            req.result = { isValidate: true, validationList:[], ...result };
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
 * @api {post} /tandc/saveData Insert/update Data into template master for terms and condition
 * @apiName SaveData
 * @apiVersion 2.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /tandc/saveData
 *
 * @apiGroup T & C
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Save Data into Template Master for terms and condition
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object
 *
 * @apiParamExample {json} Input (body/json) In
 *      {
 *          "tandcBody": "terms and condition body"
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
 *        "message": "Record Inserted Successfully",
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
    saveData,
    async function (req, res, next) {
        try {

            let result = {};
            const bodyData = {...req.body};
            const { tandcBody, loggedInEmployeeId } = req.body;

            const isValidDataType = await payLoadValidation({
                bodyData,
                payLoad: validateSaveTandC
            });
            const { isValidate, validationList } = isValidDataType;

            if (isValidate) {
                const response = await saveTandC({
                    loggedInEmployeeId,
                    tandcBody
                });
                const {isSuccess} = response
                if (isSuccess) {
                    result = {
                        message: Message({code:"RSAVE"}),
                        isSuccess: true
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
