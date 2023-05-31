const express = require("express");
const router = express.Router();

const {
  getExpenseData,
  expenseConfigurationSaveData
} = require("./expenseMasterRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const { expenseGetData } = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  expenseConfigurationMaster_getData: { url: getData },
  expenseConfigurationMaster_updateData: { url: updateData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /expenseConfigurationMaster/getData Get Expense details by Effective date
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /expenseConfigurationMaster/getData
 *
 * @apiGroup Expense Configuration Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to get Expense details by Effective date
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "effectiveDate": "2020-03-09"
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {
 *      "expenseList": [
 *              {
 *                  "designationId": 6,
 *                  "designationCode": "SL",
 *                  "metroTa": null,
 *                  "metroDahq": null,
 *                  "metroDaos": null,
 *                  "metroDaex": null,
 *                  "nonMetroTa": null,
 *                  "nonMetroDahq": null,
 *                  "nonMetroDaos": null,
 *                  "nonMetroDaex": null
 *           }]
 *       },
 *      "message": "You get data Successfully",
 *      "isSuccess": true,
 *      "statusCode": 200
 *    }
 *
 * @apiErrorExample
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "statusCode": 500,
 *      "isSuccess": false,
 *      "data": {},
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "Internal Server Error"
 *    }
 */
router.post(
  getData,
  async function (req, res, next) {
    try {
      let result = {};
      const bodyData = {
        ...req.body
      };
      const { effectiveDate } = bodyData;
      const isValidDataType = await payLoadValidation({
        bodyData: bodyData,
        payLoad: expenseGetData
      });
      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await getExpenseData({
          effectiveDate
        });
        const { isSuccess } = response;
        const expense = response && response[0];
        delete response.isSuccess;
        if (isSuccess) {
          result = {
            data: {
              expenseList: expense
            },
            isSuccess,
            statusCode: 200,
            message: Message({ code: "Success" })
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
 * @api {post} /expenseConfigurationMaster/updateData Insert or Update Data into Expense Master
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /expenseConfigurationMaster/updateData
 *
 * @apiGroup Expense Configuration Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Insert or Update Data into Expense Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {json} Input
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "json":[
 *               {
 *                  "designationId":2,
 *                  "metroTA":10.00,
 *                  "metroDAHQ":150.00,
 *                  "metroDAOS":500.00,
 *                  "metroDAEX":250.00,
 *                  "nonMetroTA":20.00,
 *                  "nonMetroDAHQ":200.00,
 *                  "nonMetroDAOS":600.00,
 *                  "nonMetroDAEX":400.00,
 *                  "updatedDate":"2020-03-24"
 *               }
 *             ],
 *      "effectiveDate":"2020-03-25"
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "data": {},
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
  updateData,
  async function (req, res, next) {
    try {
      const bodyData = req.body;
      const { json, loggedInEmployeeId, effectiveDate } = bodyData;

      const response = await expenseConfigurationSaveData({
        json,
        loggedInEmployeeId,
        effectiveDate
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
      req.result = {
        isValidate: true,
        validationList: [],
        ...result
      };
    } catch (e) {
      handleError(e, res);
    }
    next();
  },
  sendResponse
);

module.exports = router;
