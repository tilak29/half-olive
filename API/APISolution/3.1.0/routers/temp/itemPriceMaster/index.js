const express = require("express");
const router = express.Router();

const {
  itemPriceMasterSaveData,
  itemPriceMasterGetData,
  getItemPriceExportDates,
  itemPriceMasterDownloadData
} = require("./itemPriceMasterRepository");
const { payLoadValidation, sendResponse } = require("../../../utils");
const {
  itemPriceMasterAdd,
  itemPriceMasterGet,
  itemPriceMasterDownload
} = require("../../../dataType.json");
const { Message } = require("../../../Messages");
const {
  itemPriceMaster_insertData: { url: insertData },
  itemPriceMaster_getData: { url: getData },
  itemPriceMaster_getEffectiveExportDates: { url: getExportDate },
  itemPriceMaster_downloadData: { url: downloadData }
} = require("../../../routerConstant");
const { handleError } = require("../../../error.js");

/**
 * @apiDefine ApiVersion
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /itemPriceMaster/getData Get Data of Item Price of Item Master
 * @apiName GetData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /itemPriceMaster/getData
 *
 * @apiGroup Item Price Master
 *
 * @apiDescription This API is Used to get Data of Item Price from Item Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - divisionId is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "divisionId": 1,
 *      "categoryId":2
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *       "itemPriceList": [
 *          {
 *             "itemId": 1,
 *             "brand": "Acifresh syrup",
 *             "pack": "10 GM",
 *             "mrp": 33,
 *             "ptr": 11,
 *             "pts": 10 //L166176
 *           }
 *         ]
 *        },
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
        loggedInEmployeeId,
        effectiveStartDate,
        categoryId,
        divisionId,
        loggedInAppIndication
      } = req.body;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: itemPriceMasterGet
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await itemPriceMasterGetData({
          loggedInEmployeeId,
          effectiveStartDate,
          categoryId,
          divisionId,
          loggedInAppIndication
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        const itemPrice = response && response[0];
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              itemPriceList: [...itemPrice]
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
 * @api {post} /itemPriceMaster/insertData Add Data of Item Price of Item Master
 * @apiName InsertData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /itemPriceMaster/insertData
 *
 * @apiGroup Item Price Master
 *
 * @apiDescription This API is Used to add Data of Item Price of Item Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - itemPriceData is as array with itemId field ,effectiveStartDate, updatedDate is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "itemPriceData": [{"itemId":1,"mrp":33,"ptr":11,"updatedDate":null},{"itemId":2,"mrp":45,"ptr":11,"updatedDate":null}],
 *      "effectiveStartDate":"2020-03-14"
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
 */
router.post(
  insertData,
  async function (req, res, next) {
    try {
      let result = {};
      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: itemPriceMasterAdd
      });
      const { isValidate, validationList } = isValidDataType;
      const {
        effectiveStartDate,
        itemPriceData,
        loggedInEmployeeId
      } = req.body;
      if (isValidate) {
        const response = await itemPriceMasterSaveData({
          data: JSON.stringify(itemPriceData),
          effectiveStartDate,
          loggedInEmployeeId
        });

        if (response[2] && response[2][0]["@op_IsSuccess"] === 1) {
          const messageResult = {
            message: Message({ code: "RUPD" }),
            isSuccess: true
          };
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
 * @api {post} /itemPriceMaster/getEffectiveExportDates Get Item Price ExportDates
 * @apiName GetExportDate
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /itemPriceMaster/getEffectiveExportDates
 *
 * @apiGroup Item Price Master
 *
 * @apiBody JSON(application/json)
 *
 * @apiDescription This API is Used to Get Item Price ExportDates
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *        "isValidate": true,
 *        "validationList": [],
 *        "isSuccess": true,
 *        "statusCode": 200,
 *        "data": {
 *           "itemPriceExportDateList": [
 *               {
 *                   "effectiveStartDate": "2020-03-17 00:00:00"
 *               },
 *               {
 *                   "effectiveStartDate": "2020-03-16 00:00:00"
 *               },
 *               {
 *                   "effectiveStartDate": "2020-03-14 00:00:00"
 *               },
 *               {
 *                   "effectiveStartDate": "2020-03-10 00:00:00"
 *               },
 *               {
 *                   "effectiveStartDate": "2020-02-26 00:00:00"
 *               }
 *           ]
 *        },
 *        "message": "You get data Successfully",
 *        "data": {}
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
  getExportDate,
  async function (req, res, next) {
    try {
      let result = {};

      const response = await getItemPriceExportDates({});
      const { isSuccess } = response;
      delete response.isSuccess;
      if (isSuccess) {
        result = {
          isSuccess,
          data: {
            itemPriceExportDateList: [...response]
          },
          message: Message({ code: "Success" })
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
 * @apiVersion 1.0.0
 */
/**
 * @api {post} /itemPriceMaster/downloadData download Data of Item Price of Item Master
 * @apiName DownloadData
 * @apiVersion 1.0.0
 * @apiUse ApiVersion
 * @apiSampleRequest /itemPriceMaster/downloadData
 *
 * @apiGroup Item Price Master
 *
 * @apiDescription This API is Used to download Data of Item Price from Item Master
 *
 * @apiHeader (Request headers) {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3d3cuc3BlYy1pbmRpYS5jb20iLCJhdWQiOiJqd3QtYXV
 * @apiHeader (Request headers) {String} accept-version 1.0.0
 *
 * @apiParam (Request body) {JSON} Input JSON Object - divisionId is required
 *
 * @apiParamExample {json} Input (body/json)
 *    {
 *      "divisionId": 1,
 *      "categoryId":2
 *    }
 *
 * @apiSuccessExample Success Response
 *    HTTP/1.1 200 OK
 *    {
 *      "isValidate": true,
 *      "validationList": [],
 *      "message": "You get data Successfully",
 *      "data": {
 *       "itemPriceList": [
 *          {
 *             "itemId": 1,
 *             "brand": "Acifresh syrup",
 *             "pack": "10 GM",
 *             "mrp": 33,
 *             "ptr": 11,
 *             "pts": 10 //L166176
 *           }
 *         ]
 *        },
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
  downloadData,
  async function (req, res, next) {
    try {
      let result = {};
      const { loggedInEmployeeId, effectiveStartDate } = req.body;

      const isValidDataType = await payLoadValidation({
        bodyData: req.body,
        payLoad: itemPriceMasterDownload
      });

      const { isValidate, validationList } = isValidDataType;
      if (isValidate) {
        const response = await itemPriceMasterDownloadData({
          loggedInEmployeeId,
          effectiveStartDate
        });
        const { isSuccess } = response;
        delete response.isSuccess;
        const itemPrice = response && response[0];
        if (isSuccess === true) {
          result = {
            message: Message({ code: "Success" }),
            data: {
              itemPriceList: [...itemPrice]
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
          validationList,
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
